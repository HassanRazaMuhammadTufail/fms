import React from "react";
import { Box, TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddMaintenance } from "../../queries/maintenance";
import truck from "../../images/truck1.png";

const MaintenanceLogValidationSchema = Yup.object().shape({
	license: Yup.string().required("Required"),
	type: Yup.string().required("Required"),
	company: Yup.string().required("Required"),
	cost: Yup.string().required("Required"),
	mileage: Yup.string().required("Required"),
	description: Yup.string(),
});

function Maintenance() {
	const addMaintenanceLog = useAddMaintenance();
	const formik = useFormik({
		initialValues: {
			license: "",
			type: "",
			company: "",
			cost: "",
			mileage: "",
			description: "",
		},
		validationSchema: MaintenanceLogValidationSchema,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			addMaintenanceLog
				.mutateAsync({
					fields: {
						...values,
					},
				})
				.then(() => {
					formik.resetForm();
					setOpen(true);
				})
				.catch((error) => {
					setAlertMsg(error.message || "something went wrong");
				});
		},
	});
	const [alertMsg, setAlertMsg] = React.useState();
	const [open, setOpen] = React.useState(false);

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<>
			{alertMsg && <Alert severity="error" sx={{
				justifyContent:"center"
			}}>{alertMsg}</Alert>}
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				message="Data added successfully."
			/>
			<Box width="100%" display="flex" justifyContent="center" margin="1% 0">
				<Box width="80%" display="flex" justifyContent="center" margin="1% 0" 
					sx={{ 
						background:"#276ec0",
						border: "1px solid #276ec0",
						borderRadius: "5px",
						"& .MuiTextField-root": {
							background: "#fff",
							border: "1px solid #fff",
							borderRadius: "4px",
							boxShadow: "0px 0px 4px 0px #fff"
						} 
					}}
				>
					<Box width="60%" display="flex" flexDirection="column" margin="5% 10%">
						<Box padding="4px" alignSelf="center">
							<Typography variant="h2" fontWeight="600" color="#001d47">Add Maintenance Log</Typography>
						</Box>
						<Box padding="4px">
							<p>Vehicle License No.<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								size='small'
								fullWidth
								name="license"
								value={formik.values.license}
								onChange={formik.handleChange}
							/>
						</Box>
						<Box padding="4px">
							<p>Maintenance Type<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								size='small'
								fullWidth
								name="type"
								value={formik.values.type}
								onChange={formik.handleChange}
							/>
						</Box>
						<Box padding="4px">
							<p>Cost<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								size='small'
								fullWidth
								name="cost"
								value={formik.values.cost}
								onChange={formik.handleChange}
							/>
						</Box>
						<Box padding="4px">
							<p>Mileage<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								size='small'
								fullWidth
								name="mileage"
								value={formik.values.mileage}
								onChange={formik.handleChange}
							/>
						</Box>
						<Box padding="4px">
							<p>Company Name<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								size='small'
								fullWidth
								name="company"
								value={formik.values.company}
								onChange={formik.handleChange}
							/>
						</Box>
						<Box padding="4px">
							<p>Description</p>
							<TextField
								size='small'
								fullWidth
								name="description"
								value={formik.values.description}
								multiline
								onChange={formik.handleChange}
							/>
						</Box>
						{/* <Box padding="4px" display="flex" justifyContent="space-between"> */}
						<Button
							variant="contained"
							sx={{ margin: "15px 0" }}
							onClick={() => formik.submitForm()}
						>
            Submit
						</Button>
						<Button
							variant="contained"
							sx={{ margin: "15px 0" }}
							color="error"
							onClick={() => formik.resetForm()}
						>
            Clear
						</Button>
						{/* </Box> */}
					</Box>
					<Box width="40%" display="flex" flexDirection="column" margin="5% 10%"  justifyContent="center">
						<img src={truck} width="500px" height="500px" />
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default Maintenance;
