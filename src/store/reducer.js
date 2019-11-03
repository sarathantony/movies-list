import {
  page1,
  page2,
  page3,
} from '../services/api'

const initialState = {
	playlist: page1,
}

const reducer = (state = initialState, action) => {
	const newState = { ...state }
	const { type, payload } = action

	switch(type) {
		case 'GET_PAGE':
			return {
				...newState,
				age: 3,
			}
		default:
			return newState
	}

}


export default reducer
