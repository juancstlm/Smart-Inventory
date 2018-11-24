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

export const setActiveInventory = (inventory) => {
  return (dispatch)=> {
    dispatch({
      type: C.SET_ACTIVE_INVENTORY,
      payload: inventory
    })
  }
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

// export const getCollectionList = () => {
//   return async (dispatch) => await Axios.get('collectionlist')
//     .then(res => {
//       dispatch({
//         type: C.GET_COLLECTION_LIST,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }
//
// export const getCollectionShow = () => {
//   return async (dispatch) => await Axios.get('collectionshow')
//     .then(res => {
//       dispatch({
//         type: C.GET_COLLECTION_SHOW,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }
//
// export const getFavoriteList = () => {
//   return async (dispatch) => await Axios.get('favoritelist')
//     .then(res => {
//       dispatch({
//         type: C.GET_FAVORITE_LIST,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }
//
// export const getHomeTimeline = () => {
//   return async (dispatch) => await Axios.get('hometimeline')
//     .then(res => {
//       dispatch({
//         type: C.GET_HOME_TIMELINE,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }
//
// export const getMentionTimeline = () => {
//   return async (dispatch) => await Axios.get('mentiontimeline')
//     .then(res => {
//       dispatch({
//         type: C.GET_MENTION_TIMELINE,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }
//
// export const getStatusUpdate = payload => {
//   return async (dispatch) => await Axios.post('statusupdate', payload)
//     .then(res => {
//       dispatch({
//         type: C.GET_STATUS_UPDATE,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }
//
// export const getStatusUserTimeline = () => {
//   return async (dispatch) => await Axios.get('statususertimeline')
//     .then(res => {
//       dispatch({
//         type: C.GET_STATUS_USER_TIMELINE,
//         payload: res.data
//       })
//     }).catch((e) => console.log("ERROR: ", e))
// }