import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddMaintenance } from "../../queries/maintenance";

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
			console.log(values);
			addMaintenanceLog
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
					<Typography variant="h2">Add Maintenance Log</Typography>
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

export default Maintenance;
