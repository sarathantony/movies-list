import React from 'react'
import { resolveImagePath } from '../../services/utils'


const Movie = ({ item }) => {
  return (
    <div className=" mx-2 pb-23">
      <img src={resolveImagePath(item)} alt="" width="100%" />
      <div className="mt-6">
        <p className="text-white sm:text-1xl md:text-2xl lg:text-3xl">{item.name}</p>
      </div>
    </div>
  )
}


const HomePage = ({ playlist, title, handleFilter }) => {
  return (
    <div className="w-full pt-48 overflow-auto" id="rootContainer">
      <div className="flex items-center fixed top-0 bg-fixed h-38 w-full align-middle" style={{ backgroundImage: `url(${require('../../assets/nav_bar.png')})` }}>
        <div className="w-1/12">
          <div>
            <img className="ml-5 sm:w-6 md:w-2/4 lg:w-10" src={require('../../assets/Back.png')} alt="" width="50%" />
          </div>
        </div>
        <div className="w-5/12">
          <p className="flex w-full text-white text-2xl sm:text-2xl md:text-3xl ml-3 lg:text-4xl" >{title}</p>
        </div>
        <div className="w-6/12">
          <form onSubmit={e => e.preventDefault()}>
            <div className="flex">
              <div className="flex w-9/12">
                <input className="h-1 bg-black border border-gray-700 rounded text-white sm:h-8 w-3/4 ml-10 md:w-full h-6 lg:w-full h-full" name="name" onChange={handleFilter} />
              </div>
              <div className="flex justify-start w-3/12 md:flex justify-center">
                <img className="w-6 md:w-10 lg:w-10 flex justify-start" src={require('../../assets/search.png')} alt="" />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap px-2" id="showScroll">
        {playlist && playlist.map((item, index) => <div className="w-1/3 flex-none" key={index}><Movie {...{ item, title }} /></div>)}
      </div>
    </div>
  )
}

export default HomePage
