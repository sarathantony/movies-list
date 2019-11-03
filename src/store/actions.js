export const GET_PAGE = 'GET_PAGE'

export const getPage = (payload) => {
  return {
    type: 'GET_PAGE',
    payload,
  }
}
