import React from "react";
import { Pagination, Navbar, Form } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

interface Props {
  currentPage: number;       // 1-based
  totalRows: number;         // total count from server
  pageSize: number;          // items per page
  hasIcon?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void; // ✅ Added
  maxPageButtons?: number;   // optional: number of page buttons to show
}

const TablePagination: React.FC<Props> = ({
  currentPage,
  totalRows,
  pageSize,
  hasIcon = false,
  onPageChange,
  onPageSizeChange, // ✅ Added
  maxPageButtons = 7,
}) => {
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  const half = Math.floor(maxPageButtons / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(pageCount, start + maxPageButtons - 1);
  if (end - start + 1 < maxPageButtons) start = Math.max(1, end - maxPageButtons + 1);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="border-top d-md-flex justify-content-between align-items-center p-3">

      {/* ✅ Row count selector */}
      <div className="d-flex align-items-center gap-2">
        <span>Show </span>
        <Form.Select
          size="sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))} // ✅ FIXED
          style={{ width: "65px" }}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Form.Select>
        entries
      </div>

      <div>
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, totalRows)} of {totalRows} entries
      </div>

      <Navbar className="mt-2 mt-md-0">
        <Pagination className="mb-0">
          <Pagination.Prev
            disabled={currentPage <= 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            {hasIcon ? <ChevronLeft className="icon-xxs" /> : "Previous"}
          </Pagination.Prev>

          {start > 1 && (
            <>
              <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
              {start > 2 && <Pagination.Ellipsis />}
            </>
          )}

          {pages.map((p) => (
            <Pagination.Item key={p} active={p === currentPage} onClick={() => onPageChange(p)}>
              {p}
            </Pagination.Item>
          ))}

          {end < pageCount && (
            <>
              {end < pageCount - 1 && <Pagination.Ellipsis />}
              <Pagination.Item onClick={() => onPageChange(pageCount)}>{pageCount}</Pagination.Item>
            </>
          )}

          <Pagination.Next
            disabled={currentPage >= pageCount}
            onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
          >
            {hasIcon ? <ChevronRight className="icon-xxs" /> : "Next"}
          </Pagination.Next>
        </Pagination>
      </Navbar>

    </div>
  );
};

export default TablePagination;
