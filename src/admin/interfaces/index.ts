export interface ExhibitionRow {
  id: string;
  title: string;
  place: string;
  period: string;
  year: number;
  pdf_storage_path: string | null;
  pdf_filename: string | null;
  sort_order: number;
}

export interface ExhibitionContentRow {
  id: string;
  exhibition_id: string;
  position: number;
  category: "foreground" | "work";
  storage_path: string;
  work_ref: string | null;
  caption: string | null;
}

export interface CvEntryRow {
  id: string;
  pair_id: string;
  language: "korean" | "english";
  category: "education" | "soloExhibition" | "groupExhibition";
  year: number;
  content: string;
  sort_order: number;
}
