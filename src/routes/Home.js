import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>
                Home Page
        </div>
            <Link to='/my-studios'>My Studios</Link>

        </>
    )
}

export default Home;