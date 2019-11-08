/**
 * 
 * @param {image details} info
 */
export const resolveImagePath = (info) => {
  try {
    return require(`../../assets/${info[`poster-image`]}`)
  } catch(err) {
    return require(`../../assets/placeholder_for_missing_posters.png`)
  }
}
