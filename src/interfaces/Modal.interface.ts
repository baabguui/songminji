interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
  children: React.ReactNode;
}

interface ModalData {
  title: string;
  url: string;
}
