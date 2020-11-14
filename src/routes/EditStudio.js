import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import * as authActions from '../store/actions/auth';
import Studio from '../models/studio';

const EditStudio = () => {

    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();

    const [studioId, setStudioId] = useState('');
    const [fetchedStudio, setFetchedStudio] = useState(null);
    const [titleInput, setTitleInput] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [bigAddress, setBigAddress] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [detailedAddressInput, setDetailedAddressInput] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [fetchedAddresses, setFetchedAddresses] = useState(null);
    const [categoryInput, setCategoryInput] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [telInput, setTelInput] = useState('');
    const [isValidAddress, setIsValidAddress] = useState(false);

    useEffect(() => {
        setStudioId(match.params.id);
    }, [match])

    const fetchStudio = useCallback(async (studioId) => {
        if (studioId) {
            const response = await fetch(`http://localhost:3001/partners/studios/${studioId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const resData = await response.json();
            if (resData.error === "not signed in") {
                dispatch(authActions.logout());
            } else {

                setFetchedStudio(new Studio(
                    resData._id,
                    resData.title,
                    resData.imageUrl,
                    resData.address,
                    [...resData.category],
                    { ...resData.details },
                    [...resData.followers],
                    { ...resData.coordinates }
                ));
            }
        }
    }, [dispatch])

    useEffect(() => {
        fetchStudio(studioId)
    }, [studioId, fetchStudio])

    useEffect(() => {
        if (fetchedStudio) {
            setTitleInput(fetchedStudio.title)
            setImageUrlInput(fetchedStudio.imageUrl)
            setCategoryList(fetchedStudio.category)
            setTelInput(fetchedStudio.details.tel)
        }
    }, [fetchedStudio])


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

    const searchAddress = address => {
        map(address);
    }

    const map = useCallback(async (address) => {
        const response = await fetch(`http://localhost:3001/map/${address}`, {
            credentials: 'include'
        })
        const data = await response.json();
        setIsValidAddress(true);
        setFetchedAddresses(data);
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        let addressObj = null;
        if (isValidAddress) {
            addressObj = {
                bigAddress: bigAddress,
                address: addressInput + " " + detailedAddressInput,
                coordinates: { latitude: coordinates[1], longitude: coordinates[0] }
            }
        }

        const response = await fetch(`http://localhost:3001/partners/studios/${studioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                title: titleInput,
                imageUrl: imageUrlInput,
                // bigAddress: bigAddress,
                // address: addressInput + " " + detailedAddressInput,
                category: categoryList,
                // coordinates: { latitude: coordinates[1], longitude: coordinates[0] },
                details: { tel: telInput },
                ...addressObj
                // postedBy: userEmail
            })
        });
        const resData = await response.json();
        if (resData.error === "not signed in") {
            dispatch(authActions.logout());
        } else {
            history.push(`/my-studios/${studioId}`)
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
            setCoordinatesHandler(addressObj.x, addressObj.y);
            setAddressInput(addressObj.roadAddress);
            setBigAddress(addressObj.addressElements[0].shortName + " " + addressObj.addressElements[1].shortName + " " + addressObj.addressElements[2].shortName)
        }}>{addressObj.roadAddress}</p>)
    }

    let renderData = null;
    if (fetchedStudio) {
        renderData = (
            <>
                <div>title: {fetchedStudio.title} </div>
                <img src={fetchedStudio.imageUrl} alt="" />
                <div>address: {fetchedStudio.address}</div>
                <div>tel: {fetchedStudio.details.tel}</div>
                <div>{fetchedStudio.category.map(cat => <p key={cat}>{cat}</p>)}</div>
            </>
        )
    }
    return (
        <>
            {renderData}
            <form onSubmit={onSubmit}>
                <label>title</label>
                <input type="text" required value={titleInput} name="title" onChange={onChange} placeholder="Title" />
                <label>imageUrl</label>
                <input type="text" required value={imageUrlInput} name="imageUrl" onChange={onChange} placeholder="Image Url" />
                <label>address</label>
                <input type="text" value={addressInput} name="address" onChange={onChange} placeholder="Address" />
                <input type="button" value="Search Address" onClick={() => searchAddress(addressInput)} />
                {coordinates && (<><label>Detailed Address</label>
                    <input type="text" required value={detailedAddressInput} name="detailedAddress" onChange={onChange} placeholder="Detailed Address" /></>)}
                <label>category</label>
                <input type="text" value={categoryInput} name="category" onChange={onChange} placeholder="Categories" />
                <input type="button" value="Add Category" onClick={addCategory} />
                <label>tel</label>
                <input type="text" required value={telInput} name="tel" onChange={onChange} placeholder="Tel" />
                <input type='submit' value="Save" />
            </form>
            {category}
            {addressData}
            {coordinates ? <p>Static Map</p> : null}
            {coordinates ? <img src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${coordinates[0]},${coordinates[1]}&level=16&X-NCP-APIGW-API-KEY-ID=httryobi1m`} alt='#' /> : null}
        </>
    )
}

export default EditStudio;