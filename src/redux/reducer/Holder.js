export const USER_DETAILS = 'USER_DETAILS';
export const IS_SIGN_IN = 'IS_SIGN_IN';

const initial_state = {
  userDetails: null,
  isSignin: false,
};

const holderReducer = (state = initial_state, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case IS_SIGN_IN:
      return {
        ...state,
        isSignin: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;
