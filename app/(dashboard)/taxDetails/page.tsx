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
} from "react-bootstrap";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function TaxDetailsPage() {
  const [form, setForm] = useState<any>({
    code: "",
    taxName: "",
    amount: "",
    amountType: "रकमेमध्ये",
    showInDemandRegister: true,
    showInAssessmentSheet: true,
    showInSummaryList: true,
    type: "सामान्य",
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);

  // Pagination state (1-based)
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // default must be 10
  const [total, setTotal] = useState<number>(0);

  const fetchData = async () => {
    const res = await fetch(`/api/taxDetails?page=${page}&limit=${pageSize}`);
    const result = await res.json();
    setData(result.data);
    setTotal(result.total);
  };

  const fetchAutoCode = async () => {
    if (editId) return; // ✅ Do not change code on edit

    const res = await fetch(`/api/taxDetails?nextCode=true`);
    const result = await res.json();

    if (result.success) {
      setForm((prev: any) => ({ ...prev, code: result.nextCode }));
    }
  };

  useEffect(() => {
    if (!editId) {
      fetchAutoCode();
    }
  }, [editId]);



  useEffect(() => {
    fetchData();
    fetchAutoCode();
  }, [page]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `/api/taxDetails?id=${editId}`
      : "/api/taxDetails";

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
        code: "",
        taxName: "",
        amount: "",
        amountType: "रकमेमध्ये",
        showInDemandRegister: true,
        showInAssessmentSheet: true,
        showInSummaryList: true,
        type: "सामान्य",
      });
      fetchData();
      fetchAutoCode();
    }
  };

  const handleEdit = async (item: any) => {
    setEditId(item._id);
    setForm(item);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("तुम्हाला खात्री आहे का?")) return;

    const res = await fetch(`/api/taxDetails?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted!");
      fetchData();
      fetchAutoCode();
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  const formatAmountDisplay = (tax: any) => {
    if (tax.amountType === "रकमेमध्ये") return `${Number(tax.amount).toFixed(2)} (₹)`;
    if (tax.amountType === "टक्केवारी म्हणून") return `${Number(tax.amount).toFixed(2)} (%)`;
    return `${tax.amount} (No)`;
  };

  return (
    <div className="container-fluid">
      <Row className="g-3">

        {/* ✅ LEFT SIDE - FORM */}
        <Col md={4}>
          <div className="card p-3 h-100">
            <h4 className="mb-3">{editId ? "कर तपशील संपादित करा" : "नवीन कर तपशील जोडा"}</h4>

            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={2}>
                  <Form.Label>कर कोड</Form.Label>
                  <Form.Control value={form.code} readOnly />
                </Col>

                <Col md={10}>
                  <Form.Label>कराचे नाव *</Form.Label>
                  <Form.Control
                    required
                    value={form.taxName}
                    onChange={(e) =>
                      setForm({ ...form, taxName: e.target.value })
                    }
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>कर रक्कम *</Form.Label>
                  <Form.Control
                    type="number"
                    step={form.amountType === "संख्यानुसार" ? "1" : "0.01"}
                    min="0"
                    required
                    value={form.amount}
                    onChange={(e) => {
                      let value = e.target.value;

                      // ✅ Only 2 decimals allowed for ₹ and %
                      if (form.amountType !== "संख्यानुसार" && value.includes(".")) {
                        value = value.substring(0, value.indexOf(".") + 3);
                      }

                      // ✅ If संख्यानुसार → enforce integers
                      if (form.amountType === "संख्यानुसार") {
                        value = value.replace(/\D/g, "");
                      }

                      setForm({ ...form, amount: value });
                    }}
                  />


                </Col>

                <Col md={6}>
                  <Form.Label>रक्कम प्रकार *</Form.Label>
                  <Form.Select
                    value={form.amountType}
                    onChange={(e) =>
                      setForm({ ...form, amountType: e.target.value })
                    }
                  >
                    <option>रकमेमध्ये</option>
                    <option>टक्केवारी म्हणून</option>
                    <option>संख्यानुसार</option>
                  </Form.Select>
                </Col>

                {/* Radio buttons in single row layout */}
                {/* ✅Demand Register */}
                <Col md={12}>
                  <Form.Label>मागणा रजिस्टरमध्ये दाखवायची आहे ? *</Form.Label><br />
                  <Form.Check
                    inline
                    type="radio"
                    name="showInDemandRegister"
                    label="होय"
                    checked={form.showInDemandRegister === true}
                    onChange={() => setForm({ ...form, showInDemandRegister: true })}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="showInDemandRegister"
                    label="नाही"
                    checked={form.showInDemandRegister === false}
                    onChange={() => setForm({ ...form, showInDemandRegister: false })}
                  />
                </Col>

                {/* ✅Assessment Sheet */}
                <Col md={12}>
                  <Form.Label>आकारणी पत्रकात दाखवा ? *</Form.Label><br />
                  <Form.Check
                    inline
                    type="radio"
                    name="showInAssessmentSheet"
                    label="होय"
                    checked={form.showInAssessmentSheet === true}
                    onChange={() => setForm({ ...form, showInAssessmentSheet: true })}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="showInAssessmentSheet"
                    label="नाही"
                    checked={form.showInAssessmentSheet === false}
                    onChange={() => setForm({ ...form, showInAssessmentSheet: false })}
                  />
                </Col>

                {/* ✅Summary List */}
                <Col md={12}>
                  <Form.Label>करात सारांश सूचीमध्ये दर्शविला जाईल ? *</Form.Label><br />
                  <Form.Check
                    inline
                    type="radio"
                    name="showInSummaryList"
                    label="होय"
                    checked={form.showInSummaryList === true}
                    onChange={() => setForm({ ...form, showInSummaryList: true })}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    name="showInSummaryList"
                    label="नाही"
                    checked={form.showInSummaryList === false}
                    onChange={() => setForm({ ...form, showInSummaryList: false })}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>प्रकार</Form.Label>
                  <Form.Select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
                  >
                    <option>सामान्य</option>
                    <option>जादे</option>
                    <option>सवलत</option>
                    <option>घरकर</option>
                  </Form.Select>
                </Col>
              </Row>

              <Button className="mt-3" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "जतन करा"}
              </Button>
            </Form>
          </div>
        </Col>

        {/* ✅ RIGHT SIDE - TABLE */}
        <Col md={8}>
          <div className="card p-3 h-100">
            <h4 className="mb-3">कर तपशील सूची</h4>

            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>कर कोड</th>
                  <th>नाव</th>
                  <th>रक्कम</th>
                  <th>व्यवस्थापन</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <tr key={item._id}>
                    <td>{item.code}</td>
                    <td>{item.taxName}</td>
                    <td>{formatAmountDisplay(item)}</td>
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
                      {/* <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <IconTrash size={15} />
                    </Button> */}
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
    </div>
  );

}
