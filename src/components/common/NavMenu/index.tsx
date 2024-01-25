import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  DetailedHTMLProps,
  HTMLAttributes,
  FC
} from "react";
import { Link, useLocation } from "react-router-dom";
import { NavMenutWrap } from "./styles";

type commonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type listsType = {
  id: number;
  label: string;
  url?: string | null;
};

interface customType {
  lists: listsType[];
  borderColor?: string;
  bgColor?: string;
  fontSize?: string | number;
}

const NavMenu: FC<customType & commonProps> = ({ lists, ...rest }) => {
  const { pathname } = useLocation();
  const listChildrenRefs = useRef<HTMLElement[]>([]);
  const selectedElRef = useRef<HTMLElement | null>(null);
  const activeRef = useRef<HTMLLIElement | null>(null);

  const Lists = useMemo(() => lists, [lists]);
  const paths = pathname.split("/");
  const currentPathName = decodeURI(paths[paths.length - 1]);

  const onSelectedMenu = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const targetEl = listChildrenRefs.current.find((el) => el === e.target);
      selectedElRef.current = targetEl as HTMLElement;
    },
    []
  );

  /**
   * 현재 url(currentPathName)과 해당 메뉴 item의 링크 url(targetPathName)과 같은지를 판단해주는 함수
   * @param lists
   * @returns number
   */
  const getPathNameIdx = useCallback(
    (lists: listsType[]): number => {
      return lists.findIndex((item) => {
        const urlparts = (item.url as string).split("/");
        const targetPathName = urlparts[urlparts.length - 1];
        return targetPathName === currentPathName;
      });
    },
    [currentPathName]
  );

  const pathNameIdx =
    Lists[0].url && (getPathNameIdx(Lists) < 0 ? 0 : getPathNameIdx(Lists));
  const activeLiPos =
    Number(pathNameIdx) * Number((100 / lists.length).toFixed(1));

  useEffect(() => {
    if (activeRef.current) {
      const curElementPos = activeLiPos;
      activeRef.current.style.left = `${curElementPos}%`;
    }
  }, [Lists, activeLiPos, selectedElRef]);

  const pushToRefs = useCallback(
    (el: any) => listChildrenRefs.current.push(el),
    []
  );
  return (
    <NavMenutWrap {...rest}>
      <ul>
        <li
          className="active"
          ref={activeRef}
          style={{ left: `${activeLiPos}%` }}
        ></li>
        {Lists.map((list, idx) => (
          <li key={idx} onClick={onSelectedMenu}>
            {list.url ? (
              <Link to={list.url} ref={pushToRefs}>
                {list.label}
              </Link>
            ) : (
              <span ref={pushToRefs}>{list.label}</span>
            )}
          </li>
        ))}
      </ul>
    </NavMenutWrap>
  );
};

export default React.memo(NavMenu);
