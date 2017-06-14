import React from 'react';

class AvatarBlurryImage extends Component {

    constructor(props) {
        super(props);
        const date = new Date().getTime();
        this.state = ({
                initialized: false,
                imageId: date.toString()
            }
        );
    }

    // componentDidMount() {
    //     if (this.state.initialized) {
    //         return;
    //     }
    //
    //     this.blurryLoad($("#blurry-" + this.state.imageId));
    //
    //     this.initialized();
    // }

    // initialized() {
    //     this.setState({initialized: true});
    // }

    // blurryLoad(selector) {
    //
    //     let parentContainer = selector.parent(),
    //         imageContainer = selector;
    //
    //     parentContainer.addClass('blurry-load-container-avatar');
    //     imageContainer.addClass('img-blur');
    //
    //     // 1: load small image and show it
    //     let img = new window.Image();
    //     img.src = imageContainer.attr('src');
    //     img.onload = function () {
    //         imageContainer.addClass('avatar-loaded');
    //     };
    //
    //     //2: load large image
    //     let imgLarge = new window.Image();
    //     imgLarge.src = selector.attr('data-large');
    //     imgLarge.onload = function () {
    //         imgLarge.classList.add('avatar-loaded');
    //     };
    //     parentContainer.append(imgLarge)
    // }

    render() {
        const {imageId} = this.state,
            {containerClass, imageClass, imageSet, imageWidth, imageHeight, imageTitle} = this.props;

        return (
            <div className={containerClass}>
                <img
                    id={"blurry-" + imageId}
                    width={imageWidth}
                    height={imageHeight}
                    src={imageSet.small}
                    className={imageClass}
                    alt={imageTitle}
                    title={imageTitle}/>
            </div>
        )
    }
}

AvatarBlurryImage.displayName = "AvatarBlurryImage";

module.exports = AvatarBlurryImage;
export default AvatarBlurryImage;