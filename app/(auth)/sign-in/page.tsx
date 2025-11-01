"use client";

import { IconEyeOff, IconEye } from "@tabler/icons-react";
import Flex from "components/common/Flex";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row
} from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gpCode, setGPCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [financialYear, setFinancialYear] = useState("");

  // Generate financial years from 2022-2023 to 2003-2004
  const years = [];
  for (let y = 2024; y >= 2022; y--) {
    years.push(`${y}-${y + 1}`);
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, financialYear }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Optional: store admin info in sessionStorage
      sessionStorage.setItem("admin", JSON.stringify(data.admin));

      // On success, redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Fragment>
      <Row className="mb-8">
        <Col xl={{ span: 4, offset: 4 }} md={12}>
          <div className="text-center">
            <h1 className="mb-1">Welcome Back</h1>

          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xl={5} lg={6} md={8}>
          <Card className="card-lg mb-6">
            <CardBody className="p-6">
              <Form className="mb-6" onSubmit={handleLogin}>
                <div className="mb-3">
                  <FormLabel htmlFor="financialYearInput">
                    Financial Year <span className="text-danger">*</span>
                  </FormLabel>
                  <FormSelect
                    id="financialYearInput"
                    value={financialYear}
                    onChange={(e) => setFinancialYear(e.target.value)}
                    required
                  >
                    <option value="">Select Financial Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    Please select a financial year.
                  </Form.Control.Feedback>
                </div>

                <div className="mb-3">
                  <FormLabel htmlFor="gramPanchayatInput">
                    Gram Panchayat <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="text"
                    id="gramPanchayatInput"
                    value={gpCode}
                    onChange={(e) => setGPCode(e.target.value)}
                    required
                  />
                  <Feedback type="invalid">Please enter gram panchayat.</Feedback>
                </div>

                <div className="mb-3">
                  <FormLabel htmlFor="usernameInput">
                    Username <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="text"
                    id="usernameInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Feedback type="invalid">Please enter Username.</Feedback>
                </div>

                <div className="mb-3">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <div className="password-field position-relative">
                    <FormControl
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="fakePassword pe-5"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="position-absolute end-0 top-50 translate-middle-y me-3"
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <IconEye size={18} stroke={1.5} />
                      ) : (
                        <IconEyeOff size={18} stroke={1.5} />
                      )}
                    </span>
                  </div>
                  <Feedback type="invalid">Please enter password.</Feedback>
                </div>


                {error && (
                  <p className="text-danger text-center mb-3">{error}</p>
                )}

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;
