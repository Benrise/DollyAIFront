import { toast } from 'sonner';

export const downloadBlob = async (data: Blob | string, name?: string): Promise<void> => {
  if (data instanceof Blob) {
    const isJsonBlob = data.type === 'application/json';
    const responseData = isJsonBlob ? await data?.text() : data || {};
    
    try {
      const responseJson =
        typeof responseData === 'string'
          ? JSON.parse(responseData)
          : responseData;
      if ('detail' in responseJson) {
        toast.error(responseJson.detail);
        return;
      }
    } catch (e) {}

    const url = window.URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name || 'file');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (typeof data === 'string') {
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', name || 'file');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
