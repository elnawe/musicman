var React = require('react');
var YoutubeNode = require('youtube-node');
var Youtube = new YoutubeNode();

Youtube.setKey('AIzaSyBtTKuwIdDCy3uxNy6IZYHQmvMkT52pty0');

var SearchVideo = React.createClass({

    propTypes: {
        onVideoSelect: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            items: [],
            searchValue: ''
        };
    },

    render: function () {
        return (
            <div className="search-video">
                <div className="search-video--box">
                    <input {...this.getSearchBoxProps()} />
                </div>
                {this.renderResults()}
            </div>
        );
    },

    renderResults: function () {
        return (
            <div className="search-video--results">
                {this.state.items.map(this.renderItem)}
            </div>
        );
    },

    renderItem: function (item, index) {
        var itemData = item.snippet;
        var thumbnail = itemData.thumbnails.default

        return (
            <div className="results--item" key={index} onClick={this.handleItemClick.bind(null, index)}>
                <img className="results--item-image" src={thumbnail.url} height={thumbnail.height} width={thumbnail.width} />
                <p className="results--item-title">{itemData.title}</p>
            </div>
        );
    },

    getSearchBoxProps: function () {
        return {
            className: 'search-video--input',
            onChange: this.handleChange,
            placeholder: 'Search for a song...'
        };
    },

    handleChange: function (event) {
        this.setState({
            searchValue: event.target.value
        }, this.conditionallyDoSearch);
    },

    conditionallyDoSearch: function () {
        if (this.state.searchValue) {
            this.handleSearch();
        } else {
            this.setState({
                items: []
            });
        }
    },

    handleSearch: function () {
        Youtube.addParam('type', 'video');
        Youtube.addParam('videoDuration', 'short');
        Youtube.addParam('videoLicense', 'youtube');
        Youtube.addParam('order', 'viewCount');
        Youtube.search(this.state.searchValue, 25, function (error, result) {
            if (!error && result) {
                this.setState({
                    items: result.items
                });
            }
        }.bind(this));
    },

    handleItemClick: function (index) {
        this.props.onVideoSelect(this.state.items[index].id.videoId);
    }
});

module.exports = SearchVideo;
