import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "admin/contexts/AuthContext";
import { Shell, Nav, NavLink, SignOutButton, Main } from "admin/styles/AdminLayoutStyles";

const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <Shell>
      <Nav>
        <NavLink to="/admin/exhibitions">Exhibitions</NavLink>
        <NavLink to="/admin/cv">CV</NavLink>
        <SignOutButton onClick={handleSignOut}>Sign out</SignOutButton>
      </Nav>
      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
};

export default AdminLayout;
