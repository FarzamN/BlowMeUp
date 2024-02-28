export const USER_DETAILS = 'USER_DETAILS';
export const IS_SIGN_IN = 'IS_SIGN_IN';
export const OTP = 'OTP';
export const REGISTER = 'REGISTER';
export const TOKEN = 'TOKEN';
export const VLOG = 'VLOG';
export const IMAGE = 'IMAGE';
export const SONGS = 'SONGS';
export const PROFILE_DATA = 'PROFILE_DATA';
export const PROFILE_VIDEO = 'PROFILE_VIDEO';
export const PROFILE_IMAGE = 'PROFILE_IMAGE';
export const PROFILE_SONG = 'PROFILE_SONG';
export const HISTORY = 'HISTORY';

const initial_state = {
  userDetails: null,
  isSignin: false,
  otp: null,
  register: null,
  token: null,
  vlog: null,
  image: null,
  songs: null,
  profile_Data: null,
  profile_Video: null,
  profile_Image: null,
  profile_Song: null,
  history: null,
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
    case REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case VLOG:
      return {
        ...state,
        vlog: action.payload,
      };
    case IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case SONGS:
      return {
        ...state,
        songs: action.payload,
      };
      case PROFILE_DATA:
        return {
          ...state,
          profile_Data: action.payload,
        };
      case PROFILE_VIDEO:
        return {
          ...state,
          profile_Video: action.payload,
        };
      case PROFILE_IMAGE:
        return {
          ...state,
          profile_Image: action.payload,
        };
      case PROFILE_SONG:
        return {
          ...state,
          profile_Song: action.payload,
        };
      case HISTORY:
        return {
          ...state,
          history: action.payload,
        };
    default: {
      return state;
    }
  }
};

export default holderReducer;
