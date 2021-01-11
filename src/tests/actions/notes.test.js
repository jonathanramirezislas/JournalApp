import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


jest.setTimeout(5000)

import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const  store= mockStore({
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '02L6n2ZPdEgpELw8y7ML',
            title: 'Hola',
            body: 'Mundo'
        }
    }
});


describe('Pruebas con las acciones de notes', ()=>{
    beforeAll(done => {
        done()
      })
      
      afterAll(done => {
        done()
      })


    test('debe de crear una nueva nota startNewNote', async() =>{


        //we save a nnote in firebase but with empty data but contains idsuer, idnote, date
        await store.dispatch(startNewNote());


        const actions = store.getActions();//we see what actions were dispatch
        console.log(actions);

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


})