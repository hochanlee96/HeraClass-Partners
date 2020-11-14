import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authActions from '../store/actions/auth';


const NewStudioForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [titleInput, setTitleInput] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [detailedAddressInput, setDetailedAddressInput] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [fetchedAddresses, setFetchedAddresses] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [categoryInput, setCategoryInput] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [telInput, setTelInput] = useState('');
    const [error, setError] = useState('');
    const [addressObj, setAddressObj] = useState(null);

    const onChange = event => {
        const { name, value } = event.target
        if (name === 'title') {
            setTitleInput(value);
        } else if (name === 'imageUrl') {
            setImageUrlInput(value);
        } else if (name === 'address') {
            setAddressInput(value);
        } else if (name === 'detailedAddress') {
            setDetailedAddressInput(value);
        } else if (name === 'category') {
            setCategoryInput(value);
        } else if (name === 'tel') {
            setTelInput(value);
        }
    }

    const addCategory = () => {
        const updatedList = categoryList;
        updatedList.push(categoryInput);
        setCategoryInput('');
        setCategoryList(updatedList);
    }

    const removeCategory = id => {
        const updatedList = categoryList.filter(cat => cat !== id);
        setCategoryList(updatedList);
    }
    const resetAddress = () => {
        setAddressInput('');
        setDetailedAddressInput('');
        setError('');
        setCoordinates(null);
        setFetchedAddresses(null);
        setFetched(false);
        setAddressObj(null);
    }

    const searchAddress = address => {
        map(address);
    }

    const map = useCallback(async (address) => {
        if (address !== '') {
            const response = await
                fetch(`http://localhost:3001/map/${address}`, {
                    credentials: 'include'
                })
            const data = await response.json();
            console.log(data);
            if (data.length === 0) {
                setError("no such address is found")
            }
            setFetchedAddresses(data);
            setFetched(true);
        }
    }, [])


    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3001/partners/studios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                title: titleInput,
                imageUrl: imageUrlInput,
                address: addressObj.roadAddress + " " + detailedAddressInput,
                bigAddress: addressObj.addressElements[0].shortName + " " + addressObj.addressElements[1].shortName + " " + addressObj.addressElements[2].shortName,
                category: categoryList,
                coordinates: { latitude: addressObj.y, longitude: addressObj.x },
                details: { tel: telInput },
            })
        });
        const resData = await response.json();

        if (resData.error === "not signed in") {
            dispatch(authActions.logout());
        } else {
            const newStudioId = resData.studioId;
            history.push(`/my-studios/${newStudioId}`);
        }
    }
    const setCoordinatesHandler = (x, y) => {
        setCoordinates([x, y]);
    }
    let category = null;
    if (categoryList) {
        category = categoryList.map(cat => (
            <div key={cat}>
                <p >{cat}</p>
                <span><button onClick={() => removeCategory(cat)}>Remove</button></span>
            </div>))
    }

    let addressData;
    if (fetchedAddresses) {
        addressData = fetchedAddresses.map(addressObj => <p key={addressObj.roadAddress} onClick={() => {
            setCoordinatesHandler(addressObj.x, addressObj.y)
            setAddressInput(addressObj.roadAddress)
            setAddressObj(addressObj);
        }}>{addressObj.roadAddress}</p>)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <label>title</label>
                <input type="text" required value={titleInput} name="title" onChange={onChange} placeholder="Title" />
                <label>imageUrl</label>
                <input type="text" required value={imageUrlInput} name="imageUrl" onChange={onChange} placeholder="Image Url" />
                <label>address</label>
                <input type="text" required value={addressInput} name="address" onChange={onChange} placeholder="Address" />
                <input type="button" value="Search Address" onClick={() => searchAddress(addressInput)} />
                {fetched ? <input type="button" value="Reset Address" onClick={resetAddress} /> : null}
                {error !== '' ? <p>{error}</p> : null}
                {coordinates && (<><label>Detailed Address</label>
                    <input type="text" required value={detailedAddressInput} name="detailedAddress" onChange={onChange} placeholder="Detailed Address" /></>)}
                <label>category</label>
                <input type="text" value={categoryInput} name="category" onChange={onChange} placeholder="Categories" />
                <input type="button" value="Add Category" onClick={addCategory} />
                <label>tel</label>
                <input type="text" required value={telInput} name="tel" onChange={onChange} placeholder="Tel" />
                <input type='submit' value="Submit" />

            </form>

            <div>
                {category}
                {addressData}
                {coordinates ? <p>Static Map</p> : null}
                {coordinates ? <img src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${coordinates[0]},${coordinates[1]}&level=16&X-NCP-APIGW-API-KEY-ID=httryobi1m`} alt='#' /> : null}
            </div>
        </>
    )
}

export default NewStudioForm;