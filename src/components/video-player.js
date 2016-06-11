var React = require('react');
var YoutubePlayer = require('react-youtube');

var VideoPlayer = React.createClass({

    propTypes: {
        videoId: React.PropTypes.string
    },

    render: function () {
        return (
            <div className="video-player">
                {this.renderYoutubePlayer()}
            </div>
        );
    },

    renderYoutubePlayer: function () {
        return (this.props.videoId) ? 
            <YoutubePlayer videoId={this.props.videoId} /> :
            null;
    },

    getPlayerProps: function () {
        return {
            videoId: this.props.videoId,
            onEnd: this.handleEnd
        };
    },

    handleEnd: function () {
        console.log('VIDEO TERMINADO');
    }
});

module.exports = VideoPlayer;
