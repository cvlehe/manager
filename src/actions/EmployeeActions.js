import firebase from 'firebase';
import {EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS, EMPLOYEE_UPDATE, EMPLOYEES_SAVE_SUCCESS} from './types';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/employees`)
          .push({name, phone, shift})
          .then(() => {
            dispatch({ type: EMPLOYEE_CREATE });
            Actions.pop();

          });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch( { type: EMPLOYEES_SAVE_SUCCESS });
                Actions.pop();
            });
    }
}


export const employeesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                console.log(`DELETED: ${uid}`)
                Actions.pop();
            })
            .catch((reason => {
                console.log(`FAILED_TO_DELETE: ${reason}`)
            }));
    }
}
