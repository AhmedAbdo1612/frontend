import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/Products/ProductCard";


export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div >
          <HomeBanner />
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.map((item: any, index: number) => (<ProductCard key={index} data={item} />))}
        </div>
      </Container>
    </div>
  )
}
