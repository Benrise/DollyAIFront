import { authService, type TypeRegisterSchema } from '@/app/entities/auth';

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useRegisterMutation() {
    const router = useRouter()

    const {mutate: registerMutation, isPending: isLoadingRegister} = useMutation({
        mutationKey: ['register user'],
        mutationFn: (values: TypeRegisterSchema) => authService.register(values),
        onSuccess() {
            toast.success('Success registration!')
            router.push('/auth/login')
        },
        onError(error) {
            toastErrorHandler(error)
        }
    })

    return { registerMutation, isLoadingRegister }
}