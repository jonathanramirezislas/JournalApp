
import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

//journalapp



export const startNewNote = () => {
    //thanks redux thunk as middleware gives dispacth, getstate
    return async( dispatch, getState ) => {

        //get state from store
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        //save the note in DB firebase 
        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
        dispatch(activeNote(doc.id, newNote))
        dispatch(addNewNote(doc.id, newNote))//to add the new note to the store
    }
}


export const activeNote = (id, note) => ({ 
    
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})


export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

//action to get notes 
export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
                             //get notes from firebase                       
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    }
}

// save notes in store
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        //get id user
        const { uid } = getState().auth;

        //delete url if is not provided
        if ( !note.url ){
            delete note.url;
        }

        //delete the id from the object 
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire('Saved', note.title, 'success');
    }
}

//when some note is update we update the note in the store
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});


export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        //we send the file(image) 
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) )
        

        Swal.close();
    }
}


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {//<- use reduxthunk 
        //get uid the user         
        const uid = getState().auth.uid;
        //delete note from firebase          //id note
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        //Note missing deleting  image from cloudinary
        
        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

//clean notes
export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
