import { useRoutes } from "react-router-dom";
import { MainLayout } from './layouts';
import { Dashboard, PlayersView, PlayerView } from "./pages";

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
        }
    ])
}

export default Routes