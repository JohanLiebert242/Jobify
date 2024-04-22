//Libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Element
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AddJob,
    Stats,
    AllJobs,
    Profile,
    EditJob,
    Admin,
} from "./pages";

//Actions & Loaders
import {action as RegisterAction} from './pages/Register';
import {action as LoginAction} from './pages/Login';
import {action as AddJobAction} from './pages/AddJob';
import {action as EditJobAction} from './pages/EditJob';
import {action as DeleteJobAction} from './pages/DeleteJob';
import {action as ProfileAction} from './pages/Profile';


import {loader as EditJobLoader} from './pages/EditJob';

import {loader as DashBoardLoader} from './pages/DashboardLayout';
import {loader as AllJobsLoader} from './pages/AllJobs';
import {loader as AdminLoader} from './pages/Admin';
import {loader as StatsLoader} from './pages/Stats';

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('theme') === 'true';
    document.body.classList.toggle('dark-theme');
    return isDarkTheme;
}

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
              index: true,
              element: <Landing />
            },
            {
                path: "/register",
                element: <Register />,
                action: RegisterAction
            },
            {
                path: "/login",
                element: <Login />,
                action: LoginAction
            },
            {
                path: "/dashboard",
                element: <DashboardLayout isDarkThemeEnabled = {isDarkThemeEnabled} />,
                loader: DashBoardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: AddJobAction
                    },
                    {
                        path: "stats",
                        element: <Stats />,
                        loader: StatsLoader
                    },
                    {
                        path: "all-jobs",
                        element: <AllJobs />,
                        loader: AllJobsLoader
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                        action: ProfileAction
                    },
                    {
                        path: "admin",
                        element: <Admin />,
                        loader: AdminLoader,
                    },
                    {
                        path: "edit-job/:id",
                        element: <EditJob />,
                        loader: EditJobLoader,
                        action: EditJobAction,
                    },
                    {
                        path: "delete-job/:id",
                        action: DeleteJobAction,
                    },
                ]
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router}></RouterProvider>;
}

export default App;
