import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as authActions from '../store/actions/auth';
import Studio from '../models/studio';

const MyStudios = () => {

    const [fetchedStudios, setFetchedStudios] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const fetchMyStudios = useCallback(async () => {
        try {

            //서버이용해서 fetch class
            const response = await fetch('http://localhost:3001/partners/studios/my-studios', {
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
            }
            else {
                const studioArray = [];
                resData.forEach(studio => {
                    const studioData = new Studio(
                        studio._id,
                        studio.title,
                        studio.imageUrl,
                        studio.address,
                        studio.category,
                        studio.details,
                        studio.followers,
                        { ...studio.coordinates }
                    );
                    studioArray.push(studioData);
                })
                setFetchedStudios(studioArray)
            }

        } catch (error) {
            throw error;
        }
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true);
        fetchMyStudios().then(() => {
            setIsLoading(false);
        });
    }, [fetchMyStudios])

    const forwardToStudioDetail = studioId => {
        history.push(`/my-studios/${studioId}`);
    }
    let studioRoutes = null;
    if (fetchedStudios[0]) {
        studioRoutes = fetchedStudios.map(studio => (
            < p key={studio.id} onClick={() => forwardToStudioDetail(studio.id)}> {studio.title}</p >
        ))
    }
    return (
        <>
            <div>
                My Studios
        </div>
            <Link to="/">Home</Link>
            <Link to='/my-studios/new'>Add New Studio</Link>
            {isLoading ? "Loading..." : studioRoutes}
        </>
    )
}

export default MyStudios;