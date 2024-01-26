"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { PaymentElement, useElements, useStripe, AddressElement }
    from '@stripe/react-stripe-js'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button/Button";
import {ClipLoader,ScaleLoader} from "react-spinners";
interface CheckoutFormProps {
    clientSecret: string,
    handleSetPaymentSuccess: (val: boolean) => void
}


const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret,
    handleSetPaymentSuccess }) => {
    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const formatedPrice = formatPrice(cartTotalAmount)
    useEffect(() => {
        if (!stripe || !clientSecret) return
        handleSetPaymentSuccess(false)

    }, [stripe])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return
        setLoading(true)
        stripe.confirmPayment({
            elements,
            redirect: "if_required",

        }).then(result => {
            if (!result.error) {
                toast.success("Payment Success!")
                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setLoading(false)
        })
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your payment data to complete checkout" />
            </div>
            <h2 className="font-semibold mb-2">Address Information</h2>
            <AddressElement options={{ mode: "shipping" }} />

            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="py-4 text-center text-slate-700 text-xl font-bold">
                {formatedPrice}
            </div>
            <div className="text-center">
                {loading ? <ScaleLoader color="#00BFFF" />
                    : 
                    <Button label="Pay Now" disapled={loading}
                     onClick={() => {}} />}
            </div>

        </form>
    );
}

export default CheckoutForm;