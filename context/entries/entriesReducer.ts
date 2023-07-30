import { EntriesState } from './';


type EntriesActionType = 
    | { type: '[Entries] - entries action' } 

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

   switch (action.type) {
      case '[Entries] - entries action':
         return {
            ...state,
          }

       default:
          return state;
   }

}