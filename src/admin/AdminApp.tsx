import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "admin/contexts/AuthContext";
import ProtectedRoute from "admin/components/ProtectedRoute";
import AdminLayout from "admin/components/AdminLayout";
import Login from "admin/pages/Login";
import Dashboard from "admin/pages/Dashboard";
import ExhibitionsList from "admin/pages/ExhibitionsList";
import ExhibitionForm from "admin/pages/ExhibitionForm";
import CVAdmin from "admin/pages/CVAdmin";
import PopupsList from "admin/pages/PopupsList";
import PopupForm from "admin/pages/PopupForm";

const AdminApp = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="exhibitions" element={<ExhibitionsList />} />
            <Route path="exhibitions/new" element={<ExhibitionForm />} />
            <Route path="exhibitions/:id/edit" element={<ExhibitionForm />} />
            <Route path="cv" element={<CVAdmin />} />
            <Route path="popups" element={<PopupsList />} />
            <Route path="popups/new" element={<PopupForm />} />
            <Route path="popups/:id/edit" element={<PopupForm />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminApp;
