import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { dbService } from '../fbase';

const NewClassForm = ({ userObj }) => {
    const history = useHistory();

    const [titleInput, setTitleInput] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [detailedAddressInput, setDetailedAddressInput] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [fetchedAddresses, setFetchedAddresses] = useState(null);
    const [categoryInput, setCategoryInput] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [telInput, setTelInput] = useState('');

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
        const response = await
            fetch(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}&X-NCP-APIGW-API-KEY-ID=httryobi1m&X-NCP-APIGW-API-KEY=NuuaE4v1PftZnYOqx5sEcwyFMIZpQXzfJ5WdCCfG&Accept=application/json`, {
                method: 'GET',
            })
        const data = await response.json();
        setFetchedAddresses(data.addresses);
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("classes").add({
            title: titleInput,
            imageUrl: imageUrlInput,
            address: addressInput + " " + detailedAddressInput,
            category: categoryList,
            coordinates: { latitude: coordinates[1], longitude: coordinates[0] },
            details: { tel: telInput },
            followers: [],
            postedBy: userObj.uid
        });
        history.push('/my-class')
    }
    console.log(userObj.uid)
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

export default NewClassForm;