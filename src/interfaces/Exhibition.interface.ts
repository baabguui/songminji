interface Exhibition {
  id: string;
  title: string;
  place: string;
  period: string;
  datas: ExhibitionData[];
}

interface ExhibitionData {
  category: string;
  id: number;
  title?: string;
}
