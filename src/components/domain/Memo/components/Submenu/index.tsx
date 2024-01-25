import NavMenu from "components/common/NavMenu";
import { ROUTER_PATH } from "constants/router_path";

const Submenu = () => {
  const { MEMO_DIABETES, MEMO_DIET } = ROUTER_PATH;
  const subMenus = [
    { id: 1, label: "당수치 내역", url: `${MEMO_DIABETES}` },
    { id: 2, label: "식단 내역", url: `${MEMO_DIET}` }
  ];

  return (
    <NavMenu
      lists={subMenus}
      borderColor="gray"
      bgColor="#f1f3f5"
      style={{ boxShadow: "0px 0px 12px -3px rgb(0 0 0 / 30%)" }}
    />
  );
};

export default Submenu;
