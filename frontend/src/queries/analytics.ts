import { useMutation } from "react-query";

const useGetAnalyticsByLicense = () =>
	useMutation(
		async ({ license }: {license: string; }) => 
			fetch(`${process.env.REACT_APP_SERVER_URL}/analytics/${license}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}).then((resp) => resp.json())
	);

export { useGetAnalyticsByLicense };
