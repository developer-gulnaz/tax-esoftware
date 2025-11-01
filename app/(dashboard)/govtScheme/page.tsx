"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
  Modal,
} from "react-bootstrap";
import {
  IconBuildingCommunity,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import TablePagination from "components/table/TablePagination";
import { formatDate } from "helper/formatDate";

interface GovtSchemeData {
  _id?: string;
  schemeName: string;
  schemeCode: string;
  description?: string;
  createdAt?: string;
}

export default function GovtSchemePage() {
  const router = useRouter();

  const [data, setData] = useState<GovtSchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState<GovtSchemeData>({
    schemeName: "",
    schemeCode: "",
    description: "",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ✅ Auth check
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "शासन योजना व्यवस्थापन";
  }, []);

  // ✅ Fetch list
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/govtScheme?page=${page}&limit=${pageSize}`);
    const json = await res.json();
    setData(json?.data || []);
    setTotal(json?.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  // ✅ Handle input change
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `/api/govtScheme?id=${editId}`
      : `/api/govtScheme`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert(editId ? "✅ सुधारणा यशस्वी!" : "✅ योजना जतन झाली!");
      setFormData({ schemeName: "", schemeCode: "", description: "" });
      setEditId(null);
      fetchData();
    }
    setSaving(false);
  };

  // ✅ Edit
  const handleEdit = async (id: string) => {
    setFetching(true);
    const res = await fetch(`/api/govtScheme?id=${id}`);
    const json = await res.json();

    setFormData({
      schemeName: json.data.schemeName,
      schemeCode: json.data.schemeCode,
      description: json.data.description || "",
    });

    setEditId(id);
    setFetching(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete
  const handleDelete = async () => {
    if (!selectedId) return;
    await fetch(`/api/govtScheme?id=${selectedId}`, { method: "DELETE" });
    setData((prev) => prev.filter((item) => item._id !== selectedId));
    setShowModal(false);
  };

  return (
    <div className="custom-container">
      {/* ===== Header ===== */}
      <div className="d-flex align-content-center mb-4">
        <IconBuildingCommunity size={32} />
        <h3 className="fw-bold px-2 mt-1">शासन योजना व्यवस्थापन</h3>
      </div>

      {/* ===== Form Section ===== */}
      <div className="p-4 bg-light shadow-sm rounded-3 mb-4 fade-in">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>योजनेचे नाव</Form.Label>
                <Form.Control
                  name="schemeName"
                  value={formData.schemeName}
                  onChange={handleChange}
                  required
                  disabled={fetching}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>योजना कोड</Form.Label>
                <Form.Control
                  name="schemeCode"
                  value={formData.schemeCode}
                  onChange={handleChange}
                  required
                  disabled={fetching}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>शेरा</Form.Label>
                <Form.Control
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional"
                  disabled={fetching}
                />
              </Form.Group>
            </Col>

            <Col md={12} className="text-end mt-3">
              <Button
                type="submit"
                disabled={saving}
                variant={editId ? "warning" : "primary"}
              >
                {saving ? (
                  <Spinner size="sm" animation="border" />
                ) : editId ? (
                  "सुधारणा जतन करा"
                ) : (
                  "जतन करा"
                )}
              </Button>

              {editId && (
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => {
                    setEditId(null);
                    setFormData({ schemeName: "", schemeCode: "", description: "" });
                  }}
                >
                  रद्द करा
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>

      {/* ===== Table Section ===== */}
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
                      data.map((item, idx) => (
                        <tr key={item._id}>
                          <td>{(page - 1) * pageSize + idx + 1}</td>
                          <td>{item.schemeName}</td>
                          <td>{item.schemeCode}</td>
                          <td>{item.description || "—"}</td>
                          <td>{formatDate(item.createdAt || "")}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="warning"
                              className="me-1"
                              onClick={() => handleEdit(item._id!)}
                            >
                              <IconEdit size={15} />
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                setSelectedId(item._id!);
                                setShowModal(true);
                              }}
                            >
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

      {/* Delete Modal */}
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

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
