import styled from "styled-components";
import { Link } from "react-router-dom";

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: NotoSansKR, NotoSans, sans-serif;
`;

const Nav = styled.nav`
  width: 180px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 16px;
  border-right: 1px solid #e0e0e0;
`;

const NavLink = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  color: inherit;
`;

const SignOutButton = styled.button`
  margin-top: auto;
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #ccc;
  background: none;
  cursor: pointer;
  border-radius: 4px;
`;

const Main = styled.main`
  flex: 1;
  padding: 32px;
  max-width: 900px;
`;

export { Shell, Nav, NavLink, SignOutButton, Main };
