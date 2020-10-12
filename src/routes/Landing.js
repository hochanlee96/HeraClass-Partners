import React from 'react';
import { Link } from 'react-router-dom';

const Landing = props => {
    return (
        <>
            <div>
                Landing Page
        </div>
            <Link to="/auth">Become a Partner</Link>
        </>
    )
}

export default Landing;