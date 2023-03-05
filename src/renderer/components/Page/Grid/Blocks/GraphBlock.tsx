import { Mafs, Coordinates, Plot, Theme } from "mafs"
const math = require('mathjs')
import React, { useRef, useState } from 'react';
import MathView, { MathViewRef } from 'react-math-view';


function latex2function(latex: string, i: number){
    const parser = math.parser()
    parser.set('x', i)
    return parser.evaluate(latex)
}


function GraphBlockContent() {    
    const [value, setValue] = useState("")
    function GraphBlockSetter(){
        const ref = useRef<MathViewRef>(null);

        return <MathView
            ref={ref}
            className='math-field-element'
            onMathFieldBlur={() => {setValue(ref.current?.getValue('latex'))}}
            value={value}
            plonkSound={null}
            keypressSound={null}
        />;
    }

    const f = (x: number) => latex2function(value, x);
    return (
        <div className='graph-block-wrapper'>
            <GraphBlockSetter />
            <Mafs zoom={{ min: 0.3, max: 2 }}>
                <Coordinates.Cartesian/>
                <Plot.OfX y={f} color={Theme.blue} />
            </Mafs>
        </div>

    )
}

export default GraphBlockContent