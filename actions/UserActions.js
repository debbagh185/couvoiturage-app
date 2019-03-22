import { Actions } from "react-native-router-flux";
import * as firebase from 'firebase'
import 'firebase/firestore';

if (!firebase.apps.length) { //avoid re-initializing
  firebase.initializeApp({
    apiKey: "AIzaSyC96a0_HeVmjlIh18tvblq5jkN8nRxdDGs",
    authDomain: "my-react-app-33cb1.firebaseapp.com",
    databaseURL: "https://my-react-app-33cb1.firebaseio.com",
    projectId: "my-react-app-33cb1",
    storageBucket: "my-react-app-33cb1.appspot.com",
    messagingSenderId: "155192066303"
  });
 }


var db=firebase.firestore();

export const setUserData = (userData) => {
    return {
      type: "SetUserData",
      value: userData
    };
  };

export const signOutUser = () => {
    return {
      type: "SignOutUser",
      value: {}
    };
  };

export const SignUpUser = () => {
    return {
      type: "SignUpUser"
    };
  };

export const Login = () => {
    return {
      type: "LoginUser"
    };
  };

export const testAuth = () => {
  return function(dispatch) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      watchUserData();
      var ActionLoginUser=Login();
      dispatch(ActionLoginUser);
    }
  });
}
}


export const watchUserData = () => {
    return function(dispatch) {

      let uid=firebase.auth().currentUser.uid;
      var docRef = db.collection("users").doc(uid);

      docRef.get().then(function(doc) {
          if (doc.exists) {
             var userData = doc.data();
             console.log(userData);
             var actionSetUserData = setUserData(userData);
             dispatch(actionSetUserData);
             console.log("Document data:", userData);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

    }
  };

export const signOut= () => {
    return function(dispatch){
        firebase.auth().signOut().then(function() {
            var actionSignOutUser = signOutUser();
            dispatch(actionSignOutUser);
        }, function(error) {
        console.error('Sign Out Error', error);
        });
    }
    
}

export const loginUser = (email,password) => {
    return function(dispatch){
      try {
      firebase.auth().signInWithEmailAndPassword(email , password).
      then(function(){      
          var ActionLoginUser=Login();
          dispatch(ActionLoginUser);
          Actions._home();
        }).
      catch(() =>alert('Your Username or Password uncorrected!'))

    } catch (error) {
     alert("error")
      console.log(error.toString())
    }
}
    
}

export const createUser= (user) => {
    return function(dispatch){
      
          firebase.auth().createUserWithEmailAndPassword(user.email , user.password).then(()=>{

            var uid=firebase.auth().currentUser.uid;
            
            db.collection("users").doc(uid).set(user)
            .then(function() {
              console.log("Document successfully written!");
              var actionSignUpUser = SignUpUser();
              dispatch(actionSignUpUser);
              Actions._home();
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    
    })
    
  }

}




