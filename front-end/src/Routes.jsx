import { useRoutes } from "react-router-dom";
import { MainLayout, AuthLayout } from './layouts';
import { Dashboard, PlayersView, PlayerView, TeamsView, TeamView, Login } from "./pages";

const Routes = () => {
    const links = [
        {path:'/', element: <Dashboard />},
        {path:'/players', element: <PlayersView />},
        {path:'/players/:position?/:id?', element: <PlayerView />},
        {path:'/teams', element: <TeamsView />},
        {path:'/teams/:team', element: <TeamView />}
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