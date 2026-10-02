import { supabase } from "lib/supabaseClient";
import { ExhibitionRow, ExhibitionContentRow } from "admin/interfaces";
import { compressImageToJpeg } from "admin/utils/image";

const BUCKET = "assets";

export async function listExhibitions(): Promise<ExhibitionRow[]> {
  const { data, error } = await supabase
    .from("exhibitions")
    .select("*")
    .order("year", { ascending: false })
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getExhibition(
  id: string,
): Promise<{ exhibition: ExhibitionRow; contents: ExhibitionContentRow[] }> {
  const [
    { data: exhibition, error: exhibitionError },
    { data: contents, error: contentsError },
  ] = await Promise.all([
    supabase.from("exhibitions").select("*").eq("id", id).single(),
    supabase
      .from("exhibition_contents")
      .select("*")
      .eq("exhibition_id", id)
      .order("position"),
  ]);
  if (exhibitionError) throw new Error(exhibitionError.message);
  if (contentsError) throw new Error(contentsError.message);
  return { exhibition: exhibition as ExhibitionRow, contents: contents ?? [] };
}

export async function upsertExhibition(exhibition: ExhibitionRow): Promise<void> {
  const { error } = await supabase.from("exhibitions").upsert(exhibition);
  if (error) throw new Error(error.message);
}

export async function deleteExhibition(id: string): Promise<void> {
  const [{ data: exhibition }, { data: contents }] = await Promise.all([
    supabase.from("exhibitions").select("pdf_storage_path").eq("id", id).single(),
    supabase.from("exhibition_contents").select("storage_path").eq("exhibition_id", id),
  ]);

  const paths = (contents ?? []).map((c) => c.storage_path);
  if (exhibition?.pdf_storage_path) paths.push(exhibition.pdf_storage_path);
  if (paths.length > 0) {
    await supabase.storage.from(BUCKET).remove(paths);
  }

  const { error } = await supabase.from("exhibitions").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function uploadExhibitionPdfFile(
  exhibitionId: string,
  file: File,
): Promise<{ pdfStoragePath: string; pdfFilename: string }> {
  const pdfStoragePath = `exhibitions/${exhibitionId}/document.pdf`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(pdfStoragePath, file, { upsert: true, contentType: "application/pdf" });
  if (uploadError) throw new Error(uploadError.message);

  const pdfFilename = file.name.replace(/\.pdf$/i, "");
  return { pdfStoragePath, pdfFilename };
}

export async function removeExhibitionPdfFile(pdfStoragePath: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([pdfStoragePath]);
}

export async function deleteContent(content: ExhibitionContentRow): Promise<void> {
  await supabase.storage.from(BUCKET).remove([content.storage_path]);
  const { error } = await supabase.from("exhibition_contents").delete().eq("id", content.id);
  if (error) throw new Error(error.message);
}

export type PendingContentItem =
  | { type: "existing"; row: ExhibitionContentRow }
  | { type: "new"; file: File; caption?: string };

/**
 * Applies a batch of locally-staged content edits (adds/removes/reorders) in
 * one go: deletes removed rows, uploads+inserts new ones, and re-numbers
 * `position` for everything to match the final on-screen order.
 */
export async function commitContentChanges(
  exhibitionId: string,
  items: PendingContentItem[],
  deletedRows: ExhibitionContentRow[],
): Promise<ExhibitionContentRow[]> {
  for (const row of deletedRows) {
    await deleteContent(row);
  }

  const results: ExhibitionContentRow[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type === "existing") {
      if (item.row.position !== i) {
        const { error } = await supabase
          .from("exhibition_contents")
          .update({ position: i })
          .eq("id", item.row.id);
        if (error) throw new Error(error.message);
      }
      results.push({ ...item.row, position: i });
    } else {
      const compressed = await compressImageToJpeg(item.file);
      const storagePath = `exhibitions/${exhibitionId}/${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, compressed, { contentType: "image/jpeg" });
      if (uploadError) throw new Error(uploadError.message);

      const trimmedCaption = item.caption?.trim() || null;
      const { data, error } = await supabase
        .from("exhibition_contents")
        .insert({
          exhibition_id: exhibitionId,
          position: i,
          category: trimmedCaption ? "work" : "foreground",
          storage_path: storagePath,
          work_ref: null,
          caption: trimmedCaption,
        })
        .select()
        .single();
      if (error) throw new Error(error.message);
      results.push(data as ExhibitionContentRow);
    }
  }
  return results;
}

export function getPublicUrl(storagePath: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}
