import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { authPageRoute } from "./auth.route";
import { dashboardPageRoute } from "./dashboard.route";

export const rootRoute = createRootRoute({
    component: App
})

const authRoute = authPageRoute(rootRoute)
const dashboardRoute = dashboardPageRoute(rootRoute)

export const routeTree = rootRoute.addChildren([ authRoute , dashboardRoute])
