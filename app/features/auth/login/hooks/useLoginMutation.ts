import { authService, TypeLoginSchema, ILoginResponse } from '@/app/entities/auth';
import { signIn } from 'next-auth/react';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FetchError } from '@/app/shared/lib';

export function useLoginMutation() {
    const {mutate: loginMutation, isPending: isLoadingLogin} = useMutation({
        mutationKey: ['login user'],
        mutationFn: (values: TypeLoginSchema) => authService.login(values),
        onSuccess(data: FetchError | ILoginResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                signIn('credentials', {...data});
                toast.success('Success login!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error)
        }
    })

    return { loginMutation, isLoadingLogin }
}