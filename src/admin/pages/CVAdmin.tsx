import { useEffect, useState } from "react";
import {
  listCvEntries,
  addCvPair,
  addCvEntryToPair,
  updateCvEntryContent,
  deleteCvPair,
  swapCvPairPositions,
  buildCvPairs,
  CvPair,
} from "admin/api/cv";
import { CvEntryRow } from "admin/interfaces";
import { PageTitle, Input } from "admin/styles/FormStyles";
import { SmallButton } from "admin/styles/ImageUploaderStyles";
import {
  Sections,
  SectionTitle,
  CategorySection,
  CategoryTitle,
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
  const [entries, setEntries] = useState<CvEntryRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCvEntries().then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  const draftKey = (pairId: string, language: CvEntryRow["language"]) =>
    `${pairId}:${language}`;

  const handleFieldChange = (
    pair: CvPair,
    language: CvEntryRow["language"],
    value: string,
  ) => {
    const existing = language === "korean" ? pair.korean : pair.english;
    if (existing) {
      setEntries((prev) =>
        prev.map((e) => (e.id === existing.id ? { ...e, content: value } : e)),
      );
    } else {
      setDrafts((prev) => ({ ...prev, [draftKey(pair.pairId, language)]: value }));
    }
  };

  const handleFieldBlur = async (pair: CvPair, language: CvEntryRow["language"]) => {
    const existing = language === "korean" ? pair.korean : pair.english;
    if (existing) {
      await updateCvEntryContent(existing.id, existing.content);
      return;
    }
    const key = draftKey(pair.pairId, language);
    const draftValue = drafts[key]?.trim();
    if (!draftValue) return;
    const entry = await addCvEntryToPair({
      pair_id: pair.pairId,
      language,
      category: pair.category,
      year: pair.year,
      content: draftValue,
      sort_order: pair.sortOrder,
    });
    setEntries((prev) => [...prev, entry]);
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleDeletePair = async (pairId: string) => {
    await deleteCvPair(pairId);
    setEntries((prev) => prev.filter((e) => e.pair_id !== pairId));
  };

  const handleMovePair = async (
    yearPairs: CvPair[],
    index: number,
    direction: "up" | "down",
  ) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= yearPairs.length) return;
    const pairA = yearPairs[index];
    const pairB = yearPairs[targetIndex];
    await swapCvPairPositions(pairA, pairB);

    setEntries((prev) =>
      prev.map((e) => {
        if (pairA.korean?.id === e.id || pairA.english?.id === e.id) {
          return { ...e, sort_order: pairB.sortOrder };
        }
        if (pairB.korean?.id === e.id || pairB.english?.id === e.id) {
          return { ...e, sort_order: pairA.sortOrder };
        }
        return e;
      }),
    );
  };

  const handleAddBoth = async (
    category: CvEntryRow["category"],
    year: number,
    koreanContent: string,
    englishContent: string,
  ) => {
    const bucketPairCount = buildCvPairs(entries).filter(
      (p) => p.category === category && p.year === year,
    ).length;
    const newRows = await addCvPair({
      category,
      year,
      koreanContent,
      englishContent,
      sort_order: bucketPairCount,
    });
    setEntries((prev) => [...prev, ...newRows]);
  };

  if (loading) return <p>Loading...</p>;

  const pairs = buildCvPairs(entries);

  return (
    <div>
      <PageTitle>CV</PageTitle>
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
                          value={pair.korean?.content ?? drafts[draftKey(pair.pairId, "korean")] ?? ""}
                          onChange={(e) => handleFieldChange(pair, "korean", e.target.value)}
                          onBlur={() => handleFieldBlur(pair, "korean")}
                          style={{ flex: 1 }}
                        />
                        <Input
                          placeholder="English content"
                          value={
                            pair.english?.content ?? drafts[draftKey(pair.pairId, "english")] ?? ""
                          }
                          onChange={(e) => handleFieldChange(pair, "english", e.target.value)}
                          onBlur={() => handleFieldBlur(pair, "english")}
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
                        <SmallButton onClick={() => handleDeletePair(pair.pairId)}>
                          삭제
                        </SmallButton>
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
    </div>
  );
};

export default CVAdmin;
