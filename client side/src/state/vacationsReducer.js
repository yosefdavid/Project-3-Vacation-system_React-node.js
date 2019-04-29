

let initialState = {
    role: "",
    username: "",
    vacationsOnFoolow: [],
    vacationsOffFoolow: [],
    msg: ""
}


function vacationsReducer(state = initialState, action) {

    let objForState = {};

    switch (action.type) {

        case "SIGNUP":

            objForState = Object.assign({}, state);

            objForState.msg = action.data.msg;

            return objForState;

        case "LOGIN":

            objForState = Object.assign({}, state);

            objForState.role = action.data.role;
            objForState.msg = action.data.msg;
            objForState.vacationsOnFoolow = action.data.vacationsOnFoolow;
            objForState.vacationsOffFoolow = action.data.vacationsOffFoolow;
            objForState.username = action.data.username;

            return objForState;

        case "LOGOUT":

            objForState = Object.assign({}, state);

            objForState.role = action.data.role;
            objForState.msg = action.data.msg;
            objForState.vacationsOnFoolow = action.data.vacations;
            objForState.vacationsOffFoolow = action.data.vacations;
            objForState.username = action.data.username;

            return objForState;

        case "DELETE_MSG":

            objForState = Object.assign({}, state);

            objForState.msg = action.data;

            return objForState;


        case "ADD_FOLLOW":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data.vacationsOnFoolow;
            objForState.vacationsOffFoolow = action.data.vacationsOffFoolow;

            return objForState;

            case "REMOVE_FOLLOW":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data.vacationsOnFoolow;
            objForState.vacationsOffFoolow = action.data.vacationsOffFoolow;

            return objForState;

            case "DELETE_VACATION":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data;
     
            return objForState;

            case "EDIT_VACATION":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data;
     
            return objForState;

            case "ADD_VACATION":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data;
     
            return objForState;

            case "VACATIONS_CHANGE":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data.vacationsOnFoolow;
            objForState.vacationsOffFoolow = action.data.vacationsOffFoolow;
          
            return objForState;

            case "FOLLOWERS_CHANGE":

            objForState = Object.assign({}, state);

            objForState.vacationsOnFoolow = action.data.vacationsOnFoolow;
          
            return objForState;

        default:

            return state;

    }

}


export default vacationsReducer;