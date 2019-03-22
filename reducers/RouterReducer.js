
const initialState = {

    page: ""
    
}

export default (state=initialState, action) => 
{

switch(action.type)
    {  
        case 'ChangePreviousPage' : return {...state, page: action.value} ;
        default: return state;
    }
}

