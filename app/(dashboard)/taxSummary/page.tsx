"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";

export default function TaxSummaryPage() {
  const router = useRouter();

  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "वसूली सारांश";
  }, []);

  return (
    <div className="custom-container">
      <h3 className="fw-bold mb-4"> वसूली सारांश</h3>

      <Row className="g-4">
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            <p className="text-muted">
              येथे वसूली सारांश माहिती येईल...
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
