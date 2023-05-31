const initialState = {
  uid: null,
  email: null,
  emailVerified: null,
  accessToken: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_DATA':
      return {
        uid: action.payload.uid,
        accessToken: action.payload.accessToken,
        email: action.payload.email,
        emailVerified: action.emailVerified,
      };
    default:
      return state;
  }
};

export default authReducer;