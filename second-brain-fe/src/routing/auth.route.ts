
import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/AuthPage";

export const authPageRoute = (rootRoute: any) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/auth',
    component : AuthPage
})

