"use client";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";


interface SetQtyProps {
    cartCounter?: boolean
    cartProduct: CartProductType,
    handleQtyIncrease: () => void,
    handleQtyDecrease: () => void,
}
const btnStyles = " hover:text-white hover:bg-teal-400 transition border-[1.2px] border-slate-300 font-semibold text-lg px-3 rounded-md py-1"
const SetQuantity: React.FC<SetQtyProps> = ({ cartProduct, cartCounter, handleQtyDecrease, handleQtyIncrease }) => {
    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null :
                <div className="font-semibold ">
                    QUANTITY:
                </div>
            }
            <div className="flex flex-col sm:flex-row gap-1 md:gap-4  items-center text-base">
                <button className={btnStyles} onClick={()=>handleQtyDecrease()}>-</button>
                <span>{cartProduct.quantity}</span>
                <button className={btnStyles} onClick={()=>handleQtyIncrease()}>+</button>
            </div>
        </div>
    );
}

export default SetQuantity;