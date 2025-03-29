import { IModelResultMatch } from "@/app/entities/model"
import { IProduct } from "@/app/entities/product/card";

export const modelMatchesToProductsMapping = (matches: IModelResultMatch[]): IProduct[] => {
    return matches.map((match) => {
        const { 
            source_icon, 
            title, 
            image,
            link,
        } = match;
        const product: IProduct = {
            img_src: image,
            title,
            icon_src: source_icon,
            link,
        }
        return product
    })
}