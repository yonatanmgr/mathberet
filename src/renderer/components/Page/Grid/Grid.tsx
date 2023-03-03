import '../Page.scss';
import React from 'react'
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import GridBlock from './Block';
import { renderToString } from 'react-dom/server'

class PageGrid extends React.Component {

  grid: GridStack = undefined;

  state = {
    items: [
      { x: 12, y: 1, w: 12, content: renderToString(<GridBlock />)},
      { x: 12, y: 2, w: 12, content: renderToString(<GridBlock />)},
      { x: 12, y: 3, w: 12, content: renderToString(<GridBlock />)},
      { x: 12, y: 4, w: 12, h: 2, content: renderToString(<GridBlock />)},
    ]
  };

  componentDidMount() {
    this.grid = GridStack.init({
      float: false,
      resizable: { handles: 's,sw,w' },
      removable: '#clearPage',
      rtl: true,
      margin: 5,
      handle: ".block-handle",
      column: 'auto',
      cellHeight: 50,
      children: this.state.items,
    });
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid-stack"></div>
      </div>
    )  
  }
  
  handleAddWidget = () => {
    this.grid.addWidget({w: 3, content: renderToString(<GridBlock />)})
  }
}

export default PageGrid
