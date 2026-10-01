import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 480px;
  font-family: NotoSansKR, NotoSans, sans-serif;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #555;
`;

const Input = styled.input`
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background: #222;
  color: #fff;
  cursor: pointer;
  width: fit-content;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const SecondaryButton = styled(Button)`
  background: none;
  color: #222;
  border: 1px solid #ccc;
`;

const DangerButton = styled(Button)`
  background: #c0392b;
`;

const ErrorText = styled.p`
  color: #c0392b;
  font-size: 13px;
  margin: 0;
`;

const PageTitle = styled.h2`
  font-size: 20px;
  font-family: NotoSansKR, NotoSans, sans-serif;
  margin: 0 0 8px 0;
`;

export {
  FormContainer,
  FieldRow,
  Label,
  Input,
  Button,
  SecondaryButton,
  DangerButton,
  ErrorText,
  PageTitle,
};
