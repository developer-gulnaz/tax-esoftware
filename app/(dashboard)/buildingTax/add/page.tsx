"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

export default function AddBuildingTaxPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    buildingType: "",
    areaSize: "",
    constructionRate: "",
    buildingRate: "",
    taxRate: "",
    description: "",
  });

  // ✅ Protect Route
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  // ✅ Page Title
  useEffect(() => {
    document.title = "नवीन कर दर";
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/buildingTax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ कर दर यशस्वीरित्या जतन झाला!");
        router.push("/buildingTax");
      } else {
        alert("❌ " + result.message);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="custom-container">
      <h3 className="fw-bold mb-4">नवीन कर दर</h3>

      <Row className="g-4">
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>इमारतीचा प्रकार</Form.Label>
                    <Form.Select
                      name="buildingType"
                      value={formData.buildingType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- निवडा --</option>
                      <option value="rcc">आरसीसी पद्धतीची इमारत</option>
                      <option value="brick">
                        दगड, विटांची व चुना किंवा सिमेंट वापरून उभारलेली इमारत
                      </option>
                      <option value="mudbrick">
                        दगड, किंवा विटा वापरलेली मातीची इमारत
                      </option>
                      <option value="hut">झोपडी किंवा मातीची इमारत</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>क्षेत्रफळ (Sq Ft)</Form.Label>
                    <Form.Control
                      type="number"
                      name="areaSize"
                      value={formData.areaSize}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>कर दर (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>वर्णन</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="text-end mt-3">
                  <Button type="submit" className="px-4" disabled={loading}>
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      "जतन करा"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
