import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveTableContainer,
  EmptyState,
  Td,
  Th,
  Table,
  Title,
  Container,
} from "../assets/CustomersList.styled";

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
