interface Exhibition {
  id: string;
  title: string;
  place: string;
  period: string;
  year: number;
  pdfUrl?: string;
  pdfFilename?: string;
  contents: ExhibitionContent[];
}

interface ExhibitionContent {
  category: string;
  imageUrl: string;
  caption?: string;
}
