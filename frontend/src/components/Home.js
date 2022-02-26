import React, { Fragment,useEffect,useState } from 'react';
import MetaData from './layout/MetaData';

import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../actions/productActions'
import { useAlert } from 'react-alert';

import Product from './product/Product';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom';

const Home = () => {

    const [currentPage,setCurrentPage]=useState(1)

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading,products,error,productsCount,resPerPage} = useSelector(state=>state.products);

    const {keyword}=useParams();

    useEffect(()=>{
        if(error){
            return alert.error(error)
        }
        dispatch(getProducts(keyword,currentPage));

    },[dispatch,alert,error,keyword,currentPage])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return(
        <Fragment>
            {loading?<h1><Loader/></h1>:(
                <Fragment>
                    <MetaData title={'Best Tea and Coffee Online - Ticofi'}/>
                        <h1 id="products_heading">Latest Products</h1>
                            <section id="products" className="container mt-5">
                                <div className="row">
                                    {products && products.map(product=>(
                                        <Product key={product._id} product={product}/>
                                    ))}
                                    
                                </div>
                            </section>
                            {resPerPage<=productsCount &&(
                                <div className="d-flex justify-content-center mt-5">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={'Next'}
                                        prevPageText={'Prev'}
                                        firstPageText={'First'}
                                        lastPageText={'Last'}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
