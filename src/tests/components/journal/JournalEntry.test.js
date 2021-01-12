import 'jsdom-global/register'; //at the top of file , even  , before importing react

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
};

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...nota }  /> 
    </Provider>

)





describe('Pruebas en <JournalEntry />', () => {


    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        
    });



    test('debe de activar la nota', () => {
        
        //simulate to clic a note in roder to activate
        wrapper.find('.journal__entry').prop('onClick')();

        //has to have dispatch  the note to show it  
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, { ...nota } )
        );

        
    })
    
    

    
})
