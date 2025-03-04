import { toast } from 'sonner'
import { FetchError } from '../lib'

export function toastErrorHandler(error: FetchError) {
    if (error.detail) {
        toast.error(error.detail)
    }
    else if (error.message) {
        const errorMessage = error.message
        const firstDotIndex = errorMessage.indexOf('.')

        if (firstDotIndex !== -1) {
            toast.error(errorMessage.slice(0, firstDotIndex), {
                description: errorMessage.slice(firstDotIndex + 1)
            })
        } else {
            toast.error(errorMessage)
        }
    } else {
        toast.error('Server error')
    }
}