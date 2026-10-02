interface ExhibitionPreview {
  id: string;
  title: string;
  place: string;
}

type ExhibitionsByYear = Record<string, ExhibitionPreview[]>;
