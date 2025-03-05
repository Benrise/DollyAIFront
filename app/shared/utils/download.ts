export const downloadBlob = async (data: Blob | string, name?: string): Promise<void> => {
  if (typeof window === "undefined") return;

  if (data instanceof Blob) {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isSafari) {
      const reader = new FileReader();
      reader.onload = () => {
        const link = document.createElement("a");
        link.href = reader.result as string;
        link.download = name || "file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      reader.readAsDataURL(data);
    } else {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = name || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } else if (typeof data === "string") {
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", name || "file");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
