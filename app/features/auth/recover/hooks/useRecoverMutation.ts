import { useAuthStore } from '@/app/entities/auth';
import { FetchError } from "@/app/api";

import { toastErrorHandler } from '@/app/shared/lib';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useRecoverMutation(sendCodecallback: () => void, verifyCodecallback: () => void, changePasswordcallback: () => void) {
    const { sendCode, verifyCode, changePassword  } = useAuthStore();

    const {mutate: sendCodeMutation, isPending: isLoadingSendCode} = useMutation({
        mutationKey: ['send code'],
        mutationFn: ({email}: {email: string}) => sendCode(email),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                sendCodecallback();
                toast.success('Recover code sent successfully! Check your email.');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    })

    const {mutate: verifyCodeMutation, isPending: isLoadingVerifyCode} = useMutation({
        mutationKey: ['verify code'],
        mutationFn: ({code}: {code: string}) => verifyCode(code),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                verifyCodecallback();
                toast.success('Almost done! Enter your new password.');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    })

    const {mutate: changePasswordMutation, isPending: isLoadingChangePassword} = useMutation({
        mutationKey: ['change password'],
        mutationFn: ({password, password_confirm}: {password: string, password_confirm: string}) => changePassword(password, password_confirm),
        onSuccess(data: FetchError | null) {
            if (data && 'detail' in data) {
                toastErrorHandler(data);
            } 
            else {
                changePasswordcallback();
                toast.success('Password changed successfully!');
            }
        },
        onError(error: FetchError) {
            toastErrorHandler(error);
        }
    })

    return { sendCodeMutation, verifyCodeMutation, changePasswordMutation, isLoadingSendCode, isLoadingVerifyCode, isLoadingChangePassword }
}