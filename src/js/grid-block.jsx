var React = require('react');

var Block = React.createClass({

  render: function(){

    var style = {
      position: 'relative',
      float: 'left',
      width: this.props.width,
      paddingLeft: (this.props.spacing / 2 ) + 'px',
      paddingRight: (this.props.spacing / 2 ) + 'px'
    };

    return (
      <div className="block"
        style={style}>
          {this.props.children}
      </div>
    );
  }
});

module.exports = Block;
