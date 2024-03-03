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
							width="90%"
							height="250px"
							style={{
								border: "4px #f2f2f2 solid",
								borderRadius: "25px",
								boxShadow: "0px 0px 8px 0px #c4c4c4",
								textAlignLast: "center",
							}}
						/>
					) : (
						<Box
							width="90%"
							height="250px"
							margin="0 auto"
							sx={{
								background: "#f2f2f2",
								border: "4px #f2f2f2 solid",
								borderRadius: "25px",
								boxShadow: "0px 0px 8px 0px #c4c4c4",
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
						fullWidth
						name="img"
						value={formik.values.img}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Name</p>
					<TextField
						fullWidth
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Type</p>
					<TextField
						fullWidth
						name="type"
						value={formik.values.type}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>License No.</p>
					<TextField
						fullWidth
						name="license"
						value={formik.values.license}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Company</p>
					<TextField
						fullWidth
						name="company"
						value={formik.values.company}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Model</p>
					<TextField
						fullWidth
						name="vehicleModel"
						value={formik.values.vehicleModel}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Owner ID</p>
					<TextField
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
