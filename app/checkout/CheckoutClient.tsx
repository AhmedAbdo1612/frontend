"use client";
import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import { ClipLoader,ScaleLoader } from "react-spinners";
import Button from "../components/Button/Button";

const stripe_publish_key = "pk_test_51OXSvSBzSbZRkuS3bQFXixQYeHxoemb0mY09u7TGEXfSsLPP6bUUBQ3J4gC3yUB0L0R1F0k3J4rapr7lqt98qvuA00V3MnSAQw"
const stripePromise = loadStripe(stripe_publish_key)
const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent, } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (cartProducts) {
            setLoading(true)
            setError(false)
            fetch('/api/create-payment-intent', {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setLoading(false)
                if (res.status === 401) {
                    return router.push('/login')
                }
                return res.json()

            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((err) => {
                setError(true)
                // console.log(err)
                toast.error("Someting went wrong")
            })
        }
    }, [cartProducts, paymentIntent])
    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating"
        }
    }
    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])
    return (
        <div className="w-full">
            {clientSecret && cartProducts &&!loading&& (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {loading &&
                <div className="flex items-center gap-2 justify-center">
                    <span>Loading Checkout...</span>
                    <ClipLoader color="" />
                </div>
            }
            {error &&
                <div className="text-center text-rose-600">Something went wrong...</div>
            }
            {paymentSuccess &&
                <div className="flex flex-col items-center gap-4">
                    <div className="text-teal-500 text-center">Paymnt Success</div>
                    <div className="max-w-[220px] w-full">
                        <Button label="View Your Orders"
                        onClick={()=>router.push('/order')}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default CheckoutClient;