import firebase from "firebase";

class Backend {
  uid = "";
  messagesRef = null;
  // initialize Firebase Backend
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

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            alert(error.message);
          });
      }
    });
  }

  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref("messages");
    this.messagesRef.off(); //Detaches a callback previously attached with on()
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        //createdAt: new Date(message.createdAt),
        createdAt: message.createdAt,
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };

    var d = this.getLimit();
    console.log(d);
    //Generates a new Query object limited to the last specific number of children.
    //this.messagesRef.limitToLast(10).on("child_added", onReceive);
    this.messagesRef
      .orderByChild("createdAt")
      //.startAt(d)
      //.endAt("2017-11-27T06:51:47.851Z")
      .on("child_added", onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
    var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: timestamp
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }

  getLimit() {
    var today = new Date();
    //var milliseconds = Date.parse(today);
    //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
    today.setDate(today.getDate() - 31); // last 30 Days
    //console.log(today);
    var changedISODate = new Date(today).toISOString();
    //var changedISODate = today.toISOString();
    console.log(changedISODate);
    return changedISODate;
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

export default new Backend();
