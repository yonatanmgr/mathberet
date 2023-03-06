import { Mafs, Coordinates, Plot, Theme } from "mafs"
import React, { useRef, useState } from 'react';
import MathView, { MathViewRef } from 'react-math-view';
import { parseTex } from 'tex-math-parser'
import ML_SHORTCUTS from "@common/shortcuts";

function latex2function(latex: string, i: number){
    if (latex != "") {
        const parsed = parseTex(String.raw`${latex}`);
        return parsed.compile().evaluate({x: i})    
    }
}

function GraphBlockContent() {    
    const [value, setValue] = useState("")
    function GraphBlockSetter(){
        const ref = useRef<MathViewRef>(null);

        return <MathView
            ref={ref}
            inlineShortcuts={ML_SHORTCUTS}
            className='math-field-element'
            onMathFieldBlur={() => {setValue(ref.current?.getValue('latex'))}}
            value={value}
            plonkSound={null}
            keypressSound={null}
        />;
    }

    return (
        <div className='graph-block-wrapper'>
            <GraphBlockSetter />
            <Mafs zoom={{ min: 0.3, max: 2 }}>
                <Coordinates.Cartesian/>
                <Plot.OfX
                    y={(x: number) => latex2function(value, x)}
                    color={Theme.blue}
                />
            </Mafs>
        </div>

    )
}

export default GraphBlockContent