
import { createContext, useState, useContext, type ReactNode, type Dispatch, type SetStateAction} from 'react';



interface IGeneralContext {
  isOpen: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
  loaded: boolean;
  setLoaded: Dispatch<SetStateAction<boolean>>;
  mainScroller: globalThis.ScrollSmoother | null;
  setMainScroller: Dispatch<SetStateAction<globalThis.ScrollSmoother | null>>;
}
const GeneralContext = createContext<IGeneralContext>({
  isOpen: false,
  loaded: false,
  setLoaded: () => { throw new Error("setIsOpenMenu() called outside of a GeneralContext") },
  setIsOpenMenu: () => { throw new Error("setIsOpenMenu() called outside of a GeneralContext") },
  mainScroller: null,
  setMainScroller: () => { throw new Error("setMainScroller() called outside of a GeneralContext") }
});


const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpenMenu] = useState(false);
  const [mainScroller, setMainScroller] = useState<globalThis.ScrollSmoother | null>(null);


  const value = { isOpen, setIsOpenMenu, mainScroller, setMainScroller, setLoaded, loaded};

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};

const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (context === undefined) {
    throw new Error('useGeneralContext must be used within a GeneralProvider');
  }
  return context;
};

export {useGeneralContext,GeneralProvider}