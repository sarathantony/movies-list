import React from 'react'

const Movie = ({ item }) => {
  return (
    <div>
      <div>
        <img src={require(`../../assets/${item[`poster-image`]}`)} alt="" width="100%" />
        <p className="text-black">{item.name}</p>
      </div>
    </div>
  )
}
const HomePage = ({ playlist, title, handleFilter }) => {

  return (
    <div className="w-full">
      <h1 className="flex w-full" >{title}</h1>
      <form>
        <input name="name" onChange={handleFilter} />
      </form>
      <div className="flex flex-wrap">
        {playlist && playlist.map((item, index) => <div className="w-1/3 flex-none p-2" key={index}><Movie {...{ item, title }} /></div>)}
      </div>
    </div>
  )
}

export default HomePage
