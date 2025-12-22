import { createRoute } from "@tanstack/react-router";
import DashBoard from "../pages/DashBoard";
import { getCurrentUser } from "../api/auth.api";

export const dashboardPageRoute = (rootRoute: any) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard',
    component : DashBoard,
    beforeLoad : getCurrentUser
})
