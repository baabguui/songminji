import styled from "styled-components";

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 720px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryTitle = styled.h4`
  font-size: 13px;
  color: #555;
  margin: 0;
`;

const YearGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const YearLabel = styled.span`
  font-size: 12px;
  color: #888;
`;

const PairRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AddRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 4px;
`;

const YearInput = styled.input`
  width: 64px;
  padding: 6px 8px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export {
  Sections,
  SectionTitle,
  CategorySection,
  CategoryTitle,
  YearGroup,
  YearLabel,
  PairRow,
  AddRow,
  YearInput,
};
