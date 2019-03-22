export const ChangePreviousPage = (page) => {
    return {
        type: "ChangePreviousPage",
        value: page
    }
}

export const changePage = (page) =>{
    return function(dispatch){
        var ActionChangePage=ChangePreviousPage(page);
        dispatch(ActionChangePage);
    }
}