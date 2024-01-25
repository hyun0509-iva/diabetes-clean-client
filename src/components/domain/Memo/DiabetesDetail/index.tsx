import React, { useCallback } from "react";
import { BsFillTrash2Fill, BsPencilSquare } from "react-icons/bs";
import dayjs from "dayjs";
import { timeIcons } from "libs/time-icons";
import { useAPIByIdQuery } from "hooks/service/queries";
import { useDelDiabetes } from "hooks/service/mutator";
import alertHandler, { alertMessage } from "utils/functions/alertHandler";
import { getDiabetesFindById } from "utils/apis/diabetesApis";
import {
  DetailContainer,
  DetailModalContent,
  DetailModalHeader
} from "components/common/GlobalModal/styles";
import { DIABETES_KEY } from "constants/query_key";
import { IDiabetesInfo, IDiabetesResponse } from "models/data";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "constants/router_path";
import modalState from "store/modalState";

interface Iprops {
  id: string;
}
const { UPDATE_DIABETES } = ROUTER_PATH;
const DiabetesDetail = ({ id }: Iprops) => {
  const { closeModal } = modalState();
  const navigate = useNavigate();
  const { data, isError } = useAPIByIdQuery<IDiabetesResponse>(
    id,
    DIABETES_KEY,
    getDiabetesFindById
  );
  const diabetes = data?.diabetesInfo as IDiabetesInfo;

  const iconData = timeIcons.find(({ itemIcons_desc }) =>
    diabetes?.slot?.includes(itemIcons_desc)
  );

  const useMutate = useDelDiabetes();

  const onDelDiabetes = useCallback(() => {
    if (diabetes?._id) {
      alertHandler
        .onConfirm({
          msg: "삭제하면 복구하기 어렵습니다. 그래도 삭제하실건가요?"
        })
        .then((result) => {
          if (result.isConfirmed) {
            useMutate.mutate(diabetes._id);
            alertHandler.onToast({ msg: alertMessage.delMsg });
            closeModal();
          } else if (result.isDismissed) {
            alertHandler.onToast({ msg: alertMessage.cancelMsg });
            closeModal();
          }
        });
    }
  }, [diabetes?._id, closeModal, useMutate]);

  const onEditDiabetes = useCallback(() => {
    navigate(`${UPDATE_DIABETES}`, { state: id });
    closeModal();
  }, [closeModal, id, navigate]);

  if (isError) {
    return (
      <div>
        당수치 데이터를 불러오는데 실패했습니다.
        <br />
        네트워크를 확인해주세요!
      </div>
    );
  }
  return (
    <DetailContainer>
      <DetailModalHeader>
        <div className="btn_ctrl">
          <button
            onClick={onDelDiabetes}
            className="btn_icon"
            title="당수치 삭제"
          >
            <BsFillTrash2Fill color="#B29CA0" size={20} />
          </button>
          <button
            onClick={onEditDiabetes}
            className="btn_icon"
            title="당수치 수정"
          >
            <BsPencilSquare color="#B29CA0" size={20} />
          </button>
        </div>
        <span className="date">
          <span>
            {dayjs(diabetes?.createdAt).format("MM월 DD일 dddd")}
            &nbsp;
          </span>
          <span>({dayjs(diabetes?.createdAt).format("HH:mm")})</span>
        </span>
      </DetailModalHeader>
      <DetailModalContent>
        <div className="cnt-item sugar_level">
          <div className="left">
            <span className="icon">{iconData?.itemIcons_icon}</span>
            &nbsp;
            <span className="time">{diabetes?.slot}</span>
          </div>
          <div className="right">
            <span>{diabetes?.sugar_level}mg/dl</span>
          </div>
        </div>
        <div className="cnt-item note">
          <p>{diabetes?.note || "기록한 내용이 없습니다."}</p>
        </div>
      </DetailModalContent>
    </DetailContainer>
  );
};

export default DiabetesDetail;
