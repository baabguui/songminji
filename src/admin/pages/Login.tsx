import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "admin/contexts/AuthContext";
import {
  FormContainer,
  FieldRow,
  Label,
  Input,
  Button,
  ErrorText,
  PageTitle,
} from "admin/styles/FormStyles";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error);
      return;
    }
    navigate("/admin/exhibitions");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "15vh" }}>
      <FormContainer onSubmit={handleSubmit}>
        <PageTitle>Admin Login</PageTitle>
        <FieldRow>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FieldRow>
        <FieldRow>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FieldRow>
        {error && <ErrorText>{error}</ErrorText>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </FormContainer>
    </div>
  );
};

export default Login;
