import { supabase } from "lib/supabaseClient";
import { CvEntryRow } from "admin/interfaces";

export interface CvPair {
  pairId: string;
  category: CvEntryRow["category"];
  year: number;
  sortOrder: number;
  korean?: CvEntryRow;
  english?: CvEntryRow;
}

export function buildCvPairs(entries: CvEntryRow[]): CvPair[] {
  const byPairId = new Map<string, CvPair>();
  for (const entry of entries) {
    let pair = byPairId.get(entry.pair_id);
    if (!pair) {
      pair = {
        pairId: entry.pair_id,
        category: entry.category,
        year: entry.year,
        sortOrder: entry.sort_order,
      };
      byPairId.set(entry.pair_id, pair);
    }
    if (entry.language === "korean") pair.korean = entry;
    else pair.english = entry;
  }
  return Array.from(byPairId.values());
}

export async function listCvEntries(): Promise<CvEntryRow[]> {
  const { data, error } = await supabase
    .from("cv_entries")
    .select("*")
    .order("year", { ascending: false })
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addCvPair(params: {
  category: CvEntryRow["category"];
  year: number;
  koreanContent: string;
  englishContent: string;
  sort_order: number;
}): Promise<CvEntryRow[]> {
  const pairId = crypto.randomUUID();
  const rows: Partial<CvEntryRow>[] = [];
  if (params.koreanContent) {
    rows.push({
      pair_id: pairId,
      language: "korean",
      category: params.category,
      year: params.year,
      content: params.koreanContent,
      sort_order: params.sort_order,
    });
  }
  if (params.englishContent) {
    rows.push({
      pair_id: pairId,
      language: "english",
      category: params.category,
      year: params.year,
      content: params.englishContent,
      sort_order: params.sort_order,
    });
  }
  const { data, error } = await supabase.from("cv_entries").insert(rows).select();
  if (error) throw new Error(error.message);
  return (data ?? []) as CvEntryRow[];
}

export async function addCvEntryToPair(params: {
  pair_id: string;
  language: CvEntryRow["language"];
  category: CvEntryRow["category"];
  year: number;
  content: string;
  sort_order: number;
}): Promise<CvEntryRow> {
  const { data, error } = await supabase.from("cv_entries").insert(params).select().single();
  if (error) throw new Error(error.message);
  return data as CvEntryRow;
}

export async function updateCvEntryContent(id: string, content: string): Promise<void> {
  const { error } = await supabase.from("cv_entries").update({ content }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteCvPair(pairId: string): Promise<void> {
  const { error } = await supabase.from("cv_entries").delete().eq("pair_id", pairId);
  if (error) throw new Error(error.message);
}

export interface SaveCvPairInput {
  pairId: string;
  isNew: boolean;
  category: CvEntryRow["category"];
  year: number;
  sortOrder: number;
  koreanId?: string;
  englishId?: string;
  korean: string;
  english: string;
}

/**
 * Applies every locally-staged CV edit (content changes, newly added pairs,
 * reordering) in one batch, called once when the admin clicks the page-level
 * Save button.
 */
export async function saveCvChanges(pairs: SaveCvPairInput[]): Promise<void> {
  for (const pair of pairs) {
    if (pair.isNew) {
      if (pair.korean.trim() || pair.english.trim()) {
        await addCvPair({
          category: pair.category,
          year: pair.year,
          koreanContent: pair.korean.trim(),
          englishContent: pair.english.trim(),
          sort_order: pair.sortOrder,
        });
      }
      continue;
    }

    if (pair.koreanId) {
      await updateCvEntryContent(pair.koreanId, pair.korean);
      await supabase.from("cv_entries").update({ sort_order: pair.sortOrder }).eq("id", pair.koreanId);
    } else if (pair.korean.trim()) {
      await addCvEntryToPair({
        pair_id: pair.pairId,
        language: "korean",
        category: pair.category,
        year: pair.year,
        content: pair.korean.trim(),
        sort_order: pair.sortOrder,
      });
    }

    if (pair.englishId) {
      await updateCvEntryContent(pair.englishId, pair.english);
      await supabase.from("cv_entries").update({ sort_order: pair.sortOrder }).eq("id", pair.englishId);
    } else if (pair.english.trim()) {
      await addCvEntryToPair({
        pair_id: pair.pairId,
        language: "english",
        category: pair.category,
        year: pair.year,
        content: pair.english.trim(),
        sort_order: pair.sortOrder,
      });
    }
  }
}

