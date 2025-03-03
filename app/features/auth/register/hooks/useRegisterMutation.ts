import { authService, type IRegisterResponse, type TypeRegisterSchema } from '@/app/entities/auth';
import { FetchError } from '@/app/shared/lib';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useRegisterMutation() {
    const router = useRouter()

    const {mutate: registerMutation, isPending: isLoadingRegister} = useMutation({
        mutationKey: ['register user'],
        mutationFn: (values: TypeRegisterSchema) => authService.register(values),
        onSuccess(data: FetchError | IRegisterResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                toast.success('Success registration!')
                router.push('/auth/login')
            }
        },
        onError(error: Error) {
            toastErrorHandler(error)
        }
    })

    return { registerMutation, isLoadingRegister }
}