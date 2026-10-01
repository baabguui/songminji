import { useState } from "react";
import {
  addContent,
  deleteContent,
  swapContentPositions,
  getPublicUrl,
} from "admin/api/exhibitions";
import { ExhibitionContentRow } from "admin/interfaces";
import { Input } from "admin/styles/FormStyles";
import { SmallButton } from "admin/styles/ImageUploaderStyles";
import {
  List,
  Row,
  Thumb,
  Info,
  Actions,
  AddSection,
  AddRow,
} from "admin/styles/ContentEntryEditorStyles";

interface ContentEntryEditorProps {
  exhibitionId: string;
  initialContents: ExhibitionContentRow[];
}

const ContentEntryEditor = ({ exhibitionId, initialContents }: ContentEntryEditorProps) => {
  const [contents, setContents] = useState<ExhibitionContentRow[]>(initialContents);
  const [hasCaption, setHasCaption] = useState(false);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const content = await addContent(exhibitionId, file, hasCaption ? caption : undefined);
      setContents((prev) => [...prev, content]);
      setHasCaption(false);
      setCaption("");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id: string) => {
    const content = contents.find((c) => c.id === id);
    if (!content) return;
    await deleteContent(content);
    setContents((prev) => prev.filter((c) => c.id !== id));
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= contents.length) return;
    const a = contents[index];
    const b = contents[targetIndex];
    await swapContentPositions(a, b);
    const next = [...contents];
    next[index] = { ...a, position: b.position };
    next[targetIndex] = { ...b, position: a.position };
    next.sort((x, y) => x.position - y.position);
    setContents(next);
  };

  return (
    <div>
      <List>
        {contents.map((content, index) => (
          <Row key={content.id}>
            <Thumb src={getPublicUrl(content.storage_path)} alt="" />
            <Info>{content.caption && <span>{content.caption}</span>}</Info>
            <Actions>
              <SmallButton disabled={index === 0} onClick={() => handleMove(index, "up")}>
                ↑
              </SmallButton>
              <SmallButton
                disabled={index === contents.length - 1}
                onClick={() => handleMove(index, "down")}
              >
                ↓
              </SmallButton>
              <SmallButton onClick={() => handleDelete(content.id)}>삭제</SmallButton>
            </Actions>
          </Row>
        ))}
      </List>

      <AddSection>
        <AddRow>
          <label>
            <input
              type="checkbox"
              checked={hasCaption}
              onChange={(e) => setHasCaption(e.target.checked)}
            />{" "}
            캡션 추가
          </label>
          {hasCaption && (
            <Input
              placeholder="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{ width: "260px" }}
            />
          )}
        </AddRow>
        <AddRow>
          <input type="file" accept="image/*" onChange={handleAdd} disabled={busy} />
          {busy && <span>업로드 중...</span>}
        </AddRow>
      </AddSection>
    </div>
  );
};

export default ContentEntryEditor;
