import React from 'react';
import Row from './GridRow.js';
import Block from './GridBlock.js';
import { merge, isArray } from './util.js';

class Grid extends React.PureComponent {

  constructor(props){
    super(props);
    this.computeBlockWidthPx = this.computeBlockWidthPx.bind(this);
  }

  // Compute the pixel width of a <Block>
  computeBlockWidthPx(block, numBlocksInRow){

    const { spacing, hideOuterSpacing, gridWidthPx } = this.props;

    // If we don't have a width for the grid then return null width
    if (!gridWidthPx) return null;

    const gutterCount = numBlocksInRow + (hideOuterSpacing ? -1 : 1);
    const totalSpacing = gutterCount * spacing;
    const totalBlockSpace = gridWidthPx - totalSpacing;
    const blockWidthPx = totalBlockSpace * (block.width/100);
    return blockWidthPx;
  }

  render(){

    const { blocksPerRow, blockWidth, spacing, hideOuterSpacing, children } = this.props;

    const styles = {
      wrapper: {
        // Prevent horizontal scroll
        overflowX: 'hidden'
      },
      grid: {
        paddingTop: `${spacing}px`,
        paddingBottom: `${spacing}px`
      },
      gridHideOuterSpacing: {
        // Expand grid width to hide outer gutters
        width: `calc(100% + ${spacing}px)`,
        marginLeft: `calc(-${spacing/2}px)`,
        paddingTop: 0,
        paddingBottom: 0
      }
    };

    // Get desired blockWidth from <Grid blockWidth> or based on <Grid blocksPerRow> (alternate)
    // blockWidth can be a number or an array of numbers
    // This will be overridden by an individual <Block width> if specified
    let blockWidthFromProps = blockWidth || 1/blocksPerRow;

    // Normalize value into an array of percentages
    let blockWidthArray = (isArray(blockWidthFromProps) ? blockWidthFromProps : [blockWidthFromProps]);
    blockWidthArray =  blockWidthArray.map(w => w*100 );

    const blockWidthIterator = {
      index: 0,
      widths: blockWidthArray,
      next: function(){
        const width = this.widths[this.index];
        this.index = (this.widths[this.index+1] ? this.index+1 : 0);
        return width;
      }
    }

    /**** BUILD OUR <ROWS> OF <BLOCKS> ****/

    const rowNodes = [];

    const rowInProgress = {
      blocks: [],
      totalWidth: 0
    }

    // Filter out null children such as {/*...*/}
    const validChildren = children.filter(child => child);

    // Iterate through all children
    // Fetch props from children that are already <Blocks>
    React.Children.forEach(validChildren, (child, i) => {

      // Begin setting up our block object
      let block = {
        spacing: spacing,
        key: `block-${child.key || i}`
      };

      // Get the next blockWidth
      let blockWidth = blockWidthIterator.next();

      // If child is a <Block> then we use its width and children props
      if (child.type === Block){
        block.width = (child.props.width ? child.props.width*100 : blockWidth);
        block.children = child.props.children;
      }else{
        block.width = blockWidth;
        block.children = child;
      }

      // If we've gone over 100% width for our rowInProgress ...
      // Make the current <Block> width smaller so that we're at 100% exactly
      let amountOver = rowInProgress.totalWidth - 100;
      if (amountOver > 0){
        block.width = block.width - amountOver;
      }

      // Add to our row array
      rowInProgress.blocks.push(block);

      // Total width of current row
      rowInProgress.totalWidth += block.width;

      // See if it's the last block so we can push a final row
      let isLastBlock = (i === validChildren.length-1);

      // If the <Row> we are preparing is full then push it!
      // Or if we're on the last <Block> push an unfinished row
      // Round up since row might be 99.9999...
      if (rowInProgress.totalWidth.toFixed(2) >= 100 || isLastBlock){
        rowNodes.push(
          <Row 
            spacing={spacing} 
            isLastRow={(i === validChildren.length-1)}
            hideGutters={hideOuterSpacing}
            key={`row-${rowNodes.length}`}>

              {rowInProgress.blocks.map((block) => (
                <Block
                  spacing={block.spacing} 
                  width={block.width}
                  widthPx={this.computeBlockWidthPx(block, rowInProgress.blocks.length)}
                  key={block.key}> 
                    {block.children}
                </Block>
              ))}

          </Row>
        );

        // Reset to prepare a new <Row>
        rowInProgress.blocks = [];
        rowInProgress.totalWidth = 0;
      }

    });

    let gridStyle = styles.grid;
    if (hideOuterSpacing){
      gridStyle = merge(gridStyle, styles.gridHideOuterSpacing);
    }

  	return (
      <div style={styles.wrapper}>
        <div style={gridStyle}>
          {rowNodes}
        </div>
      </div>
  	);

  }
};

Grid.propTypes = {
  blocksPerRow: React.PropTypes.number,
  spacing: React.PropTypes.number,
  hideOuterSpacing: React.PropTypes.bool,
  children: (props) => {
    const { children } = props;

    // Get children that are <Block> components
    const blocks = children.filter(child => (child && child.type === Block));

    if (blocks.length && blocks.length !== children.length){
      throw new Error("<Grid> children must all be <Blocks> (or none should and we'll wrap them in <Blocks> for you). It's all or nothing!");
    }

    // Get <Blocks> that have a width specified
    const blocksWithWidth = blocks.filter((child) => {
      return (child.props.width > 0);
    });

    if (blocksWithWidth.length && blocksWithWidth.length !== blocks.length){
      throw new Error("You must specify a width for all <Block> components (or for none of them and it will be divided evenly)");
    }

    return null;
  }
};

export default Grid;
