import { Table as ReactTable, RowData } from "@tanstack/react-table";
import { Navbar, Pagination } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

interface TablePaginationProps<TData extends RowData> {
  table?: ReactTable<TData>; // optional
  hasIcon?: boolean;
}

const TablePagination = <TData extends RowData>({
  table,
  hasIcon,
}: TablePaginationProps<TData>) => {
  // ✅ Safely extract values with optional chaining at every level
  const pageSize = table?.options?.state?.pagination?.pageSize ?? 10;
  const pageIndex = table?.options?.state?.pagination?.pageIndex ?? 0;
  const pageCount = table?.getPageCount?.() ?? 1;
  const totalRows = table?.getFilteredRowModel?.()?.rows?.length ?? 10;

  return (
    <div className="border-top d-md-flex justify-content-between align-items-center p-3">
      <div>
        Showing {pageIndex * pageSize + 1} to{" "}
        {Math.min((pageIndex + 1) * pageSize, totalRows)} of {totalRows} entries
      </div>

      <Navbar className="mt-2 mt-md-0">
        <Pagination className="mb-0">
          <Pagination.Item
            disabled={!table?.getCanPreviousPage?.()}
            onClick={() => table?.previousPage?.()}
          >
            {hasIcon ? <ChevronLeft className="icon-xxs" /> : "Previous"}
          </Pagination.Item>

          {[...Array(pageCount)].map((_, page) => (
            <Pagination.Item
              key={page}
              active={pageIndex === page}
              onClick={() => table?.setPageIndex?.(page)}
            >
              {page + 1}
            </Pagination.Item>
          ))}

          <Pagination.Item
            disabled={!table?.getCanNextPage?.()}
            onClick={() => table?.nextPage?.()}
          >
            {hasIcon ? <ChevronRight className="icon-xxs" /> : "Next"}
          </Pagination.Item>
        </Pagination>
      </Navbar>
    </div>
  );
};

export default TablePagination;
