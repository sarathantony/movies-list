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
				playlist: [...newState.playlist, `page${payload}`],
			}
		default:
			return newState
	}

}


export default reducer
