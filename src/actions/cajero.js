import axios from "axios";
import stringify from "qs-stringify";
import { BASE_URL } from "../config/URLs";
// import uuidv4 from 'uuid/v4';
export const SET_CREDIT_TARJ_USER = "[Cajero] Se han recibido tarjetas de credito del usuario";
// export const SET_CODGIO_ENVIADO = "[Auth] Se ha enviado el codigo de verificacion";


export function setCurrentCreditarjeta(tarjetasusuario) {
    return {
        type: SET_CREDIT_TARJ_USER,
        tarjetasusuario
    };
}

export const getCreditCardsUser = data => {
    return dispatch => {
        return axios({
            method: "post",
            url: `${BASE_URL}getCreditCards`,
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
                // dispatch(setSesionGoogle());
                dispatch(setCurrentCreditarjeta(response.data));
            } else {
                dispatch(setCurrentCreditarjeta(response.data));
            }
        });
    };
};
