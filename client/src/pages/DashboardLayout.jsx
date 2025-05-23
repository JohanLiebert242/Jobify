//Libraries
import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import { createContext, useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//Wrapper
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";

//Utils
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//Loader

const userQuery = {
    queryKey: ["user"],
    queryFn: async () => {
        const { data } = await customFetch("/users/current-user");
        return data;
    },
};

export const loader = (queryClient) => async () => {
    try {
        return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
        return redirect("/");
    }
};

const DashboardContext = createContext();
function DashboardLayout({ isDarkThemeEnabled, queryClient }) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isPageLoading = navigation.state === "loading";
    // const data = useLoaderData();
    // console.log(data);
    const { user } = useQuery(userQuery)?.data;
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
    const [isAuthError, setIsAuthError] = useState(false);

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle("dark-theme", newDarkTheme);
        localStorage.setItem("theme", newDarkTheme);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        navigate("/");
        await customFetch.get("/auth/logout");
        queryClient.invalidateQueries();
        toast.success("Log out...");
    };

    customFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error?.response?.status === 401) {
                setIsAuthError(true);
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        if (!isAuthError) return;
        logoutUser();
    }, [isAuthError]);

    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            {isPageLoading ? (
                                <Loading />
                            ) : (
                                <Outlet context={{ user }} />
                            )}
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
}

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
