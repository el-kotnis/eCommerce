import React, { Fragment,useEffect,useState } from 'react';
import MetaData from './layout/MetaData';

import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../actions/productActions'
import { useAlert } from 'react-alert';

import Product from './product/Product';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
//defining the range for the filter
const {createSliderWithTooltip} = Slider;
const Range=createSliderWithTooltip(Slider.Range);

const Home = () => {

    const [currentPage,setCurrentPage]=useState(1)
    //price range in filter
    const [price,setPrice] = useState([1,4000])

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading,products,error,productsCount,resPerPage} = useSelector(state=>state.products);

    const {keyword}=useParams();

    useEffect(()=>{
        if(error){
            return alert.error(error)
        }
        dispatch(getProducts(keyword,currentPage,price));

    },[dispatch,alert,error,keyword,currentPage,price])

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
                                    {keyword?(
                                        <Fragment>
                                            <div className='col-6 col-md-3 mt-5 mb-5'>
                                                <div className='px-5'>
                                                    <Range
                                                        marks={{
                                                            1:`₹1`,
                                                            4000:`₹4000`
                                                        }}
                                                        min={1}
                                                        max={4000}
                                                        defaultValue={[1,4000]}
                                                        tipFormatter={value=>`₹${value}`}
                                                        tipProps={{
                                                            placement:"top",
                                                            visible:true
                                                        }}
                                                        value={price}
                                                        onChange={price=>setPrice(price)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-9">
                                                <div className="row">
                                                    {products.map(product => (
                                                        <Product key={product._id} product={product} col={4} />
                                                    ))}
                                                </div>
                                            </div>

                                        </Fragment>
                                    ):(
                                        products.map(product => (
                                            <Product key={product._id} product={product} col={3} />
                                        ))
                                    )}
                                    
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
