import React from "react";
import { Box, TextField, Typography, Button, Stack, Alert } from "@mui/material";
import DataTable from "../../components/Table";
import { useGetVehicle } from "../../queries/vehicle";
import { useGetAnalyticsByLicense } from "../../queries/analytics";
import { GridRowParams } from "@mui/x-data-grid";

function Analytics() {
	const { data: vehicleData } = useGetVehicle();
	const getMaintenanceByLicense = useGetAnalyticsByLicense();
	const [vehicleRows, setVehicleRows] = React.useState([]);
	const [maintenanceRows, setMaintenanceRows] = React.useState([]);
	const [license, setLicense] = React.useState("");
	const [totalDistance, setTotalDistance] = React.useState("");
	const [totalDuration, setTotatDuration] = React.useState("");
	const [averageVelocity, setAverageVelocity]= React.useState("");
	const vehicleColumns = [
		{field: "name", headerName: "Name", width: 175, headerAlign: "center", cellClassName:"table-cell" },
		{field: "license", headerName: "License", width: 175, headerAlign: "center", cellClassName:"table-cell" },
		{field: "company", headerName: "Company", width: 175, headerAlign: "center", cellClassName:"table-cell" },
		{field: "ownerId", headerName: "Owner" , width: 175, headerAlign: "center", cellClassName:"table-cell"},
		{field: "type", headerName: "Type" , width: 175, headerAlign: "center", cellClassName:"table-cell"},
		{field: "vehicleModel", headerName: "Model", width: 175, headerAlign: "center", cellClassName:"table-cell" },
		{field: "status", headerName: "Status", width: 175, headerAlign: "center", cellClassName:"table-cell" },
	];
	const maintenanceColumns = [
		{field: "license", headerName: "License", width: 200, headerAlign: "center", cellClassName:"table-cell" },
		{field: "type", headerName: "Type" , width: 200, headerAlign: "center", cellClassName:"table-cell"},
		{field: "company", headerName: "Maintenance Comp.", width: 200, headerAlign: "center", cellClassName:"table-cell" },
		{field: "cost", headerName: "Cost" , width: 200, headerAlign: "center", cellClassName:"table-cell"},
		{field: "mileage", headerName: "Mileage", width: 200, headerAlign: "center", cellClassName:"table-cell" },
		{field: "description", headerName: "Description", width: 200, headerAlign: "center", cellClassName:"table-cell" },
	];
	React.useEffect(() => {
		if (vehicleData) {
			setVehicleRows(vehicleData.map((e: {[key: string]: string})=>{return {...e,id: e._id};}));
		}
	}, [vehicleData]);

	const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setLicense(e.target.value);
	};

	const handleSubmit = () => {
		if(!license) {
			setAlertMsg("License cannot be empty");
			return;
		}
		getMaintenanceByLicense.mutateAsync({license}).then(d=>{
			setMaintenanceRows(d.maintenanceLogs.map((e: {[key: string]: any})=>{
				return {
					...e,
					id: e._id,
					license,
				};
			}));
			setTotalDistance(d.totalDistance);
			setTotatDuration(d.totalTime);
			setAverageVelocity(d.averageVelocity);
		}
		).catch((error) => {
			console.error(error);
			setAlertMsg(error.message || "something went wrong.");
		});
	};

	const handleRowClick = (e: GridRowParams<any>) => {
		getMaintenanceByLicense.mutateAsync({license: e.row.license}).then(d=>{
			setMaintenanceRows(d?.maintenanceLogs?.map((elem: {[key: string]: any})=>{
				return {
					...elem,
					id: elem._id,
					license: e.row.license,
				};
			}));
			setTotalDistance(d.totalDistance);
			setTotatDuration(d.totalTime);
			setAverageVelocity(d.averageVelocity);
		}
		).catch((error) => {
			console.error(error);
			setAlertMsg(error.message);
		});
	};

	const [alertMsg, setAlertMsg] = React.useState("");
	return (
		<>
			{alertMsg && <Alert severity="error" sx={{
				justifyContent:"center"
			}}>{alertMsg}</Alert>}
			<Box width="100%" display="flex" flexDirection="column" alignItems="center">
				<Typography variant="h3" padding="5px" fontWeight="600"  color="#001d47" width="84%" textAlign="center" sx={{ background: "#276ec0", borderRadius: "4px", margin: "5px 0" }}>
					Analytics
				</Typography>
				<Box width="85%" display="flex" flexDirection="column" alignItems="center" 
					sx={{ 
						background:"#276ec0",
						border: "1px solid #276ec0",
						borderRadius: "5px",
						"& .MuiTextField-root": {
							background: "#fff",
							borderRadius: "4px",
							boxShadow: "0px 0px 2px 0px #fff"
						},
						"& .MuiButtonBase-root": {
							background: "#fff",
						},
						"& .MuiDataGrid-main": {
							background: "#fff",
						}
					}}
				>
					<Box
						height="500px"
						width="90%"
						sx={{
							padding: "10px",
						}}
					>
						<Typography variant="h4" fontWeight="600"  color="#001d47">Vehicle</Typography>
						<Box width="95%" padding="10px 5%">
							<TextField
								onChange={handleChange}
								label="License no."
								size="small"
								placeholder="E.g. ABC-100"
								sx={{
									width: "70%",
								}}
							/>
							<Button
								variant="outlined"
								sx={{
									margin: "0 10px",
									padding: "6px 0",
									width: "25%",
								}}
								onClick={handleSubmit}
							>
								Search
							</Button>
						</Box>
						<Box width="100%" padding="10px 2%" margin={"10px"}>
							<DataTable columns={vehicleColumns} rows={vehicleRows} onRowClick={handleRowClick} />
						</Box>
					</Box>
					{maintenanceRows && maintenanceRows.length || totalDistance || totalDuration ? <Box
						height="500px"
						width="90%"
						sx={{
							padding: "10px",
						}}
					>
						<Typography variant="h4" fontWeight="600"  color="#001d47">Details</Typography>
						<Stack direction='row'>
							<Box flexGrow='1' height='200px' border='1px solid #f2f2f2' borderRadius='5px' boxShadow='0 0 5px 0 #e0e0e0' margin='5px' sx={{ background: "#fff" }}>
								<Typography variant="h5" padding='10px' color='#666'>Distance traveled:</Typography>
								<Typography variant="h2" color='#666' height='150px' fontSize='60px' display='flex' justifyContent='center' alignItems='center'>{totalDistance}<sub>k.mtrs</sub></Typography>
							</Box>
							<Box flexGrow='1' height='200px' border='1px solid #f2f2f2' borderRadius='5px' boxShadow='0 0 5px 0 #e0e0e0' margin='5px' sx={{ background: "#fff" }}>
								<Typography variant="h5" padding='10px' color='#666'>Hours operated:</Typography>
								<Typography variant="h2" color='#666' height='150px' fontSize='60px' display='flex' justifyContent='center' alignItems='center'>{totalDuration}<sub>secs</sub></Typography>
							</Box>
							<Box flexGrow='1' height='200px' border='1px solid #f2f2f2' borderRadius='5px' boxShadow='0 0 5px 0 #e0e0e0' margin='5px' sx={{ background: "#fff" }}>
								<Typography variant="h5" padding='10px' color='#666'>Avg velocity:</Typography>
								<Typography variant="h2" color='#666' height='150px' fontSize='60px' display='flex' justifyContent='center' alignItems='center'>{averageVelocity}<sub>km/s</sub></Typography>
							</Box>
						</Stack>
						<Box width="100%" padding="10px 2%">
							<DataTable columns={maintenanceColumns} rows={maintenanceRows} />
						</Box>
					</Box>: null}
				</Box>
			</Box>
		</>
	);
}

export default Analytics;
