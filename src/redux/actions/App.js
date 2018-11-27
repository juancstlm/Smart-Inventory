import C from '../../constants'
import Firebase from '../../Firebase'


export const getUserDetails = (uid) => {
  return async (dispatch) => await Firebase.firestore.collection(C.USERS).doc(uid)
    .get().then(res => {
      dispatch({
        type: C.GET_USER_DETAILS,
        payload: res.data()
      })
    }).catch((e) => console.log("ERROR: ", e))
}

export const clearActiveInventory = () => {
  return (dispatch)=> {
    dispatch({
      type: C.CLEAR_ACTIVE_INVENTORY,
    })
  }
}

export const setActiveInventory = (inventory) => {
  return (dispatch)=> {
    dispatch({
      type: C.SET_ACTIVE_INVENTORY,
      payload: inventory
    })
  }
}
export const setActiveItem = (item) => {
  return (dispatch)=> {
    dispatch({
      type: C.SET_ACTIVE_ITEM,
      payload: item
    })
  }
}

export const setActiveItemPrice = (price) => {
  return (dispatch)=> {
    dispatch({
      type: C.SET_ACTIVE_ITEM_PRICE,
      payload: price
    })
  }
}

export const getActiveInventoryUsers = () => {
  return async (dispatch) =>{

  }
}

// Gets the data of every item in the active inventory and set is in
// inventory.currentItemsDetail
export const getActiveInventoryItems = () =>{
  return async (dispatch, getState) =>{
    getState().inventories.activeInventory
      .items.map(item => Firebase.firestore.collection(C.ITEMS).doc(item).get()
      .then(doc=>{
        if (doc.exists){
          dispatch({
            type: C.GET_ACTIVE_INVENTORY_ITEMS,
            payload: {...doc.data(), id: doc.id}
          })
        } else { console.log('no such document')}
      }))
  }
}

// Add the current user to the specified inventory users lis
// Retrieves the inventory for the user
export const joinInventory = (code) =>{
  return async (dispatch) => await Firebase.firestore.collection(C.INVENTORIES)
    .doc(code).get().then(doc => {
        dispatch({
          type: C.JOIN_INVENTORY,
          payload: {...doc.data(), id: doc.id}
        })
      })
}

export const getSharedInventories = () => {
  return async (dispatch) => await Firebase.firestore.collection(C.INVENTORIES)
    .where("users", 'array-contains', Firebase.auth.currentUser.uid)
    .get().then(snapshot=>{
      const sharedInventories = snapshot.docs.map(doc=>{
        return {...doc.data(), id: doc.id}
      })
      dispatch({
        type: C.GET_SHARED_INVENTORIES,
        payload: sharedInventories
      })
    })
}

export const getOwnInventories = () => {
  return async (dispatch) => await Firebase.firestore.collection(C.INVENTORIES)
    .where("owner_id",
      "==",
      Firebase.auth.currentUser.uid).get().then(snapshot => {
        const inventories = snapshot.docs.map(doc => {
          return {...doc.data(), id: doc.id}
        });
      dispatch({
        type: C.GET_OWN_INVENTORIES,
        payload: inventories
      })
    }).catch((e) => console.log("ERROR: ", e))
};

export const getAuthStatus = (user) => {
  return (dispatch) => dispatch({
    type: C.REPORT_AUTH_STATUS,
    payload: user
  })
}

export const logOut = () => {
  Firebase.auth.signOut()
  return (dispatch) => dispatch({
    type: C.LOG_OUT,
  })
}