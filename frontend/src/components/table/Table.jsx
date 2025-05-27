import React, { useState, useMemo, useEffect } from "react";
import SortingIcons from "./Sort";
import { CheckBox, InputSelect } from "../Inputs";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "../../assets/icons";

const Table = ({
  Columns = [],
  data = [],
  setGlobalFilter,
  globalFilter,
  onSelectedRowIdsChange = (o) => o,
  loading = false,
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const columns = useMemo(() => Columns, [Columns]);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: true,
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
  });

  const Loading = () => {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="px-4 py-2 border border-slate-300 rounded-md">
          loading...
        </div>
      </div>
    );
  };

  const columnSpan = useMemo(() => {
    return table.getHeaderGroups().map((d) => d.headers.length);
  }, []);

  useEffect(() => {
    let push = [];
    table.getSelectedRowModel().flatRows.map((d) => {
      let obj = d.original._id;
      push.push(obj);
    });
    onSelectedRowIdsChange(push);
  }, [rowSelection]);

  return (
    <div className="w-full lg:overflow-visible overflow-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="p-2 last:flex last:justify-end"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-1 ${
                          header?.column?.id === "id" ? "justify-end" : ""
                        }`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <SortingIcons
                          header={header}
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columnSpan}>{Loading()}</td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const isSelected = row.getIsSelected(row.id);
              return (
                <tr
                  key={row.id}
                  className={`hover:bg-[rgba(0,0,0,0.5)] ${
                    isSelected ? "bg-[rgba(0,0,0,0.5)]" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className={`w-auto p-2`} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columnSpan}>
                <div className="flex items-center justify-center p-2">
                  No data Found
                </div>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-8 px-2">
              <CheckBox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
              />
            </td>
            <td className="p-2" colSpan={columnSpan}>
              Page Rows ({table.getRowModel().rows.length})
            </td>
          </tr>

          <tr>
            <td colSpan={columnSpan} className="py-8 px-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 sm:flex-row flex-col">
                  <div className="flex gap-2 flex-wrap items-center">
                    <label>
                      Page {table.getState().pagination.pageIndex + 1} of{" "}
                      {table.getPageCount()} | Go to page :
                    </label>
                    <InputSelect
                      value={table.getState().pagination.pageIndex}
                      onChange={(e) => {
                        const page = e.target.value;
                        table.setPageIndex(page);
                      }}
                    >
                      {table.getPageOptions().map((i) => (
                        <option key={i} value={i}>
                          Page {i + 1}
                        </option>
                      ))}
                    </InputSelect>
                  </div>

                  <div className="flex gap-2 flex-wrap items-center">
                    <label>Show : </label>
                    <InputSelect
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                      }}
                    >
                      {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </InputSelect>
                    <label>
                      {Object.keys(rowSelection).length} of{" "}
                      {table.getPreFilteredRowModel().rows.length} Total Rows
                      Selected
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-[rgba(0,0,0,0.2)] disabled:bg-[rgba(0,0,0,0.5)]"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <FaAngleDoubleLeft size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-[rgba(0,0,0,0.2)] disabled:bg-[rgba(0,0,0,0.5)]"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <FaAngleLeft size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-[rgba(0,0,0,0.2)] disabled:bg-[rgba(0,0,0,0.5)]"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <FaAngleRight size={20} />
                  </button>
                  <button
                    className="px-4 py-2 rounded-[0.2rem] border border-slate-300 hover:bg-[rgba(0,0,0,0.2)] disabled:bg-[rgba(0,0,0,0.5)]"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <FaAngleDoubleRight fontWeight={1} size={20} />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
