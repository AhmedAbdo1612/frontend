"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface TextAreaProps {
    id: string,
    label: string,
    disabled?: boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}
const TextArea: React.FC<TextAreaProps> = ({ id, label, disabled, register, required, errors }) => {
    return (
        <div className="w-full relative">
            <textarea
                placeholder=""
                required={required}
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                className={`peer w-full p-4 pt-6 outline-none bg-whtie
            font-light border-2 rounded-md transition disabled:opacity-70
            disabled:cursor-not-allowed
            max-h-[150px]
             min-h-[150px]
            ${errors[id] ? 'border-rose-400' : 'border-slate-300'}
            ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}`} />
            <label className={`
            absolute 
            bg-white px-1
            cursor-text
             text-md
             
            duration-150 
            transform 
            -translate-y-8 
            top-5 z-10 origin-[0] left-4
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 
            peer-focus:-translate-y-4  
             ${errors[id] ? 'focus:text-rose-400' : 'focus:text-slate-300'}`}
                htmlFor={id}>{label}</label>
        </div>
    );
}

export default TextArea;
