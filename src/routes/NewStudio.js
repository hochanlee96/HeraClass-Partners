import React from 'react';
import { Link } from 'react-router-dom';

import NewStudioForm from '../components/NewStudioForm';

const NewStudio = ({ userEmail }) => {
    return (
        <>
            <div>
                Add New Studio
            </div>
            <Link to="/">Home</Link>
            <NewStudioForm userEmail={userEmail} />
        </>
    )
}

export default NewStudio;