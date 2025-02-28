import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import CustomersList from '../components/CustomersList';
import BillGenerator from '../components/BillGenerator';
import Header from '../components/Header';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <DashboardContainer>
      <Sidebar isMobileOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar} />
      
      <Content>
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        
        <Routes>
          <Route path="/" element={<Navigate to="/customers" />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/bill-generator" element={<BillGenerator />} />
        </Routes>
      </Content>
    </DashboardContainer>
  );
}

export default Dashboard;