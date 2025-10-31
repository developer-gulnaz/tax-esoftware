"use client";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";

// import custom components
import DashboardStats from "components/dashboard/DashboardStats";
import TaskProgress from "components/dashboard/TaskProgress";

const HomePage = () => {
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    const admin = sessionStorage.getItem("admin");
    if (!admin) {
      router.push("/sign-in");
    }
  }, [router]);

  // Set page title
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <Fragment>
      <Row className="g-6 mb-6">
        <DashboardStats />
      </Row>
      <Row className="g-6 mb-6">
        <Col xl={8}>
          <TaskProgress />
        </Col>
      </Row>
    </Fragment>
  );
};

export default HomePage;
