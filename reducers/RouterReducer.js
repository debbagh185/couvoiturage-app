
const initialState = {

    Ad: {}
    
}

export default (state=initialState, action) => 
{

switch(action.type)
    {  
        case 'StoreClickedAd' : return {...state, Ad: action.value} ;
        default: return state;
    }
}

