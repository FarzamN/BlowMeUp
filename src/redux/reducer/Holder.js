export const USER_DETAILS = 'USER_DETAILS';
export const IS_SIGN_IN = 'IS_SIGN_IN';
export const OTP = 'OTP';
export const ROLE_ID = 'ROLE_ID';

const initial_state = {
  userDetails: null,
  isSignin: false,
  otp: null,
  role_id: null
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
    case OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case ROLE_ID:
      return {
        ...state,
        role_id: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default holderReducer;
