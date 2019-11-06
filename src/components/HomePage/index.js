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
    <div className="w-full pt-48 overflow-auto" id="root">
      <div className="flex items-center fixed top-0 bg-fixed h-38 w-full align-middle" style={{ backgroundImage: `url(${require('../../assets/nav_bar.png')})` }}>
        <div className="w-1/12">
          <div>
            <img className="ml-5 sm:w-6 md:w-2/4 lg:w-10" src={require('../../assets/Back.png')} alt="" width="50%" />
          </div>
        </div>
        <div className="w-6/12">
          <h1 className="flex w-full text-white text-2xl sm:text-2xl md:text-3xl ml-3 lg:text-4xl" >{title}</h1>
        </div>
        <form className="w-4/12">
          <input className="w-full h-1 mr-5 bg-black border border-blue-500 rounded text-white sm:h-8 md:w-full h-6 lg:w-full h-full" name="name" onChange={handleFilter} />
        </form>
        <div className="w-1/12">
          <img className="ml-5 w-6 mr-1 sm:w-6 mr-5 md:w-8 lg:w-10" src={require('../../assets/search.png')} alt="" />
        </div>
      </div>

      <div className="flex flex-wrap px-2" id="showScroll">
        {playlist && playlist.map((item, index) => <div className="w-1/3 flex-none" key={index}><Movie {...{ item, title }} /></div>)}
      </div>
    </div>
  )
}

export default HomePage
