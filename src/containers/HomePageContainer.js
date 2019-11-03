import React, { Component } from 'react'
import HomePage from '../components/HomePage'
import { connect } from 'react-redux'

class HomePageContainer extends Component {
  render () {
    const { playlist } = this.props

    return <HomePage {...{ playlist }} />
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
