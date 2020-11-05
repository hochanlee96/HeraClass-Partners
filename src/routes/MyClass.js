import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as authActions from '../store/actions/auth';
import Class from '../models/class';

const MyClass = () => {

    const [fetchedClasses, setFetchedClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const fetchMyClasses = useCallback(async classId => {
        try {

            //서버이용해서 fetch class
            const response = await fetch('http://localhost:3001/partners/classes/my-classes', {
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
                const classArray = [];
                resData.forEach(cl => {
                    const classData = new Class(
                        cl._id,
                        cl.title,
                        cl.imageUrl,
                        cl.address,
                        cl.category,
                        cl.details,
                        cl.followers,
                        { ...resData.coordinates }
                    );
                    classArray.push(classData);
                })
                setFetchedClasses(classArray)
            }

        } catch (error) {
            throw error;
        }
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true);
        fetchMyClasses().then(() => {
            setIsLoading(false);
        });
    }, [fetchMyClasses])

    const forwardToClassDetail = classId => {
        history.push(`/my-class/${classId}`);
    }
    console.log('fet', fetchedClasses)
    let classRoutes = null;
    if (fetchedClasses[0]) {
        classRoutes = fetchedClasses.map(cl => (
            < p key={cl.id} onClick={() => forwardToClassDetail(cl.id)}> {cl.title}</p >
        ))
    }
    return (
        <>
            <div>
                My Classes Page
        </div>
            <Link to="/">Home</Link>
            <Link to='/my-class/new'>Add New Class</Link>
            {isLoading ? "Loading..." : classRoutes}
        </>
    )
}

export default MyClass;