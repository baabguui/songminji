import { supabase } from "lib/supabaseClient";
import { PopupRow } from "admin/interfaces";
import { compressImageToJpeg } from "admin/utils/image";

const BUCKET = "assets";

export function getPublicUrl(storagePath: string): string {
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

export async function listPopups(): Promise<PopupRow[]> {
  const { data, error } = await supabase.from("popups").select("*").order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPopup(id: string): Promise<PopupRow> {
  const { data, error } = await supabase.from("popups").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as PopupRow;
}

export async function createPopup(params: {
  file: File;
  link: string;
  start_date: string;
  end_date: string;
  sort_order: number;
}): Promise<PopupRow> {
  const compressed = await compressImageToJpeg(params.file);
  const storagePath = `popup/${crypto.randomUUID()}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, compressed, { contentType: "image/jpeg" });
  if (uploadError) throw new Error(uploadError.message);

  const { data, error } = await supabase
    .from("popups")
    .insert({
      storage_path: storagePath,
      link: params.link,
      start_date: params.start_date,
      end_date: params.end_date,
      sort_order: params.sort_order,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as PopupRow;
}

export async function updatePopup(
  id: string,
  fields: { link: string; start_date: string; end_date: string },
  newFile?: File,
): Promise<void> {
  let storagePathUpdate: { storage_path: string } | {} = {};

  if (newFile) {
    const existing = await getPopup(id);
    const compressed = await compressImageToJpeg(newFile);
    const storagePath = `popup/${crypto.randomUUID()}.jpg`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, compressed, { contentType: "image/jpeg" });
    if (uploadError) throw new Error(uploadError.message);
    await supabase.storage.from(BUCKET).remove([existing.storage_path]);
    storagePathUpdate = { storage_path: storagePath };
  }

  const { error } = await supabase
    .from("popups")
    .update({ ...fields, ...storagePathUpdate })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deletePopup(id: string): Promise<void> {
  const popup = await getPopup(id);
  await supabase.storage.from(BUCKET).remove([popup.storage_path]);
  const { error } = await supabase.from("popups").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
