import styled from "@emotion/styled";

export const Accordion_wrap = styled.div`
  padding: 15px 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: height 0.3s ease-in-out;
  .accordion-item {
    overflow: hidden;
    box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 20%);
  }
  .accordion_title {
    padding: 20px 15px;
    cursor: pointer;
  }
  .accordion_desc {
    & p {
      padding: 0px 15px;
      height: 0;
      transition: all 0.3s ease-in-out;
    }
  }
  .accordion_desc.on {
    & p {
      padding: 20px 15px;
      display: block;
      height: auto;
    }
  }
`;
