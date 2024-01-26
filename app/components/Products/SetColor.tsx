"use client";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}
interface SetColorProps {
    images: SelectedImgType[],
    cartProduct: CartProductType,
    handleColorSelect: (value: SelectedImgType) => void

}
const SetColor: React.FC<SetColorProps> = ({ images, cartProduct, handleColorSelect }) => {
    return (
        <div >
            <div className="flex gap-4 items-center ">
                <span className="font-semibold ">COLOR: </span>
                <div className="flex gap-2">
                    {
                        images.map((item, index) => (
                            <div key={index}  onClick={()=>handleColorSelect(item)}
                            className={`h-7 w-7 
                        rounded-full flex items-center justify-center
                         border-teal-300 
                         ${cartProduct.selectedImg.color === item.color ? "border-[2px]" :
                                    "border-none"} `}>
                                <div style={{ background: item.colorCode }}
                                    className="h-6 w-6 rounded-full 
                                    border-[1.2px] border-slate-300 
                                    cursor-pointer"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default SetColor;