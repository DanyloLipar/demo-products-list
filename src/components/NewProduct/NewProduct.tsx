import React, { useState } from "react";
import classNames from "classnames";
import './NewProduct.scss';
import { Product } from "../../types/Product";

type Props = {
    addProduct: (movie: Product) => void,
    prod: Product[],
};

export const NewProduct: React.FC<Props> = ({ addProduct, prod }) => {
    const [modal, setModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [count, setCount] = useState(-1);
    const [width, setWidth] = useState(-1);
    const [height, setHeight] = useState(-1);
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const id = prod.length + 1;
    const date = new Date().toLocaleDateString();
    const productId = id;
    const [nameCheck, setNameCheck] = useState(false);
    const [imgUrlCheck, setImgUrlCheck] = useState(false);
    const [countCheck, setCountCheck] = useState(false);
    const [widthCheck, setWidthCheck] = useState(false);
    const [heightCheck, setHeightCheck] = useState(false);

    const AddProduct = () => {
        setModal(!modal);
        document.body.style.overflow = "hidden";
    }

    const closerModal = () => {
        setModal(!modal);
        document.body.style.overflow = "visible";
    }

    const inputError = () => {
        if (name === '') {
            setNameCheck(true);
        }

        if (imageUrl === '') {
            setImgUrlCheck(true);
        }

        if (count === 0) {
            setCountCheck(true);
        }

        if (width === 0) {
            setWidthCheck(true);
        }

        if (height === 0) {
            setHeightCheck(true);
        }
    };

    const onAdd = (event: React.FormEvent) => {
        event.preventDefault();

        const newProductItem: Product = {
            id,
            imageUrl,
            name,
            count,
            size: {
                width,
                height,
            },
            weight,
            comments: [{
                id,
                productId,
                description,
                date,
            }],
        };

        inputError();

        if (name && imageUrl && count && width && height) {
            addProduct(newProductItem);
            closerModal();
        }
    };

    return (
        <>
            <div id="myModal" className={classNames({
                "modal": !modal,
                "modal-on": modal,
            })}>
                <form
                    className="content"
                    onSubmit={onAdd}
                >
                    <div className='content__form form'>
                        <label className='form__name'>
                            Enter product name:
                            <input
                                required
                                className={classNames({
                                    'red': nameCheck,
                                })}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            />
                        </label>
                        <label >
                            Quantity:
                            <input
                                required
                                className={classNames({
                                    'red': countCheck,
                                })}
                                onChange={(event) => {
                                    setCount(Number(event.target.value))
                                }}
                            />
                        </label>
                        <label >
                            img(URL):
                            <input
                                onChange={(event) => {
                                    setImageUrl(event.target.value)
                                }}
                                className={classNames({
                                    'red': imgUrlCheck,
                                })}
                            />
                        </label>
                        <div className='form__sizing'>
                            <p>Product size:</p>
                            <div className='form__sizing-items'>
                                <label>
                                    Width:
                                    <input
                                        required
                                        onChange={(event) => {
                                            setWidth(Number(event.target.value))
                                        }}
                                        className={classNames({
                                            'red': widthCheck,
                                        })}
                                    />
                                </label>
                                <label>
                                    Height:
                                    <input
                                        required
                                        onChange={(event) => {
                                            setHeight(Number(event.target.value))
                                        }}
                                        className={classNames({
                                            'red': heightCheck,
                                        })}
                                    />
                                </label>
                            </div>
                        </div>
                        <label>
                            Weight:
                            <input
                                required
                                onChange={(event) => {
                                    setWeight(event.target.value)
                                }}
                            />
                        </label>
                        <textarea
                            placeholder='Please leave your comment'
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                        />
                        <div className='form__btn'>
                            <button
                                type="submit"
                            >
                                Add Product
                            </button>
                            <button
                                type='button'
                                onClick={closerModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <button
                type="button"
                onClick={AddProduct}
            >Add</button>
        </>
    )
}