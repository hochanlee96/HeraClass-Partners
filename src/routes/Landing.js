import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <>
            <div>
                Landing Page
        </div>
            <div>
                <Link to="/sign-up">Become a Partner</Link>
            </div>
            <div>
                <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Landing;