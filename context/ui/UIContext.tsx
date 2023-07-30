import { createContext } from 'react';

interface ContextProps {
    // creamos un contexto en donde definimos el tipo de dato que recibe nuestra app 
    sidemenuOpen: boolean;

    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;
}


export const UIContext = createContext({} as ContextProps );

