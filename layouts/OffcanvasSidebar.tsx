"use client";
//import node modules libraries
import { Image } from "react-bootstrap";
import useAdmin from "hooks/useAdmin";
import Offcanvas from "react-bootstrap/Offcanvas";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import Link from "next/link";

//import custom components
import Sidebar from "./Sidebar";

//import custom hooks
import useMenu from "hooks/useMenu";
import { getAssetPath } from "helper/assetPath";

const OffcanvasSidebar = () => {
  const { showMenu, toggleMenuHandler } = useMenu();
  const admin = useAdmin();

  return (
    <Offcanvas
      placement={"start"}
      show={showMenu}
      onHide={() => toggleMenuHandler(false)}
      backdrop={true}
      bsPrefix="offcanvasNav offcanvas offcanvas-start "
    >
      <OffcanvasHeader closeButton>
        <Link href="/" className="d-flex align-items-center gap-2">
          <span className="fw-bold fs-4  site-logo-text">
            <span className="fw-bold fs-4 site-logo-text">{admin?.gramPanchayat + " ग्रामपंचायत" || "Gram Panchayat"}</span>

          </span>

        </Link>

      </OffcanvasHeader>
      <OffcanvasBody className="p-0 ">
        <div className="p-5 pt-0">
          {/* <Image src={getAssetPath("/images/brand/logo/logo-icon.svg")} alt="Logo" /> */}
          <h4> brand Logo</h4>
        </div>
        <Sidebar hideLogo />
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default OffcanvasSidebar;
