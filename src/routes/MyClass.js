import React from 'react';
import { Link } from 'react-router-dom';

const MyClass = props => {
    return (
        <>
            <div>
                My Classes Page
        </div>
            <Link to="/">Home</Link>
            <Link to='/my-class/new'>Add New Class</Link>
        </>
    )
}

export default MyClass;