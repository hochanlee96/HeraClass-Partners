import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
    return (
        <>
            <div>
                Home Page
        </div>
            <Link to='/my-class'>My Class</Link>
            <Link to='/my-class/new'>Add New Class</Link>
        </>
    )
}

export default Home;