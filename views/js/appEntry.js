import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { StickyContainer } from 'react-sticky'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// For permormance checking remove in prouction
import Perf from 'react-addons-perf'
window.Perf = Perf

import { Blog } from './blog'
import { Home } from './home'
import { Photos } from './photos'
import { Budget } from './budget'
import { AboutMe } from './aboutMe'
import store from './appStore'

injectTapEventPlugin()

const app = document.getElementById('app')

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <StickyContainer>
      <Router history={history}>
        <Route path='/' component={Home} />
        <Route path='blog' component={Blog} />
        <Route path='home' component={Home} />
        <Route path='photos' component={Photos} />
        <Route path='budget' component={Budget} />
        <Route path='aboutMe' component={AboutMe} />
      </Router>
    </StickyContainer>
  </MuiThemeProvider>
</Provider>, app)
/*
    <AdminHome />
*/
