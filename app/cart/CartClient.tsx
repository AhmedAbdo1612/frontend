"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button/Button";
import ItemContent from "./ItemContent";
import {formatPrice} from "@/utils/formatPrice"
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps{
    currentUser:SafeUser |null
}

const CartClient:React.FC<CartClientProps> = ({currentUser}) => {
    const { cartProducts,handleClearCart,cartTotalAmount } = useCart()
    const router = useRouter()
    if (!cartProducts || cartProducts.length == 0) {
        return <div className=" flex flex-col items-center">
            <div className="text-2xl">Your Cart is Empty</div>
            <Link href={"/"} className="text-slate-800 flex items-center gap-1 mt-2 
            transition hover:text-slate-500">
                <MdArrowBack size={25} />
                <span>Start Shopping</span>
            </Link>
        </div>
    }
    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
                <div className="col-span-2 justidy-self-start">PRODUC</div>

                <div className="justify-self-center">PRCIE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            {
                cartProducts && cartProducts.map((item) => (
                    <ItemContent key={item.id} item = {item}/>
                ))
            }
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[150px] ">
                    <Button label="Clear Cart" onClick={() => {handleClearCart() }} outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex w-full justify-between text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>

                    <p className="text-slate-500">Takes and Shipping calculated at checkout</p>
                    <Button label={currentUser?"Checkout":"Login To Checkout"}
                    onClick={() => {
                        currentUser?router.push('/checkout'):router.push('/login')
                     }} 
                    custom="mt-2" />
                    <Link href={"/"} className="text-slate-800 flex items-center gap-1 mt-2 
                                         transition hover:text-slate-500">
                        <MdArrowBack size={21} />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartClient;