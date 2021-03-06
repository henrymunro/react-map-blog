import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import isEqual from 'lodash.isequal'
import {ResizedPhoto} from '../../../photos'

export default class PhotoUploadViewer extends React.Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps)
  }

  render () {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto'
      },
      titleStyle: {
        color: 'rgb(0, 188, 212)'
      }
    }

    const imageStyle = {
      maxHeight: '200px',
      width: '300px'
    }

    return <div className='row'>
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2}>
          {this.props.photos.map((photo) => (
            <GridTile
              onClick={() => this.props.movePhotoUpInArray(photo._id)}
              key={photo._id}
              title={photo.name}
              titleStyle={styles.titleStyle}
              titleBackground='linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'>
              <ResizedPhoto style={imageStyle} photo={photo} size={'300x200'} />
            </GridTile>))}
        </GridList>
      </div>
    </div>
  }
}

PhotoUploadViewer.propTypes = {
  photos: React.PropTypes.array.isRequired,
  movePhotoUpInArray: React.PropTypes.func.isRequired
}
