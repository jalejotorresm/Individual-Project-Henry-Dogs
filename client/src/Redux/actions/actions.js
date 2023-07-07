import axios from "axios";

export const CALL_DOGS = "CALL_DOGS";
export const CALL_DETAILS = "CALL_DETAILS";
export const CALL_TEMPERAMENT = "CALL_TEMPERAMENT";
export const CALL_POST = "CALL_POST";
export const CALL_TEMPFILTER = "CALL_TEMPFILTER";
export const CALL_DBFILTER = "CALL_DBFILTER";
export const CALL_NAMESORT = "CALL_NAMESORT";
export const CALL_WEIGHTSORT = "CALL_WEIGHTSORT";
export const CALL_REQUIRED = "CALL_REQUIRED";

export const callDogs = () => {
  return async function (dispatch) {
    try {
      let dogs = (await axios("/dogs")).data;
      return dispatch({
        type: CALL_DOGS,
        payload: dogs,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const callDetails = (id) => {
  return async function (dispatch) {
    try {
      let details = (await axios(`/dogs/${id}`)).data;
      return dispatch({
        type: CALL_DETAILS,
        payload: details,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const callPost = (payload) => {
  return async function (dispatch) {
    try {
      await axios.post("/dogs", payload);
      alert("Tu perro ha sido incluido correctamente");
      return dispatch({
        type: CALL_POST,
      });
    } catch (error) {
      console.log(error);
      alert("Lo sentimos, ocurrio un error al incluir a tu perro");
    }
  };
};

export const callTemperament = () => {
  return async function (dispatch) {
    try {
      let temperaments = (await axios("/temperaments")).data;
      let allTemps = temperaments.map((e) => e);
      return dispatch({
        type: CALL_TEMPERAMENT,
        payload: allTemps,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const callRequired = (raza) => {
  return async function (dispatch) {
    try {
      let dogsWanted = (await axios(`/search?name=${raza}`)).data;
      return dispatch({
        type: CALL_REQUIRED,
        payload: dogsWanted,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const callTempFilter = (payload) => {
  return {
    type: CALL_TEMPFILTER,
    payload,
  };
};

export const callDbFilter = (payload) => {
  return {
    type: CALL_DBFILTER,
    payload,
  };
};

export const callNameSort = (payload) => {
  return {
    type: CALL_NAMESORT,
    payload,
  };
};

export const callWeightSort = (payload) => {
  return {
    type: CALL_WEIGHTSORT,
    payload,
  };
};
