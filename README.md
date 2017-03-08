# React Simple Grid

![Grid image](http://i.imgur.com/azdBoec.jpg)

## Demo
<a href="https://unsplash.now.sh">unsplash.now.sh</a>

## Install
`npm install react-simple-grid --save`

## Props

Prop                       |    Description
---------------------------|----------------
`spacing`                  | Spacing in pixels between blocks.
`blocksPerRow`             | Number of blocks per row (all of equal width). This is the same as what other grid systems refer to as "columns".
`blockWidth`               | If you'd like blocks of different widths then use this prop instead of `blocksPerRow`. Pass in an array of fractions and the array will be cycled through when setting up your blocks. For example `<Grid blockWidth={[1/1, 1/2, 1/2]}>` will result in the first row containing a block that takes up the full row width, the second row containing two blocks each taking up half of the row width, the next row taking up the full width, and so on. If you just wanted 4 blocks per row you'd do `<Grid blockWidth={[1/4]}>`. That would be the same as doing `<Grid blocksPerRow={4}>`, but we recommend using this prop as you can easily create more advanced layouts in the future. 
`breakPoints`              | This enables you to have different grid props at different screen sizes. For example, to have your 4 `blocksPerRow` grid with 5px `spacing` switch to 3 `blocksPerRow` with 2px spacing at a 700px screen width you'd do `<Grid blocksPerRow={4} spacing={5} breakPoints={[ {maxWidth: 700, blocksPerRow: 3, spacing: 2} ]}>`.
`passBlockWidth`           | Set this to `true` if you'd like your child components to recieve the width of their parent block as a prop. This is useful if you have a component that should render differently depending on it's containing width and much more performant then having all your child component check their own width. You must set this to `true` and subscribe a specific component to updates using our Higher Order Component. Just `import { PassBlockWidth } from 'react-simple-grid'` and then wrap your component instance like so `PassBlockWidth(CustomComponent)` and then use your `<CustomComponent>` as normal. It will now recieve a new prop called `parentBlockWidth` ✨
`hideOuterSpacing`         | Hide spacing around the grid so that blocks align to the edges
