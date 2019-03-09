import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class FirebaseSvc {
  constructor() {
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
  }

   LoginUser = (email,password) => {
    try {
      
      firebase.auth().signInWithEmailAndPassword(email , password).
      then(function(user){ Actions.home(user); }).
      catch(() =>alert('Your Username or Password uncorrected!'))
      
    } catch (error) {
     
      console.log(error.toString())
    }
  }


  SignupUser= (email,password) => {
    try {

      firebase.auth().createUserWithEmailAndPassword(email , password).then((user) => Actions.home(user))

    } catch (error) {
      console.log(error.toString())
    }
  }

  readUserData() {
    firebase.database().ref('Users/').once('value', function (snapshot) {
        alert(snapshot.val().firstName)
    });
}


  signUp = (user) => {

    const{
      firstName,
      lastName,
      userName,
      email,
      password
    } = user;

    firebase.database().ref('Users/').push({
        firstName,
        lastName,
        userName,
        email,
        password,

    }).then((data)=>{
        //success callback
        this.SignupUser(email, password)
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });

  }


}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;