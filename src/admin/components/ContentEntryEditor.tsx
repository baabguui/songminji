import { useState } from "react";
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

export type ContentEditorItem =
  | { type: "existing"; row: ExhibitionContentRow }
  | { type: "new"; file: File; caption?: string; previewUrl: string };

interface ContentEntryEditorProps {
  items: ContentEditorItem[];
  onAdd: (file: File, caption?: string) => void;
  onDelete: (index: number) => void;
  onMove: (index: number, direction: "up" | "down") => void;
  getPublicUrl: (storagePath: string) => string;
}

const ContentEntryEditor = ({
  items,
  onAdd,
  onDelete,
  onMove,
  getPublicUrl,
}: ContentEntryEditorProps) => {
  const [hasCaption, setHasCaption] = useState(false);
  const [caption, setCaption] = useState("");

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    onAdd(file, hasCaption ? caption : undefined);
    setHasCaption(false);
    setCaption("");
  };

  return (
    <div>
      <List>
        {items.map((item, index) => {
          const src = item.type === "existing" ? getPublicUrl(item.row.storage_path) : item.previewUrl;
          const caption = item.type === "existing" ? item.row.caption : item.caption;
          return (
            <Row key={index}>
              <Thumb src={src} alt="" />
              <Info>
                {item.type === "new" && <span>저장 시 업로드됨</span>}
                {caption && <span>{caption}</span>}
              </Info>
              <Actions>
                <SmallButton disabled={index === 0} onClick={() => onMove(index, "up")}>
                  ↑
                </SmallButton>
                <SmallButton
                  disabled={index === items.length - 1}
                  onClick={() => onMove(index, "down")}
                >
                  ↓
                </SmallButton>
                <SmallButton onClick={() => onDelete(index)}>삭제</SmallButton>
              </Actions>
            </Row>
          );
        })}
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
          <input type="file" accept="image/*" onChange={handleAdd} />
        </AddRow>
      </AddSection>
    </div>
  );
};

export default ContentEntryEditor;
