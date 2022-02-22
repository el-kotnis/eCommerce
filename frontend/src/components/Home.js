import React, { Fragment,useEffect,useState } from 'react';
import MetaData from './layout/MetaData';

import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../actions/productActions'

import Product from './product/Product';

const Home = () => {

    const dispatch = useDispatch();

    const {loading,products,error,productsCount} = useSelector(state=>state.products)

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    return(
        <Fragment>
            {loading?<h1>Loading...</h1>:(
                <Fragment>
                    <MetaData title={'The Best Products Online'}/>
                        <h1 id="products_heading">Latest Products</h1>
                            <section id="products" className="container mt-5">
                                <div className="row">
                                    {products && products.map(product=>(
                                        <Product key={product._id} product={product}/>
                                    ))}
                                    
                                </div>
                            </section>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;