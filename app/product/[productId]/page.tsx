

interface IParams {
    productId: string
}
import Container from "../../components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { Avatar, Rating } from "@mui/material";
import moment from "moment";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

const Product = async({ params }: { params: IParams }) => {
    const product = await getProductById(params)
    if(!product){
        return <NullData title="Ooops, the target product does not exisits."/>
    }
    return (<div className="p-8">

        <Container>
            {product && <ProductDetails product={product} />}
            <div className="flex flex-col  mt-20 gap-4">
                <div>Add rating</div>
                <ListRating product={product} />
                <div className="text-sm mt-2 ">
                    {product && product.reviews && product.reviews.map((review, index) => (
                        <div key={index}
                            className="max-w-[400px]">
                            <div className="flex gap-2 items-center">
                                {review?.user.image&&<Avatar src={review?.user.image} />}
                                <div className="font-semibold">{review?.user.name}</div>
                                <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                            </div>
                            <div className="mt-2">
                                <Rating value={review.rating} readOnly />
                                <div className="ml-2">{review.comment}</div>
                            </div>
                            <hr className="mt-4 mb-4" />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    </div>
    );
}

export default Product;