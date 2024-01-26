"use client";

import SetColor from "@/app/components/Products/SetColor";
import SetQuantity from "@/app/components/Products/SetQuantity";
import { Rating } from "@mui/material";
import Button from "@/app/components/Button/Button";
import { useCallback, useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
    product: any
}
export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: {
        color: string,
        colorCode: string,
        image: string
    },
    quantity: number,
    price: number
}
export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const {handleAddProductToCart, cartProducts} = useCart()
    const [isProduectInCart, setIsProductInCart] = useState(false)
    const router = useRouter()
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {
            ...product.images[0]
        },
        quantity: 1,
        price: product.price
    })
    const productRatigs = product.reviews.length > 0 ?
        product.reviews.reduce((acc: number, item: any) => (acc + item.rating), 0) / product.reviews.length : 0
    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct({ ...cartProduct, selectedImg: value })
    }, [cartProduct.selectedImg])

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) { return }
        setCartProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }))
    }, [cartProduct])
    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }))
    }, [cartProduct])
    useEffect(()=>{
        setIsProductInCart(false)
        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item)=>(item.id === product.id))
            if(existingIndex>-1){
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-slate-700">
                <h1 className="text-3xl font-medium text-slate-700">
                    {product.name}
                </h1>
                <div className="flex iteme-center  gap-3">
                    <Rating value={productRatigs} readOnly />
                    <p>{product.reviews.length} reviews</p>
                </div>
                <hr className="w-[30%] my-2" />
                <div>
                    <p className="text-justify">
                        {product.description}
                    </p>
                </div>
                <hr className="w-[30%] my-2" />
                <div>
                    <span className="font-semibold">CATEGORY:</span>  {product.category}
                </div>

                <div>
                    <span className="font-semibold">BRAND:</span>  {product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
                <hr className="w-[30%] my-2" />

                {isProduectInCart?
                <>
                <p className="text-slate-500 flex mb-2 items-center gap-1">
                    <MdCheckCircle size = {23} className = "text-teal-400"/>
                    <span className="text-lg">Ppriduct Added to Cart</span>
                </p>
                <div>
                    <Button label="View Cart" onClick={()=>{router.push("/cart")}}/>
                </div>
                </>
                :<>
                <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect}
                />
                <hr className="w-[30%] my-2" />
                <SetQuantity cartProduct={cartProduct}
                    handleQtyDecrease={handleQtyDecrease}
                    handleQtyIncrease={handleQtyIncrease} />
                <hr className="w-[30%] my-2" />
                <div className="max-w-[300px]">
                    <Button label="Add to Cart"
                        onClick={() => handleAddProductToCart(cartProduct)}
                        outline
                        custom="hover:bg-slate-700 hover:text-white"
                    />
                </div>
                </>}
            </div>
        </div>
    );
}

export default ProductDetails;