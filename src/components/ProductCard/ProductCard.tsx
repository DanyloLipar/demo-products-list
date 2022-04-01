import React from "react";
import { Product } from "../../types/Product";
import './ProductCard.scss';

type Props = {
    product: Product,
    del: boolean,
}

export const ProductCard: React.FC<Props> = ({ product, del }) => {
    return (
        <div className="product">
            <div className="product__general">
                <h1>{product.name}</h1>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.weight}</p>
            </div>
            <ul>
                {product.comments.map(com => (
                    <li key={com.id}>
                        <h5>{com.description}</h5>
                        <p>{com.date}</p>
                    </li>
                ))}
            </ul>
            <div className="product__radio">
                <button>Edit</button>
                {del && (<button>Remove</button>)}
            </div>
        </div>
    )
}