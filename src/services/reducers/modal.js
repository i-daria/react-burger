import {SHOW_MODAL, CLOSE_MODAL} from '../actions/actions';

const initialState = {
  isOpen: false
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {
        isOpen: true
      }
    }
    case CLOSE_MODAL: {
      return {
        isOpen: false
      }
    }
    default: {
      return state
    }
  }
}