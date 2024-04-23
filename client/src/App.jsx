//Libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as AddJobAction } from "./pages/AddJob";
import { action as EditJobAction } from "./pages/EditJob";
import { action as DeleteJobAction } from "./pages/DeleteJob";
import { action as ProfileAction } from "./pages/Profile";
import { loader as EditJobLoader } from "./pages/EditJob";
import { loader as DashBoardLoader } from "./pages/DashboardLayout";
import { loader as AllJobsLoader } from "./pages/AllJobs";
import { loader as AdminLoader } from "./pages/Admin";
import { loader as StatsLoader } from "./pages/Stats";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorElement } from "./components";

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem("theme") === "true";
    document.body.classList.toggle("dark-theme", isDarkTheme);
    return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/register",
                element: <Register />,
                action: RegisterAction,
            },
            {
                path: "/login",
                element: <Login />,
                action: LoginAction(queryClient)
            },
            {
                path: "/dashboard",
                element: (
                    <DashboardLayout
                        isDarkThemeEnabled={isDarkThemeEnabled}
                        queryClient={queryClient}
                    />
                ),
                loader: DashBoardLoader(queryClient),
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: AddJobAction(queryClient)
                    },
                    {
                        path: "stats",
                        element: <Stats />,
                        loader: StatsLoader(queryClient),
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: "all-jobs",
                        element: <AllJobs />,
                        loader: AllJobsLoader(queryClient),
                        errorElement: <ErrorElement />
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                        action: ProfileAction(queryClient)
                    },
                    {
                        path: "admin",
                        element: <Admin />,
                        loader: AdminLoader,
                    },
                    {
                        path: "edit-job/:id",
                        element: <EditJob />,
                        loader: EditJobLoader(queryClient),
                        action: EditJobAction(queryClient)
                    },
                    {
                        path: "delete-job/:id",
                        action: DeleteJobAction(queryClient)
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>;
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
