"use client";

import Image from "next/image";
import { CartProductType, SelectedImgType } from "./ProductDetails";

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelect }) => {
    return (
        <div className="grid grid-cols-6 gap-2 h-full
         max-h-[500px] min-h-[300px] sm:min-h-[400px] w-full">

            <div className="flex
                flex-col
                items-center
                justify-center
                gap-4 
                cursor-pointer
                border 
                h-full
                max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
                {product.images.map((item: SelectedImgType, index: number) => (

                    <div className={`relative w-[80%] aspect-square rounded 
                    border-teal-300 ${cartProduct.selectedImg.color === item.color ? "border-[1.5px]" : "border-none"}`}
                        key={index} onClick={() => handleColorSelect(item)}>
                        <Image src={item.image} alt="" fill className="object-contain" />
                    </div>
                ))}
            </div>
            <div className="col-span-5 relative aspect-square">
                    <Image fill src={cartProduct.selectedImg.image} alt=""
                    className="w-full h-full object-contain 
                    max-h-[500px] min-h-[300px] sm:min-h-[400px] "/>
            </div>
        </div>
    );
}

export default ProductImage;