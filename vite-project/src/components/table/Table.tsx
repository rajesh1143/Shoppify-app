import { FC } from "react";
import DataGrid from "react-data-grid";

const DEFAULT_TABLE_PROPS = {
  rowHeight: 40,
  headerRowHeight: 45,
  className: "datatable opacity",
};

interface ITableProps {
  rows:
    | boolean
    | {
        id: number | undefined;
        title: string;
        description: string;
        image: JSX.Element;
        price: string | number;
        rating: number;
        actions: JSX.Element;
      }[];
  columns: any;
}

const DataTable: FC<ITableProps> = ({ rows, columns }) => {
  function rowKeyGetter(rows: any) {
    return rows.id;
  }

  return (
    <div className="h-full w-full border" style={{ overflow: "auto" }}>
      <DataGrid
        {...DEFAULT_TABLE_PROPS}
        columns={columns}
        rows={rows}
        renderers={{
          noRowsFallback: <div className="text-center">No Rows</div>,
        }}
        rowKeyGetter={rowKeyGetter}
        style={{ blockSize: "100%", border: 1 }}
      />
    </div>
  );
};

export default DataTable;
