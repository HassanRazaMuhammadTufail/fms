import * as React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from "react-router-dom";
import Registration from "./containers/VehicleRegistration/Index";
import Maintenance from "./containers/Maintenance";
import Analytics from "./containers/Analytics";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Registration />,
	},
	{
		path: "/maintenance",
		element: <Maintenance />,
	},
	{
		path: "/analytics",
		element: <Analytics />,
	},
]);
