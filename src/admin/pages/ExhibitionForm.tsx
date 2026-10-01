import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExhibition,
  listExhibitions,
  upsertExhibition,
  deleteExhibition,
  uploadExhibitionPdf,
  deleteExhibitionPdf,
  getPublicUrl,
} from "admin/api/exhibitions";
import { ExhibitionContentRow } from "admin/interfaces";
import ContentEntryEditor from "admin/components/ContentEntryEditor";
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

const ExhibitionForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [newId, setNewId] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [period, setPeriod] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [sortOrder, setSortOrder] = useState(0);
  const [pdfStoragePath, setPdfStoragePath] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState<string | null>(null);
  const [contents, setContents] = useState<ExhibitionContentRow[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      listExhibitions().then((exhibitions) => setSortOrder(exhibitions.length));
      return;
    }
    getExhibition(id).then(({ exhibition, contents }) => {
      setTitle(exhibition.title);
      setPlace(exhibition.place);
      setPeriod(exhibition.period);
      setYear(exhibition.year);
      setSortOrder(exhibition.sort_order);
      setPdfStoragePath(exhibition.pdf_storage_path);
      setPdfFilename(exhibition.pdf_filename);
      setContents(contents);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const exhibitionId = isEditing ? (id as string) : newId.trim();
    if (!exhibitionId) {
      setError("ID is required");
      return;
    }
    try {
      await upsertExhibition({
        id: exhibitionId,
        title,
        place,
        period,
        year,
        pdf_storage_path: pdfStoragePath,
        pdf_filename: pdfFilename,
        sort_order: sortOrder,
      });
      navigate("/admin/exhibitions");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm(`Delete exhibition "${id}"? This also removes its images/PDF.`)) return;
    await deleteExhibition(id);
    navigate("/admin/exhibitions");
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !id) return;
    const { pdfStoragePath: path, pdfFilename: name } = await uploadExhibitionPdf(id, file);
    setPdfStoragePath(path);
    setPdfFilename(name);
  };

  const handlePdfDelete = async () => {
    if (!id || !pdfStoragePath) return;
    await deleteExhibitionPdf(id, pdfStoragePath);
    setPdfStoragePath(null);
    setPdfFilename(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <PageTitle>{isEditing ? `Edit Exhibition: ${id}` : "New Exhibition"}</PageTitle>
      <FormContainer onSubmit={handleSubmit}>
        {!isEditing && (
          <FieldRow>
            <Label>ID (slug, e.g. "vacancy")</Label>
            <Input value={newId} onChange={(e) => setNewId(e.target.value)} required />
          </FieldRow>
        )}
        <FieldRow>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </FieldRow>
        <FieldRow>
          <Label>Place</Label>
          <Input value={place} onChange={(e) => setPlace(e.target.value)} required />
        </FieldRow>
        <FieldRow>
          <Label>Period</Label>
          <Input value={period} onChange={(e) => setPeriod(e.target.value)} required />
        </FieldRow>
        <FieldRow>
          <Label>Year</Label>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
        </FieldRow>
        {error && <ErrorText>{error}</ErrorText>}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="submit">Save</Button>
          {isEditing && (
            <DangerButton type="button" onClick={handleDelete}>
              Delete Exhibition
            </DangerButton>
          )}
          <SecondaryButton type="button" onClick={() => navigate("/admin/exhibitions")}>
            Back
          </SecondaryButton>
        </div>
      </FormContainer>

      {isEditing && (
        <>
          <div style={{ marginTop: "32px" }}>
            <Label>PDF</Label>
            <div style={{ marginTop: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
              {pdfStoragePath && (
                <>
                  <a href={getPublicUrl(pdfStoragePath)} target="_blank" rel="noreferrer">
                    {pdfFilename}
                  </a>
                  <SecondaryButton type="button" onClick={handlePdfDelete}>
                    Remove PDF
                  </SecondaryButton>
                </>
              )}
              <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
            </div>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Label>Contents (foreground images / work references)</Label>
            <div style={{ marginTop: "8px" }}>
              <ContentEntryEditor exhibitionId={id as string} initialContents={contents} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExhibitionForm;
