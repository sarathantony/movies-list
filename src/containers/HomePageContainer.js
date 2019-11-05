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
      page: 1,
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

  trackScrolling = (e) => {
    const { data: { page } } = this.props
    const { playlist } = this.state
    const yOffset = Math.ceil(window.pageYOffset + window.innerHeight)
    const docHeight = document.getElementById('root').clientHeight


    if ((yOffset >= docHeight) && (playlist.length <= page[`total-content-items`])) {
      this.props.nextPage(`page` + (Number(this.state.page) + 1))

      this.setState(prevState => ({
        page: prevState.page + 1,
      }))
    }
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
  currentPage: state.playlist.page[`page-num-requested`] || null,
})

const mapDispatchToProps = dispatch => ({
  nextPage: pageNumber => dispatch(getPage(pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
