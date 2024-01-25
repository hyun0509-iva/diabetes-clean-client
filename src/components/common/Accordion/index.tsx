import { Accordion_wrap } from "./styles";
import AccordionItem from "./AccordionItem";

export interface IAccordion {
  title: string;
  desc: string | Array<string>;
}

export interface IData {
  data: IAccordion[];
}

const Accordion = ({ data }: IData) => {
  return (
    <Accordion_wrap>
      {data.map((item, idx) => (
        <AccordionItem key={idx} {...item} />
      ))}
    </Accordion_wrap>
  );
};

export default Accordion;
