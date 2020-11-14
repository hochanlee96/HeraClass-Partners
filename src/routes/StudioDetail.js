import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import * as authActions from '../store/actions/auth';
import Studio from '../models/studio';


const StudioDetail = () => {

    const dispatch = useDispatch();

    const [studioId, setStudioId] = useState('');
    const [fetchedStudio, setFetchedStudio] = useState(null);
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setStudioId(match.params.id);
    }, [match])

    const fetchStudio = useCallback(async studioId => {
        try {

            //서버이용해서 fetch class
            const response = await fetch(`http://localhost:3001/partners/studios/${studioId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            if (resData.error === "not signed in") {
                dispatch(authActions.logout());
            } else {

                const studioData = new Studio(
                    resData._id,
                    resData.title,
                    resData.imageUrl,
                    resData.address,
                    [...resData.category],
                    { ...resData.details },
                    [...resData.followers],
                    { ...resData.coordinates }
                );
                setFetchedStudio(studioData)
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch])

    useEffect(() => {
        if (studioId !== '') {
            fetchStudio(studioId)
        }
    }, [studioId, fetchStudio])

    const toEditStudio = () => {
        history.push(`/my-studios/${studioId}/edit`);
    }

    const deleteStudio = async () => {
        if (studioId) {
            const response = await fetch(`http://localhost:3001/partners/studios/${studioId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (response.status !== 200) {
                console.log('not successful');
            }
            const resData = await response.json();
            if (resData.error === "not signed in") {
                dispatch(authActions.logout());
            }
            else {
                history.push('/my-studios');
            }
        }
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
            <Link to={'/my-studios'}>My Studios</Link>
            <button onClick={toEditStudio}>Edit</button>
            <button onClick={deleteStudio}>Delete</button>
            {renderData}
        </>
    )
}

export default StudioDetail;