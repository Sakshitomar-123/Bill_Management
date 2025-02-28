import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const ResponsiveTableContainer = styled.div`
  overflow-x: auto;
`;

function CustomersList() {
  const customers = useSelector((state) => state.bills.customers);

  return (
    <Container>
      <Title>Customers List</Title>
      
      {customers.length > 0 ? (
        <ResponsiveTableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Client Name</Th>
                <Th>Product Quantity</Th>
                <Th>Billing Date</Th>
                <Th>Contact Details</Th>
                <Th>Address</Th>
                <Th>Billing Price</Th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <Td>{customer.customerName}</Td>
                  <Td>{customer.productQuantity}</Td>
                  <Td>{customer.billingDate}</Td>
                  <Td>{customer.customerMobile}</Td>
                  <Td>{customer.customerAddress}</Td>
                  <Td>${customer.billingPrice.toFixed(2)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ResponsiveTableContainer>
      ) : (
        <EmptyState>
          <p>No customers found. Generate a bill to add customers.</p>
        </EmptyState>
      )}
    </Container>
  );
}

export default CustomersList;