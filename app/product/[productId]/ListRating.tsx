"use client";

import Heading from "@/app/components/Heading";

interface ListRatingProps {
    product: any
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
    return (
        <div>
            <Heading title="Product Reviews"/>
        </div>
    );
}

export default ListRating;