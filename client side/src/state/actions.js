
export const LOgin = (val, loginComp) => {

    return async function (dispatch) {

        let res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });

        let data = await res.json();

        if (data.status) {
            loginComp.setState({ username: "", password: "" });
        }

        dispatch({
            type: "LOGIN",
            data: data
        });

    };

}

export const SIgnup = (val, signupComp) => {

    return async (dispatch) => {

        let res = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });

        let data = await res.json();

        if (data.status) {
            signupComp.setState({ first_name: "", last_name: "", username: "", password: "" });
        }

        dispatch({
            type: "SIGNUP",
            data: data
        });

    };

}

export const LOgout = () => {

    return async (dispatch) => {

        let res = await fetch('http://localhost:3000/logout');

        let data = await res.json();

        dispatch({
            type: "LOGOUT",
            data: data
        });

    };

}

export const AddFollow = (vacationId) => {

    return async (dispatch) => {

        let res = await fetch(`http://localhost:3000/addfollow/${vacationId}`);

        let data = await res.json();

        dispatch({
            type: "ADD_FOLLOW",
            data: data
        });

    };

}

export const RemoveFollow = (vacationId) => {

    return async (dispatch) => {

        let res = await fetch(`http://localhost:3000/removefollow/${vacationId}`);

        let data = await res.json();

        dispatch({
            type: "REMOVE_FOLLOW",
            data: data
        });

    };

}

export const DeleteVacation = (vacationId) => {

    return async (dispatch) => {

        let res = await fetch(`http://localhost:3000/deletevacation/${vacationId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let data = await res.json();

        dispatch({
            type: "DELETE_VACATION",
            data: data
        });

    };

}

export const EditVacation = (vacationToEdit) => {

    return async (dispatch) => {

        let res = await fetch(`http://localhost:3000/editvacation`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vacationToEdit)
        });

        let data = await res.json();

        dispatch({
            type: "EDIT_VACATION",
            data: data
        });

    };

}

export const addVacation = (vacationToAdd, adminComp) => {

    return async (dispatch) => {

        let res = await fetch(`http://localhost:3000/addvacation`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vacationToAdd)
        });

        let data = await res.json();

        adminComp.setState({
            vacationDestination: "",
            vacationDescription: "",
            vacationFromDate: "",
            vacationEndDate: "",
            vacationFollowers: 0,
            vacationImgs: "",
            typeFile: "",
            vacationPrice: "",
            msg: ""
        });

        dispatch({
            type: "ADD_VACATION",
            data: data
        });

    };

}

export const VacationsChange = () => {

    return async function (dispatch) {

        let res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let data = await res.json();

        dispatch({
            type: "VACATIONS_CHANGE",
            data: data
        });

    };

}

export const FollowersChange = (createChartFunc = null) => {

    return async function (dispatch) {

        let res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let data = await res.json();

        dispatch({
            type: "FOLLOWERS_CHANGE",
            data: data
        });

        if (createChartFunc != null) {
            createChartFunc();
        }

    };

}