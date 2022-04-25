import React, { Fragment, useState } from 'react'
//import { countries } from 'countries-list'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = () => {
    const history=useNavigate();
    const statesList = [ {label:"Andhra Pradesh"},
    {label:"Arunachal Pradesh"},
    {label:"Assam"},
    {label:"Bihar"},
    {label:"Chhattisgarh"},
    {label:"Goa"},
    {label:"Gujarat"},
    {label:"Haryana"},
    {label:"Himachal Pradesh"},
    {label:"Jammu and Kashmir"},
    {label:"Jharkhand"},
    {label:"Karnataka"},
    {label:"Kerala"},
    {label:"Madhya Pradesh"},
    {label:"Maharashtra"},
    {label:"Manipur"},
    {label:"Meghalaya"},
    {label:"Mizoram"},
    {label:"Nagaland"},
    {label:"Odisha"},
    {label:"Punjab"},
    {label:"Rajasthan"},
    {label:"Sikkim"},
    {label:"Tamil Nadu"},
    {label:"Telangana"},
    {label:"Tripura"},
    {label:"Uttarakhand"},
    {label:"Uttar Pradesh"},
    {label:"West Bengal"},
    {label:"Andaman and Nicobar Islands"},
    {label:"Chandigarh"},
    {label:"Dadra and Nagar Haveli"},
    {label:"Daman and Diu"},
    {label:"Delhi"},
    {label:"Lakshadweep"},
    {label:"Puducherry"}]
    /*const statesList=[{
        "AN": "Andaman and Nicobar Islands",
        "AP": "Andhra Pradesh",
        "AR": "Arunachal Pradesh",
        "AS": "Assam",
        "BR": "Bihar",
        "CG": "Chhattisgarh",
        "CH": "Chandigarh",
        "CHD": "Chandigarh",
        "CT": "Chhattisgarh",
        "DD": "Daman and Diu",
        "DEL": "Delhi",
        "DL": "Delhi",
        "DN": "Dadra and Nagar Haveli",
        "DNH": "Dadra and Nagar Haveli",
        "DNHDD": "Dadra and Nagar Haveli and Daman and Diu",
        "GA": "Goa",
        "GJ": "Gujarat",
        "GUJ": "Gujarat",
        "HP": "Himachal Pradesh",
        "HR": "Haryana",
        "JH": "Jharkhand",
        "JK": "Jammu and Kashmir",
        "KA": "Karnataka",
        "KER": "Kerala",
        "KL": "Kerala",
        "KRN": "Karnataka",
        "LA": "Ladakh",
        "LD": "Lakshadweep",
        "LKP": "Lakshadweep",
        "MAH": "Maharashtra",
        "MEG": "Meghalaya",
        "MH": "Maharashtra",
        "MIZ": "Mizoram",
        "ML": "Meghalaya",
        "MN": "Manipur",
        "MNP": "Manipur",
        "MP": "Madhya Pradesh",
        "MZ": "Mizoram",
        "NL": "Nagaland",
        "NLD": "Nagaland",
        "OR": "Odisha",
        "Orissa": "Odisha",
        "PB": "Punjab",
        "PDY": "Puducherry",
        "PY": "Puducherry",
        "RAJ": "Rajasthan",
        "RJ": "Rajasthan",
        "SK": "Sikkim",
        "SKM": "Sikkim",
        "TG": "Telangana",
        "TN": "Tamil Nadu",
        "TR": "Tripura",
        "TRP": "Tripura",
        "TS": "Telangana",
        "UA": "Uttarakhand",
        "UK": "Uttarakhand",
        "UP": "Uttar Pradesh",
        "UT": "Uttarakhand",
        "Uttaranchal": "Uttarakhand",
        "WB": "West Bengal"
    }]*/

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [istate, setIstate] = useState(shippingInfo.istate)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, istate }))
        //history.push('/confirm')
        history('/order/confirm')
    }
    /*var select = document.getElementById("country_field");
    //var options = ["1", "2", "3", "4", "5"];

    for(var i = 0; i < statesList.length; i++) {
        var opt = statesList[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }*/
    /*var option = "";
          for(var i=0; i<statesList.length; i++){
            option+= '<option value="'+ statesList[i] +'">' + statesList[i] + "</option>"
          
        }
    document.getElementById("country_field").innerHTML = option;*/

    return (
        <Fragment>

            <MetaData title={'Shipping Info'} />

            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">State</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={istate}
                                onChange={(e) => setIstate(e.target.value)}
                                required
                            >

                                {/*{Object.keys(statesList).map(
                                    <option key={istate.name} value={istate.name}>
                                        statesList[]
                                    </option>
                                )}*/}
                                {statesList.map((option) => (
                                    <option value={option.label}>{option.label}</option>
                                ))}


                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping