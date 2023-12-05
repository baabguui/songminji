export default interface Exhibition {
  title: string;
  id: number;
  place: string;
  works: {
    id: number;
  }[];
}
