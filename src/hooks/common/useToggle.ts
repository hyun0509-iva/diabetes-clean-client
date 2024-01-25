import { useState, useCallback, Dispatch } from "react";

type ReturnTypes = [boolean, Dispatch<boolean>, () => void];

export const useToggle = (): ReturnTypes => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);
  return [toggle, setToggle, onToggle];
};
