import React from 'react'
import TextBlockContent from './TextBlock'

class GridBlock extends React.Component {

    render(): React.ReactNode {
        return(
            <div className="block">
              <div className='block-handle'>
                <i className='fi fi-rr-menu-dots-vertical' />
              </div>
              <div className="block-content"><TextBlockContent /></div>                
          </div>
        )
    }
  }

export default GridBlock