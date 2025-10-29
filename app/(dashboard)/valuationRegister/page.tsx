"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";

export default function ValuationRegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) router.push("/sign-in");
  }, [router]);

  useEffect(() => {
    document.title = "मूल्यांकन पत्रक (नमुना 8)";
  }, []);

  return (
    <div className="custom-container">
      <h3 className="fw-bold mb-4"> मूल्यांकन पत्रक (नमुना 8)
</h3>

      <Row className="g-4">
        <Col md={12}>
          <div className="p-4 bg-light shadow-sm rounded-3">
            <p className="text-muted">
              येथे मूल्यांकन पत्रक (नमुना 8) माहिती येईल...
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
