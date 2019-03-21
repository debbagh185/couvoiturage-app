
const initialState = {

                userData: { 
                        _uid: "",
                        firstName: "",
                        lastName: "",
                        userName: "",
                        email: "",
                        password: ""
                },
                loggedin: false,
}

export default (state=initialState, action) => 
{

        switch(action.type)
        {
            case "SetUserData" : return { ...state, userData: action.value };
            case "SignOutUser" : return { ...state, userData: action.value, loggedin : false };
            case "SignUpUser" : return { ...state};
            case "LoginUser" : return { ...state, loggedin: true};
            case "PrepareDatabase" : return { ...state};   
            default: 
              return state;
        }
}

