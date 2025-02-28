import styled from "styled-components";

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

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`;

const FormColumn = styled.div`
  flex: 1;
  padding: 0 0.5rem;
  min-width: 250px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const ProductsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
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

const AddButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const TotalsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;

const TotalsTable = styled.table`
  width: 350px;
  border-collapse: collapse;
`;

const TotalLabel = styled.td`
  text-align: right;
  padding: 0.5rem;
  font-weight: 500;
`;

const TotalValue = styled.td`
  text-align: right;
  padding: 0.5rem;
  width: 120px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;

const SaveButton = styled(ActionButton)`
  background-color: #2ecc71;
  color: white;

  &:hover {
    background-color: #27ae60;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled(ActionButton)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

export {
  DownloadButton,
  SaveButton,
  ActionButton,
  ButtonsContainer,
  RemoveButton,
  TotalLabel,
  Container,
  Title,
  FormGroup,
  FormRow,
  FormColumn,
  Label,
  Input,
  ProductsTable,
  Th,
  Td,
  AddButton,TotalsContainer,TotalsTable,TotalValue
};
