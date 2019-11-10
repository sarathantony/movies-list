import React from 'react'
import { resolveImagePath } from '../../services/utils'
import { PropTypes } from 'prop-types'

const Movie = ({ item }) => {
  return (
    <div className="mx-3.8 pb-23 sm:mx-4 md:mx-6">
      <img src={resolveImagePath(item)} alt="" width="100%" />
      <div className="mt-6">
        <p className="text-white truncate sm:text-1xl md:text-2xl lg:text-3xl">{item.name}</p>
      </div>
    </div>
  )
}

Movie.propTypes = {
  item: PropTypes.object,
}

const wrapper = {
  [`header-back-button`]: `w-4 opacity-100 hover:opacity-75 cursor-pointer sm:w-6`,

  [`header-title`]: `
    flex
    font-mono
    tracking-tighter
    text-white
    text-lg
    whitespace-normal

    sm:text-2xl ml-1 tracking-tight
    md:tracking-normal
    lg:text-4xl tracking-normal`,

  [`search-input`]: `
    h-8
    bg-black
    border
    border-gray-700
    rounded
    text-white
    w-full
    pl-1`,
}

const HomePage = ({ playlist, title, handleFilter, handleBack, searchField }) => {
  return (
    <div id="wrapper">
      {JSON.stringify(playlist) === '[]' &&
        <div style={{ height: `${document.getElementById('wrapper').clientHeight}px` }} className="flex justify-center pt-58">
          <p className="text-red-400 text-1xl lg:text-2xl">No movie found..</p>
        </div>
      }
      {playlist && 
        <div className="w-full pt-58 overflow-auto">

          <div className="flex items-center fixed top-0 bg-fixed h-38 w-full align-middle" style={{ backgroundImage: `url(${require('../../assets/nav_bar.png')})` }}>
            <div className="w-1/12">
              <div onClick={handleBack} className="flex justify-center">
                <img className={wrapper['header-back-button']} src={require('../../assets/Back.png')} alt="" width="50%" />
              </div>
            </div>
            <div className="w-6/12">
              <p className={wrapper[`header-title`]} >{title}</p>
            </div>

            <div className="w-5/12">
              <form onSubmit={handleFilter}>
                <div className="flex">
                  <div className="flex justify-end w-9/12">
                    <div className="w-3/4">
                      <input ref={searchField} className={wrapper[`search-input`]} name="name" onChange={handleFilter} placeholder="Search.." />
                    </div>
                  </div>
                  <div className="w-3/12">
                    <div className="m-auto h-auto">
                      <img className="w-5 opacity-100 hover:opacity-75 cursor-pointer mt-1 sm:w-6 md: ml-4" src={require('../../assets/search.png')} alt="" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap px-3.8 sm:px-4 md:px-6" id="showScroll">
            {playlist && playlist.map((item, index) => <div className="w-1/3 flex-none" key={index}><Movie {...{ item, title }} /></div>)}
          </div>
        </div>
      }
    </div>
  )
}

HomePage.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  handleFilter: PropTypes.func,
  handleBack: PropTypes.func,
}


export default HomePage
