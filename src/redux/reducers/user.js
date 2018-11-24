import C from '../../constants'
const initialState = {
  authStatusReported: false,
  isUserAuthenticated: false,
  inventories: []
};

export default(state = initialState, action) => {
  switch (action.type) {
    case C.LOG_OUT: return {...initialState};
    case C.REPORT_AUTH_STATUS: return {
      ...state,
      authStatusReported: true,
      isUserAuthenticated: action.payload
    }
    case C.GET_USER_DETAILS:
      return{
        ...state, ...action.payload
      };
    case C.GET_OWN_INVENTORIES: return {...state, inventories: [...state.inventories, ...action.payload]}
    default:
      return state;
  }
}