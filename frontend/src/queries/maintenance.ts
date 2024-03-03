import { useMutation, useQuery } from "react-query";

const useAddMaintenance = () =>
	useMutation(
		async ({
			fields,
		}: {
      fields: {
        description: string;
        type: string;
        company: string;
        license: string;
        cost: string;
        mileage: string;
      }
    }) =>
			fetch(`${process.env.REACT_APP_SERVER_URL}/maintenance`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(fields),
			})
	);

const useGetMaintenance = () =>
	useQuery("allMaintenance", async () =>
		fetch(`${process.env.REACT_APP_SERVER_URL}/maintenance`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((resp) => resp.json())
	);

export { useAddMaintenance, useGetMaintenance };
