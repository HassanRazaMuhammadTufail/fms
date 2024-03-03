import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
// import AutoHeightGrid from "../../components/Table";
import DataTable from "../../components/Table";
import { useGetMaintenance } from "../../queries/maintenance";
import { useGetVehicle } from "../../queries/vehicle";

function Analytics() {
	const { data: vehicleData } = useGetVehicle();
	const { data: maintenanceData } = useGetMaintenance();
	const [vehicleRows, setVehicleRows] = React.useState([]);
	const [maintenanceRows, setMaintenanceRows] = React.useState([]);
	const vehicleColumns = [
		{field: "name", headerName: "Name", width: 175 },
		{field: "license", headerName: "License", width: 175 },
		{field: "company", headerName: "Company", width: 175 },
		{field: "ownerId", headerName: "Owner" , width: 175},
		{field: "type", headerName: "Type" , width: 175},
		{field: "vehicleModel", headerName: "Model", width: 175 },
		{field: "status", headerName: "Status", width: 175 },
	];
	const maintenanceColumns = [
		// {field: "name", headerName: "Name", width: 175 },
		{field: "license", headerName: "License", width: 275 },
		{field: "type", headerName: "Type" , width: 275},
		{field: "company", headerName: "Maintenance Comp.", width: 275 },
		{field: "cost", headerName: "Cost" , width: 275},
		{field: "mileage", headerName: "Mileage", width: 275 },
		// {field: "status", headerName: "Status", width: 175 },
	];
	React.useEffect(() => {
		if (vehicleData) {
			console.log(vehicleData);
			setVehicleRows(vehicleData.map((e: {[key: string]: string})=>{return {...e,id: e._id};}));
		}
	}, []);
	React.useEffect(() => {
		if (maintenanceData) {
			console.log(maintenanceData);
			setMaintenanceRows(maintenanceData.map((e: {[key: string]: any})=>{
				return {
					...e,
					id: e._id,
					license: e.vehicle.license,
				};
			}));
		}
	}, []);
	return (
		<Box width="100%" display="flex" flexDirection="column" alignItems="center">
			<Typography variant="h3" padding="5px">
        Analytics
			</Typography>
			<Box
				width="80%"
				sx={{
					// background: "skyblue",
					padding: "10px",
				}}
			>
				<Typography variant="h4">Vehicle</Typography>
				<Box width="100%" padding="10px 2%">
					<TextField
						label="License no."
						size="small"
						placeholder="E.g. ABC-100"
						sx={{
							width: "70%",
							// height: '20px'
						}}
					/>
					<Button
						variant="outlined"
						sx={{
							margin: "0 10px",
							padding: "6px 0",
							width: "25%",
						}}
					>
            Search
					</Button>
				</Box>
				<Box width="100%" padding="10px 2%">
					<DataTable columns={vehicleColumns} rows={vehicleRows} />
				</Box>
			</Box>
			<Box
				width="80%"
				sx={{
					// background: "skyblue",
					padding: "10px",
				}}
			>
				<Typography variant="h4">Maintenance</Typography>
				<Box width="100%" padding="10px 2%">
					<TextField
						label="License no."
						size="small"
						placeholder="E.g. ABC-100"
						sx={{
							width: "70%",
							// height: '20px'
						}}
					/>
					<Button
						variant="outlined"
						sx={{
							margin: "0 10px",
							padding: "6px 0",
							width: "25%",
						}}
					>
            Search
					</Button>
				</Box>
				<Box width="100%" padding="10px 2%">
					<DataTable columns={maintenanceColumns} rows={maintenanceRows} />
				</Box>
			</Box>
		</Box>
	);
}

export default Analytics;
