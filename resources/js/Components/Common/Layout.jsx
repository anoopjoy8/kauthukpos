import React, { useState, useEffect } from 'react'
import Sidebar from '../Common/Sidebar';
import Header from '../Common/Header';
import LoginOutlet from '../../Outlets/LoginOutlet';
import PageHeader from './PageHeader';
function Layout() {
    const [ mobileMenuView, setMobileMenuView] = useState(false);
        const handleDataFromChild = (data) => {
        setMobileMenuView(mobileMenuView ? false : true);
    };
    return (
        <>
            <div className="container-scroller">
                <Sidebar mobileMenuView={mobileMenuView}/>
                <div className="container-fluid page-body-wrapper">
                    <Header onDataFromChild={handleDataFromChild}/>
                    <div className='main-panel'>
                        <div className='content-wrapper pb-0'>
                            <PageHeader/>
                            <div class="col-lg-12 grid-margin stretch-card">
                                <LoginOutlet/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default Layout
