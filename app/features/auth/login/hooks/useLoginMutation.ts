import { authService, TypeLoginSchema } from '@/app/entities/auth';
import { signIn } from 'next-auth/react';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLoginMutation() {
    const router = useRouter()

    const {mutate: loginMutation, isPending: isLoadingLogin} = useMutation({
        mutationKey: ['login user'],
        mutationFn: (values: TypeLoginSchema) => authService.login(values),
        onSuccess(data: any) {
            if (data.message) {
                toastErrorHandler(data)
            } else {
                signIn('credentials', data)
                toast.success('Success login!')
            }
        },
        onError(error) {
            toastErrorHandler(error)
        }
    })

    return { loginMutation, isLoadingLogin }
}