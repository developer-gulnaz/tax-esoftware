"use client";

import { IconBuildingWarehouse } from "@tabler/icons-react";
import TablePagination from "components/table/TablePagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, FormCheck, Row, Spinner, Table } from "react-bootstrap";

interface PropertyData {
  _id: string;
  serialNo?: number;
  propertyCode?: string;
  propertyNumber?: string;
  address?: string;
  ownerName?: string;
  occupantName?: string;
  description?: string;
  isSelected?: boolean;
  seeMore?: string;
  management?: string;
}

export default function PropertyDetailsPage() {
  const router = useRouter();
  const [data, setData] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state (1-based)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // default must be 10
  const [total, setTotal] = useState<number>(0);

  // Protect route
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "मालमत्ता यादी";
  }, []);

  // Fetch data whenever page or limit changes
  useEffect(() => {
    let aborted = false;
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/property?page=${page}&limit=${pageSize}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`API error ${res.status}: ${txt}`);
        }

        const json = await res.json();
        const items = json?.data ?? json?.items ?? (Array.isArray(json) ? json : null);
        const t = json?.total ?? json?.count ?? (Array.isArray(json) ? json.length : 0);

        if (!items) {
          console.warn("Unexpected API shape:", json);
          setData([]);
          setTotal(0);
        } else {
          setData(items);
          setTotal(t);
        }
      } catch (err) {
        console.error("Error fetching property list:", err);
        setData([]);
        setTotal(0);
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      aborted = true;
    };
  }, [page, pageSize]);

  return (
    <div className="custom-container">
      <div className="d-flex align-content-center mb-4">
        <IconBuildingWarehouse size={30} strokeWidth={1.5} />
        <h3 className="fw-bold px-2 mt-1">मालमत्ता यादी</h3>
      </div>

      <div className="mb-5">
        <Button className="border-0">सर्व</Button>
        <Button className="bg-danger border-0 mx-2">निवडलेले</Button>

        <Button
          className="border-0 mx-2 float-end btn btn-primary"
          onClick={() => router.push("/propertyDetails/addProperty")}
        >
          Add Property
        </Button>
      </div>

      <Row>
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="secondary" />
                <p className="mt-2 text-muted">Loading data...</p>
              </div>
            ) : (
              <>
                <Table hover responsive className="borderless align-middle mb-0">
                  <thead className="bg-light fw-semibold border-btm">
                    <tr>
                      <th>
                        <FormCheck
                          checked={data.length > 0 && data.every((item) => item.isSelected)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setData((prev) => prev.map((item) => ({ ...item, isSelected: checked })));
                          }}
                        />
                      </th>
                      <th>अनु नं.</th>
                      <th>मालमत्ता कोड</th>
                      <th>मालमत्ता क्रमांक</th>
                      <th>पत्ता</th>
                      <th>मालकाचे नाव</th>
                      <th>भोगवटा करणान्याचे नाव</th>
                      <th>मालमत्तेचे वर्णन</th>
                      <th>अजून पहा</th>
                      <th>व्यवस्थापन</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, idx) => (
                        <tr key={item._id ?? `${(page - 1) * pageSize + idx}`}>
                          <td>
                            <FormCheck
                              checked={!!item.isSelected}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setData((prev) => prev.map((row) => (row._id === item._id ? { ...row, isSelected: checked } : row)));
                              }}
                            />
                          </td>
                          <td>{(page - 1) * pageSize + idx + 1}</td>
                          <td>{item.propertyCode}</td>
                          <td>{item.propertyNumber}</td>
                          <td>{item.address}</td>
                          <td>{item.ownerName}</td>
                          <td>{item.occupantName || "-"}</td>
                          <td>{item.description || "-"}</td>
                          <td>{item.seeMore || "अजून पहा"}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-primary">Edit</button>
                              <button className="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center py-4 text-muted">
                          कोणतेही रेकॉर्ड आढळले नाहीत
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <div className="mt-3">
                  <TablePagination
                    currentPage={page}
                    pageSize={pageSize}
                    totalRows={total}
                    onPageChange={(p) => setPage(p)}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setPage(1);
                    }}
                    hasIcon
                  />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
