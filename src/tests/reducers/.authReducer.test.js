import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Pruebas en authReducer', () => {
    
    test('debe de realizar el login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: '4545',
                displayName: 'Jonathan'
            }
        };

        //we execute the the reducer , here is not necessary use dispatch
        const state = authReducer( initState, action );//return a  new  state(object)

        expect( state ).toEqual({
            uid: '4545',
            name: 'Jonathan'
        })

        
    })

    test('debe de realizar el logout', () => {

        //here we supose that we have  our user alredy in the store
        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Jonathan'
        };

        const action = {
            type: types.logout,
        };
        //return a empty state({})
        const state = authReducer( initState, action );

        expect( state ).toEqual({});
 
    })

    test('no debe de hacer cambios en el state', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Fernando'
        };
            //as we don't have any action with that type it has to return the sate without any change
        const action = {
            type: 'asdjkasd',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
 
    })
    

})
