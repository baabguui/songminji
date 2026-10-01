import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const Thumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CategoryBadge = styled.span`
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
`;

const AddSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px dashed #ccc;
  border-radius: 4px;
`;

const AddRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export { List, Row, Thumb, Info, CategoryBadge, Actions, AddSection, AddRow };
