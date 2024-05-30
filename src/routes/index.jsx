import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";

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
        element: <Dashboard />
    },
];

export default routes;