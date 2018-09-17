import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDUFdGAjtD5HjAmcVSCugt08sgPR8xfNuQ",
            authDomain: "manager-6c591.firebaseapp.com",
            databaseURL: "https://manager-6c591.firebaseio.com",
            projectId: "manager-6c591",
            storageBucket: "manager-6c591.appspot.com",
            messagingSenderId: "624141098987"
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return(
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default App;
