import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from 'react-icons/md'
import { AiFillTwitterCircle,AiFillInstagram,AiFillYoutube } from 'react-icons/ai'


const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16 ">
            <Container>
                <div className="flex flex-col md:flex-row  justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="font-bold text-base mb-2">Shop Categories </h3>
                        <Link href={"#"}>Phones</Link>
                        <Link href={"#"}>Laptops</Link>
                        <Link href={"#"}>Desktops</Link>
                        <Link href={"#"}>Watches</Link>
                        <Link href={"#"}>Tvs</Link>
                        <Link href={"#"}>Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-base mb-2">Customer Services</h3>
                        <Link href={"#"}>Contact Us</Link>
                        <Link href={"#"}>Shipping Policy</Link>
                        <Link href={"#"}>Returns & Exchanges</Link>
                        <Link href={"#"}>FAQa</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3  mb-6 md:mb-0">
                        <h3 className="font-bold text-base mb-2">About Us</h3>
                        <p className="mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Nam eos magnam pariatur tenetur unde necessitatibus
                            aspernatur maxime officiis. Perspiciatis, culpa.
                            Nostrum itaque obcaecati dolorem voluptas iure
                            ipsam ipsa sit alias.</p>
                        <p>&copy; {new Date().getFullYear()} E~Shop. All rights reserved.</p>
                    </div>
                    <FooterList>
                        <div className="">
                            <h3 className="font-bold text-base mb-2">Follow Us</h3>
                            <div className="flex gap-2">
                                <Link href={"#"}><MdFacebook size = {25}/></Link>
                                <Link href={"#"}><AiFillTwitterCircle size = {25}/></Link>
                                <Link href={"#"}><AiFillInstagram size = {25}/></Link>
                                <Link href={"#"}><AiFillYoutube size = {25}/></Link>
                            </div>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>)
        ;
}

export default Footer;