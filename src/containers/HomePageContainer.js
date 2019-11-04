import React, { Component } from 'react'
import HomePage from '../components/HomePage'
import { connect } from 'react-redux'
import { getPage } from '../store/actions'

class HomePageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      title: '',
    }
  }

  componentWillMount() {
    const { data: { page: { title, [`content-items`]: { content } } } } = this.props

    this.setState(prevState => ({
      ...prevState,
      playlist: content,
      title,
    }))
  }

  handleFilter = (e) => {
    e.preventDefault()
    const pattern = e.target.value
    const { data: { page: { [`content-items`]: { content } } } } = this.props

    /**
     * filter the immutable object hence it won't effect the local state object. 
     */
    this.setState(prevState => ({
      ...prevState,
      playlist: content.filter(item => item.name.toLowerCase().includes(pattern.toLowerCase())),
    }))
  }

  render () {
    const { playlist, title } = this.state
    const { handleFilter } = this

    return <HomePage {...{ playlist, title, handleFilter }} />
  }
}

const mapStateToProps = state => ({
  data: state.playlist,
})

const mapDispatchToProps = dispatch => ({
  nextPage: pageNumber => dispatch(getPage(pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
