"use client";
//import node module libraries
import {
  IconArrowBarLeft,
  IconArrowBarRight,
  IconMenu2
} from "@tabler/icons-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Container, ListGroup, Navbar } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

//import custom components
import Flex from "components/common/Flex";
import OffcanvasSidebar from "layouts/OffcanvasSidebar";
import UserMenu from "./UserMenu";

//import custom hooks
import useMenu from "hooks/useMenu";
import useAdmin from "hooks/useAdmin";


const Header = () => {
  const { toggleMenuHandler, handleCollapsed } = useMenu();

  const isTablet = useMediaQuery({ maxWidth: 990 });
  const admin = useAdmin();
  const [financialYear, setFinancialYear] = useState("");

  useEffect(() => {
    const fy = sessionStorage.getItem("financialYear");
    setFinancialYear(fy || "");
  }, []);

  const formatFY = (yearString: string) => {
    if (!yearString) return "";
    const [startYear, endYear] = yearString.split("-");
    return `वार्षिक खाती : 01-04-${startYear} ते 31-03-${endYear}`;
  };

  const currentFY = () =>{
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    // FY starts from April
    return month >= 4 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  }


  return (
    <Fragment>
      <Navbar expand="lg" className="navbar-glass py-0 px-lg-3">
        <Container fluid className="px-lg-0">
          <Flex alignItems="center" className="gap-4">
            {isTablet && (
              <div
                className="d-block d-lg-none"
                style={{ cursor: "pointer" }}
                onClick={() => toggleMenuHandler(true)}
              >
                <IconMenu2 size={24} />
              </div>
            )}
            {isTablet || (
              <div>
                <Link href={"#"} className="sidebar-toggle d-flex p-2">
                  <span
                    className="collapse-mini"
                    onClick={() => handleCollapsed("expanded")}
                  >
                    <IconArrowBarLeft
                      size={20}
                      strokeWidth={1.5}
                      className="text-secondary"
                    />
                  </span>
                  <span
                    className="collapse-expanded"
                    onClick={() => handleCollapsed("collapsed")}
                  >
                    <IconArrowBarRight
                      size={20}
                      strokeWidth={1.5}
                      className="text-secondary"
                    />
                  </span>
                </Link>
              </div>
            )}
          </Flex>
          <ListGroup
            bsPrefix="list-unstyled"
            as={"ul"}
            className="d-flex align-items-center mb-0 gap-6"
          >

            <ListGroup.Item as="li">
              <span className="fw-bold fs-6 site-logo-text">{admin?.gpName || " ग्रामपंचायत"}</span>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <span
                className={`fw-bold fs-6 site-logo-text ${financialYear === currentFY() ? "text-danger" : "text-primary"
                  }`}
              >
                {formatFY(financialYear)}
              </span>
            </ListGroup.Item>

            <ListGroup.Item as="li">
              <UserMenu />
            </ListGroup.Item>
          </ListGroup>
        </Container>
      </Navbar>

      {isTablet && <OffcanvasSidebar />}
    </Fragment>
  );
};

export default Header;
