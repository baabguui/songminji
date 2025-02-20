interface Exhibition {
  id: string;
  title: string;
  place: string;
  period: string;
}

type ExhibitionsByYear = Record<string, Exhibition[]>;
