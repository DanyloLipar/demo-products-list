import React from "react";
import { Product } from "../../types/Product";
import './ProductCard.scss';

type Props = {
    product: Product,
    del: boolean,
    wholeProducts: Product[],
    setProduct: (product: Product[]) => void,
}

export const ProductCard: React.FC<Props> = ({ wholeProducts, product, del, setProduct }) => {

    const removing = () => {
        wholeProducts = wholeProducts.filter(el => el.name !== product.name)
        setProduct(wholeProducts)
    }

    return (
        <div className="product">
            <div className="product__general">
                <h1>{product.name}</h1>
                <img src={product.imageUrl} alt={product.name} />
                <div>
                    <p>{product.weight}</p>
                </div>
            </div>
            <ul className="product__comment comment">
                <h5>Description</h5>
                {product.comments.map(com => (
                    <li
                        key={com.id}
                        className='comment__content'
                    >
                        <p>{com.description}<span>{com.date}</span></p>

                    </li>
                ))}
            </ul>
            <div className="product__radio">
                <button>Edit</button>
                {del && (<button
                    onClick={removing}
                >Remove</button>)}
            </div>
        </div>
    )
}