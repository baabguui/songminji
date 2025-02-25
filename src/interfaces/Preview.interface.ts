interface ExhibitionPreview {
  id: string;
  title: string;
  place: string;
  period: string;
}

type ExhibitionsByYear = Record<string, ExhibitionPreview[]>;
