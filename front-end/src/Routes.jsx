import { useRoutes } from "react-router-dom";
import { MainLayout, AuthLayout } from './layouts';
import { Dashboard, PlayersView, PlayerView, Login } from "./pages";

const Routes = () => {
    const links = [
        {path:'/', element: <Dashboard />},
        {path:'/players', element: <PlayersView />},
        {path:'/players/:position?/:id?', element: <PlayerView />}
    ]

    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: links
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path:"/login",
                    element: <Login />
                }
            ]
        }
    ])
}

export default Routes