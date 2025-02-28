import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import {
  SidebarContainer,
  Logo,
  Navigation,
  NavItem,
  LogoutButton,
} from "../assets/Header.styled";

function Sidebar({ isMobileOpen, toggleMobileSidebar }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  return (
    <SidebarContainer isMobileOpen={isMobileOpen}>
      <Logo>Bill Management</Logo>

      <Navigation>
        <NavItem to="/customers" onClick={handleNavClick}>
          Customers List
        </NavItem>

        <NavItem to="/bill-generator" onClick={handleNavClick}>
          Bill Generator
        </NavItem>
      </Navigation>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarContainer>
  );
}

export default Sidebar;
