import React, {Component} from 'react';

class BlurryImage extends Component {

    constructor(props) {
        super(props);
        this.state = ({initialized: false});
    }

    componentDidMount() {
        // if (this.state.initialized) {
        //     return;
        // }

        // const parent = $("#panel-blurry-" + this.props.imageId);
        // const selector = $("#blurry-" + this.props.imageId);
        // const largeSelector = $("#large-blurry-" + this.props.imageId);
        // const imageSet = this.props.imageSet;
        // this.blurryLoad(parent, selector, largeSelector, imageSet);
        //
        // this.initialized();
    }

    // initialized() {
    //     this.setState({initialized: true});
    // }

    blurryLoad(parent, selector, largeSelector, imageSet) {

        let parentContainer = parent,
            imageContainer = selector,
            largeImageContainer = largeSelector;

        parentContainer.addClass('blurry-load-container');
        // imageContainer.addClass('img-blur');

        // 1: load small image and show it
        let img = new window.Image();
        img.src = imageContainer.attr('src');
        img.onload = function () {
            imageContainer.addClass('loaded');
        };

        //2: load large image
        // let imgLarge = new window.Image();
        // imgLarge.src = imageContainer.attr('src');
        // imgLarge.onload = function () {
        //     imgLarge.classList.add('loaded');
        // };
        // parentContainer.append(imgLarge)
    }

    render() {
        const {imageId, containerClass, imageClass, imageSet, imageTitle} = this.props;

        return (
            <div style={{width: '100%', height: '100%'}}>
                <div className={containerClass } id={"panel-blurry-" + imageId}>
                    <img
                        id={"blurry-" + imageId}
                        src={imageSet.small}
                        className={ imageClass }
                        alt={imageTitle}
                        title={imageTitle}/>
                </div>
            </div>
        )
    }

}

BlurryImage.displayName = "BlurryImage";

module.exports = BlurryImage;
export default BlurryImage;