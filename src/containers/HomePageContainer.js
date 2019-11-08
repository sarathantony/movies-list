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

  componentWillReceiveProps(nextProps) {
    const { data: { page: { title, [`content-items`]: { content } } } } = nextProps

    if (nextProps.data.page[`page-num-requested`] !== this.props.data.page[`page-num-requested`]) {
      this.setState(prevState => ({
        ...prevState,
        playlist: content,
        title,
      }))
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.trackScrolling)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.trackScrolling)
  }

  trackScrolling = (e) => {
    const { data: { page }, currentPage } = this.props
    const { playlist } = this.state
    const yOffset = Math.ceil(window.pageYOffset + window.innerHeight)
    const docHeight = document.getElementById('rootContainer').clientHeight

    if ((yOffset >= docHeight) && (playlist && playlist.length < Number(page[`total-content-items`]))) {
      this.props.nextPage(`page` + (Number(currentPage) + 1))
    }
  }

  handleFilter = (e) => {
    e.preventDefault()
    const pattern = e.target.value
    const { data: { page: { [`content-items`]: { content } } } } = this.props

    /**
     * filter the immutable object so it won't effect the local state object. 
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
  currentPage: state.playlist.page[`page-num-requested`] || null,
})

const mapDispatchToProps = dispatch => ({
  nextPage: pageNumber => dispatch(getPage(pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
