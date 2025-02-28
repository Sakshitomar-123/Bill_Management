import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserEmail = styled.span`
  font-weight: 500;
`;

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

export { UserEmail, UserInfo, MenuButton, HeaderContainer ,
    LogoutButton,NavItem,Navigation,Logo,SidebarContainer
};
