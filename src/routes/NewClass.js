import React from 'react';
import { Link } from 'react-router-dom';

import NewClassForm from '../components/NewClassForm';

const NewClass = ({ userEmail }) => {
    return (
        <>
            <div>
                Add New Class
            </div>
            <Link to="/">Home</Link>
            <NewClassForm userEmail={userEmail} />
        </>
    )
}

export default NewClass;