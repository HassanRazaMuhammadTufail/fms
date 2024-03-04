import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddVehicle } from "../../queries/vehicle";

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
			console.log(values);
			addVehicle
				.mutateAsync({
					fields: {
						...values,
					},
				})
				.then((data) => {
					console.log(data);
					formik.resetForm();
				})
				.catch((error) => {
					console.log(error);
				});
		},
	});
	return (
		<Box width="100%" display="flex" justifyContent="center" margin="1% 0">
			<Box width="40%" display="flex" flexDirection="column" margin="5% 10%">
				<Box padding="4px" alignSelf="center">
					<Typography variant="h2">Register Vehicle</Typography>
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
					/>
				</Box>
				<Box padding="4px" display="flex" justifyContent="space-between">
					<Button
						variant="outlined"
						sx={{ margin: "15px 10px", width: "40%" }}
						onClick={() => formik.submitForm()}
					>
            Submit
					</Button>
					<Button
						variant="outlined"
						sx={{ margin: "15px 10px", width: "40%" }}
						color="error"
						onClick={() => formik.resetForm()}
					>
            Clear
					</Button>
				</Box>
			</Box>
			<Box width="40%" display="flex" flexDirection="column" margin="5% 10%" />
		</Box>
	);
}

export default Registration;
