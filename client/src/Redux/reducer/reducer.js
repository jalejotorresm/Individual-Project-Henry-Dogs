import { CALL_DOGS , CALL_DETAILS , CALL_TEMPERAMENT, CALL_POST ,CALL_TEMPFILTER, CALL_DBFILTER, CALL_REQUIRED, CALL_NAMESORT, CALL_WEIGHTSORT} from "../actions/actions";

const initialState = {
  dogs: [],
  doggoFilter: [],
  details: [],
  temperaments: [],
  dogKennel: [],
};

const mainReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case CALL_DOGS:
      return {
        ...state,
        dogs: payload,
        doggoFilter: payload,
        dogKennel: payload,
      }
    case CALL_DETAILS:
      return {
        ...state,
        details: payload
      }
    case CALL_POST:
      return {
        ...state
      }
    case CALL_TEMPERAMENT:
      return {
        ...state,
        temperaments: payload
      }
    case CALL_TEMPFILTER:
      const allDogs = state.doggoFilter;
      const filter = payload === 'All' ? allDogs : allDogs.filter(e => e.temperament.includes(payload))
      return {
        ...state,
        dogs: filter
      }
    case CALL_DBFILTER:
      const doggoFilter = state.doggoFilter;
      const createFilter = payload === 'Created' ?  doggoFilter.filter(d => d.dbNative) : doggoFilter.filter(d => !d.dbNative);
      return {
        ...state,
        dogs: payload === "All" ? doggoFilter : createFilter
      }
    case CALL_REQUIRED:
      return {
        ...state,
        dogKennel: payload
      }
    case CALL_NAMESORT:
      const dogNameSort = payload === 'name_asc' ?
        state.dogs.slice().sort(function(a, b) {
          if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1}
          if(b.name.toLowerCase() < a.name.toLowerCase()) {return 1}
          return 0;
        }) : 
        state.dogs.slice().sort(function(a, b) {
          if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
          if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
          return 0;
        })
      return {
        ...state,
        dogs: dogNameSort
      }
    case CALL_WEIGHTSORT:
      const dogWeightSort = payload === 'weight_asc' ?
        state.dogs.slice().sort(function(a, b) {
          if(parseInt(a.minWeight) < parseInt(b.minWeight)) {return -1}
          if(parseInt(b.minWeight) < parseInt(a.minWeight)) {return 1}
          return 0;
        }) : 
        state.dogs.slice().sort(function(a, b) {
          if(parseInt(a.minWeight) > parseInt(b.minWeight)) {return -1}
          if(parseInt(a.minWeight) > parseInt(b.minWeight)) {return 1}
          return 0;
        })
      return {
        ...state,
        dogs: dogWeightSort
      }
    
    default:
      return state
  }
};

export default mainReducer;