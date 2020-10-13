import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom'

import { dbService } from '../fbase';

const ClassDetail = ({ userObj }) => {

    const [classId, setClassId] = useState('');
    const [fetchedClass, setFetchedClass] = useState(null);
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setClassId(match.params.id);
    }, [match])

    const fetchClass = useCallback(async (classId) => {
        if (classId) {
            const data = await dbService.collection('classes').doc(`${classId}`).get();
            setFetchedClass(data.data());
        }
    }, [])

    useEffect(() => {
        fetchClass(classId)
    }, [classId, fetchClass])

    const toEditClass = () => {
        history.push(`/my-class/${classId}/edit`);
    }

    const deleteClass = async () => {
        if (classId) {
            await dbService.collection('classes').doc(`${classId}`).delete();
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
            <button onClick={toEditClass}>Edit</button>
            <button onClick={deleteClass}>Delete</button>
            {renderData}
        </>
    )
}

export default ClassDetail;