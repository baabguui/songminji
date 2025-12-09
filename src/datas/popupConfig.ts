export interface Popup {
  id: string;
  imagePath: string;
  link: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

export const POPUP_LIST: Popup[] = [
  {
    id: "olm_popup",
    imagePath: "/assets/popup/olm.jpeg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfy6B9W5GkU-ACoH5dlUMfq6yNT2U3R5xCptaKVF_QryKd-Uw/viewform",
    startDate: "2025-10-28",
    endDate: "2025-11-28",
  },
];
