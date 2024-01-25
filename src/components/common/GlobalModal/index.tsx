import Modal from "components/common/Modal";
import { modalState } from "store/modalState";
import { Container } from "styles/common";

interface IDetail {
  isOpenModal: boolean;
}

const GlobalModal = ({ isOpenModal }: IDetail) => {
  const { modal } = modalState();

  return (
    <Modal isOpenModal={isOpenModal}>
      <Container>{modal?.props}</Container>
    </Modal>
  );
};

export default GlobalModal;
