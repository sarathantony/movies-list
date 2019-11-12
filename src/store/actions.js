export const READ_PAGE_REQUEST = 'READ_RESOURCE_REQUEST'

export const resourceListReadRequest = (resource, params) => {
  return {
    type: 'READ_RESOURCE_REQUEST',
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
