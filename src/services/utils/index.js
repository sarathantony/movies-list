/**
 * 
 * @param {image details} item
 */
export const resolveImagePath = (item) => {
  try {
    return require(`../../assets/${item[`poster-image`]}`)
  } catch(err) {
    return require(`../../assets/placeholder_for_missing_posters.png`)
  }
}
