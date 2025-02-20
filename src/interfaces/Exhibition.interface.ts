interface Exhibition {
  id: string;
  title: string;
  place: string;
  period: string;
  datas: ExhibitionData;
}

interface ExhibitionData {
  foreground: number[];
  works: string[];
}
