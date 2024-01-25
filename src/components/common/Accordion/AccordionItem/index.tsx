import { useState, useCallback } from "react";
import { IAccordion } from "..";

const AccordionItem = ({ title, desc }: IAccordion) => {
  const [showStatus, setShowStatus] = useState(false);
  const onToggle = useCallback(() => {
    setShowStatus((prev) => !prev);
  }, []);
  return (
    <div className="accordion-item">
      <div className="accordion_title" onClick={onToggle}>
        <span>{title}</span>
      </div>
      <div className={`accordion_desc ${showStatus ? "on" : ""}`}>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
