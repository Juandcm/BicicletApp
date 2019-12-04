import { combineReducers } from "redux";
import map from "./map.js";
import round from "./round.js";
import auth from "./auth.js";
import tracking from "./tracking.js";
import history from "./history.js";
import boleteria from "./boleteria.js";
import enviaralgo from "./mensajeria/enviaralgo.js";
// import conveniencia from "./conveniencia.js";
import pagoservicios from "./mensajeria/pagoservicios.js";
import cajero from "./cajero.js";

import carritoconveniencia from "./conveniencia/carritoconveniencia.js";
import ordenconveniencia from "./conveniencia/ordenconveniencia.js";

import direccionesfavoritas from "./direccionesfavoritas/favoritas.js";

import transporte from './transporte/transporte.js';

export default combineReducers({
  map: map,
  round: round,
  auth: auth,
  tracking: tracking,
  history: history,
  boleteria: boleteria,
  enviaralgo: enviaralgo,
  pagoservicios: pagoservicios,
  cajero: cajero,
  carritoconveniencia: carritoconveniencia,
  ordenconveniencia: ordenconveniencia,
  direccionesfavoritas:direccionesfavoritas,
  transporte:transporte
});
