import * as firebase from "firebase";
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


export const PrepareDatabase = () => {
    return {
      type: "PrepareDatabase",
    };
  };

export const GetAdsResult = (Ads) => {
    return {
      type: "GetAdResult",
      value: Ads
    };
  };

export const ProposerAd = () => {
    return {
      type: "ProposerAd",
    };
  };

  const Ads=[]

export const getAdsResult=(depart,dest,date)=>{
  return function(dispatch){
    
      firebase.database().ref(`Depart_Destination_Date_Ad/${depart.id} to ${dest.id} on ${date}`).on('value', function (snapshot)
      {     
 
            var val = snapshot.val();
            //console.log(JSON.stringify(val))
            var array = Object.values(val)

            console.log(array)

            for(var i=0;i<array.length;i++){
              firebase.database().ref(`Ads/${array[i].id_ad}`).on('value', function (snapshot)
                  {     

                      Ads.push(snapshot.val());
    
                }, function(error) { console.log(error); }); 
            }

            console.log(Ads)

            

            var actionGetAdResult = GetAdsResult(Ads);
            dispatch(actionGetAdResult);

      }, function(error) { console.log(error); }); 
      
  }
}


export const prepareDatabase = () => {
  return function(dispatch) {

    var path=objects.Paths[0];
    var car=objects.Cars[1];
    var ad=objects.Ads[0];

    storeCities();
    storePath(path);
    storeAd(ad);
    Depart_Destination_Date_Ad_Relationship(ad,path)
    //Ad_Car_Relationship(ad,car);
    //Car_Ad_Relationship(ad,car);
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

//Pour trouver un trajet a partir d'une ville de destination
Depart_Destination_Date_Ad_Relationship=(ad,path)=>{
  firebase.database().ref(`Depart_Destination_Date_Ad/${path.dep.id} to ${path.dest.id} on ${path.dateAller.jour} ${path.dateAller.heure}`).push({
    id_ad : ad.id,
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
Ad_Car_Relationship=(ad,car)=>{
  firebase.database().ref('Ad_Car/' + ad.id).set({
    car_id : car.id,
  })
}

//trouver un trajet a partir du vehicule
Car_Ad_Relationship=(ad,car)=>{
  firebase.database().ref('Car_Ad/' + car.id).set({
    ad_id : ad.id,
  })
}

//trouver une annonce a partir d'un trajet
Path_Ad_Relationship=(ad,path)=>{
  firebase.database().ref('Path_Ad/' + path.id).set({
    id_ad : ad.id,
  })
}

//Ajouter une annonce
storeAd=(ad)=>{
  firebase.database().ref('Ads/' + ad.id).set({
    id:ad.id,
    prixParPlace:ad.prixParPlace,
    nbrPlaces: ad.nbrPlaces,
    path: ad.path
  })
}

