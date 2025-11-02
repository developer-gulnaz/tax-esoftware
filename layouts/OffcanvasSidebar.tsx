"use client";
//import node modules libraries
import useAdmin from "hooks/useAdmin";
import Offcanvas from "react-bootstrap/Offcanvas";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";

//import custom components
import Sidebar from "./Sidebar";

//import custom hooks
import useMenu from "hooks/useMenu";
import Link from "node_modules/next/link";

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
          <span className="fw-bold fs-4  site-logo-text"> logo
            {/* <Image src={getAssetPath("/images/brand/logo/logo-icon.svg")} alt="Logo" /> */}
          </span>
        </Link>

      </OffcanvasHeader>
      <OffcanvasBody className="p-0 ">
        <Sidebar hideLogo />
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default OffcanvasSidebar;
