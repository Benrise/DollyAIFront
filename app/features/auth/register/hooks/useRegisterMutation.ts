import { useMutation } from '@tanstack/react-query';

import { toastErrorHandler } from '@/app/shared/utils';
import { useAuthStore, type IRegisterResponse, type TypeRegisterSchema } from '@/app/entities/auth';
import { FetchError } from "@/app/api";

export function useRegisterMutation() {
    const { signUp } = useAuthStore();

    const {mutate: registerMutation, isPending: isLoadingRegister} = useMutation({
        mutationKey: ['register'],
        mutationFn: (values: TypeRegisterSchema) => signUp(values.email, values.password, values.password_confirm),
        onSuccess(data: FetchError | IRegisterResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    })

    return { registerMutation, isLoadingRegister }
}