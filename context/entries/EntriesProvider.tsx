import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}


const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Una línea de descripción pendiente',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'Una línea de descripción en progreso',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Una línea de descripción finalizada',
            status: 'done',
            createdAt: Date.now() - 100000,
        }
    ],
}


export const EntriesProvider:FC = ({ children }) => {
    const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );

    return (
        <EntriesContext.Provider value={{
            ...state,
            entries: [],
        }}>
            { children }
        </EntriesContext.Provider>
    )
};