import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Config, createStore } from "./createStore";

interface ProviderProps {
  children: ReactNode;
}

export const createContextStore = <V, C extends Config<V>>(
  initValue: V,
  config: C
) => {
  const prepareStore = () => createStore(initValue, config);

  type ContextToProvide = Omit<
    ReturnType<typeof prepareStore>,
    "value$" | "value"
  > & { value: V };

  const Context = createContext<ContextToProvide | null>(null);

  const Provider = ({ children }: ProviderProps) => {
    const store = useMemo(prepareStore, []);
    const storeValue = useRef(store.value);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const sub = store.value$.subscribe((value) => {
        storeValue.current = value;
        setCounter((prevCounter) => prevCounter + 1);
      });

      return () => {
        sub.unsubscribe();
      };
    }, []);

    const providerValue = useMemo(() => {
      const { value, value$, ...handlers } = store;

      return {
        ...handlers,
        value: storeValue.current
      };
    }, [counter]);

    return (
      <Context.Provider value={providerValue}>{children}</Context.Provider>
    );
  };

  const useProvider = () => {
    const ctx = useContext(Context);

    if (!ctx) {
      throw new Error("Lack of provider for context");
    }

    return ctx;
  };

  return [Provider, useProvider] as const;
};
