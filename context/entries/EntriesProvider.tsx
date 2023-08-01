import { FC, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import axios from 'axios';
import { entriesApi } from '../../api';

export interface EntriesState {
    entries: Entry[];
};


const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}; 


export const EntriesProvider:FC = ({ children }) => {
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
    

    const addNewEntry = ( description: string ) => {
        
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        };

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry});
    };

    const updateEntry = (entry: Entry) => {
        dispatch({type: '[Entry] - Entry-Updated', payload: entry})
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