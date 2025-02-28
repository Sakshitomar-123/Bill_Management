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

export {ResponsiveTableContainer,EmptyState,Td,Th,Table,Title,Container}