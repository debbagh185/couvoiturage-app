
const initialState = {

    SearchResult:[],
    success: false,
    path:{}
    
}

export default (state=initialState, action) => 
{

switch(action.type)
    {  
        case 'ProposerAd' : return {...state} ;
        case 'GetAdResult' : return {...state, SearchResult: action.value,success: true} ;
        case 'StorePathObject' : return {...state, path: action.value} ;
        default: return state;
    }
}

