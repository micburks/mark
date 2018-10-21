import React, { Component, Fragment } from 'react'
import { Provider } from '../context.js'
import Media from 'react-media'
import Layout from './Layout/Layout.jsx'
import MobileSplashPage from './MobileSplashPage.jsx'
import Header from './Header/Header.jsx'
import Breadcrumbs from './Breadcrumbs/Breadcrumbs.jsx'
import NavActions from './NavActions.jsx'
import Filelist from './Filelist.jsx'
import Detail from './Detail/Detail.jsx'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      path: [],
      selected: null,
      selectDir: path => this.setState({ path, selected: null }),
      selectFile: selected => this.setState({ selected }),
      config: {}
    }
  }

  render () {
    return (
      <Provider value={this.state}>
        <Media query="(max-width: 500px)">
          {
            isMobile =>
              isMobile
                ? <MobileSplashPage />
                : (
                  <Layout
                    Header={Header}
                    Banner={Breadcrumbs}
                    Sidebar={Sidebar}
                    Body={Detail}
                  />
                )
          }
        </Media>
      </Provider>
    )
  }
}

function Sidebar () {
  return (
    <Fragment>
      <NavActions />
      <Filelist />
    </Fragment>
  )
}
