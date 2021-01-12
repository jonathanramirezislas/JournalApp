import 'jsdom-global/register'; //at the top of file , even  , before importing react

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';


jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//here we have the following data in the store as we are already logged in
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
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>

)


describe('Pruebas en <Sidebar />', () => {


    test('debe de mostrarse correctamente', () => {
        // snapshot
        expect( wrapper ).toMatchSnapshot();
    })


    test('debe de llamar el startLogout', () => {
        // debe de llamar la acción del logout
        wrapper.find('button').prop('onClick')();

        expect( startLogout ).toHaveBeenCalled()

    })
    
    test('debe de llamar el startNewNote', () => {
        // debe de llamar la acción startNewNote
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();

    })
    
    
})
