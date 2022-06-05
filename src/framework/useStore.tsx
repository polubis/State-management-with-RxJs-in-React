import { useEffect, useMemo, useState } from "react";
import { createStore, Config } from "./createStore";

export const useStore = <V, C extends Config<V>>(initValue: V, config: C) => {
  const store = useMemo(() => createStore(initValue, config), []);
  const [currentValue, setCurrentValue] = useState(store.value);

  useEffect(() => {
    const sub = store.value$.subscribe((value) => setCurrentValue(value));

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const { value, value$, ...handlers } = store;

  return [currentValue, handlers] as const;
};
