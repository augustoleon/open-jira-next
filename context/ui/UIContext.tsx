import { createContext } from 'react';

interface ContextProps {
    // creamos un contexto en donde definimos el tipo de dato que recibe nuestra app 
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;

    setIsAddingEntry: (isAdding: boolean) => void;

    endDragging: () => void;
    startDragging: () => void;
}


export const UIContext = createContext({} as ContextProps );

