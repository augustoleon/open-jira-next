import { EntriesState } from './';
import { Entry } from '../../interfaces';


type EntriesActionType = 
    | { type: '[Entry] - Add-Entry', payload: Entry } 

// No es recomendado crear efectos secundarios dentro de un reducer
export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

   switch (action.type) {
      case '[Entry] - Add-Entry':
         return {
            ...state,
            entries: [...state.entries, action.payload]
          }

       default:
          return state;
   }

}