"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import 'aos/dist/aos.css';
const AOS = require('aos')

interface ProductCardProps {
    data: any
} 
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    useEffect(() => {
        AOS.init({
          easing: "ease",
            duration:1000,
          offset: 100,
          mirror:true
          
        });
      }, []);
    const router = useRouter()
    const productRatigs = data.reviews.length >0 ?
     data.reviews.reduce((acc:number, item:any)=>(acc+item.rating),0)/data.reviews.length :0
    return (
        <div onClick={()=>(router.push(`/product/${data.id}`))} data-aos = "fade-up"
          className="col-span-1 cursor-pointer 
        border-[1.2px] border-slate-200 bg-slate-50
        rounded-sm p-2 transition hover:scale-105 text-center text-sm ">
             
            <div className="flex flex-col  items-center w-full gap-1 relative">
                {/* image */}
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image
                        alt={data.name}
                        fill src={data.images[0].image}
                        className="w-full h-full object-contain" />
                </div>
                {/* name */}
                <div className="mt-4"> {truncateText(data.name )}</div>
                {/* ratings */}
                <div> <Rating value={productRatigs} readOnly/></div>
                {/* reviews */}
                <div>{data.reviews.length}</div>
                {/* price */}
                <div className="font-semibold">{formatPrice(data.price)}</div>
            </div>
        </div>
    );
}

export default ProductCard;