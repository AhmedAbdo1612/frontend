"use client"
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Inputs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button/Button";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
interface LoginFormProps{
    currentUser:SafeUser|any
}
const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
    const router = useRouter()
    useEffect(()=>{
        if(currentUser){
            router.push('/cart')
            router.refresh()
        }
    },[])

    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
             email: "", password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
       signIn('credentials',{
        ...data,
        redirect:false
       }).then((callback)=>{
        setLoading(false)
        if (callback?.ok) {
            router.push('/cart')
            router.refresh()
            toast.success("Logged In")
        }
        if (callback?.error) {
            toast.error(callback.error)
        }
       })
    }
    if(currentUser){
        return <p className="text-center">Logged in, Redirecting....</p>
    }
    return (
        <>
            <Heading title="Sign in for E~shop" />
            <Button outline label="Continue with Google" 
            icon={AiOutlineGoogle} onClick={()=>{}}/>
            <hr className="bg-slate-300 w-full h-px" />
        
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
            {!loading && <Button label={"Login"} onClick={handleSubmit(onSubmit)} />}
            <p className="text-sm">
                Do not have account? {" "}
                <Link className="underline" href="/register">
                    Sign Up
                </Link>
            </p>
        </>
    );
}

export default LoginForm;