"use client";
import AddPropertyForm from "components/forms/AddPropertyForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export default function AddPropertyPage() {
  const router = useRouter();

  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "Tax Assessment";
  }, []);

  return (

    <Row className="g-4">
      <h3 className="fw-bold mb-4">मालमत्ता नोंदणी फॉर्म</h3>
      <Col md={12}>
        <div className="p-4 bg-light shadow-sm rounded-3">
          <AddPropertyForm />
        </div>
      </Col>
    </Row>
  );
}
