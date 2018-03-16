import React, { Component } from 'react';
import {
    hashRouter,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import history from "../../History";
import "./DefaultLayout.css";


const DefaultLayout = ({ component: Component, ...rest}) => {
    
    function logout() {
        // UserStore.signOut();
    }

    return (
        // call some method/function that will validate if user is logged in
        
        <Route {...rest} render={matchProps => (
            // UserStore.isLogin ? (
                <div className="App">
                    <div className="AppHeader">

                    </div>

                    <div className="AppNav">
                        
                    </div>

                    <div className="AppContent">
                        <Component {...matchProps} />
                    </div>

                    <div className="AppFooter">
                    {/* Copyright W3School.com.cn */}
                    </div>
                </div>
                // <div className='LayoutRoot'>
                //     <div  className="LayoutSider">
                //         <Slider 
                //         className='LayoutSider-a' 
                //         />
                //     </div>
                //     <div className="LayoutRight">
                //         <div className="LayoutHeader">
                //             <Header user={UserStore.userModel} logout={logout} switchSider={switchSider}/>
                //         </div>
                //         {/* <div className="LayoutBreadcrumb">
                //             <Breadcrumbs />
                //         </div> */}
                //         <div className="LayoutContent">
                //             <Component {...matchProps} />
                //         </div>
                //     </div>
                // </div>
            //   ) : (
            //     <Redirect to={{
            //       pathname: '/login',
            //       state: { from: matchProps.location }
            //     }}/>
            //   )
        )} />
    )
};
export default DefaultLayout;