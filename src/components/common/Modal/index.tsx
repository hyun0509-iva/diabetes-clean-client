import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useRef,
  useState
} from "react";
import { useEffect } from "react";
import { CloseBtn, ModalContainer, ModalWrap } from "./styles";
import { createPortal } from "react-dom";
import modalState from "store/modalState";

interface IModal {
  children: React.ReactNode;
  isOpenModal: boolean;
}

const Modal: FC<IModal> = ({ isOpenModal, children }) => {
  const { closeModal } = modalState();
  const domRef = useRef<Element | null>();
  const [isMountedModal, setIsMountedModal] = useState(false);
  const [localVisible, setLocalVisible] = useState(isOpenModal);
  const [animate, setAnimate] = useState(false);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    setIsMountedModal(true);
    if (document) {
      const rootModal = document.getElementById("root-modal");
      domRef.current = rootModal; // ref에 root-modal 전달.
    }
    return () => {
      setIsMountedModal(false);
    };
  }, []);

  useEffect(() => {
    let t: any;
    if (localVisible && !isOpenModal) {
      setAnimate(true);
      t = setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(isOpenModal);
    return () => {
      clearTimeout(t);
    };
  }, [localVisible, isOpenModal]);

  if (!localVisible && !animate) return null;

  const renderLayout = (element: ReactNode) => {
    if (domRef.current && isMountedModal) {
      return createPortal(element, domRef.current);
    }
  };

  return (
    <>
      {renderLayout(
        <ModalWrap disappear={!isOpenModal} onClick={closeModal}>
          <ModalContainer onClick={stopPropagation}>
            <CloseBtn>
              <span onClick={closeModal}>&times;</span>
            </CloseBtn>
            {children}
          </ModalContainer>
        </ModalWrap>
      )}
    </>
  );
};

export default memo(Modal);
