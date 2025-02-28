import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../store/slices/authSlice';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    position: fixed;
    height: 100vh;
    z-index: 1000;
    transform: ${({ isMobileOpen }) => 
      isMobileOpen ? 'translateX(0)' : 'translateX(-100%)'
    };
  }
`;

const Logo = styled.div`
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #34495e;
`;

const Navigation = styled.nav`
  padding: 1rem 0;
`;

const NavItem = styled(NavLink)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;
  
  &:hover, &.active {
    background-color: #34495e;
  }
  
  &.active {
    border-left: 4px solid #3498db;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: #ecf0f1;
  text-align: left;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 2rem;
  
  &:hover {
    background-color: #e74c3c;
  }
`;

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
        <NavItem 
          to="/customers" 
          onClick={handleNavClick}
        >
          Customers List
        </NavItem>
        
        <NavItem 
          to="/bill-generator" 
          onClick={handleNavClick}
        >
          Bill Generator
        </NavItem>
      </Navigation>
      
      <LogoutButton onClick={handleLogout}>
        Logout
      </LogoutButton>
    </SidebarContainer>
  );
}

export default Sidebar;