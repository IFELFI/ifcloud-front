import { create } from 'zustand';

type State = {
  elementRefs: Map<string, React.RefObject<HTMLElement>>;
  backgroundWindowRef: React.RefObject<HTMLElement> | null;
  windowRefs: Map<string, React.RefObject<HTMLElement>>;
  menuRef: React.RefObject<HTMLElement> | null;
};

type Action = {
  setElementRef: (key: string, ref: React.RefObject<HTMLElement>) => void;
  getElementRefByKey: (
    key: string
  ) => React.RefObject<HTMLElement> | undefined;
  setBackgroundWindowRef: (ref: React.RefObject<HTMLElement>) => void;
  setWindowRef: (key: string, ref: React.RefObject<HTMLElement>) => void;
  getWindowByKey: (key: string) => React.RefObject<HTMLElement> | undefined;
  setMenuRef: (ref: React.RefObject<HTMLElement>) => void;
};

const initialState: State = {
  elementRefs: new Map(),
  backgroundWindowRef: null,
  windowRefs: new Map(),
  menuRef: null,
};

export const useRefStore = create<State & Action>((set, get) => ({
  elementRefs: initialState.elementRefs,
  windowRefs: initialState.windowRefs,
  backgroundWindowRef: initialState.backgroundWindowRef,
  menuRef: initialState.menuRef,
  setElementRef: (key, ref) => {
    set((state) => {
      if (state.elementRefs) {
        state.elementRefs.set(key, ref);
      }
      return { elementRefs: state.elementRefs };
    });
  },
  getElementRefByKey: (key) => {
    return get().elementRefs.get(key);
  },
  setBackgroundWindowRef: (ref) => {
    set({ backgroundWindowRef: ref });
  },
  setWindowRef: (key, ref) => {
    set((state) => {
      if (state.windowRefs) {
        state.windowRefs.set(key, ref);
      }
      return { windowRefs: state.windowRefs };
    });
  },
  getWindowByKey: (key) => {
    return get().windowRefs.get(key);
  },
  setMenuRef: (ref) => {
    set({ menuRef: ref });
  },
}));
