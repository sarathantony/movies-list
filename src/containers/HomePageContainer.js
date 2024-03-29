import React, { Component } from 'react'
import HomePage from '../components/HomePage'
import { connect } from 'react-redux'
import { resourceListReadRequest, resourceSearchRequest } from '../store/actions'
import { PropTypes } from 'prop-types'

class HomePageContainer extends Component {
  static propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.object),
    trackScrolling: PropTypes.func,
    handleFilter: PropTypes.func,
    handleBack: PropTypes.func,
    currentPage: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      playlist: [],
      title: '',
      isSearching: false,
    }
    this.searchField = React.createRef();
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
    const { playlist, isSearching } = this.state

    if (!isSearching && nextProps.data.page[`page-num-requested`] !== this.props.data.page[`page-num-requested`]) {
      this.setState(prevState => ({
        ...prevState,
        playlist: [...playlist, ...content],
        title,
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        playlist: content,
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
    const { playlist, isSearching } = this.state
    const yOffset = Math.ceil(window.pageYOffset + window.innerHeight)
    const docHeight = document.getElementById('wrapper').clientHeight

    if ((yOffset >= docHeight) && (playlist && playlist.length < Number(page[`total-content-items`]))) {
      !isSearching && this.props.readPage(`page`, (currentPage + 1))
    }
  }

  handleFilter = (e) => {
    const pattern = e.target.value
    const { searchMovie, readPage } = this.props
    const isSearching = pattern.length > 0 || false

    e.preventDefault()

    this.setState(prevState => ({
      ...prevState,
      isSearching,
    }))

    if (pattern.length === 0) readPage('page', 1)

    /**
     * performance optimization..
     */
    pattern && pattern.length >= 3 && searchMovie(pattern)
  }

  /**
   * simulate back - button
   */
  handleBack = (e) => {
    const { readPage } = this.props
    const enableBack = this.searchField.current.value.length > 0

    e.preventDefault()

    if (enableBack) {
      this.searchField.current.value = null
      this.setState(prevState => ({
        ...prevState,
        isSearching: false,
      }))
  
      readPage('page', 1)
    }
  }

  render () {
    const { playlist, title } = this.state
    const { handleFilter, handleBack, searchField } = this

    return <HomePage {...{ playlist, title, handleFilter, handleBack, searchField }} />
  }
}

const mapStateToProps = state => ({
  data: state.playlist,
  currentPage: Number(state.playlist.page[`page-num-requested`]) || null,
})

const mapDispatchToProps = dispatch => ({
  readPage: (resource, pageNumber) => dispatch(resourceListReadRequest(resource, { pageNumber })),
  searchMovie: keyword => dispatch(resourceSearchRequest(keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
