import C from '../../constants'
const initialState = {
  all: [],
  activeInventory: {},
  currentItemsDetails: [],
  activeItem: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.LOG_OUT: return {...initialState}
    case C.GET_SHARED_INVENTORIES: return { ...state, all: [...state.all, ...action.payload] }
    case C.SET_ACTIVE_INVENTORY: return {...state, activeInventory: action.payload }
    case C.SET_ACTIVE_ITEM: return {...state, activeItem: action.payload }
    case C.GET_ACTIVE_INVENTORY_ITEMS: return {...state, currentItemsDetails: [...state.currentItemsDetails, action.payload]}
    case C.SET_ACTIVE_ITEM_PRICE: return {...state, activeItem: {...state.activeItem, price: action.payload}}
    case C.GET_OWN_INVENTORIES: return {...state, all: [...state.all, ...action.payload]}
    case C.CLEAR_ACTIVE_INVENTORY: return {...state, activeInventory: {}, currentItemsDetails: [], activeItem: {}}
    default: return state;
  }
}