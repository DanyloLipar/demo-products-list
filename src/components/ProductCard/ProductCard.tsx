import React, { useState } from "react";
import { Product } from "../../types/Product";
import classNames from "classnames";
import './ProductCard.scss';

type Props = {
    product: Product,
    del: boolean,
    wholeProducts: Product[],
    setProduct: (product: Product[]) => void,

}

export const ProductCard: React.FC<Props> = ({
    wholeProducts,
    product,
    del,
    setProduct,
}) => {
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [count, setCount] = useState(0);
    const [img, setImg] = useState('');
    const [weight, setWeight] = useState(0);

    const isUrl = (url: string) => {
        return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
            .test(url);
    };

    const removing = () => {
        wholeProducts = wholeProducts.filter(el => el.name !== product.name)
        setProduct(wholeProducts);
    }

    const editor = (event: React.FormEvent) => {
        if (name !== '') {
            product.name = name;
        }
        if (description !== '') {
            product.comments.push({
                id: product.comments.length + 1,
                productId: product.id,
                description: description,
                date: new Date().toLocaleDateString(),
            })
        }
        if (!isNaN(count) && count < 0) {
            product.count = count;
        }
        if (!isNaN(weight) && count < 0) {
            product.weight = String(weight);
        }
        if (img !== '' && isUrl(img)) {
            product.imageUrl = img;
        }

        event.preventDefault();
        setModal(!modal);
    }

    return (
        <>
            <div id="myModal" className={classNames({
                "modal": !modal,
                "opened": modal,
            })}>
                {modalType ? (
                    <div className="deleting">
                        <h3>Do really want to delete this product?</h3>
                        <div className="deleting__btn">
                            <button
                                className="deleting__btn-yes"
                                onClick={() => {
                                    removing();
                                    setModalType(!modalType);
                                    setModal(!modal);
                                    document.body.style.overflow = "visible";
                                }}
                            >Yes</button>
                            <button
                                onClick={() => {
                                    setModalType(!modalType);
                                    setModal(!modal);
                                    document.body.style.overflow = "visible";
                                }}
                            >No</button>
                        </div>
                    </div>
                ) : (
                    <form
                        className="content"
                    >
                        <div className='content__form form'>
                            <h2>Edit product</h2>
                            <label className='form__name'>
                                Name:
                                <input
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </label>
                            <label>
                                Quantity:
                                <input
                                    onChange={(event) => {
                                        setCount(Number(event.target.value));
                                    }}
                                />
                            </label>
                            <label >
                                img(URL):
                                <input
                                    onChange={(event) => {
                                        setImg(event.target.value);
                                    }}
                                />
                            </label>
                            <label>
                                Weight:
                                <input
                                    onChange={(event) => {
                                        setWeight(Number(event.target.value));
                                    }}
                                />
                            </label>
                            <textarea
                                placeholder='Please leave your comment'
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <div className='form__btn'>
                                <button
                                    type="submit"
                                    onClick={editor}
                                >
                                    Confirm
                                </button>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setModal(!modal);
                                        document.body.style.overflow = "visible";
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
            <div className="product">
                <div className="product__general">
                    <h1>{product.name}</h1>
                    <img src={product.imageUrl} alt={product.name} />
                    <div>
                        <p>{product.weight}</p>
                        <p>Available: {product.count}</p>
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
                    <button
                        className="product__radio-edit"
                        onClick={() => {
                            setModal(!modal)
                        }}
                    >Edit</button>
                    {del && (<button
                        className="product__radio-cancel"
                        onClick={() => {
                            setModalType(!modalType);
                            setModal(!modal);
                        }}
                    >Remove</button>)}
                </div>
            </div>
        </>
    )
}