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


var resultArray=new Array();

var adsArray=new Array()


export const getAdsResult = (path) => {
  return function(dispatch){
    db.collection("paths").where("depart.id", "==", path.departCity.id)
    .where("destination.id", "==", path.destCity.id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(docPath) {

          db.collection('paths').doc(docPath.id)
          .collection('ads').get()
          .then((usersSnapshot) => {
          
            usersSnapshot.forEach((docAd) => {

                  adsArray.push({
                    id_ad: docAd.id,
                    prixParPlace: docAd.data().prixParPlace,
                    nbrPlaces: docAd.data().nbrPlaces,
                    dateBack: docAd.data().dateBack,
                    userData: docAd.data().user,
                })

                console.log(JSON.stringify(adsArray))

            });

             resultArray.push({
              pathData:docPath.data(),
              path_id:docPath.id,
              ads: adsArray
             })

             adsArray=[];
          });
            
          
        });

          var actionGetAds = GetAdsResult(resultArray);
          dispatch(actionGetAds);
          console.log(resultArray)

    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    resultArray=[];
    
  }
  
}


storeAdOfUser = (ad,path_id) =>{
  let User=store.getState().User.userData;
  User.uid=firebase.auth().currentUser.uid
  db.collection("paths").doc(path_id).collection("ads").add({
    prixParPlace: ad.prixParPlace,
    nbrPlaces: ad.nbrPlaces,
    dateBack: ad.dateBack,
    user: User
  })

}
 

export const proposerAd= (ad, path) => {
 
  return function(dispatch){

    let path_id=path.departCity.id +"_"+ path.destCity.id +"_"+ path.dateAller;
    const pathsRef = db.collection('paths').doc(path_id);

          pathsRef.set({
            depart: path.departCity,
            destination: path.destCity,
            dateAller: path.dateAller,
          }).then(function(docRef) {
            storeAdOfUser(ad,path_id);
          });

    var actionProposerAd = ProposerAd();
    dispatch(actionProposerAd);
  }
}

