import { useRoutes } from "react-router-dom";
import { MainLayout } from './layouts';
import { Dashboard } from "./pages";

const Routes = () => {
    const links = [
        {path:'/', element: <Dashboard />}
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