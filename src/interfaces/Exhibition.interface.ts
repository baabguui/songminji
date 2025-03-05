interface Exhibition {
  id: string;
  title: string;
  place: string;
  period: string;
  file?: string;
  datas: ExhibitionData[];
}

interface ExhibitionData {
  category: string;
  id: number | string;
  title?: string;
}
