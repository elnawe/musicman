var React = require('react');
var ReactDOM = require('react-dom');
var SearchVideo = require('src/components/search-video');
var VideoPlayer = require('src/components/video-player');
var Firebase = require('firebase');
var config = {
    apiKey: "AIzaSyB-rUnUzB4yakmIujeByqc_yd3vmqHsoXE",
    authDomain: "musicman-1339.firebaseapp.com",
    databaseURL: "https://musicman-1339.firebaseio.com",
    storageBucket: "musicman-1339.appspot.com",
};

var App = React.createClass({

    getInitialState: function () {
        return {
            selectedVideo: null
        };
    },

    componentWillMount: function () {
        firebase.initializeApp(config);
    },

    render: function () {
        return (
            <div className="app">
                <SearchVideo onVideoSelect={this.handleVideoSelect} />
                <VideoPlayer />
            </div>
        );
    },

    handleVideoSelect: function (selectedVideo) {
        this.setState({
            selectedVideo: selectedVideo
        }, this.updateDatabaseWithSelectedVideo);
    },

    updateDatabaseWithSelectedVideo: function () {
        var videoSet = {};
        videoSet[this.state.selectedVideo] = 1;

        firebase.database().ref('videos').set(videoSet);
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
