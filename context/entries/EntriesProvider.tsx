import { FC, useReducer, useEffect } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../api';

interface Props {
    children: React.ReactNode;
}
export interface EntriesState {
    entries: Entry[];
};


const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}; 


export const EntriesProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE );

    const refreshEntries = async() => {
        try {
            const { data } = await entriesApi.get<Entry[]>('/entries')
            dispatch({ type: '[Entry] - Refresh-Data', payload: data })
            
        } catch (error) {
            console.log('error catch', error);
        }
    };
    useEffect(() => {
      refreshEntries();
    }, [])
    

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post('/entries', { description });
        dispatch({ type: '[Entry] - Add-Entry', payload: data});
    };

    const updateEntry = async({ _id, description, status}: Entry) => {
        try {
            const { data } = await entriesApi.put(`/entries/${ _id}`, { description, status });
            dispatch({type: '[Entry] - Entry-Updated', payload: data})
            
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};