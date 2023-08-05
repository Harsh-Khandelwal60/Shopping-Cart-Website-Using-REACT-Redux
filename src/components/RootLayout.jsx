import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavbarPanel";
import store from "../Store/store";
import { Provider } from "react-redux";


const RootLayout = () => {
    return (
        <>
        <Provider store={store}>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </Provider>
        </>
    )
}

export default RootLayout;