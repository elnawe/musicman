var React = require('react');
var ReactDOM = require('react-dom');
var SearchVideo = require('src/components/search-video');
var VideoPlayer = require('src/components/video-player');

var App = React.createClass({

    getInitialState: function () {
        return {
            selectedVideo: null
        };
    },

    render: function () {
        return (
            <div className="app">
                <SearchVideo onVideoSelect={this.handleVideoSelect} />
                <VideoPlayer videoId={this.state.selectedVideo} />
            </div>
        );
    },

    handleVideoSelect: function (selectedVideo) {
        this.setState({
            selectedVideo: selectedVideo
        });
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
