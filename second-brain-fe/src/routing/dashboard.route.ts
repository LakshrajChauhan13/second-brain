import { createRoute } from "@tanstack/react-router";
import DashBoard from "../pages/DashBoard";
import { checkAuth } from "../helper";

export const dashboardPageRoute = (rootRoute: any) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard',
    component : DashBoard,
    beforeLoad : checkAuth 
})
