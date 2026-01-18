import { createRoute } from "@tanstack/react-router";
import DashBoard from "../pages/DashBoard";
import { checkAuth } from "../helper";
import LiveBrainPage from "../pages/LiveBrainPage";

export const dashboardPageRoute = (rootRoute: any) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard',
    component : DashBoard,
    beforeLoad : checkAuth 
})

export const liveBrainPageRoute = (rootRoute: any) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/brain/$shareLink',
    component : LiveBrainPage,
})