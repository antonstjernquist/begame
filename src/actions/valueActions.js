
/* Value Constants */
import { ADD_TO_VALUE_EXAMPLE } from '../reducers/valueReducer.js';

const addValueAction = data => {
  return {
    type: ADD_TO_VALUE_EXAMPLE,
    data
  }
}


/* Value exports */
export { addValueAction }
