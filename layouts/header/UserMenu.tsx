//import node modules libraries
"use client";
import { IconLock, IconLogin2 } from "@tabler/icons-react";
import useAdmin from "hooks/useAdmin";
import Link from "next/link";
import React from "react";
import { Dropdown } from "react-bootstrap";

//import routes files
// import { UserMenuItem } from "routes/HeaderRoute";

//import custom components
import { Avatar } from "components/common/Avatar";
import { getAssetPath } from "helper/assetPath";

interface UserToggleProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
const CustomToggle = React.forwardRef<HTMLAnchorElement, UserToggleProps>(
  ({ children, onClick }, ref) => (
    <Link ref={ref} href="#" onClick={onClick}>
      {children}
    </Link>
  )
);

const UserMenu = () => {
  const admin = useAdmin();
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <Avatar
          type="image"
          src={getAssetPath("/images/avatar/avatar.jpg")}
          size="xs"
          alt="User Avatar"
          className="rounded-circle"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="p-0 dropdown-menu-sm">
        <div className="align-items-center border-dashed border-bottom px-4 py-4">
          <h4 className="mb-0 fs-6 text-center">{admin?.username || "username"}</h4>
        </div>
        {/* <div className="p-3 d-flex flex-column gap-1">
          {UserMenuItem.map((item) => (
            <Dropdown.Item
              key={item.id}
              className="d-flex align-items-center gap-2"
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Dropdown.Item>
          ))}
        </div> */}

        <div className="border-dashed border-top mb-2 pt-2 px-2">
          <Link
            href="/changePassword"
            className="text-secondary fw-bold d-flex align-items-center gap-2">
            <span>
              <IconLock size={20} strokeWidth={1.5} />
            </span>
            <span>संकेतशब्द बदला</span>
          </Link>
        </div>
        
        <div className="mb-4 pt-4 px-3">
          <Link
            href="logout"
            className="text-secondary fw-bold d-flex align-items-center gap-2"
            onClick={(e) => {
              e.preventDefault(); // prevent default link behavior
              // Logout logic
              sessionStorage.removeItem("admin");
              window.location.href = "/sign-in"; // redirect to login
            }}
          >
            <span>
              <IconLogin2 size={20} strokeWidth={1.5} />
            </span>
            <span>लॉग आऊट</span>
          </Link>
        </div>


      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
