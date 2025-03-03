import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User extends DefaultUser {
        access?: string;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            access?: string;
        };
    }

    interface JWT {
        id: string;
        email: string;
        access?: string;
    }
}
