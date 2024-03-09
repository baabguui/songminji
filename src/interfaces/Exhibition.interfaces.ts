export default interface Exhibition {
  title: string;
  id: number;
  place: string;
  period: string;
  works: {
    id: number;
  }[];
  year: number;
}
