export const StoreAd = (ad) => {
    return {
      type : "StoreClickedAd",
      value: ad
    }
}

export const StoreClickedAd = (ad) =>{
    return function(dispatch){
        var ActionStoreClickedAd=StoreAd(ad);
        dispatch(ActionStoreClickedAd);
    }
}