import { createContext } from 'react';

interface ContextProps {
    // creamos un contexto en donde definimos el tipo de dato que recibe nuestra app 
    sidemenuOpen: boolean;
    isAddingEntry: boolean;

    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;

    setIsAddingEntry: (isAdding: boolean) => void;
}


export const UIContext = createContext({} as ContextProps );

