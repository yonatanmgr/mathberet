import { Mafs, Coordinates, Plot, Point, Theme } from "mafs"
import React, { useEffect, useRef, useState } from 'react';
import MathView, { MathViewRef } from 'react-math-view';
import { parseTex } from 'tex-math-parser'
import ML_SHORTCUTS from "@common/shortcuts";
import ML_KEYBINDINGS from '@common/keybindings';
import { ValueProps } from "@renderer/common/types";

function latex2function(latex: string, i: number){
    if (latex[0] != "") {
        try {
            const parsed = parseTex(String.raw`${latex[0]}`);
            return parsed.compile().evaluate({x: i})        
        } catch (error) {
            return
        }
    }
}

function GraphBlockContent({content, blockStateFunction}: ValueProps) {    
    const [value, setValue] = useState<string[]>(content ? content.plots : [""])    

    useEffect(() => {
        blockStateFunction(value)
      }, [value])

    function GraphBlockSetter(){
        const ref = useRef<MathViewRef>(null);

        return <MathView
            ref={ref}
            value={value[0]}
            inlineShortcuts={ML_SHORTCUTS}
            keybindings={ML_KEYBINDINGS}
            className='math-field-element'
            onExport={(ref, latex) => latex}
            onMathFieldBlur={() => {setValue([ref.current?.getValue('latex')])}}
            plonkSound={null}
            keypressSound={null}
        />;
    }

    return (
        <div className='graph-block-wrapper'>
            <GraphBlockSetter />
            <Mafs
                zoom={{ min: 0.5, max: 2 }}
                // onClick={
                //     (point)=> {                        
                //         const fixedPoint = {x: point[0], y: point[1]}
                //         setPoints([...points, <Point key={JSON.stringify(fixedPoint)} x={fixedPoint.x} y={fixedPoint.y} />])
                //     }
                // }
            >
                <Coordinates.Cartesian/>
                <Plot.OfX
                    y={(x: number) => latex2function(value, x)}
                    color={Theme.blue}
                />
                {/* {points} */}
            </Mafs>
        </div>

    )
}

export default GraphBlockContent