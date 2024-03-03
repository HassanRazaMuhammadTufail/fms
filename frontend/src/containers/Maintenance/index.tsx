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
	description: Yup.string().required("Required"),
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
					<p>Vehicle License No.</p>
					<TextField
						fullWidth
						name="license"
						value={formik.values.license}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Maintenance Type</p>
					<TextField
						fullWidth
						name="type"
						value={formik.values.type}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Cost</p>
					<TextField
						fullWidth
						name="cost"
						value={formik.values.cost}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Mileage</p>
					<TextField
						fullWidth
						name="mileage"
						value={formik.values.mileage}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Company Name</p>
					<TextField
						fullWidth
						name="company"
						value={formik.values.company}
						onChange={formik.handleChange}
					/>
				</Box>
				<Box padding="4px">
					<p>Description</p>
					<TextField
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
