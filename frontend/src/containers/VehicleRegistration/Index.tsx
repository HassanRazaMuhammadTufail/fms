import React from "react";
import { Box, TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddVehicle } from "../../queries/vehicle";
import truck from "../../images/truck1.png";

const VehicleRegistrationSchema = Yup.object().shape({
	img: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	type: Yup.string().required("Required"),
	license: Yup.string().required("Required"),
	company: Yup.string().required("Required"),
	vehicleModel: Yup.string().required("Required"),
	ownerId: Yup.string().required("Required"),
});

function Registration() {
	const addVehicle = useAddVehicle();
	const formik = useFormik({
		initialValues: {
			img: "",
			name: "",
			type: "",
			license: "",
			company: "",
			vehicleModel: "",
			ownerId: "",
		},
		validationSchema: VehicleRegistrationSchema,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			addVehicle
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

	// const handleClick = () => {
	// 	setOpen(true);
	// };

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
						background: "#276ec0",
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
					<Box width="37%" display="flex" flexDirection="column" margin="5%">
						<Box padding="4px" alignSelf="center">
							<Typography variant="h2" fontWeight="600" color="#001d47">Register Vehicle</Typography>
						</Box>
						<Box padding="4px">
							{formik.values.img ? (
								<img
									src={formik.values.img}
									width="494px"
									height="250px"
									style={{
										border: "1px #fafafa solid",
										borderRadius: "10px",
										boxShadow: "0px 0px 8px 0px #ebebeb",
										textAlignLast: "center",
									}}
								/>
							) : (
								<Box
									width="494px"
									height="250px"
									margin="0 auto"
									sx={{
										background: "#fafafa",
										border: "1px #fafafa solid",
										borderRadius: "10px",
										boxShadow: "0px 0px 8px 0px #ebebeb",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										textAlignLast: "center",
										fontSize: "20px",
									}}
								>
									<p color="grey">Paste image url below</p>
								</Box>
							)}
						</Box>
						<Box padding="4px">
							{/* <p>Vehicle Image</p> */}
							<TextField
								error={!!formik.errors.img}
								size="small"
								fullWidth
								name="img"
								value={formik.values.img}
								onChange={formik.handleChange}
								helperText={formik.errors.img}
							/>
						</Box>
						<Box padding="4px">
							<p>Name<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								error={!!formik.errors.name}
								size="small"
								fullWidth
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								helperText={formik.errors.name}
							/>
						</Box>
						<Box padding="4px">
							<p>Type<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								error={!!formik.errors.type}
								size="small"
								fullWidth
								name="type"
								value={formik.values.type}
								onChange={formik.handleChange}
								helperText={formik.errors.type}
							/>
						</Box>
						<Box padding="4px">
							<p>License No.<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								error={!!formik.errors.license}
								size="small"
								fullWidth
								name="license"
								value={formik.values.license}
								onChange={formik.handleChange}
								helperText={formik.errors.license}
							/>
						</Box>
						<Box padding="4px">
							<p>Company<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								error={!!formik.errors.company}
								size="small"
								fullWidth
								name="company"
								value={formik.values.company}
								onChange={formik.handleChange}
								helperText={formik.errors.company}
							/>
						</Box>
						<Box padding="4px">
							<p>Model<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								error={!!formik.errors.vehicleModel}
								size="small"
								fullWidth
								name="vehicleModel"
								value={formik.values.vehicleModel}
								onChange={formik.handleChange}
								helperText={formik.errors.vehicleModel}
							/>
						</Box>
						<Box padding="4px">
							<p>Owner ID<sup style={{color:"#ff0000"}}>*</sup></p>
							<TextField
								error={!!formik.errors.ownerId}
								size="small"
								fullWidth
								name="ownerId"
								value={formik.values.ownerId}
								onChange={formik.handleChange}
								helperText={formik.errors.ownerId}
							/>
						</Box>
						{/* <Box padding="4px" display="flex" justifyContent="space-between"> */}
						<Button
							variant="contained"
							sx={{ margin: "15px 0" }}
							onClick={() => formik.submitForm()}
							fullWidth
						>
							Submit
						</Button>
						<Button
							variant="contained"
							sx={{ margin: "15px 0" }}
							fullWidth
							color="error"
							onClick={() => formik.resetForm()}
						>
							Clear
						</Button>
						{/* </Box> */}
					</Box>
					<Box width="40%" display="flex" flexDirection="column" margin="5%" justifyContent="center">
						<img src={truck} width="500px" height="500px" />
					</Box>
				</Box>
			</Box>
		</>
	);
}

export default Registration;
