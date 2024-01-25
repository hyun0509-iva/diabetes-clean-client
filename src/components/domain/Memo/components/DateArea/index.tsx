import { DateAreaContainer } from "pages/Memo/styles";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
dayjs.locale(ko);

interface IProps {
  currentDate: string;
  incrementDate: () => void;
  decrementDate: () => void;
}

const DateArea = ({ currentDate, incrementDate, decrementDate }: IProps) => {
  return (
    <DateAreaContainer>
      <div className="btn-wrap">
        <button className="dateCtrlBtn" onClick={decrementDate}>
          <AiOutlineArrowLeft />
        </button>
      </div>
      <div className="dateText-wrap">
        <span className="dateText">{currentDate}</span>
      </div>
      <div className="btn-wrap">
        <button className="dateCtrlBtn" onClick={incrementDate}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </DateAreaContainer>
  );
};

export default DateArea;
