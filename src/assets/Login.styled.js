import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg,rgb(31, 14, 49) 0%,rgb(13, 15, 121) 100%);
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg,rgb(7, 119, 230),rgb(23, 143, 73));
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.75rem;
  font-weight: 600;
`;

const InputGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(to right,rgb(32, 126, 220),rgb(24, 35, 194));
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(to right, #95a5a6, #7f8c8d);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export {
  Button,
  ErrorMessage,
  Input,
  Label,
  InputGroup,
  Title,
  LoginForm,
  LoginContainer,
};
