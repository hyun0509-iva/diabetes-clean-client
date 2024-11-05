import { AccordionWarp } from "./styles";
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
    <AccordionWarp>
      {data.map((item, idx) => (
        <AccordionItem key={idx} {...item} />
      ))}
    </AccordionWarp>
  );
};

export default Accordion;
