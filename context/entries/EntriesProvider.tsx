import { FC, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

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
    const router = useRouter();

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

    const updateEntry = async({ _id, description, status}: Entry, showSnackbar = false ) => {
        try {
            const { data } = await entriesApi.put(`/entries/${ _id}`, { description, status });
            dispatch({type: '[Entry] - Entry-Updated', payload: data});

            if( showSnackbar ) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
            }
            
        } catch (error) {
            console.log({ error });
        }
    }

    const deleteEntry = async( id:string ) => {
        try{
            await entriesApi.delete(`/entries/${id}`);
            refreshEntries();
            enqueueSnackbar('Eliminado correctamente', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
            router.replace('/')
        } catch (err) {
            console.log({err});
        }
        
    };

    return (
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            refreshEntries,
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};