
import { types } from '../types/types';

const initialState = {
    notes: [],
    active: null
}


export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        //to show note in  notes>NoteScreen  
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload //..spread
                }
            }
            
        //we add the newnote to the prevous notes
        case  types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
    
            //we just modified the selected note and keep the others we the same info
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( note => 
                    note.id === action.payload.id //note to modify
                        ? action.payload.note //modify its content
                        : note //just keep the same
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            } 

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state
    }


}