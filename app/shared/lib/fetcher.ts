export const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText || "Something went wrong");
        }
        return res.json();
      });
  