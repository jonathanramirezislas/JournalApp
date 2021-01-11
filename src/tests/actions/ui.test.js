import { setError, removeError, startLoading, finishLoading } from '../../actions/ui';
import { types } from '../../types/types';

//Note synchronized  actions returns a object 

describe('Pruebas en ui-actions', () => {

    test('todas las acciones deben de funcionar', () => {
        
        /// we simulate   dispatch(setError('message of error'))
        const action = setError('occurred a Error');
        expect( action ).toEqual({ //setError has to return a object with
            type: types.uiSetError, //type: types.uiSetError
            payload: 'occurred a Error' //payload contains the msg
        });

        const removeErrorAction = removeError();
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
        
        
        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
        

    })
    
    
})
