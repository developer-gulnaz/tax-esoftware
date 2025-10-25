"use client";
//import node modules libraries
import { IconCircleCheck, IconCircleDashedCheck } from "@tabler/icons-react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

//import custom components
import CustomProgressBar from "components/common/CustomProgressBar";
import DasherTippy from "components/common/DasherTippy";

const TaskProgress = () => {
  return (
    <Card className="card-lg mb-6">
      <CardBody>
        <div className="mb-4">
          <h5 className="mb-0">कार्य प्रगति</h5>
        </div>
        <div className="fs-1 fw-bold mb-3">64%</div>
        <div className="d-flex align-items-center gap-1 w-100 mb-4">
          <div className="w-25">
            <DasherTippy content="Completed">
              <CustomProgressBar
                className="mb-2"
                now={100}
                style={{ height: "3px" }}
                variant="info-light"
              />
            </DasherTippy>
            24%
          </div>
          <div className="w-50">
            <DasherTippy content="Pending">
              <CustomProgressBar
                className="mb-2"
                now={100}
                style={{ height: "3px" }}
                variant="warning-light"
              />
            </DasherTippy>
            30%
          </div>
          <div className="w-50">
            <DasherTippy content="In Progress">
              <CustomProgressBar
                className="mb-2"
                now={100}
                style={{ height: "3px" }}
                variant="success-light"
              />
            </DasherTippy>
            25%
          </div>
          <div className="w-50">
            <DasherTippy content="Up Coming">
              <CustomProgressBar
                className="mb-2"
                now={100}
                style={{ height: "3px" }}
                variant="danger-light"
              />
            </DasherTippy>
            30%
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-4">
          <Row className="g-3">
            <Col md={3}>
              <Card className="card-lg">
                <CardBody className="text-center p-3">
                  <div className="icon-shape icon-lg bg-info-subtle text-info-emphasis rounded-pill">
                    <IconCircleCheck size={20} />
                  </div>
                  <div className="lh-1 mt-4">
                    <div className="fs-4 fw-bold mb-1">555</div>
                    <div className="text-secondary fw-bold small">मूल्यांकन</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-lg">
                <CardBody className="text-center p-3">
                  <div className="icon-shape icon-lg bg-warning-subtle text-info-emphasis rounded-pill">
                    <IconCircleCheck size={20} />
                  </div>
                  <div className="lh-1 mt-4">
                    <div className="fs-4 fw-bold mb-1">98988</div>
                    <div className="text-secondary fw-bold small">मागणी</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-lg">
                <CardBody className="text-center p-3">
                  <div className="icon-shape icon-lg bg-success-subtle text-success-emphasis rounded-pill">
                    <IconCircleCheck size={20} />
                  </div>
                  <div className="lh-1 mt-4">
                    <div className="fs-4 fw-bold mb-1">180982</div>
                    <div className="text-secondary fw-bold small">वसूली</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="card-lg">
                <CardBody className="text-center p-3">
                  <div className="icon-shape icon-lg bg-danger-subtle text-danger-emphasis rounded-pill">
                    <IconCircleDashedCheck size={20} />
                  </div>
                  <div className="lh-1 mt-4">
                    <div className="fs-4 fw-bold mb-1">845549</div>
                    <div className="text-secondary fw-bold small">थकबाकी</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskProgress;
