import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExhibition,
  listExhibitions,
  upsertExhibition,
  deleteExhibition,
  uploadExhibitionPdfFile,
  removeExhibitionPdfFile,
  commitContentChanges,
  getPublicUrl,
} from "admin/api/exhibitions";
import ContentEntryEditor, { ContentEditorItem } from "admin/components/ContentEntryEditor";
import { ExhibitionContentRow } from "admin/interfaces";
import { formatPeriod } from "utils/period";
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
  const [placeEn, setPlaceEn] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [sortOrder, setSortOrder] = useState(0);
  const [pdfStoragePath, setPdfStoragePath] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState<string | null>(null);
  const [pendingPdfFile, setPendingPdfFile] = useState<File | null>(null);
  const [pendingPdfRemove, setPendingPdfRemove] = useState(false);
  const [items, setItems] = useState<ContentEditorItem[]>([]);
  const [deletedRows, setDeletedRows] = useState<ExhibitionContentRow[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      listExhibitions().then((exhibitions) => setSortOrder(exhibitions.length));
      return;
    }
    getExhibition(id).then(({ exhibition, contents }) => {
      setTitle(exhibition.title);
      setPlace(exhibition.place);
      setPlaceEn(exhibition.place_en ?? "");
      setPeriodStart(exhibition.period_start ?? "");
      setPeriodEnd(exhibition.period_end ?? "");
      setYear(exhibition.year);
      setSortOrder(exhibition.sort_order);
      setPdfStoragePath(exhibition.pdf_storage_path);
      setPdfFilename(exhibition.pdf_filename);
      setItems(contents.map((row) => ({ type: "existing", row })));
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!window.confirm("저장하시겠습니까?")) return;

    const exhibitionId = isEditing ? (id as string) : newId.trim();
    if (!exhibitionId) {
      setError("ID is required");
      return;
    }
    setSaving(true);
    try {
      let finalPdfStoragePath = pdfStoragePath;
      let finalPdfFilename = pdfFilename;
      if (pendingPdfFile) {
        const { pdfStoragePath: path, pdfFilename: name } = await uploadExhibitionPdfFile(
          exhibitionId,
          pendingPdfFile,
        );
        finalPdfStoragePath = path;
        finalPdfFilename = name;
      } else if (pendingPdfRemove && pdfStoragePath) {
        await removeExhibitionPdfFile(pdfStoragePath);
        finalPdfStoragePath = null;
        finalPdfFilename = null;
      }

      await upsertExhibition({
        id: exhibitionId,
        title,
        place,
        place_en: placeEn.trim() ? placeEn.trim() : null,
        period_start: periodStart || null,
        period_end: periodEnd || null,
        year,
        pdf_storage_path: finalPdfStoragePath,
        pdf_filename: finalPdfFilename,
        sort_order: sortOrder,
      });

      if (isEditing) {
        await commitContentChanges(
          exhibitionId,
          items.map((item) =>
            item.type === "existing"
              ? item
              : { type: "new", file: item.file, caption: item.caption },
          ),
          deletedRows,
        );
      }

      navigate("/admin/exhibitions");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm(`Delete exhibition "${id}"? This also removes its images/PDF.`)) return;
    await deleteExhibition(id);
    navigate("/admin/exhibitions");
  };

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setPendingPdfFile(file);
    setPendingPdfRemove(false);
  };

  const handlePdfRemove = () => {
    setPendingPdfFile(null);
    setPendingPdfRemove(true);
  };

  const handleContentAdd = (file: File, caption?: string) => {
    setItems((prev) => [
      ...prev,
      { type: "new", file, caption, previewUrl: URL.createObjectURL(file) },
    ]);
  };

  const handleContentDelete = (index: number) => {
    const item = items[index];
    if (item.type === "existing") {
      setDeletedRows((prev) => [...prev, item.row]);
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContentMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  if (loading) return <p>Loading...</p>;

  const periodPreview = periodStart && periodEnd ? formatPeriod(periodStart, periodEnd) : "";
  const showPdfLink = !pendingPdfRemove && !pendingPdfFile && pdfStoragePath;

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
          <Label>Place (한글)</Label>
          <Input value={place} onChange={(e) => setPlace(e.target.value)} required />
        </FieldRow>
        <FieldRow>
          <Label>Place (English)</Label>
          <Input value={placeEn} onChange={(e) => setPlaceEn(e.target.value)} />
        </FieldRow>
        <FieldRow>
          <Label>Period Start</Label>
          <Input
            type="date"
            value={periodStart}
            onChange={(e) => setPeriodStart(e.target.value)}
            required
          />
        </FieldRow>
        <FieldRow>
          <Label>Period End</Label>
          <Input
            type="date"
            value={periodEnd}
            onChange={(e) => setPeriodEnd(e.target.value)}
            required
          />
        </FieldRow>
        {periodPreview && <ErrorText style={{ color: "#555" }}>표시 형식: {periodPreview}</ErrorText>}
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
          <Button type="submit" disabled={saving}>
            Save
          </Button>
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
              {showPdfLink && (
                <>
                  <a href={getPublicUrl(pdfStoragePath as string)} target="_blank" rel="noreferrer">
                    {pdfFilename}
                  </a>
                  <SecondaryButton type="button" onClick={handlePdfRemove}>
                    Remove PDF
                  </SecondaryButton>
                </>
              )}
              {pendingPdfFile && <span>{pendingPdfFile.name} (저장 시 업로드됨)</span>}
              {pendingPdfRemove && <span>PDF 삭제됨 (저장 시 반영됨)</span>}
              <input type="file" accept="application/pdf" onChange={handlePdfSelect} />
            </div>
          </div>

          <div style={{ marginTop: "32px" }}>
            <Label>Contents (foreground images / work references)</Label>
            <div style={{ marginTop: "8px" }}>
              <ContentEntryEditor
                items={items}
                onAdd={handleContentAdd}
                onDelete={handleContentDelete}
                onMove={handleContentMove}
                getPublicUrl={getPublicUrl}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExhibitionForm;
