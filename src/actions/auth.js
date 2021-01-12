import Swal from 'sweetalert2';//beautiful alert XD

import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';
import { noteLogout } from './notes';

//funtion to get the user for databe
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

   dispatch( startLoading() );
//this return doesn't affect the app , we used for testing purposes
   return   firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}


export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        //Register  users using their email and Password
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {
                //UPDATE the user with name
                await user.updateProfile({ displayName: name });
                //dispacth the action passing uid(from firebase), name
                dispatch(
                    login( user.uid, user.displayName )
                );
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Succes',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })//if you use a email was already registered in firebase
            .catch( e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            })

    }
}



//this function will be used by the  authReducer one time is dispatched
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();//logout from firebase

        dispatch( logout() );//remove user from store
        dispatch(noteLogout());// clean notes from sotore

    }
}


export const logout = () => ({
    type: types.logout
})

