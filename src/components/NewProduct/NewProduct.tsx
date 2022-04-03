import React, { useState } from "react";
import classNames from "classnames";
import './NewProduct.scss';
import { Product } from "../../types/Product";

type Props = {
    addProduct: (movie: Product) => void,
    prod: Product[],
};

export const NewProduct: React.FC<Props> = ({
    addProduct,
    prod,
}) => {
    const [modal, setModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [count, setCount] = useState(Number(''));
    const [width, setWidth] = useState(Number(''));
    const [height, setHeight] = useState(Number(''));
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

    const attachProduct = () => {
        setModal(!modal);
        document.body.style.overflow = "hidden";
    }

    const isUrl = (url: string) => {
        return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
            .test(url);
    };

    const closerModal = (event: React.FormEvent) => {
        event.preventDefault();
        setModal(!modal);
        setCountCheck(false);
        setImgUrlCheck(false);
        setNameCheck(false);
        setWidthCheck(false);
        setHeightCheck(false);
        document.body.style.overflow = "visible";
    }

    const inputError = () => {
        if (name === '') {
            setNameCheck(true);
        }

        if (imageUrl === '') {
            setImgUrlCheck(true);
        }

        if (count === 0 || isNaN(count)) {
            setCountCheck(true);
        }

        if (width === 0 || isNaN(width)) {
            setWidthCheck(true);
        }

        if (height === 0 || isNaN(height)) {
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
            closerModal(event);
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
                                    if (isUrl(event.target.value)) {
                                        setImageUrl(event.target.value)
                                    }
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
                onClick={attachProduct}
            >Add</button>
        </>
    )
}