"use client";

import { IconBuildingWarehouse } from "@tabler/icons-react";
import TablePagination from "components/table/TablePagination";
import { formatDate } from "helper/formatDate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Spinner,
  Table
} from "react-bootstrap";

interface BuildingTaxRateData {
  _id: string;
  buildingType: string;
  // buildingRate: number;
  // constructionRate: number;
  taxRate: number;
  createdAt: string;
  isSelected?: boolean;
}

export default function BuildingTaxRatePage() {
  const router = useRouter();
  const [data, setData] = useState<BuildingTaxRateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  // ✅ Delete Modal State
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "इमारत कर दर यादी";
  }, []);

  useEffect(() => {
    let aborted = false;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/buildingTaxRate?page=${page}&limit=${pageSize}`);
        const json = await res.json();

        if (!aborted) {
          setData(json.data || []);
          setTotal(json.total || 0);
        }
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      aborted = true;
    };
  }, [page, pageSize]);

  // ✅ Confirm Delete Action
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      const res = await fetch(`/api/buildingTaxRate?id=${selectedId}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete");

      setData(prev => prev.filter(row => row._id !== selectedId));
      setTotal(prev => prev - 1);
    } catch (err) {
      console.error(err);
    }
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="custom-container">
      <div className="d-flex align-content-center mb-4">
        <IconBuildingWarehouse size={30} strokeWidth={1.5} />
        <h3 className="fw-bold px-2 mt-1">इमारत कर दर यादी</h3>
      </div>

      <div className="mb-5">
        <Button
          className="border-0 mx-2 btn btn-primary"
          onClick={() => router.push("/buildingTaxRate/add")}
        >
          नवीन कर दर जोडा
        </Button>
      </div>

      <Row>
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="secondary" />
                <p className="mt-2 text-muted">डेटा लोड होत आहे...</p>
              </div>
            ) : (
              <>
                <Table hover responsive className="borderless align-middle mb-0">
                  <thead className="bg-light fw-semibold border-btm">
                    <tr>
                      {/* <th></th> */}
                      <th>अनु क्र.</th>
                      <th>इमारत प्रकार</th>
                      {/* <th>इमारत दर</th>
                      <th>बांधकाम दर</th> */}
                      <th>कराचा दर(रुपये)</th>
                      <th>तारीख</th>
                      <th>व्यवस्थापन</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, idx) => (
                        <tr key={item._id}>
                          {/* <td>
                            <FormCheck />
                          </td> */}
                          <td>{(page - 1) * pageSize + idx + 1}</td>
                          <td>
                            {item.buildingType}
                          </td>

                          {/* <td>{item.buildingRate}</td>
                          <td>{item.constructionRate}</td> */}
                          <td>{(item.taxRate).toFixed(2)}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() =>
                                  router.push(`/buildingTaxRate/edit/${item._id}`)
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => {
                                  setSelectedId(item._id);
                                  setShowModal(true);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
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

      {/* ✅ Delete Confirmation Modal */}
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>रेकॉर्ड हटवा</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          तुम्हाला खरंच हा कर दर हटवायचा आहे का?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            रद्द
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            हटवा
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
