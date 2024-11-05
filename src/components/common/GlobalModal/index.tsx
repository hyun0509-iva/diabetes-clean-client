import Modal from "components/common/Modal";
import { modalState } from "store/modalState";
import { Wapper } from "styles/common";

interface IDetail {
  isOpenModal: boolean;
}

const GlobalModal = ({ isOpenModal }: IDetail) => {
  const { modal } = modalState();

  return (
    <Modal isOpenModal={isOpenModal}>
      <Wapper>{modal?.props}</Wapper>
    </Modal>
  );
};

export default GlobalModal;
