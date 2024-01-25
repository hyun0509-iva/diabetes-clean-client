import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from "react";

type HandlerType = (e: ChangeEvent<HTMLInputElement>) => void;
type ReturnTypes<T> = [T, Dispatch<SetStateAction<T>>, HandlerType];

export const useInput = <T = string>(value: T): ReturnTypes<T> => {
  const [input, setInput] = useState<T>(value);
  const onHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value as T);
  }, []);
  return [input, setInput, onHandler];
};

/* 
<T = string>(value?: null) => (T | Dispatch<SetStateAction<T | null>> | ((e: ChangeEvent<HTMLInputElement>) => void) | null)[]

*/
