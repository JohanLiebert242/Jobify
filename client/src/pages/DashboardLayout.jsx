//Libraries
import { Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {createContext, useState, useContext} from 'react';

//Wrapper
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, SmallSidebar, Navbar } from "../components";

//Utils
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//Loader

export const loader = async() => {
    try {
        const {data} = await customFetch.get('/users/current-user');
        return data;
    } catch (error) {
        console.log(error);
        return redirect('/');
    } 
}

const DashboardContext = createContext();
function DashboardLayout({isDarkThemeEnabled}) {
    const navigate = useNavigate();
    // const data = useLoaderData();
    // console.log(data);
    const {user} = useLoaderData();
    
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('theme', newDarkTheme);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const logoutUser =  async() => {
        navigate('/');
        await customFetch.get('/auth/logout');
        toast.success("Log out...");
    }

    return (
    <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet context={{user}}/>
                    </div>
                </div>
            </main>
        </Wrapper>
    </DashboardContext.Provider>
    );
}

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout ;