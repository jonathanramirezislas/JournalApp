import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


//jest.setTimeout(5000)

import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

///simulate a user already in the store
let initState= {
    auth:{
        uid: 'TESTING'
    },
    // notes: {
    //     active: {
    //         id: '9ROPLEXC3sEIg5hg7obz',
    //         title: 'Hola',
    //         body: 'Mundo'
    //     }
    // }
};

let store =mockStore(initState)

describe('Pruebas con las acciones de notes', ()=>{
    
    beforeEach( ()=> {
       store=mockStore(initState);// reset the store to se the actions of each test
    
      })
    

    test('debe de crear una nueva nota startNewNote', async() =>{


        //we save a nnote in firebase but with empty data but contains idsuer, idnote, date
        await store.dispatch(startNewNote());


        const actions = store.getActions();//we see what actions were dispatch
        //  console.log(actions);

        //we expect two actions were dispatch

        //action that activate the note that we add
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //the action where we add the new note
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        // const docId .... action.... payload.... id
        // await ..... db.... doc(``)..... .delete();

        //delete the note from firebase
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();

    })

    test('startLoadingNotes debe de cargar las notas', async()=>{

                                    //IDSUSER IS TESTING     
        await store.dispatch(startLoadingNotes('TESTING'));

        const actions =store.getActions();

       // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        //the note has to have the following properties
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );

    })

    test('startSaveNote debe de actualizar la nota', async() => {


        //ID from firestore 
        const note = {
            id: '9ROPLEXC3sEIg5hg7obz',
            title: 'Titulo',
            body: 'Hola'
        };

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        // console.log(actions);
        
        //it must have dispatched the action notesUpdate 
        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );
        
    })



})