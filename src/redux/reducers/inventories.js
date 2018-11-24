import C from '../../constants'
const initialState = {
  all: [],
  activeInventory: {},
  activeItem: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.GET_SHARED_INVENTORIES: return { ...state,
      all: [...state.all, ...action.payload]
    }
    case C.SET_ACTIVE_INVENTORY: return {
      ...state,
      activeInventory: action.payload
    }
    case C.GET_OWN_INVENTORIES: return {...state, all: [...state.all, ...action.payload]}
    default: return state;
  }
}