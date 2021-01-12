import 'jsdom-global/register'; //at the top of file , even  , before importing react

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Jonathan'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>

)




describe('Pruebas en <NoteScreen />', () => {

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    })


    test('debe de disparar el active note', () => {

        //get input and simulate to change its content
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        //we have to use toHaveBeenLastCalledWith because the firts time is when we use our custome hookForm and stablish the firs values
        //so we care the last time o second time when we establish the new values
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'mundo',
                title: 'Hola de nuevo',
                id: 1234,
                date: 0
            }
        );

        
    })
    

    

    
})
