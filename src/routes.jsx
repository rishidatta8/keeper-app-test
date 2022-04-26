import { Navigate, Outlet } from 'react-router-dom';
import App from "./App";

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <App /> : <Navigate to="/login" />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/account', element: <Account /> },
            { path: '/', element: <Navigate to="/app/dashboard" /> },
            {
                path: 'member',
                element: <Outlet />,
                children: [
                    { path: '/', element: <MemberGrid /> },
                    { path: '/add', element: <AddMember /> },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
        children: [
            { path: 'login', element: <Login /> },
            { path: '/', element: <Navigate to="/login" /> },
        ],
    },
];

export default routes;