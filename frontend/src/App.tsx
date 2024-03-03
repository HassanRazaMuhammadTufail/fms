import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Registration from "./containers/VehicleRegistration/Index";
import Maintenance from "./containers/Maintenance";
import Analytics from "./containers/Analytics";

function App() {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter basename="/">
				<Navbar />
				<Routes>
					<Route path="/" element={<Registration />} />
					<Route path="/maintenance" element={<Maintenance />} />
					<Route path="/analytics" element={<Analytics />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
