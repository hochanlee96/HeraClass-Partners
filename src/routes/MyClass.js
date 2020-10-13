import React from 'react';
import { Link } from 'react-router-dom';

const MyClass = props => {
    return (
        <>
            <div>
                My Classes Page
        </div>
            <Link to="/">Home</Link>
        </>
    )
}

export default MyClass;