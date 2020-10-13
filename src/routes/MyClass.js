import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { dbService } from '../fbase';

const MyClass = ({ userObj }) => {

    const [fetchedClasses, setFetchedClasses] = useState([]);

    const history = useHistory();

    const myClass = useCallback(async () => {
        const classArray = []
        const data = await dbService.collection('classes').where("postedBy", "==", userObj.uid).get();
        data.forEach(cl => {
            classArray.push({ classId: cl.id, ...cl.data() })
        });
        setFetchedClasses(classArray);
    }, [userObj.uid])

    useEffect(() => {
        myClass()
    }, [myClass]);

    const forwardToClassDetail = classId => {
        history.push(`/my-class/${classId}`);
    }

    let classRoutes = null;
    if (fetchedClasses) {
        classRoutes = fetchedClasses.map(cl => (
            <p key={cl.classId} onClick={() => forwardToClassDetail(cl.classId)}>{cl.title}</p>
        ))
    }
    return (
        <>
            <div>
                My Classes Page
        </div>
            <Link to="/">Home</Link>
            <Link to='/my-class/new'>Add New Class</Link>
            {classRoutes}
        </>
    )
}

export default MyClass;