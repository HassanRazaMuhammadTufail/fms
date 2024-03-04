import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

const DataTable = ({columns, rows, onRowClick}:{columns: { field: string; headerName: string; width: number; }[]; rows: {[key: string]:string}[]; onRowClick?: (e: GridRowParams<any>) => void }) => {
	return (
		<Box sx={{ 
			width: "96%",
			height: "200px",
			"& .MuiDataGrid-columnHeaders":{
				background:"#efefef",
			},
			"& .table-cell": {
				justifyContent: "center !important",
			}
		}}>
			<DataGrid
				autoHeight
				rows={rows}
				columns={columns}
				hideFooter
				onRowClick={onRowClick && onRowClick}
			/>
		</Box>
	);
};

export default DataTable;