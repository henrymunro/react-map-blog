import React from 'react'
import { connect } from 'react-redux'

import * as selectors from '../reducer'
import actions from '../actions'

import {MapComponent, RouteMarker, DayMarker, Svg} from '../../map'

@connect((store) => {
  return {
    map: selectors.getMap(store),
    mapLoaded: selectors.getMapLoaded(store),
    mapDraggable: selectors.getMapDraggable(store),
    zoom: selectors.getZoom(store),
    mapBounds: selectors.getMapBounds(store),
    blog: selectors.getBlog(store),
    route: selectors.getRoute(store),
    mapCenter: selectors.getChildClickCenter(store)
  }
}, actions)

export default class Home extends React.Component {

  plotRoutePoints (route) {
    console.log('ROUTEE: ', route)
    return route.map((point) => {
      const { lat, lng } = point.center || {}
      return lat && <RouteMarker
        lat={lat}
        lng={lng}
        name={point.name}
        key={point._id} />
    })
  }

  plotBlogPoints (blog) {
    return blog.map((day, key) => {
      const { lat, lng } = day.center || {}
      return lat && <DayMarker lat={lat} lng={lng} name={day.title} key={day._id} onClick={() => this.props.homeOnMapSpecificChildClick({lat, lng})} />
    })
  }

  render () {
    const divStyle = {
      height: '200px',
      width: '200px',
      marginTop: '50px',
      background: 'white',
      position: 'absolute',
      top: 0,
      right: 0
    }
    const { blog, route } = this.props
    const svgLineBlogPoints = blog.map((point) => {
      const { center, bezier0, bezier1 } = point
      return { center, bezier0, bezier1 }
    }).filter((point) => point.center)

    console.log('OUHS: ', svgLineBlogPoints)

    const svgLineRoutePoints = [blog[blog.length - 1], ...route].map((point) => {
      const { center, bezier0, bezier1 } = point || {}
      return { center, bezier0, bezier1 }
    }).filter((point) => point.center)

    // console.log('SVG POINT: ', svgLinePoints)
    return <div>
      <div style={{height: '100vh', width: '100vw', position: 'fixed'}}>
        <MapComponent
          center={this.props.mapCenter}
          draggable={this.props.mapDraggable}
          onChange={this.props.homeOnMapChange}
          onClick={this.props.homeOnMapClick}
          onGoogleApiLoaded={this.props.homeOnGoogleApiLoaded} >
          {this.plotBlogPoints(this.props.blog)}
          {this.plotRoutePoints(this.props.route)}
          {(svgLineRoutePoints.length > 0 && this.props.mapLoaded) && <Svg coords={svgLineRoutePoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}
          {(svgLineBlogPoints.length > 0 && this.props.mapLoaded) && <Svg coords={svgLineBlogPoints} zoom={this.props.zoom} nwCorner={this.props.mapBounds.nw} />}
        </MapComponent>
        <div style={divStyle} >
          <h4>Here</h4>
        </div>
      </div>
      {this.props.children}
    </div>
  }
}

