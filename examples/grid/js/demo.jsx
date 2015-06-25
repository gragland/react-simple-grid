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
	      instagramUserId: 75
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

		    this.setState({data:newData});

		}.bind(this));
	},

	render: function(){

		var imageNodes = this.state.data.map(function(result, i){
	      return ( 	
	      	 <img src={result.image} style={{ display: 'block', width: '100%' }} key={i}/>
	      );
	    }.bind(this));

    	return (

      		<div>
      			{imageNodes.length >= 1 &&
			    	<GridComponent blocksPerRow={4} blockSpacing={5} hideOuterSpacing={true}>
			    		{imageNodes}
			    	</GridComponent>
		    	}

		    	{imageNodes.length === 0 &&
		    		<div style={{ fontSize: '32px', margin: '20px'}}>
		    			Loading ...
		    		</div>
		    	}	
      		</div>
   		);
  	}

});

module.exports = DemoComponent;

