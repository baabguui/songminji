import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPopup,
  listPopups,
  createPopup,
  updatePopup,
  deletePopup,
  getPublicUrl,
} from "admin/api/popups";
import {
  FormContainer,
  FieldRow,
  Label,
  Input,
  Button,
  SecondaryButton,
  DangerButton,
  ErrorText,
  PageTitle,
} from "admin/styles/FormStyles";

const PopupForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      listPopups().then((popups) => setSortOrder(popups.length));
      return;
    }
    getPopup(id).then((popup) => {
      setLink(popup.link);
      setStartDate(popup.start_date);
      setEndDate(popup.end_date);
      setSortOrder(popup.sort_order);
      setCurrentImageUrl(getPublicUrl(popup.storage_path));
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!startDate || !endDate) {
      setError("Start/end date is required");
      return;
    }
    try {
      if (isEditing) {
        await updatePopup(id as string, { link, start_date: startDate, end_date: endDate }, file ?? undefined);
      } else {
        if (!file) {
          setError("Image is required");
          return;
        }
        await createPopup({ file, link, start_date: startDate, end_date: endDate, sort_order: sortOrder });
      }
      navigate("/admin/popups");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Delete this popup?")) return;
    await deletePopup(id);
    navigate("/admin/popups");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <PageTitle>{isEditing ? "Edit Popup" : "New Popup"}</PageTitle>
      <FormContainer onSubmit={handleSubmit}>
        <FieldRow>
          <Label>Image {isEditing && "(leave empty to keep current)"}</Label>
          {currentImageUrl && (
            <img src={currentImageUrl} alt="" style={{ width: "160px", objectFit: "contain" }} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </FieldRow>
        <FieldRow>
          <Label>Link URL</Label>
          <Input value={link} onChange={(e) => setLink(e.target.value)} required />
        </FieldRow>
        <FieldRow>
          <Label>Start date</Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </FieldRow>
        <FieldRow>
          <Label>End date</Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </FieldRow>
        {error && <ErrorText>{error}</ErrorText>}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="submit">Save</Button>
          {isEditing && (
            <DangerButton type="button" onClick={handleDelete}>
              Delete Popup
            </DangerButton>
          )}
          <SecondaryButton type="button" onClick={() => navigate("/admin/popups")}>
            Back
          </SecondaryButton>
        </div>
      </FormContainer>
    </div>
  );
};

export default PopupForm;
