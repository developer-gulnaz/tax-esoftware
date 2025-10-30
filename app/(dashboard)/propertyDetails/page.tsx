"use client";

import { IconBuildingWarehouse, IconEdit, IconPrinter, IconTrash } from "@tabler/icons-react";
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
  const [form, setForm] = useState<any>({
    propertyCode: "",
    propertyNumber: "",
    address: "",
    ownerName: "",
    occupantName: "",
    description: "",
    isSelected: "",
    seeMore: "",
  });

  const router = useRouter();
  const [data, setData] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state (1-based)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // default must be 10
  const [total, setTotal] = useState<number>(0);
  const [editId, setEditId] = useState<string | null>(null);


  // Protect route
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "मालमत्ता यादी";
  }, []);

  // Fetch data whenever page or limit changes

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
  useEffect(() => {


    fetchData();
    return () => {
      aborted = true;
    };
  }, [page, pageSize]);


  const handleEdit = async (item: any) => {
    setEditId(item._id);
    setForm(item);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("तुम्हाला खात्री आहे का?")) return;

    const res = await fetch(`/api/property?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted!");
      fetchData();
    }
  };

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
                <Table hover responsive className="borderless compact-table align-middle mb-0">
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
                            <Button
                              size="sm"
                              variant="warning"
                              className="me-2"
                              onClick={() => handleEdit(item)}
                            >
                              <IconEdit size={15} />
                            </Button>
                            {/* Enable delete if needed */}
                            <Button
                              size="sm"
                              variant="danger"
                              className="me-2"
                              onClick={() => handleDelete(item._id)}
                            >
                              <IconTrash size={15} />
                            </Button>
                           
                            <Button
                              size="sm"
                              variant="info"
                              // onClick={() => handleDelete(item._id)}
                            >
                              <IconPrinter size={15} />
                            </Button>
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
