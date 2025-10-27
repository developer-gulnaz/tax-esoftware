//import node modules libraries
import { Col, Card, CardBody } from "react-bootstrap";

//import required data files
import { DashboardStatsData } from "data/DashboardData";
import Link from "node_modules/next/link";

const DashboardStats = () => {
  return (
    <>
      {DashboardStatsData.map((stat) => (
        <Col xl={3} md={6} key={stat.id}>
          <Link href={stat.link}>
            <Card className={`card-lg ${stat.bgColor}`}>
              <CardBody className="d-flex flex-column gap-8">
                <div className="justify-content-center align-items-center text-center">
                  <div>
                    <div className="fw-semibold">{stat.title}</div>
                  </div>
                  <div className={`py-3 ${stat.textColor}`}>{stat.icon}</div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </Col>
      ))}
    </>
  );
};

export default DashboardStats;
