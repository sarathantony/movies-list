import * as pages from '../services/api'

const initialState = {
	playlist: pages.page1,
}

const reducer = (state = initialState, action) => {
	const newState = { ...state }
  const { type, payload } = action

	switch(type) {
		case 'GET_PAGE':
			return {
				...newState,
				playlist: {
          ...newState.playlist,
          page: {
            ...newState.playlist.page,
            title: pages[payload].page.title,
            [`page-num-requested`]: pages[payload].page[`page-num-requested`],
            [`total-content-items`]: pages[payload].page[`total-content-items`],
            [`page-size-requested`]: pages[payload].page[`page-size-requested`],
            [`page-size-returned`]: pages[payload].page[`page-size-returned`],
            [`content-items`]: {
              ...newState.playlist.page[`content-items`],
              content: [...newState.playlist.page[`content-items`].content, ...pages[payload].page['content-items'].content]
            },
          },          
        },
			}
		default:
			return newState
	}
}


export default reducer
