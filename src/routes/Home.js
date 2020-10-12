import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
    return (
        <>
            <div>
                Home Page
        </div>
            <Link to='/my-gym'>My Gym</Link>
        </>
    )
}

export default Home;