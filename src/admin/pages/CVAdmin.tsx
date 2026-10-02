import { useEffect, useState } from "react";
import {
  listCvEntries,
  saveCvChanges,
  deleteCvPair,
  buildCvPairs,
  SaveCvPairInput,
} from "admin/api/cv";
import { CvEntryRow } from "admin/interfaces";
import { PageTitle, Input, Button } from "admin/styles/FormStyles";
import { SmallButton } from "admin/styles/ImageUploaderStyles";
import {
  Sections,
  SectionTitle,
  CategorySection,
  YearGroup,
  YearLabel,
  PairRow,
  AddRow,
  YearInput,
} from "admin/styles/CVAdminStyles";

const CATEGORIES: { key: CvEntryRow["category"]; ko: string; en: string }[] = [
  { key: "education", ko: "학력", en: "Education" },
  { key: "soloExhibition", ko: "개인전", en: "Solo Exhibition" },
  { key: "groupExhibition", ko: "단체전", en: "Group Exhibition" },
];

interface PairDraft extends SaveCvPairInput {}

let tempIdCounter = 0;
const nextTempId = () => `new-${Date.now()}-${tempIdCounter++}`;

const BilingualAddForm = ({
  onAdd,
}: {
  onAdd: (year: number, koreanContent: string, englishContent: string) => void;
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [koreanContent, setKoreanContent] = useState("");
  const [englishContent, setEnglishContent] = useState("");

  const handleSubmit = () => {
    if (!koreanContent.trim() && !englishContent.trim()) return;
    onAdd(year, koreanContent.trim(), englishContent.trim());
    setKoreanContent("");
    setEnglishContent("");
  };

  return (
    <AddRow>
      <YearInput
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <Input
        placeholder="한글 내용"
        value={koreanContent}
        onChange={(e) => setKoreanContent(e.target.value)}
        style={{ flex: 1 }}
      />
      <Input
        placeholder="English content"
        value={englishContent}
        onChange={(e) => setEnglishContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        style={{ flex: 1 }}
      />
      <SmallButton onClick={handleSubmit}>+ 추가</SmallButton>
    </AddRow>
  );
};

const CVAdmin = () => {
  const [pairs, setPairs] = useState<PairDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadFromDb = () => {
    listCvEntries().then((data) => {
      const loaded: PairDraft[] = buildCvPairs(data).map((pair) => ({
        pairId: pair.pairId,
        isNew: false,
        category: pair.category,
        year: pair.year,
        sortOrder: pair.sortOrder,
        koreanId: pair.korean?.id,
        englishId: pair.english?.id,
        korean: pair.korean?.content ?? "",
        english: pair.english?.content ?? "",
      }));
      setPairs(loaded);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadFromDb();
  }, []);

  const updatePair = (pairId: string, changes: Partial<PairDraft>) => {
    setPairs((prev) => prev.map((p) => (p.pairId === pairId ? { ...p, ...changes } : p)));
  };

  const handleAddBoth = (
    category: CvEntryRow["category"],
    year: number,
    koreanContent: string,
    englishContent: string,
  ) => {
    const bucketPairCount = pairs.filter((p) => p.category === category && p.year === year).length;
    setPairs((prev) => [
      ...prev,
      {
        pairId: nextTempId(),
        isNew: true,
        category,
        year,
        sortOrder: bucketPairCount,
        korean: koreanContent,
        english: englishContent,
      },
    ]);
  };

  const handleDeletePair = async (pair: PairDraft) => {
    if (pair.isNew) {
      setPairs((prev) => prev.filter((p) => p.pairId !== pair.pairId));
      return;
    }
    if (!window.confirm("이 항목을 삭제하시겠습니까?")) return;
    await deleteCvPair(pair.pairId);
    setPairs((prev) => prev.filter((p) => p.pairId !== pair.pairId));
  };

  const handleMovePair = (yearPairs: PairDraft[], index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= yearPairs.length) return;
    const a = yearPairs[index];
    const b = yearPairs[targetIndex];
    setPairs((prev) =>
      prev.map((p) => {
        if (p.pairId === a.pairId) return { ...p, sortOrder: b.sortOrder };
        if (p.pairId === b.pairId) return { ...p, sortOrder: a.sortOrder };
        return p;
      }),
    );
  };

  const handleSave = async () => {
    if (!window.confirm("저장하시겠습니까?")) return;
    setSaving(true);
    try {
      await saveCvChanges(pairs);
      loadFromDb();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PageTitle>CV</PageTitle>
        <Button type="button" onClick={handleSave} disabled={saving}>
          저장
        </Button>
      </div>
      <Sections>
        {CATEGORIES.map((cat) => {
          const catPairs = pairs.filter((p) => p.category === cat.key);
          const years = Array.from(new Set(catPairs.map((p) => p.year))).sort((a, b) => b - a);
          return (
            <CategorySection key={cat.key}>
              <SectionTitle>
                {cat.ko} / {cat.en}
              </SectionTitle>
              {years.map((year) => {
                const yearPairs = catPairs
                  .filter((p) => p.year === year)
                  .sort((a, b) => a.sortOrder - b.sortOrder);
                return (
                  <YearGroup key={year}>
                    <YearLabel>{year}</YearLabel>
                    {yearPairs.map((pair, index) => (
                      <PairRow key={pair.pairId}>
                        <Input
                          placeholder="한글 내용"
                          value={pair.korean}
                          onChange={(e) => updatePair(pair.pairId, { korean: e.target.value })}
                          style={{ flex: 1 }}
                        />
                        <Input
                          placeholder="English content"
                          value={pair.english}
                          onChange={(e) => updatePair(pair.pairId, { english: e.target.value })}
                          style={{ flex: 1 }}
                        />
                        <SmallButton
                          disabled={index === 0}
                          onClick={() => handleMovePair(yearPairs, index, "up")}
                        >
                          ↑
                        </SmallButton>
                        <SmallButton
                          disabled={index === yearPairs.length - 1}
                          onClick={() => handleMovePair(yearPairs, index, "down")}
                        >
                          ↓
                        </SmallButton>
                        <SmallButton onClick={() => handleDeletePair(pair)}>삭제</SmallButton>
                      </PairRow>
                    ))}
                  </YearGroup>
                );
              })}
              <BilingualAddForm
                onAdd={(year, koreanContent, englishContent) =>
                  handleAddBoth(cat.key, year, koreanContent, englishContent)
                }
              />
            </CategorySection>
          );
        })}
      </Sections>
      <div style={{ marginTop: "24px" }}>
        <Button type="button" onClick={handleSave} disabled={saving}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default CVAdmin;
