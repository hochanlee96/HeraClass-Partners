import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import * as authActions from '../store/actions/auth';
import Class from '../models/class';


const ClassDetail = () => {

    const dispatch = useDispatch();

    const [classId, setClassId] = useState('');
    const [fetchedClass, setFetchedClass] = useState(null);
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setClassId(match.params.id);
    }, [match])

    const fetchClass = useCallback(async classId => {
        try {

            //서버이용해서 fetch class
            const response = await fetch(`http://localhost:3001/partners/classes/${classId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            console.log('resdata', resData)
            if (resData.error === "not signed in") {
                dispatch(authActions.logout());
            } else {

                const classData = new Class(
                    resData._id,
                    resData.title,
                    resData.imageUrl,
                    resData.address,
                    [...resData.category],
                    { ...resData.details },
                    [...resData.followers],
                    { ...resData.coordinates }
                );
                setFetchedClass(classData)
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch])

    useEffect(() => {
        if (classId !== '') {
            fetchClass(classId)
        }
    }, [classId, fetchClass])

    const toEditClass = () => {
        history.push(`/my-class/${classId}/edit`);
    }

    const deleteClass = async () => {
        if (classId) {
            const response = await fetch(`http://localhost:3001/partners/classes/${classId}`, {
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
        }
        history.push('/my-class');
    }

    let renderData = null;
    if (fetchedClass) {
        renderData = (
            <>
                <div>title: {fetchedClass.title} </div>
                <img src={fetchedClass.imageUrl} alt="" />
                <div>address: {fetchedClass.address}</div>
                <div>tel: {fetchedClass.details.tel}</div>
                <div>{fetchedClass.category.map(cat => <p key={cat}>{cat}</p>)}</div>
            </>
        )
    }

    return (
        <>
            <Link to={'/my-class'}>My Class</Link>
            <button onClick={toEditClass}>Edit</button>
            <button onClick={deleteClass}>Delete</button>
            {renderData}
        </>
    )
}

export default ClassDetail;