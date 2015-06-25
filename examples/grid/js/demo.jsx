var React = require('react');

var GridComponent = require('../../../src/js/grid.jsx');

var DemoComponent = React.createClass({

	getInitialState: function(){
		return {
			data: []
		}
	},

	getDefaultProps: function() {
	    return {
	      instagramClientId: '02d26cb819954ba7b5c3c072a885759f',
	      instagramCount: 28,
	      instagramUserId: 478987666
	    };
	},

	componentDidMount: function(){

	  var endpoint = "https://api.instagram.com/v1/users/" + this.props.instagramUserId + 
                "/media/recent?client_id=" + this.props.instagramClientId + 
                    "&count=" + this.props.instagramCount;

		var requestParams = {
			client_id: this.props.instagramClientId,
			count: this.props.instagramCount
		};

		JSONP(endpoint, requestParams, function(data){

			var newData = data.data.map(function (result) {
		      result.image = result.images.low_resolution.url;
		      return result;
		    });

		    this.setState(newData);

		}.bind(this));
	},

	render: function(){

		var imageNodes = this.state.data.map(function(result){
	      return (
	      	 <img src={result.image}>
	      );
	    }.bind(this));

    	return (
      		<div>
      			{imageNodes.length &&
			    	<GridComponent blocksPerRow={4} blockSpacing={1} hideOuterSpacing={true}>
			    		{imageNodes}
			    	</GridComponent>
		    	}
      		</div>
   		);
  	}

});

module.exports = DemoComponent;

