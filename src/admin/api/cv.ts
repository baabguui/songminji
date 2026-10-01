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

export async function swapCvPairPositions(pairA: CvPair, pairB: CvPair): Promise<void> {
  const SENTINEL = -1;
  const languages: CvEntryRow["language"][] = ["korean", "english"];

  for (const language of languages) {
    const a = language === "korean" ? pairA.korean : pairA.english;
    const b = language === "korean" ? pairB.korean : pairB.english;

    if (a && b) {
      await supabase.from("cv_entries").update({ sort_order: SENTINEL }).eq("id", a.id);
      await supabase.from("cv_entries").update({ sort_order: a.sort_order }).eq("id", b.id);
      await supabase.from("cv_entries").update({ sort_order: b.sort_order }).eq("id", a.id);
    } else if (a && !b) {
      await supabase.from("cv_entries").update({ sort_order: pairB.sortOrder }).eq("id", a.id);
    } else if (!a && b) {
      await supabase.from("cv_entries").update({ sort_order: pairA.sortOrder }).eq("id", b.id);
    }
  }
}
