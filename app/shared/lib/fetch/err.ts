
export class FetchError extends Error {
    public constructor(
        public statusCode: number,
        public message: string,
        public config: RequestInit,
        public detail?: string
    ){
        super(message);
        

        Object.setPrototypeOf(this, new.target.prototype)
    }
}