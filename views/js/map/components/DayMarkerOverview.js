import React from 'react'
import isEqual from 'lodash.isequal'

import mapStyles from 'styles/components/map.css'

export default class DayMarkerOverview extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const K_WIDTH = 30
    const K_HEIGHT = 30
    const pinStyle = {
// initially any map object has left top corner at lat lng coordinates
// it's on you to set object origin to 0,0 coordinates
      top: -(1 + 1.41) * K_HEIGHT / 2,
      left: -K_WIDTH / 2,
      position: 'absolute',
      width: K_WIDTH,
      height: K_HEIGHT,
      borderRadius: '50% 50% 50% 0',
      background: '#89849b'
    }

    const BOX_WIDTH = 300
    const BOX_HEIGHT = 160

    const boxStyle = {
      top: -BOX_HEIGHT - (1 * K_HEIGHT / 2),
      left: -BOX_WIDTH / 2,
      content: '',
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      background: '#89849b',
      position: 'absolute',
      zIndex: 10,

      color: 'white'
    }

    return <div>
      <div
        className={mapStyles.dayMarker}
        style={pinStyle}
        onClick={this.props.onClick} />
      <div
        className={mapStyles.bounce}
        style={boxStyle}>
        <h5>{this.props.name}</h5>
      </div>
    </div>
  }
}
      // {this.props.name}

DayMarkerOverview.defaultProps = {
  type: 'blog'
}

DayMarkerOverview.propTypes = {
  name: React.PropTypes.string.isRequired,
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func,
  type: React.PropTypes.string

}