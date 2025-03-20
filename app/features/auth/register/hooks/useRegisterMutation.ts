import { useAuthStore, type IRegisterResponse, type TypeRegisterSchema } from '@/app/entities/auth';
import { FetchError } from "@/app/api";

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useRegisterMutation() {
    const router = useRouter()
    const { signUp } = useAuthStore();

    const {mutate: registerMutation, isPending: isLoadingRegister} = useMutation({
        mutationKey: ['register'],
        mutationFn: (values: TypeRegisterSchema) => signUp(values.email, values.password, values.password_confirm),
        onSuccess(data: FetchError | IRegisterResponse) {
            if ('detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                toast.success('Success registration! Welcome to AI Love Photo!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    })

    return { registerMutation, isLoadingRegister }
}