import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
	const [value, setValue] = React.useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	React.useEffect(() => {
		if(location.pathname === "/analytics") {
			setValue(2);
		} else if (location.pathname === "/maintenance") {
			setValue(1);
		}
	}, []);
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		switch (newValue) {
		case 0:
			navigate("/");
			break;
		case 1:
			navigate("/maintenance");
			break;
		case 2:
			navigate("/analytics");
			break;
		default:
			break;
		}
	};

	return (
		<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
			<Tabs value={value} onChange={handleChange} variant="fullWidth">
				<Tab label="Registration" />
				<Tab label="Maintenance" />
				<Tab label="Analytics" />
			</Tabs>
		</Box>
	);
}
