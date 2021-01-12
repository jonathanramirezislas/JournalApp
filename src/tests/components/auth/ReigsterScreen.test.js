import 'jsdom-global/register'; // before importing react to use mount

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>

)


describe('Pruebas en <RegisterScreen />', () => {

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    })


    test('debe de hacer el dispatch de la acción respectiva', () => {
        


        //get element from the form
        const emailField = wrapper.find('input[name="email"]');

        //simulate change in the input
        emailField.simulate('change', {
            target: {
                value: '',//invalid value for a email
                name: 'email' 
            }
        });
        
        //simulate the sumbit of form 
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        
        //so we don't input a valid valie the action has to have
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
        
    })
    
    
    test('debe de mostrar la caja de alerta con el error', () => {

        //initial state 
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        };
        //store
        const store = mockStore(initState);
        
        // mount 
        const wrapper = mount( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );

        //we expect in the form is a element with the id .auth__ ...
        expect( wrapper.find('.auth__alert-error').exists()  ).toBe(true);
        //we expect the content of that element is the error from the store
        expect( wrapper.find('.auth__alert-error').text().trim()  ).toBe( initState.ui.msgError );


        
    })
    


    
})
