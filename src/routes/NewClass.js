import React from 'react';
import { Link } from 'react-router-dom';

import NewClassForm from '../components/NewClassForm';

const NewClass = ({ userObj }) => {
    return (
        <>
            <div>
                Add New Class
            </div>
            <Link to="/">Home</Link>
            <NewClassForm userObj={userObj} />
        </>
    )
}

export default NewClass;