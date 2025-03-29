import { IProduct, ProductCard } from "@/app/entities/product/card";

interface ProductsListProps {
    products: IProduct[];
    className?: string
}

export function ProductsList({ products, className }: ProductsListProps) {
    return (
        <div className={`grid grid-cols-2 gap-4 ${className}`}>
            {products.map((product) => (
                <ProductCard
                    key={product.link}
                    img_src={product.img_src}
                    title={product.title}
                    icon_src={product.icon_src}
                    link={product.link}
                />
            ))}
        </div>
    )
}