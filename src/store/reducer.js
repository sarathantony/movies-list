import { pages } from '../services/api'

const initialState = {
	playlist: pages[0].page1,
}

const reducer = (state = initialState, action) => {
	const newState = { ...state }
  const { type, payload } = action

	switch(type) {
		case 'READ_RESOURCE_REQUEST':
      const { resource, params: { pageNumber } } = payload
      const resource_url = pages[pageNumber - 1][resource + pageNumber]

			return {
				...newState,
				playlist: resource_url,
      }
    case 'RESOURCE_SEARCH_REQUEST':
      let result = []
      pages && pages.map((item, index) =>
      (item[`page${index +1}`].page[`content-items`].content)).map(item =>
        item.map(itm =>
          itm[`poster-image`] !== 'posterthatismissing.jpg' && itm.name.toLowerCase().includes(payload.toLowerCase()) ? result.push(itm) : {}
        )
      )

      return {
				...newState,
				playlist: {
          ...newState.playlist,
          page: {
            ...newState.playlist.page,
            [`page-num-requested`]: result.length === 0 ? 0 : 1,
            [`page-size-returned`]: result && result.length,
            [`content-items`]: {
              ...newState.playlist.page[`content-items`],
              content: result,
            },
          },          
        },
      }
		default:
			return newState
	}
}


export default reducer
