"use client";

import { useEffect, useState } from "react";
import TablePagination from "components/table/TablePagination";

import {
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Table,
  Modal
} from "react-bootstrap";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function BuildingTypePage() {
  const [form, setForm] = useState<any>({
    buildingType: "",
    fixedRate: "",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);

  // Pagination state (1-based)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // default must be 10
  const [total, setTotal] = useState<number>(0);  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);


  const fetchData = async () => {
    const res = await fetch(`/api/buildingType?page=${page}&limit=${pageSize}`);
    const result = await res.json();
    setData(result.data);
    setTotal(result.total);
  };


  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `/api/buildingType?id=${editId}`
      : "/api/buildingType";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      // alert(editId ? "Updated!" : "Saved!");
      setEditId(null);
      setForm({
        buildingType: "",
        fixedRate: "",
      });
      fetchData();
    }
  };

  const handleEdit = async (item: any) => {
    setEditId(item._id);
    setForm(item);
  };

  // const handleDelete = async (id: string) => {
  //   if (!confirm("तुम्हाला खात्री आहे का?")) return;

  //   const res = await fetch(`/api/buildingType?id=${id}`, {
  //     method: "DELETE",
  //   });

  //   if (res.ok) {
  //     setShowModal(false);
  //     fetchData();
  //   }
  // };

    // ✅ Delete
  const handleDelete = async () => {
    if (!selectedId) return;
    await fetch(`/api/buildingType?id=${selectedId}`, { method: "DELETE" });
    setData((prev) => prev.filter((item) => item._id !== selectedId));
    setShowModal(false);
  };

  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="container-fluid">
      <Row className="g-3">

        {/* ✅ LEFT SIDE - FORM */}
        <Col md={5}>
          <div className="card p-5 px-5 shadow-sm h-100">
            <h4 className="mb-3">{editId ? "वापराचे प्रकार संपादित करा" : "नवीन वापराचे प्रकार जोडा"}</h4>

            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={12}>
                  <Form.Label>नाव/वर्णन *</Form.Label>
                  <Form.Control
                    required
                    value={form.buildingType}
                    onChange={(e) =>
                      setForm({ ...form, buildingType: e.target.value })
                    }
                  />
                </Col>

                <Col md={12}>
                  <Form.Label>भारांक *</Form.Label>
                  <Form.Control
                    required
                    value={form.fixedRate}
                    onChange={(e) =>
                      setForm({ ...form, fixedRate: e.target.value })
                    }
                  />
                </Col>


              </Row>

              <Button className="mt-3" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "जतन करा"}
              </Button>
            </Form>
          </div>
        </Col>

        {/* ✅ RIGHT SIDE - TABLE */}
        <Col md={7}>
          <div className="p-5 px-5 bg-light shadow-sm rounded-3">
            <h4 className="mb-3">वापराचे प्रकार</h4>

            <Table responsive hover size="sm">
              <thead>
                <tr>
                  <th>अनु क्र.</th>
                  <th>नाव/वर्णन</th>
                  <th>भारांक</th>
                  <th>व्यवस्थापन</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, idx) => (
                  <tr key={item._id}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{item.buildingType}</td>
                    <td>{item.fixedRate}</td>
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
                        onClick={() => {
                          setSelectedId(item._id!);
                          setShowModal(true);
                        }}
                      >
                        <IconTrash size={15} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
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
          </div>
        </Col>

      </Row>

      {/* Delete Modal */}
      <Modal show={showModal} centered>
        <Modal.Header>
          <Modal.Title>वापराचे प्रकार हटवा</Modal.Title>
        </Modal.Header>
        <Modal.Body>हे वापराचे प्रकार हटवू इच्छिता?</Modal.Body>
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
