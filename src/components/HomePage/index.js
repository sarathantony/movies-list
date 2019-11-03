import React from 'react'

const HomePage = ({ playlist }) => {
  const { page: { [`content-items`]: { content } } } = playlist

  return (
    <div>
      {content && content.map(item => <div><img src={require(`../../assets/${item[`poster-image`]}`)} /></div>)}
    </div>
  )
}

export default HomePage
