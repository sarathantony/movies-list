import React, { Component } from 'react'
import HomePage from '../components/HomePage'
import { connect } from 'react-redux'

class HomePageContainer extends Component {
  render () {
    const { age } = this.props
    return <HomePage {...{ age }} />
  }
}

const mapStateToProps = state => ({
  age: state.age,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
