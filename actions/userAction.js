import * as firebase from "firebase";
import { Actions } from "react-native-router-flux";
import objects from '../constants/objects'

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
      type: "SignUpUser",
      value: {}
    };
  };

export const Login = () => {
    return {
      type: "LoginUser",
      value: {}
    };
  };

export const AddCitiesObjects = () => {
    return {
      type: "AddCitiesObjects",
    };
  };


export const addCities = () => {
    return function(dispatch) {
      objects.Cities.map((item,index) => {
        firebase.database().ref('cities/' + index).set({
        name: item.name,
        lng: item.lng,
        lat : item.lat
      });
      });
      var actionAddCitiesObjects = AddCitiesObjects();
      dispatch(actionAddCitiesObjects);                  
  }
};

export const watchUserData = () => {
    return function(dispatch) {
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref(`Users/${uid}`).on('value', function (snapshot)
                  { 
                        var userData = snapshot.val();
                        console.log(userData);
                        var actionSetUserData = setUserData(userData);
                        dispatch(actionSetUserData);
                  }, function(error) { console.log(error); });   
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
        const{
            firstName,
            lastName,
            userName,
            email,
            password
          } = user;
      
          firebase.auth().createUserWithEmailAndPassword(email , password).then(()=>{

            var uid=firebase.auth().currentUser.uid;

            firebase.database().ref(`Users/${uid}`).set({
                firstName,
                lastName,
                userName,
                email,
                password,
        
            }).then((data)=>{
                var actionSignUpUser = SignUpUser();
                dispatch(actionSignUpUser);
                console.log('data ' , data)
                Actions._home();

            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            });
          }) ;
    
    }
    

}

  


