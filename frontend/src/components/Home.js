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

    const {loading,products,error,productsCount,resPerPage,filteredProductsCount} = useSelector(state=>state.products);

    const {keyword}=useParams();
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Tea',
        'Coffee',
        'Appliances',
        'Merchandise',
        'Home'
    ]

    useEffect(()=>{
        if(error){
            return alert.error(error)
        }
        dispatch(getProducts(keyword,currentPage,price,category));

    },[dispatch,alert,error,keyword,currentPage,price,category])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    
    if(keyword){
        count = filteredProductsCount
    }

    return(
        <Fragment>
            {loading?<h1><Loader/></h1>:(
                <Fragment>
                    <MetaData title={'Best Tea and Coffee Online - Ticofi'}/>
                        <div id="hero2" className="row">
                            <div id="hero2-content">
                                <h1 id="hero2-title">
                                    THE ONE STOP SHOP
                                </h1>
                                <h2 id="hero2-subtitle">
                                    For Your Tea And Coffee Needs
                                </h2>
                            </div>
                        </div>
                        <div className="hero">
                            <div className="hero-content">
                                <h1 className="hero-title">
                                        THE FINEST PRODUCTS
                                </h1>
                                <h2 className="hero-subtitle">
                                        From The Finest Estates
                                </h2>
                            </div>
                        </div>
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
                                                    <hr className='my-5'/>

                                                    <div className='mt-5'>
                                                        <h4 className='mb-3'>
                                                            Categories
                                                        </h4>
                                                        <ul className="pl-0">
                                                            {categories.map(category => (
                                                                <li
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        listStyleType: 'none'
                                                                    }}
                                                                    key={category}
                                                                    onClick={() => setCategory(category)}>
                                                                    {category}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
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
                            {resPerPage<=count &&(
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
