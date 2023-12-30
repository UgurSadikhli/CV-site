import React from 'react';
import "./app.css";
import {Link, NavLink} from "react-router-dom";

const App = () => {
    return (
        <>
            <div className="aui-global-container">
                <div className="aui-gc-header-container">
                    <div className="aui-gc-hc-left">
                        <img src="/assets/img/avaz-min-logo.png" alt="logo"/>
                    </div>
                    <div className="aui-gc-hc-center">
                        <h1>Avaz CV module</h1>
                    </div>
                    <div className="aui-gc-hc-right">
                        <img src="/assets/img/user-icon.png" alt="user-icon"/>
                    </div>
                </div>
                <div className="aui-gc-body-container">
                    <div className="aui-gc-bc-left">
                        <div className="sidebar-header">
                            <div>
                                Menu
                            </div>
                            <div>
                                <i className="pi pi-bars"></i>
                            </div>
                        </div>
                        <aside className="sidebar-body">
                            <NavLink to="/">Dashboard</NavLink>
                            <NavLink to="/">Item1</NavLink>
                            <NavLink to="/">Item2</NavLink>
                            <NavLink to="/">Item3</NavLink>
                        </aside>
                        <div className="sidebar-footer">
                        </div>
                    </div>
                    <div className="aui-gc-bc-right">
                        <div>Dashboard</div>
                    </div>
                </div>
                <div className="aui-gc-footer-container">
                    <div>Copyright</div>
                </div>
            </div>
        </>
    );
};

export {App};