import React from 'react';
import './ProductList.scss';
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard";

type Props = {
    products: Product[],
    del: boolean,
};

export const ProductList: React.FC<Props> = ({ products, del }) => {

    return (
        <ul className='list'>
            {products.sort((el1, el2) => el1.name.toLowerCase().localeCompare(el2.name.toLowerCase()))
                .map(product => (
                    <li
                        key={product.id}
                        className="list__product"
                    >
                        <ProductCard
                            product={product}
                            del={del}
                        />
                    </li>
                ))}
        </ul>
    );
};