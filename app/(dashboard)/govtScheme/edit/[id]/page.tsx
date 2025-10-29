"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

export default function EditGovtSchemePage() {
    const router = useRouter();
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        schemeName: "",
        schemeCode: "",
        description: "",
    });

    useEffect(() => {
        const admin = sessionStorage.getItem("admin");
        if (!admin) router.push("/sign-in");
    }, [router]);

    useEffect(() => { (document.title = "योजना सुधारणा") }, []);
    
    useEffect(() => {
        fetch(`/api/govtScheme?id=${id}`)
            .then((res) => res.json())
            .then((res) => {
                setFormData({
                    schemeName: res.data.schemeName,
                    schemeCode: res.data.schemeCode,
                    description: res.data.description || "",
                });
                setFetching(false);
            });
    }, [id]);

    const handleChange = (e: any) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(`/api/govtScheme?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("✅ सुधारणा यशस्वी!");
            router.push("/govtScheme");
        }
        setLoading(false);
    };

    if (fetching)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );

    return (
        <div className="custom-container">
            <h3 className="fw-bold mb-4">योजना सुधारणा</h3>

            <div className="p-4 bg-light shadow-sm rounded-3">
                <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>योजनेचे नाव</Form.Label>
                                <Form.Control
                                    name="schemeName"
                                    value={formData.schemeName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>योजना कोड</Form.Label>
                                <Form.Control
                                    name="schemeCode"
                                    value={formData.schemeCode}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>शेरा</Form.Label>
                                <Form.Control
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12} className="text-end mt-3">
                            <Button type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : "जतन करा"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}
