
export class FetchError extends Error {
    public constructor(
        public statusCode: number,
        public message: string,
        public config: RequestInit,
    ){
        super(message);
        

        Object.setPrototypeOf(this, new.target.prototype)
    }
}