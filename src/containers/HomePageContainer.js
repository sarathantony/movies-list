import React, { Component } from 'react'
import HomePage from '../components/HomePage'
import { connect } from 'react-redux'
import { getPage } from '../store/actions'
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
    const { playlist, isSearching } = this.state
    const yOffset = Math.ceil(window.pageYOffset + window.innerHeight)
    const docHeight = document.getElementById('rootContainer').clientHeight

    if ((yOffset >= docHeight) && (playlist && playlist.length < Number(page[`total-content-items`]))) {
      !isSearching && this.props.nextPage(`page` + (Number(currentPage) + 1))
    }
  }

  handleFilter = (e) => {
    e.preventDefault()
    const pattern = e.target.value
    const { data: { page: { [`content-items`]: { content } } } } = this.props
    const isSearching = e.target.value.length > 0

    /**
     * filter the immutable object so it won't effect the local state object. 
     */
    this.setState(prevState => ({
      ...prevState,
      isSearching,
      playlist: content.filter(item => item.name.toLowerCase().includes(pattern.toLowerCase())),
    }))
  }

  /**
   * simulate back - button
   */
  handleBack = () => {
    const { data: { page: { title, [`content-items`]: { content } } } } = this.props
    this.searchField.current.value = null

    this.setState(prevState => ({
      ...prevState,
      playlist: content,
      title,
    }))
  }

  render () {
    const { playlist, title } = this.state
    const { handleFilter, handleBack, searchField } = this

    return <HomePage {...{ playlist, title, handleFilter, handleBack, searchField }} />
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
