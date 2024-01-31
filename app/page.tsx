export const revalidate = 0;
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/Products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps{
    searchParams:IProductParams
}
export default async function Home({searchParams}:HomeProps) {
  const products = await getProducts( searchParams)
  if(!products){
    return <NullData title="Ooops no products, click all to clear filter"/>
  }
  function shuffleArray(arr:any){
    for (let i = arr.length -1; i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }
  const shuffledProducts = shuffleArray(products)
  return (
    <div className="p-8">
      <Container>
        <div >
          <HomeBanner />
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {shuffledProducts.map((item: any, index: number) => (<ProductCard key={index} data={item} />))}
        </div>
      </Container>
    </div>
  )
}
