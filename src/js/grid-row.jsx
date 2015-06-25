var React = require('react');
var Radium = require('radium');

var Row = React.createClass({

  render: function(){

    var styles = {
      row: {
        position: 'relative',
        width: '100%',
        marginBottom: (this.props.spacing) + 'px',
        paddingLeft: (this.props.spacing/2) + 'px', // Half spacing because child blocks also have left/right padding
        paddingRight: (this.props.spacing/2) + 'px'
      },
      rowLast: {
        marginBottom: 0
      },
      // Expands row width to hide gutters (spacing to left and right of row)
      // Note: Gutter spacing is caused by child Block components (not style of row element)
      rowHideGutters: {
        width: 'calc(100% + ' + this.props.spacing + 'px)',
        marginLeft: "calc(-" + (this.props.spacing/2) + "px)",
        paddingLeft: 0,
        paddingRight: 0
      },
      clearfix: {
        content: '""',
        display: 'table',
        clear: 'both'
      }
    };

    return (
      <div className="row"
        style={[ 
          styles.row,
          this.props.isLastRow && styles.rowLast,
          this.props.hideGutters && styles.rowHideGutters
        ]}>

          {this.props.children}

          <div style={[ styles.clearfix ]} />
      </div>
    );
  }
});

module.exports = Radium(Row);
