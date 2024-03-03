import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({columns, rows}:{columns: { field: string; headerName: string; width: number; }[]; rows: {[key: string]:string}[]; }) => {
	return (
		<Box sx={{ width: "96%", height: "200px" }}>
			<DataGrid
				autoHeight
				rows={rows}
				columns={columns}
				hideFooter
			/>
		</Box>
	);
};

export default DataTable;