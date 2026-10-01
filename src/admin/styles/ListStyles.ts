import styled from "styled-components";
import { Link } from "react-router-dom";

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const NewButton = styled(Link)`
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 4px;
  background: #222;
  color: #fff;
  text-decoration: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-family: NotoSansKR, NotoSans, sans-serif;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  color: #555;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

const RowLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteLink = styled.button`
  border: none;
  background: none;
  color: #c0392b;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
`;

export { ListHeader, NewButton, Table, Th, Td, RowLink, DeleteLink };
