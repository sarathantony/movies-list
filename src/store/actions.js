export const READ_PAGE_REQUEST = 'READ_PAGE_REQUEST'

export const readResourceListRequest = (resource, params) => {
  return {
    type: 'READ_PAGE_REQUEST',
    payload: { resource, params },
  }
}


export const RESOURCE_SEARCH_REQUEST = 'RESOURCE_SEARCH_REQUEST'

export const resourceSearchRequest = (payload) => {
  return {
    type: 'RESOURCE_SEARCH_REQUEST',
    payload,
  }
}
