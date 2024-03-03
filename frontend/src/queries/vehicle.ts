import { useMutation, useQuery } from "react-query";

const useAddVehicle = () =>
	useMutation(
		async ({
			fields,
		}: {
      fields: {
        img: string;
        name: string;
        type: string;
        company: string;
        license: string;
        ownerId: string;
        vehicleModel: string;
      }
    }) =>
			fetch(`${process.env.REACT_APP_SERVER_URL}/vehicles`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(fields),
			})
	);

const useGetVehicle = () =>
	useQuery("allVehicles", async () =>
		fetch(`${process.env.REACT_APP_SERVER_URL}/vehicles`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((resp) => resp.json())
	);

const useGetVehicleByLicense = () =>
	useMutation(
		async ({ license }: {license: string; }) => 
			fetch(`${process.env.REACT_APP_SERVER_URL}/vehicles/${license}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}).then((resp) => resp.json())
	);


export { useAddVehicle, useGetVehicle, useGetVehicleByLicense };
