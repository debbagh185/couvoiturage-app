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

export const PrepareDatabase = () => {
    return {
      type: "PrepareDatabase",
    };
  };

export const prepareDatabase = () => {
    return function(dispatch) {

      var path=objects.Paths[0];
      var car=objects.Cars[1];
      var ad=objects.Ads[0];

      storeCities();
      storePath(path);
      Depart_Path_Relationship(path);
      Destination_Path_Relationship(path);
      Depart_Destination_Path_Relationship(path);
      Path_Car_Relationship(path,car);
      Car_Path_Relationship(path,car);
      storeAd(ad);
      Path_Ad_Relationship(ad,path);
     
      //************************************************ */
      var actionPrepareDatabase = PrepareDatabase();
      dispatch(actionPrepareDatabase);                  
    }
}

//Enregistrer les villes de maroc avec ses informations
storeCities=()=>{
  objects.Cities.map((item) => {
    firebase.database().ref('Cities/' + item.id).set({
    id: item.id,
    name: item.name,
    lng: item.lng,
    lat : item.lat
  });
  });
}

//Ajouter un trajet 
storePath=(path)=>{
  firebase.database().ref('Paths/' + path.id).set({
    id: path.id,
    dateAller: path.dateAller,
    dateRoteur: path.dateRoteur
  })
}

//Pour trouver un trajet a partir d'une ville de depart
Depart_Path_Relationship=(path)=>{
  firebase.database().ref('Depart_Path/' + path.dep.id).set({
    [path.id] : true,
  })
}

//Pour trouver un trajet a partir d'une ville de destination
Destination_Path_Relationship=(path)=>{
  firebase.database().ref('Destination_Path/' + path.dest.id).set({
    [path.id] : true,
  })
}

//Pour trouver un trajet a partir d'une ville de destination
Depart_Destination_Path_Relationship=(path)=>{
  firebase.database().ref('Depart_Destination_Path/' + path.dep.id +" to "+ path.dest.id).set({
    [path.id] : true,
  })
}

//Ajouter un vehicule 
storeCar=(car)=>{
  firebase.database().ref('Cars/' + car.id).set({
    id: car.id,
    vehicule: car.vehicule
  })
}

//Pour trouver un vehicule d'un trajet
Path_Car_Relationship=(path,car)=>{
  firebase.database().ref('Path_Car/' + path.id).set({
    [car.id] : true,
  })
}

//trouver un trajet a partir du vehicule
Car_Path_Relationship=(car,path)=>{
  firebase.database().ref('Car_Path/' + car.id).set({
    [path.id] : true,
  })
}

//trouver une annonce a partir d'un trajet
Path_Ad_Relationship=(ad,path)=>{
  firebase.database().ref('Path_Ad/' + path.id).set({
    [ad.id] : true
  })
}

//Ajouter une annonce
storeAd=(ad)=>{
  firebase.database().ref('Ad/' + ad.id).set({
    id:ad.id,
    prixParPlace:ad.prixParPlace,
    nbrPlaces: ad.nbrPlaces
  })
}


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




