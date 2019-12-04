import axios from "axios";
import stringify from "qs-stringify";
import setAuthorizationToken from "../auth/setAuthorizationToken";
import { BASE_URL } from "../config/URLs";
// import uuidv4 from 'uuid/v4';
export const SET_CURRENT_USER = "[Auth] Se ha autenticado el usuario";
export const SET_CODGIO_ENVIADO = "[Auth] Se ha enviado el codigo de verificacion";


export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}
export function setSesionGoogle(id) {
    return {
        type: SET_SESION_GOOGLE,
        id
    }
}

export function setCodigoEnviado(codigo) {
    return {
        type: SET_CODGIO_ENVIADO,
        codigo
    }
}

export const logout = () => {
    return dispatch => {
        // localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
};

export const handleExpiredToken = () => {
    return axios({
        method: "get",
        url: `${BASE_URL}handle_expired`
    }).then(function (response) {
        return response;
    });
};

export const signin = data => {
    url = `${BASE_URL}signup_user`

    // console.log('data usuario actions: ',data)
    // if (data.tipoderegistro == 'usuariopersonal') {
    // } else {
    // }

    switch (data.tipoderegistro) {
        case 'usuariopersonal':
            url = `${BASE_URL}signup_user`;
            break;

        case 'usuariocorporativo':
            url = `${BASE_URL}signup_company`;

            break;

        default:
            url = `${BASE_URL}signup_user`;
            break;
    }

    return dispatch => {
        return axios({
            method: "post",
            url: url,
            data: stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function (response) {
            // console.log(response)
            if (response.data.status === true) {
                // console.log(response.data);
                const token = response.data.token;
                setAuthorizationToken(token);
                dispatch(setCurrentUser(response.data));
            } else {
                throw new Error("No se pudo registrar, intente más tarde");
            }
        });
    };
};

export const enviarCodigo = data => {
    return dispatch => {
        return axios({
            method: "post",
            url: `${BASE_URL}enviarCodigoVerificacionUser`,
            data: stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function (response) {
            // console.log(response)
            if (response.data.status === true) {
                // console.log(response.data);
                // const token = response.data.token;
                // setAuthorizationToken(token);
                // dispatch(setCodigoEnviado(response.data));
                return response.data;
            } else {
                throw new Error("No se pudo enviar el codigo de verificación");
            }
        });
    };
};


export const verificarCorreo = data => {
    return dispatch => {
        return axios({
            method: "post",
            url: `${BASE_URL}verificarCorreoYEnviar`,
            data: stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function (response) {
            // console.log(response)
            // console.log(response)
            if (response.data.status === true) {
                // console.log(response.data);
                // const token = response.data.token;
                // setAuthorizationToken(token);
                // dispatch(setCodigoEnviado(response.data));
                return response.data;
            } else {
                throw new Error("No se pudo enviar el codigo de verificación");
            }
        });
    };
};


export const login = data => {
    return dispatch => {
        return axios({
            method: "post",
            url: `${BASE_URL}login_user`,
            data: stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function (response) {
            // console.log(response)
            if (response.data.status === true) {
                // console.log(response.data);
                const token = response.data.token;
                setAuthorizationToken(token);
                // dispatch(setSesionGoogle());
                dispatch(setCurrentUser(response.data));
            } else {
                throw new Error("Email o password incorrectos");
            }
        });
    };
};

export const updateUser = data => {
    return dispatch => {
        return axios({
            method: "post",
            url: `${BASE_URL}update_user`,
            data: stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function (response) {
            // console.log(response)
            if (response.data.status === true) {
                // console.log(response.data);
                const token = response.data.token;
                setAuthorizationToken(token);
                // dispatch(setSesionGoogle());
                dispatch(setCurrentUser(response.data));
            } else {
                throw new Error("No se pudo actualizar el usuario");
            }
        });
    };


};

// export const verficarCodigo = data => {
//     return dispatch => {
//         return axios({
//             method: "post",
//             url: `${BASE_URL}verificar_user_sms`,
//             data: stringify(data),
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type":
//                     "application/x-www-form-urlencoded; charset=UTF-8"
//             }
//         }).then(function (response) {
//             console.log(response)
//             if (response.data.status === true) {
//                 console.log(response.data);
//                 const token = response.data.token;
//                 setAuthorizationToken(token);
//                 dispatch(setCurrentUser(response.data));
//             } else {
//                 throw new Error("No se pudo registrar, intente más tarde");
//             }
//         });
//     };
// };