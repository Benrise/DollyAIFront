import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User extends DefaultUser {
        access_token?: string;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            access_token?: string;
        };
    }

    interface JWT {
        id: string;
        email: string;
        access_token?: string;
    }
}
