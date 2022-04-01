import React, { useState, useEffect } from 'react';
import { ProductList } from './components/ProductsList';
import { getProducts } from './api/api';
import { Product } from './types/Product';
import classNames from 'classnames';
import './App.scss';
import { NewProduct } from './components/NewProduct';



export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(todoFromServe => setProducts(todoFromServe))
      .then(() => setProgress(true))
      .catch(() => setLoadingError(true));
  }, []);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  return (
    <div className="app">
      <div className='app__buttons'>
        < NewProduct
          addProduct={addProduct}
          prod={products}
        />
        <button
          onClick={() => {
            setDeleting(true)
          }}
        >Delete</button>
        {deleting && (<button
          onClick={() => {
            setDeleting(false)
          }}
        >Cancel deleting</button>)}
      </div>
      <div>
        <ProductList
          products={products}
          del={deleting}
        />
      </div>
    </div>
  );
}


