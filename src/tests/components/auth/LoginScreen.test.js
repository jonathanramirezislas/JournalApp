
import 'jsdom-global/register'; //at the top of file , even  , before importing react

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

// store 
let store = mockStore(initState);


//creat a mock of functions
jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}))


//replace the function dispatch from store to jest.fn
store.dispatch = jest.fn();


//Wrapper  MemoryRouter allows has to fake the routes because in loginscreen is there  <Link>
const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen /> 
        </MemoryRouter>
    </Provider>

)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(()=> {
        store = mockStore(initState);
        jest.clearAllMocks();//clear mocks
    })


    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de disparar la acción de startGoogleLogin', () => {
        
        //              css id        simulate click
        wrapper.find('.google-btn').prop('onClick')();
        //has to be call  dispatch( startGoogleLogin() );
        expect( startGoogleLogin ).toHaveBeenCalled();
    })
    
    
    test('debe de disparar el startLogin con los respectivos argumentos', () => {
        

        wrapper.find('form').prop('onSubmit')({ 
            preventDefault(){}
        });

        //  dispatch(startLoginEmailPassword(email,password));  //thes values are already in the form in order to test
        expect( startLoginEmailPassword ).toHaveBeenLastCalledWith('jona@gmail.com','123456');


    })
    
    
})
