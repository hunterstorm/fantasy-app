import { useRoutes } from "react-router-dom";
import { MainLayout } from './layouts';
import { Dashboard, PlayerView } from "./pages";

const Routes = () => {
    const links = [
        {path:'/', element: <Dashboard />},
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