import dayjs from "dayjs";
import { timeIcons } from "libs/time-icons";
import { IDiabetesInfo } from "models/data";
import DiabetesDetail from "components/domain/Memo/DiabetesDetail";
import { DiabetesItemWrap, ItemBodyWrap } from "components/domain/Memo/styles";
import modalState from "store/modalState";
dayjs.locale("ko");

const DiabetesItem = ({ _id, sugar_level, slot }: IDiabetesInfo) => {
  const { openModal } = modalState();

  const iconData = timeIcons.find(({ itemIcons_desc }) =>
    slot?.includes(itemIcons_desc)
  );

  return (
    <DiabetesItemWrap
      key={_id}
      className={`${_id}`}
      onClick={() => {
        openModal({
          type: _id,
          isOpen: true,
          props: <DiabetesDetail id={_id} />
        });
      }}
    >
      <ItemBodyWrap>
        <div>
          <span className="item-icon">{iconData?.itemIcons_icon}</span>
          <span className="item-slot">{slot}</span>
        </div>
        <div>
          <div>{sugar_level}mg/dl</div>
        </div>
      </ItemBodyWrap>
    </DiabetesItemWrap>
  );
};

export default DiabetesItem;
