import { pages } from '../services/api'

const initialState = {
	playlist: pages[0].page1,
}

const reducer = (state = initialState, action) => {
	const newState = { ...state }
  const { type, payload } = action

	switch(type) {
		case 'READ_PAGE_REQUEST':
      const { resource, params: { pageNumber } } = payload
      const resource_url = pages[pageNumber - 1][resource + pageNumber].page
			return {
				...newState,
				playlist: {
          ...newState.playlist,
          page: {
            ...newState.playlist.page,
            title: resource_url.title,
            [`page-num-requested`]: resource_url[`page-num-requested`],
            [`total-content-items`]:resource_url[`total-content-items`],
            [`page-size-requested`]:resource_url[`page-size-requested`],
            [`page-size-returned`]: resource_url[`page-size-returned`],
            [`content-items`]: {
              ...newState.playlist.page[`content-items`],
              content: [...newState.playlist.page[`content-items`].content, ...resource_url['content-items'].content]
            },
          },          
        },
      }
    case 'RESOURCE_SEARCH_REQUEST':
      const result = []
      pages && pages.map((item, index) =>
      (item[`page${index +1}`].page[`content-items`].content)).map(item =>
        item.map(itm =>
          itm[`poster-image`] !== 'posterthatismissing.jpg' && itm.name.toLowerCase().includes('family') ? result.push(itm) : {}
        )
      )

      return {
				...newState,
				playlist: {
          ...newState.playlist,
          page: {
            ...newState.playlist.page,
            [`page-num-requested`]: 1,
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
