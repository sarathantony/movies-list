import React from 'react'

const Movie = ({ item }) => {
  return (
    <div>
      <img src={require(`../../assets/${item[`poster-image`]}`)} />
      <p>{item.name}</p>
    </div>
  )
}

const HomePage = ({ playlist, title, handleFilter }) => {

  return (
    <div>
      <h1>{title}</h1>
      <form>
        <input name="name" onChange={handleFilter} />
      </form>
      {playlist && playlist.map((item, index) => <Movie key={index} {...{ item, title }} />)}
    </div>
  )
}

export default HomePage
