import { api } from "@/app/api";

export const fetchProtectedImage = async (url: string) => {
    try {
        const response = await api.get(url, { responseType: "blob" });
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error("Ошибка загрузки изображения:", error);
        return null;
    }
};