const initialState = {
	age: 21,
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
