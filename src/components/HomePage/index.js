import React from 'react'
import { resolveImagePath } from '../../services/utils'


const Movie = ({ item }) => {
  return (
    <div className=" mx-2 pb-23">
      <img src={resolveImagePath(item)} alt="" width="100%" />
      <div className="mt-6">
        <p className="text-white">{item.name}</p>
      </div>
    </div>
  )
}


const HomePage = ({ playlist, title, handleFilter }) => {

  return (
    <div className="w-full pt-48" id="root">
      <div className="flex items-center fixed top-0 bg-fixed h-38 w-full align-middle" style={{ backgroundImage: `url(${require('../../assets/nav_bar.png')})` }}>
        <div className="w-1/12">
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

      <div className="flex flex-wrap px-2" id="showScroll">
        {playlist && playlist.map((item, index) => <div className="w-1/3 flex-none" key={index}><Movie {...{ item, title }} /></div>)}
      </div>
    </div>
  )
}

export default HomePage
