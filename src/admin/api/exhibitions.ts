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

export async function uploadExhibitionPdf(
  exhibitionId: string,
  file: File,
): Promise<{ pdfStoragePath: string; pdfFilename: string }> {
  const pdfStoragePath = `exhibitions/${exhibitionId}/document.pdf`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(pdfStoragePath, file, { upsert: true, contentType: "application/pdf" });
  if (uploadError) throw new Error(uploadError.message);

  const pdfFilename = file.name.replace(/\.pdf$/i, "");
  const { error } = await supabase
    .from("exhibitions")
    .update({ pdf_storage_path: pdfStoragePath, pdf_filename: pdfFilename })
    .eq("id", exhibitionId);
  if (error) throw new Error(error.message);

  return { pdfStoragePath, pdfFilename };
}

export async function deleteExhibitionPdf(
  exhibitionId: string,
  pdfStoragePath: string,
): Promise<void> {
  await supabase.storage.from(BUCKET).remove([pdfStoragePath]);
  const { error } = await supabase
    .from("exhibitions")
    .update({ pdf_storage_path: null, pdf_filename: null })
    .eq("id", exhibitionId);
  if (error) throw new Error(error.message);
}

async function nextContentPosition(exhibitionId: string): Promise<number> {
  const { data } = await supabase
    .from("exhibition_contents")
    .select("position")
    .eq("exhibition_id", exhibitionId)
    .order("position", { ascending: false })
    .limit(1);
  return data && data.length > 0 ? data[0].position + 1 : 0;
}

export async function addContent(
  exhibitionId: string,
  file: File,
  caption?: string,
): Promise<ExhibitionContentRow> {
  const compressed = await compressImageToJpeg(file);
  const storagePath = `exhibitions/${exhibitionId}/${crypto.randomUUID()}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, compressed, { contentType: "image/jpeg" });
  if (uploadError) throw new Error(uploadError.message);

  const trimmedCaption = caption?.trim() || null;
  const position = await nextContentPosition(exhibitionId);
  const { data, error } = await supabase
    .from("exhibition_contents")
    .insert({
      exhibition_id: exhibitionId,
      position,
      category: trimmedCaption ? "work" : "foreground",
      storage_path: storagePath,
      work_ref: null,
      caption: trimmedCaption,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ExhibitionContentRow;
}

export async function deleteContent(content: ExhibitionContentRow): Promise<void> {
  await supabase.storage.from(BUCKET).remove([content.storage_path]);
  const { error } = await supabase.from("exhibition_contents").delete().eq("id", content.id);
  if (error) throw new Error(error.message);
}

export async function swapContentPositions(
  a: ExhibitionContentRow,
  b: ExhibitionContentRow,
): Promise<void> {
  const SENTINEL = -1;
  await supabase.from("exhibition_contents").update({ position: SENTINEL }).eq("id", a.id);
  await supabase.from("exhibition_contents").update({ position: a.position }).eq("id", b.id);
  await supabase.from("exhibition_contents").update({ position: b.position }).eq("id", a.id);
}

export function getPublicUrl(storagePath: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}
