import { TypeLoginSchema, ILoginResponse, useAuthStore } from '@/app/entities/auth';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { FetchError } from "@/app/api";
import { useRouter } from 'next/navigation';

export function useLoginMutation() {
    const router = useRouter()
        const { signIn } = useAuthStore();

    const {mutate: loginMutation, isPending: isLoadingLogin} = useMutation({
        mutationKey: ['login user'],
        mutationFn: (values: TypeLoginSchema) => signIn(values.email, values.password),
        onSuccess(data: FetchError | ILoginResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                router.push('/');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error)
        }
    })

    return { loginMutation, isLoadingLogin }
}