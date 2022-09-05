import { toast, ToastOptions } from 'react-toastify';

export function useToast(options?: ToastOptions<{}>) {
  const success = (data: string) =>
    toast(data, { ...options, type: 'success' });

  const error = (data: string) => toast(data, { ...options, type: 'error' });

  return { success, error };
}
