import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

//Reducers
// TODO

const firebaseConfig = {
    apiKey: "AIzaSyD6Bq9h2NPKdpv9OklisiFOD1KghyTpZ1w",
    authDomain: "reactclientpanel-d2964.firebaseapp.com",
    databaseURL: "https://reactclientpanel-d2964.firebaseio.com",
    projectId: "reactclientpanel-d2964",
    storageBucket: "reactclientpanel-d2964.appspot.com",
    messagingSenderId: "727099079282"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig)
// Init firestore
const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store