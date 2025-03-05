import {
  ModalContainer,
  ModalContentContainer,
  ModalImage,
  ModalCaption,
} from "styles/ModalStyles";

const Modal = ({ isOpen, onClose, data, children }: ModalProps) => {
  return (
    <>
      {children}
      {isOpen && data && (
        <ModalContainer onClick={onClose}>
          <ModalContentContainer onClick={(e) => e.stopPropagation()}>
            <ModalImage src={data?.url ?? ""} />
            <ModalCaption>{data?.title ?? ""}</ModalCaption>
          </ModalContentContainer>
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
