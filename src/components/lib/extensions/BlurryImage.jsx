import React, { Component } from 'react'

class BlurryImage extends Component {

  render () {
    const {imageId, containerClass, imageClass, imageSet, imageTitle} = this.props

    return (
      <div style={{width: '100%', height: '100%'}}>
        <div className={containerClass } id={'panel-blurry-' + imageId}>
          <img
            id={'blurry-' + imageId}
            src={imageSet.small}
            className={ imageClass }
            alt={imageTitle}
            title={imageTitle}/>
        </div>
      </div>
    )
  }

}

export default BlurryImage
