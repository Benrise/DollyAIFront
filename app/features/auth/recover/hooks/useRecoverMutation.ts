import { useAuthStore } from '@/app/entities/auth';
import { FetchError } from "@/app/api";

import { toastErrorHandler } from '@/app/shared/utils';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useRecoverMutation(callback?: () => void) {
    const { sendCode } = useAuthStore();

    const {mutate: sendCodeMutation, isPending: isLoadingSendCode} = useMutation({
        mutationKey: ['send code'],
        mutationFn: ({email}: {email: string}) => sendCode(email),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                callback?.();
                toast.success('Recover code sent successfully!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    })

    return { sendCodeMutation, isLoadingSendCode }
}