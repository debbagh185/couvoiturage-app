import store from '../store/configureStore'
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

export const PrepareDatabase = () => {
    return {
      type: "PrepareDatabase",
    };
  };

export const GetAdsResult = (result) => {
    return {
      type: "GetAdResult",
      value: result
    };
  };

export const ProposerAd = () => {
    return {
      type: "ProposerAd",
    };
  };

export const StorePathObject = (path) => {
    return {
      type: "StorePathObject",
      value: path
    };
};

var resultArray=[];

var pathObject={
      pathData:{},
      path_id:"",
      ads: []
}

var adObject={
    id_ad: "",
    prixParPlace: "",
    nbrPlaces: "",
    jourBack: "",
    heureBack: "",
    userData:{},
    user_id:""
}

storeAdObject= (ad,user) =>
{
      adObject.id_ad=ad.id;
      adObject.nbrPlaces=ad.data().nbrPlaces;
      adObject.prixParPlace=ad.data().prixParPlace;
      adObject.jourBack=ad.data().jourBack;
      adObject.heureBack=ad.data().heureBack;
      adObject.userData=user.data();
      adObject.user_id=user.id;
}

export const getAdsResult = (path) => {
  return function(dispatch){
    db.collection("paths").where("destination", "==", path.destCity.id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(docPath) {
          db.collection('paths').doc(docPath.id)
          .collection('users').get()
          .then((usersSnapshot) => {
            usersSnapshot.forEach((docUser) => {
              db.collection('paths').doc(docPath.id)
                .collection('users').doc(docUser.id).collection("ads").get()
                .then((adsSnapshot) => {
                  adsSnapshot.forEach((docAd) => {
                    /****************************************** */
                    storeAdObject(docAd,docUser);
                    /****************************************** */
                    pathObject.ads.push(adObject);
                });
              });
            });
          });
          pathObject.path_id=docPath.id;
          pathObject.pathData=docPath.data();
          resultArray.push(pathObject);
        });
        
        var actionGetAds = GetAdsResult(resultArray);
        dispatch(actionGetAds);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  }
  

}


storeAdOfUser = (ad,path_id,user_id) =>{

  db.collection("paths").doc(path_id).collection("users").doc(user_id).collection("ads").add({
    prixParPlace: ad.prixParPlace,
    nbrPlaces: ad.nbrPlaces,
    jourBack: ad.dateBack.jour,
    heureBack: ad.dateBack.heure
  })

}

storeUserAd = (path_id,user_id) => {

  let user=store.getState().User.userData;

  db.collection("paths").doc(path_id).collection("users").doc(user_id).set(user);

}

export const proposerAd= (ad, path) => {
 
  return function(dispatch){

    let path_id=path.departCity.id +"_"+ path.destCity.id +"_"+ path.dateAller.jour +"_"+ path.dateAller.heure;
    let user_id=firebase.auth().currentUser.uid;
    const pathsRef = db.collection('paths').doc(path_id);

          pathsRef.set({
            depart: path.departCity.id,
            destination: path.destCity.id,
            jourAller: path.dateAller.jour,
            heureAller: path.dateAller.heure
          }).then(function(docRef) {
            storeUserAd(path_id,user_id);
            storeAdOfUser(ad,path_id,user_id);
            console.log("Document written with ID: ", docRef.id);
          });

    var actionProposerAd = ProposerAd();
    dispatch(actionProposerAd);
  }
}

