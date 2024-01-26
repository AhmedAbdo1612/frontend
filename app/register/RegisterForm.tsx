"use client"
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Inputs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button/Button";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
interface RegisterFormProps{
    currentUser:SafeUser|any
}
const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    const router = useRouter()
    useEffect(()=>{
        if(currentUser){
            router.push("/cart")
            router.refresh()
        }
    },[])
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "", email: "", password: "",
        }
    })
   
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        axios.post('/api/register', data).then(() => {
            toast.success("Account Created!")
            signIn('credentials', {
                email: data.email, password: data.password, redirect: false
            }).then((callback) => {
                if (callback?.ok) {
                    router.push('/cart')
                    router.refresh()
                    toast.success("Logged In")
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
        }).catch(() => toast.error("Somethin went wrong")).finally(() => setLoading(false))
        console.log(data)
    }
    if(currentUser){
        return <p className="text-center">Logged in, Redirecting....</p>
    }
    return (
        <>
            <Heading title="Sign up for E~shop" />
            <Button outline label="Sign up with Google"
                icon={AiOutlineGoogle} onClick={() => { }} />
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="name" label="Name" disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input id="email" label="Email" disabled={loading}
                register={register}
                errors={errors}
                required
                type="email"
            />
            <Input id="password" label="Password" disabled={loading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            {loading && <SyncLoader color="rgba(214, 54, 140, 1)" className="transition" />}
            {!loading && <Button label={loading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />}
            <p className="text-sm">
                Already have account? {" "}
                <Link className="underline" href="/login">
                    Login
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;