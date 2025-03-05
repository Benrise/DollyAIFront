import { FetchError } from "./err";
import { RequestOptions, TypeSearchParams } from "./types";

type RequestInterceptor = {
  fulfilled: (config: RequestInit) => RequestInit | Promise<RequestInit>;
  rejected?: (error: FetchError) => FetchError | unknown;
};

type ResponseInterceptor = {
  fulfilled: (response: Response) => Response | Promise<Response>;
  rejected?: (error: FetchError) => FetchError | unknown;
};

export class FetchClient {
  private baseUrl: string;
  public headers?: Record<string, string>;
  public params?: TypeSearchParams;
  public options?: RequestOptions;

  public interceptors = {
    request: {
      handlers: [] as RequestInterceptor[],
      use: (fulfilled: RequestInterceptor["fulfilled"],rejected?: RequestInterceptor["rejected"]) => {
        this.interceptors.request.handlers.push({ fulfilled, rejected });
      },
    },
    response: {
      handlers: [] as ResponseInterceptor[],
      use: (fulfilled: ResponseInterceptor["fulfilled"], rejected?: ResponseInterceptor["rejected"]) => {
        this.interceptors.response.handlers.push({ fulfilled, rejected });
      },
    },
  };

  public constructor(init: {
    baseUrl: string;
    headers?: Record<string, string>;
    params?: TypeSearchParams;
    options?: RequestOptions;
  }) {
    this.baseUrl = init.baseUrl;
    this.headers = init.headers;
    this.params = init.params;
    this.options = init.options;
  }

  private formatBody(body?: Record<string, string | object> | FormData, contentType?: string): string | FormData | undefined {
    if (body instanceof FormData) {
      return body;
    }
  
    if (body === null || body === undefined) {
      return undefined;
    }
  
    if (contentType === "application/x-www-form-urlencoded") {
      return Object.keys(body)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(String(body[key as keyof typeof body])))
        .join('&');
    }
  
    if (typeof body === 'object') {
      return JSON.stringify(body);
    }
  
    return String(body);
  }

  private createSearchParams(params?: TypeSearchParams): string {
    const mergedParams = { ...this.params, ...params };
    const searchParams = new URLSearchParams();
    for (const key in mergedParams) {
      if (Object.prototype.hasOwnProperty.call(mergedParams, key)) {
        const value = mergedParams[key];
        if (Array.isArray(value)) {
          value.forEach((currentValue) => {
            if (currentValue != null) {
              searchParams.append(key, currentValue.toString());
            }
          });
        } else if (value != null) {
          searchParams.set(key, value.toString());
        }
      }
    }
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }

  public async request<T>(
    endpoint: string,
    method: RequestInit["method"],
    options: RequestOptions = {}
  ): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;
    if (options.params || this.params) {
      url += this.createSearchParams(options.params);
    }

    let config: RequestInit = {
      ...this.options,
      ...options,
      method,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };

    for (const interceptor of this.interceptors.request.handlers) {
      try {
        config = await interceptor.fulfilled(config);
      } catch (error) {
        if (interceptor.rejected) {
          interceptor.rejected(error as FetchError);
        }
        return Promise.reject(error);
      }
    }

    let response: Response;
    try {
      response = await fetch(url, config);
    } catch (error) {
      return Promise.reject(error);
    }

    if (response.ok) {
      for (const interceptor of this.interceptors.response.handlers) {
        try {
          response = await interceptor.fulfilled(response);
        } catch (error) {
          if (interceptor.rejected) {
            interceptor.rejected(error as FetchError);
          }
          return Promise.reject(error);
        }
      }
    } else {
      let errorObj: FetchError = new FetchError(response.status, response.statusText, config);
      const errorBody = await response.json();
      errorObj = {
          ...errorObj,
          detail: errorBody?.detail || "Unknown error",
      };
      for (const interceptor of this.interceptors.response.handlers) {
        if (interceptor.rejected) {
          try {
            errorObj = await interceptor.rejected(errorObj) as FetchError;
          } catch (error) {
            errorObj = error as FetchError;
          }
        }
      }
      return Promise.reject(errorObj);
    }

    const contentType = response.headers.get("Content-Type");

    if (options.responseType === 'blob') {
      return response.blob() as unknown as Promise<T>;
    }

    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }
  
    return response.text() as unknown as Promise<T>;
  }

  public get<T>(endpoint: string, options: Omit<RequestOptions, "body"> = {}) {
    return this.request<T>(endpoint, "GET", options);
  }

  public post<T>(
    endpoint: string,
    body?: Record<string, string> | FormData,
    options: RequestOptions = {}
  ) {
    const isFormData = body instanceof FormData;
    const contentType = options.headers?.["Content-Type"];

    return this.request<T>(endpoint, "POST", {
      ...options,
      headers: {
        ...(!isFormData ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      body: this.formatBody(body, contentType),
    });
  }

  public put<T>(endpoint: string, body: Record<string, string>, options: RequestOptions = {}) {
    const contentType = options.headers?.["Content-Type"];

    return this.request<T>(endpoint, "PUT", {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: this.formatBody(body, contentType),
    });
  }

  public delete<T>(endpoint: string, options: Omit<RequestOptions, "body"> = {}) {
    return this.request<T>(endpoint, "DELETE", options);
  }

  public patch<T>(endpoint: string, body: Record<string, string>, options: RequestOptions = {}) {
    const contentType = options.headers?.["Content-Type"];

    return this.request<T>(endpoint, "PATCH", {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: this.formatBody(body, contentType),
    });
  }
}
