import React from 'react'

const Movie = ({ item }) => {
  return (
    <div>
      <div className=" mx-2">
        <img src={require(`../../assets/${item[`poster-image`]}`)} alt="" width="100%" />
        <p className="text-white">{item.name}</p>
      </div>
    </div>
  )
}
const HomePage = ({ playlist, title, handleFilter }) => {

  return (
    <div className="w-full relative">
      <div className="flex fixed bg-fixed h-48 w-full" style={{ backgroundImage: `url(${require('../../assets/nav_bar.png')})` }}>
        <div className="w-1/12 absolute">
          <img src={require('../../assets/Back.png')} alt="" width="30%" />
        </div>
        <div className="w-10/12">
          <h1 className="flex w-full text-white" >{title}</h1>
        </div>
        <form>
          <input name="name" onChange={handleFilter} />
        </form>
        <div className="w-1/12">
          <img src={require('../../assets/search.png')} alt="" width="30%" />
        </div>
      </div>
      <div className="flex flex-wrap px-2">
        {playlist && playlist.map((item, index) => <div className="w-1/3 flex-none" key={index}><Movie {...{ item, title }} /></div>)}
      </div>
    </div>
  )
}

export default HomePage
