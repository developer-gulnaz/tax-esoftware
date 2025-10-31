"use client";

import { useEffect, useState } from "react";
import { IconBuildingCommunity, IconEdit, IconTrash } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import TablePagination from "components/table/TablePagination";
import { Button, Table, Spinner, Row, Col, Modal } from "react-bootstrap";
import { formatDate } from "helper/formatDate";

interface GovtSchemeData {
  _id: string;
  schemeName: string;
  schemeCode: string;
  description?: string;
  createdAt: string;
}

export default function GovtSchemePage() {
  const router = useRouter();
  const [data, setData] = useState<GovtSchemeData[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "शासन योजना यादी";
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/govtScheme?page=${page}&limit=${pageSize}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json?.data || []);
        setTotal(json?.total || 0);
        setLoading(false);
      });
  }, [page, pageSize]);

  const handleDelete = async () => {
    if (!selectedId) return;
    await fetch(`/api/govtScheme?id=${selectedId}`, { method: "DELETE" });
    setData((prev) => prev.filter((row) => row._id !== selectedId));
    setShowModal(false);
  };

  return (
    <div className="custom-container">
      <div className="d-flex align-content-center mb-4">
        <IconBuildingCommunity size={32} />
        <h3 className="fw-bold px-2 mt-1">शासन योजना यादी</h3>
      </div>

      <Button className="mb-3" onClick={() => router.push("/govtScheme/add")}>
        नवीन योजना जोडा
      </Button>

      <Row>
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                <Table hover responsive className="align-middle">
                  <thead className="bg-light fw-semibold border-btm">
                    <tr>
                      <th>अनु क्र.</th>
                      <th>योजनेचे नाव</th>
                      <th>योजना कोड</th>
                      <th>शेरा</th>
                      <th>तारीख</th>
                      <th>व्यवस्थापन</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length ? (
                      data.map((item: any, idx) => (
                        <tr key={item._id}>
                          <td>{(page - 1) * pageSize + idx + 1}</td>
                          <td>{item.schemeName}</td>
                          <td>{item.schemeCode}</td>
                          <td>{item.description || "—"}</td>
                          <td>{formatDate(item.createdAt)}</td>

                          <td>
                            <Button
                              size="sm"
                              variant="warning"
                              className="me-2"
                              onClick={() =>
                                router.push(`/govtScheme/edit/${item._id}`)
                              }                            >
                              <IconEdit size={15} />
                            </Button>
                            {/* Enable delete if needed */}
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                setSelectedId(item._id);
                                setShowModal(true);
                              }}                                              >
                              <IconTrash size={15} />
                            </Button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-3">
                          कोणतेही रेकॉर्ड उपलब्ध नाहीत
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

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
              </>
            )}
          </div>
        </Col>
      </Row>

      {/* ✅ Delete Modal */}
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>योजना हटवा</Modal.Title>
        </Modal.Header>
        <Modal.Body>ही योजना हटवू इच्छिता?</Modal.Body>
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
