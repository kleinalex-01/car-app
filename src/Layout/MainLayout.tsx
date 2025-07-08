import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const MainLayout: React.FC = () => {
    return (
        <>
        <div className="container-fluid main-container">

            <div className='row'>
                <NavBar />
            </div>

            <div className='row'>
                <Outlet />
            </div>

            <div className='row'>
            <Footer />
            </div>

        </div>
        </>
    )
}