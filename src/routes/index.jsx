import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import Main from "../pages/Main";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

const routes = [
    {
        path: '/',
        element: <Login />,
        errorElement: <NotFoundPage />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Main />
            },
            {
                path: "users/:id",
                element: <Users />
            },
            {
                path: "reports",
                element: <Reports />
            },
            {
                path: "settings",
                element: <Settings />
            },
        ]
    },
];

export default routes;