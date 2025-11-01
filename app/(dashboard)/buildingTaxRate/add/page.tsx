"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";

export default function AddBuildingTaxRatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    buildingType: "",
    areaSize: "",
    constructionRate: "",
    buildingRate: "",
    taxRate: 0,
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
      const res = await fetch("/api/buildingTaxRate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ कर दर यशस्वीरित्या जतन झाला!");
        router.push("/buildingTaxRate");
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
                    <Form.Control
                      type="text"
                      name="buildingType"
                      value={formData.buildingType}
                      onChange={handleChange}
                      required
                    />
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
                      step="0.01"              // allows decimals
                      min="0"
                      value={formData.taxRate ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taxRate: parseFloat(parseFloat(e.target.value || "0").toFixed(2)),
                        })
                      }
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
