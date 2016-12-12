(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactSimpleGrid"] = factory(require("React"));
	else
		root["ReactSimpleGrid"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.passGridColumnWidth = exports.Block = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Grid = __webpack_require__(2);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _passGridColumnWidth = __webpack_require__(6);

	var _passGridColumnWidth2 = _interopRequireDefault(_passGridColumnWidth);

	var _GridBlock = __webpack_require__(5);

	var _GridBlock2 = _interopRequireDefault(_GridBlock);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//import visualizeRender from 'react-render-visualizer-decorator';
	//@visualizeRender
	var GridResponsive = function (_React$PureComponent) {
	  _inherits(GridResponsive, _React$PureComponent);

	  function GridResponsive(props) {
	    _classCallCheck(this, GridResponsive);

	    var _this = _possibleConstructorReturn(this, (GridResponsive.__proto__ || Object.getPrototypeOf(GridResponsive)).call(this, props));

	    _this.state = {
	      columns: _this.props.columns,
	      spacing: _this.props.spacing,
	      blockWidth: _this.props.blockWidth
	    };

	    _this.setup = _this.setup.bind(_this);
	    _this.breakPoints = _this.breakPoints.bind(_this);
	    _this.gridWidth = _this.gridWidth.bind(_this);
	    return _this;
	  }

	  _createClass(GridResponsive, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setup();
	      window.addEventListener('resize', this.setup);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this.setup);
	    }
	  }, {
	    key: 'setup',
	    value: function setup() {
	      var _this2 = this;

	      // Compute column count and spacing based on grid width
	      if (this.props.breakPoints) {
	        this.breakPoints();
	      }

	      // Compute column width and pass to child components
	      // Async so that children are rendered before computing column width
	      // Otherwise scroll bar may change actual width and our value will be wrong

	      // ADD TO DOCS: (small link pointing to wiki page):
	      //  - "If you need the width to always be accurate down to the px please read this"
	      //  - Your children will render without a width initially
	      //  - You can have the children not render themself if no width
	      //  - But the actual width may change by ~17px if children then result in scrollbar appearing
	      //  - In most cases this is fine, you don't need an exact width of the grid
	      //  - But if you do (such as if you want to render an image that's the exact px width of its container) ...
	      //  - ... and not have it render and then the actual grid width shrink by 17px when the scrollbar appears ...
	      //  - Then make sure your child has a wrapper component that maintains the aspect ratio of the child
	      //  - Link to example of my <Image> component

	      if (this.props.passGridWidth) {
	        setTimeout(function () {
	          return _this2.gridWidth();
	        }, 0);
	      }
	    }
	  }, {
	    key: 'breakPoints',
	    value: function breakPoints() {
	      var _props = this.props,
	          columns = _props.columns,
	          spacing = _props.spacing,
	          blockWidth = _props.blockWidth;
	      var breakPoints = this.props.breakPoints;

	      var gridWidth = (0, _util.elementWidth)(this.el);

	      var breakPointOptions = (0, _util.nextHighestNumber)(breakPoints, gridWidth, true, false, 'maxWidth');

	      if (breakPointOptions) {
	        this.setState({
	          columns: breakPointOptions.columns || columns,
	          spacing: breakPointOptions.spacing || spacing,
	          blockWidth: breakPointOptions.blockWidth || blockWidth
	        });
	      }
	    }
	  }, {
	    key: 'gridWidth',
	    value: function gridWidth() {
	      var gridWidthPx = (0, _util.elementWidth)(this.el);
	      console.log('[GRID] Grid Width: ' + gridWidthPx);

	      this.setState({ gridWidthPx: gridWidthPx });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props2 = this.props,
	          children = _props2.children,
	          hideOuterSpacing = _props2.hideOuterSpacing;

	      // This state is set from props in constructor

	      var _state = this.state,
	          columns = _state.columns,
	          spacing = _state.spacing,
	          blockWidth = _state.blockWidth,
	          gridWidthPx = _state.gridWidthPx;

	      // Wrap with <div> so we can grab DOM node without needing to import findDOMNode from react-dom

	      return _react2.default.createElement(
	        'div',
	        { ref: function ref(el) {
	            _this3.el = el;
	          } },
	        _react2.default.createElement(
	          _Grid2.default,
	          { columns: columns, gridWidthPx: gridWidthPx, blockWidth: blockWidth, spacing: spacing, hideOuterSpacing: hideOuterSpacing },
	          children
	        )
	      );
	    }
	  }]);

	  return GridResponsive;
	}(_react2.default.PureComponent);

	;

	GridResponsive.defaultProps = {
	  columns: 3,
	  spacing: 5,
	  hideOuterSpacing: true,
	  passGridWidth: true
	};

	GridResponsive.propTypes = {
	  spacing: _react2.default.PropTypes.number,
	  columns: _react2.default.PropTypes.number,
	  hideOuterSpacing: _react2.default.PropTypes.bool,
	  passGridWidth: _react2.default.PropTypes.bool,
	  blockWidth: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)]),
	  children: _react2.default.PropTypes.node.isRequired,
	  breakPoints: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    maxWidth: _react2.default.PropTypes.number,
	    columns: _react2.default.PropTypes.number,
	    spacing: _react2.default.PropTypes.number
	  }))
	};

	exports.default = GridResponsive;
	exports.Block = _GridBlock2.default;
	exports.passGridColumnWidth = _passGridColumnWidth2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _GridRow = __webpack_require__(3);

	var _GridRow2 = _interopRequireDefault(_GridRow);

	var _GridBlock = __webpack_require__(5);

	var _GridBlock2 = _interopRequireDefault(_GridBlock);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Grid = function (_React$PureComponent) {
	  _inherits(Grid, _React$PureComponent);

	  function Grid(props) {
	    _classCallCheck(this, Grid);

	    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

	    _this.computeBlockWidthPx = _this.computeBlockWidthPx.bind(_this);
	    return _this;
	  }

	  // Compute the pixel width of a <Block>


	  _createClass(Grid, [{
	    key: 'computeBlockWidthPx',
	    value: function computeBlockWidthPx(block, numBlocksInRow) {
	      var _props = this.props,
	          spacing = _props.spacing,
	          hideOuterSpacing = _props.hideOuterSpacing,
	          gridWidthPx = _props.gridWidthPx;

	      // If we don't have a width for the grid then return null width

	      if (!gridWidthPx) return null;

	      var gutterCount = numBlocksInRow + (hideOuterSpacing ? -1 : 1);
	      var totalSpacing = gutterCount * spacing;
	      var totalBlockSpace = gridWidthPx - totalSpacing;
	      var blockWidthPx = totalBlockSpace * (block.width / 100);
	      return blockWidthPx;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props2 = this.props,
	          columns = _props2.columns,
	          blockWidth = _props2.blockWidth,
	          spacing = _props2.spacing,
	          hideOuterSpacing = _props2.hideOuterSpacing,
	          children = _props2.children;


	      var styles = {
	        wrapper: {
	          // Prevent horizontal scroll
	          overflowX: 'hidden'
	        },
	        grid: {
	          paddingTop: spacing + 'px',
	          paddingBottom: spacing + 'px'
	        },
	        gridHideOuterSpacing: {
	          // Expand grid width to hide outer gutters
	          width: 'calc(100% + ' + spacing + 'px)',
	          marginLeft: 'calc(-' + spacing / 2 + 'px)',
	          paddingTop: 0,
	          paddingBottom: 0
	        }
	      };

	      // Get desired blockWidth from <Grid blockWidth> or <Grid columns> (alternate)
	      // blockWidth can be a number or an array of numbers
	      // This will be overridden by an individual <Block width> if specified
	      var blockWidthFromProps = blockWidth || 1 / columns;

	      // Normally into an array of widths ([1/4] or [1/4,1/2,1/4])
	      var blockWidthArray = setupBlockWidthArray(blockWidthFromProps);

	      /**** BUILD OUR <ROWS> OF <BLOCKS> ****/

	      var rowNodes = [];
	      var rowInProgress = [];
	      var rowInProgressWidth = 0;
	      var bwaIndex = 0;

	      // Filter out null children such as {/*...*/}
	      var validChildren = children.filter(function (child) {
	        return child;
	      });

	      // Iterate through all children
	      // Fetch props from children that are already <Blocks>
	      _react2.default.Children.forEach(validChildren, function (child, i) {

	        // Begin setting up our block object
	        var block = {
	          spacing: spacing,
	          key: 'block-' + (child.key || i)
	        };

	        // Get the next blockWidth from our array of widths
	        var blockWidth = blockWidthArray[bwaIndex];
	        // Once we get to the end of blockWidthArray then start back at 0
	        bwaIndex = blockWidthArray[bwaIndex + 1] ? bwaIndex + 1 : 0;

	        // If child is a <Block> then we use its width and children props
	        if (child.type === _GridBlock2.default) {
	          block.width = child.props.width ? child.props.width * 100 : blockWidth;
	          block.children = child.props.children;
	        } else {
	          block.width = blockWidth;
	          block.children = child;
	        }

	        // If we've gone over 100% width for our rowInProgress ...
	        // Make the current <Block> width smaller so that we're at 100% exactly
	        var amountOver = rowInProgressWidth - 100;
	        if (amountOver > 0) {
	          block.width = block.width - amountOver;
	        }

	        // Add to our row array
	        rowInProgress.push(block);

	        // Total width of current row
	        rowInProgressWidth += block.width;

	        // See if it's the last block so we can push a final row
	        var isLastBlock = i === validChildren.length - 1;

	        // If the <Row> we are preparing is full then push it!
	        // Or if we're on the last <Block> push an unfinished row
	        // Round up since row might be 99.9999...
	        if (rowInProgressWidth.toFixed(2) >= 100 || isLastBlock) {
	          rowNodes.push(_react2.default.createElement(
	            _GridRow2.default,
	            {
	              spacing: spacing,
	              isLastRow: i === validChildren.length - 1,
	              hideGutters: hideOuterSpacing,
	              key: 'row-' + rowNodes.length },
	            rowInProgress.map(function (block) {
	              return _react2.default.createElement(
	                _GridBlock2.default,
	                {
	                  spacing: block.spacing,
	                  width: block.width,
	                  widthPx: _this2.computeBlockWidthPx(block, rowInProgress.length),
	                  key: block.key },
	                block.children
	              );
	            })
	          ));

	          // Reset to prepare a new <Row>
	          rowInProgress = [];
	          rowInProgressWidth = 0;
	        }
	      });

	      var gridStyle = styles.grid;
	      if (hideOuterSpacing) {
	        gridStyle = (0, _util.merge)(gridStyle, styles.gridHideOuterSpacing);
	      }

	      return _react2.default.createElement(
	        'div',
	        { style: styles.wrapper },
	        _react2.default.createElement(
	          'div',
	          { style: gridStyle },
	          rowNodes
	        )
	      );
	    }
	  }]);

	  return Grid;
	}(_react2.default.PureComponent);

	;

	// Setup an array of block widths to iterate through
	function setupBlockWidthArray(blockWidth) {
	  // Normalize value into an array of numbers 
	  var pattern = isArray(blockWidth) ? blockWidth : [blockWidth];
	  // Turn width values from fraction (1/4) to percent (25)
	  return pattern.map(function (w) {
	    return w * 100;
	  });
	}

	// From http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
	function isArray(o) {
	  return Object.prototype.toString.call(o) === '[object Array]';
	}

	Grid.propTypes = {
	  columns: _react2.default.PropTypes.number,
	  spacing: _react2.default.PropTypes.number,
	  hideOuterSpacing: _react2.default.PropTypes.bool,
	  children: function children(props) {
	    var children = props.children;

	    // Get all children that are <Block> components

	    var blocks = children.filter(function (child) {
	      return child && child.type === _GridBlock2.default;
	    });

	    // Throw error if some children are <Blocks> but not all
	    if (blocks.length && blocks.length !== children.length) {
	      throw new Error("<Grid> children must all be <Blocks> (or none should and we'll wrap them in <Blocks> for you). It's all or nothing!");
	    }

	    // Get all <Blocks> that have a width specified
	    // Also add up total width of all <Blocks>
	    var totalWidth = 0;
	    var blocksWithWidth = blocks.filter(function (child) {
	      totalWidth += child.props.width;
	      return child.props.width > 0;
	    });

	    // All <Blocks> should have a width specified or none of them should
	    if (blocksWithWidth.length && blocksWithWidth.length !== blocks.length) {
	      throw new Error("You must specify a width for all <Block> components (or for none of them and it will be divided evenly)");
	    }

	    // Make sure total width of <Blocks> add up to 100 or is 0 (none specified)
	    /*
	    if (totalWidth !== 100 && totalWidth !== 0){
	      throw new Error("Total width of all <Block> components must equal 100 (or 0 and it will be divided evenly)");
	    }*/

	    return null;
	  }
	};

	exports.default = Grid;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Row = function Row(_ref) {
	  var spacing = _ref.spacing,
	      isLastRow = _ref.isLastRow,
	      hideGutters = _ref.hideGutters,
	      children = _ref.children;


	  var styles = {
	    row: {
	      position: 'relative',
	      width: '100%',
	      marginBottom: spacing + 'px',
	      // Half outer spacing because child blocks also have left/right padding
	      paddingLeft: spacing / 2 + 'px',
	      paddingRight: spacing / 2 + 'px',
	      'boxSizing': 'border-box',
	      'WebkitBoxSizing': 'border-box',
	      'MozBoxSizing': 'border-box'
	    },
	    rowLast: {
	      marginBottom: 0
	    },
	    rowHideGutters: {
	      paddingLeft: 0,
	      paddingRight: 0
	    },
	    clearfix: {
	      content: '""',
	      display: 'table',
	      clear: 'both'
	    }
	  };

	  var rowStyle = styles.row;

	  if (isLastRow) {
	    rowStyle = (0, _util.merge)(rowStyle, styles.rowLast);
	  }

	  if (hideGutters && spacing > 0) {
	    rowStyle = (0, _util.merge)(rowStyle, styles.rowHideGutters);
	  }

	  return _react2.default.createElement(
	    'div',
	    { style: rowStyle },
	    children,
	    _react2.default.createElement('div', { style: styles.clearfix })
	  );
	};

	Row.propTypes = {
	  spacing: _react2.default.PropTypes.number,
	  isLastRow: _react2.default.PropTypes.bool,
	  hideGutters: _react2.default.PropTypes.bool,
	  children: _react2.default.PropTypes.node.isRequired
	};

	exports.default = Row;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nextHighestNumber = nextHighestNumber;
	exports.merge = merge;
	exports.elementWidth = elementWidth;
	/**
	 * Find the next equal or higher number within an array
	 * @arr {array} Array to iterate through.
	 * @num {number} Number to compare.
	 * @returnEqual {boolean} Return an equal number if found.
	 * @returnLast {boolean} Return last number if no equal or higher one found.
	 * @prop {string} Indicates @arr contains objects. Get number from object[prop].
	 */
	function nextHighestNumber(arr, num, returnEqual, returnLast, prop) {
	  var i = 0;
	  for (i = 0; i < arr.length; i++) {
	    var arrNum = prop ? arr[i][prop] : arr[i];
	    if (returnEqual && arrNum === num) {
	      return arr[i];
	    } else if (arrNum >= num) {
	      return arr[i];
	    }
	  }
	  if (returnLast) {
	    return arr[i - 1];
	  } else {
	    return false;
	  }
	}

	/**
	 * Shallow merge two objects
	 * We're just merging style objects so no need for object-assign ponyfill
	 */
	function merge(obj1, obj2) {
	  for (var attrname in obj2) {
	    obj1[attrname] = obj2[attrname];
	  }

	  return obj1;
	}

	/**
	 * Get the width of a DOM element
	 * TODO: Test this in other browsers
	 */
	function elementWidth(el) {
	  return el.clientWidth;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Block = function (_React$PureComponent) {
	  _inherits(Block, _React$PureComponent);

	  function Block() {
	    _classCallCheck(this, Block);

	    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
	  }

	  _createClass(Block, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        parentColumnWidth: this.props.widthPx
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          width = _props.width,
	          spacing = _props.spacing,
	          children = _props.children;


	      var style = {
	        position: 'relative',
	        float: 'left',
	        width: width + '%', // Should be percent
	        paddingLeft: spacing / 2 + 'px',
	        paddingRight: spacing / 2 + 'px',
	        boxSizing: 'border-box',
	        WebkitBoxSizing: 'border-box',
	        MozBoxSizing: 'border-box'
	      };

	      return _react2.default.createElement(
	        'div',
	        { style: style },
	        children
	      );
	    }
	  }]);

	  return Block;
	}(_react2.default.PureComponent);

	;

	Block.childContextTypes = {
	  parentColumnWidth: _react2.default.PropTypes.number
	};

	Block.defaultProps = {
	  width: 0
	};

	Block.propTypes = {
	  // Don't require width and spacing since it will always be added by Grid ...
	  // ... and we need to allow composition: <Grid><Block/><Block/></Grid>
	  width: _react2.default.PropTypes.number,
	  spacing: _react2.default.PropTypes.number,
	  children: _react2.default.PropTypes.node
	};

	exports.default = Block;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Higher order function that passes context.parentColumnWidth to its child component */

	exports.default = function (WrappedComponent, propName) {

	  // So it's in our HOC functions scope (better way?)
	  var childPropName = propName;

	  var withColumnWidthHOC = function withColumnWidthHOC(props, _ref) {
	    var parentColumnWidth = _ref.parentColumnWidth;


	    var newProps = {};
	    childPropName = childPropName || 'parentColumnWidth';
	    newProps[childPropName] = parentColumnWidth;

	    return _react2.default.createElement(WrappedComponent, _extends({}, newProps, props));
	  };

	  withColumnWidthHOC.contextTypes = {
	    parentColumnWidth: _react2.default.PropTypes.number
	  };

	  return withColumnWidthHOC;
	};

/***/ }
/******/ ])
});
;