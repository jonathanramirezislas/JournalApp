import { types } from "../types/types";

/*
  const initialState=  {
        uid: 'jagdfjahdsf127362718',
        name: 'Jonathan'
    }
*/

export const authReducer = (state = {}, action) => {

  switch (action.type) {

    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };

    case types.logout:
      return {};

    default:
      return state;

  }
};


