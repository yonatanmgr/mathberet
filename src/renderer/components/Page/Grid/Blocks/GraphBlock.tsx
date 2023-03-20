import { Mafs, Coordinates, Plot, Theme } from 'mafs';
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/named
import MathView, { MathViewRef } from 'react-math-view';
import { parseTex } from 'tex-math-parser';
import ML_SHORTCUTS from '@common/shortcuts';
import ML_KEYBINDINGS from '@common/keybindings';
import { ValueProps } from '@renderer/common/types';

function latex2function(latex: string, i: number) {
  if (latex != '') {
    try {
      const parsed = parseTex(String.raw`${latex}`);
      return parsed.compile().evaluate({ x: i });
    } catch (error) {
      return;
    }
  }
}

function GraphBlockContent({ content, blockStateFunction }: ValueProps) {
  const [value, setValue] = useState(content ? (content as string[]) : ['']);

  useEffect(() => {
    blockStateFunction(value);
  }, [value]);

  function GraphBlockSetter() {
    const ref = useRef<MathViewRef>(null);

    return (
      <MathView
        ref={ref}
        value={value[0]}
        inlineShortcuts={ML_SHORTCUTS}
        keybindings={ML_KEYBINDINGS}
        className='math-field-element'
        onExport={(ref, latex) => latex}
        onMathFieldBlur={() => {
          setValue([ref.current?.getValue('latex')]);
        }}
        plonkSound={null}
        keypressSound={null}
      />
    );
  }

  return (
    <div className='graph-block-wrapper'>
      <GraphBlockSetter />
      <Mafs
        preserveAspectRatio='contain'
        zoom={{ min: 0.5, max: 2 }}
        // onClick={
        //     (point)=> {
        //         const fixedPoint = {x: point[0], y: point[1]}
        //         setPoints([...points, <Point key={JSON.stringify(fixedPoint)} x={fixedPoint.x} y={fixedPoint.y} />])
        //     }
        // }
      >
        <Coordinates.Cartesian />
        <Plot.OfX
          y={(x: number) => latex2function(value[0], x)}
          color={Theme.blue}
        />
        {/* {points} */}
      </Mafs>
    </div>
  );
}

export default GraphBlockContent;

// TESTS
// function CreatePolygon() {
//   const [pointsList, setPointsList] = React.useState([[1,1], [2,2], [3,-2]] as vec.Vector2[]);
//   const [movePoints, setMovePoints] = React.useState(false);

//   const handleMove = (point, newPoint) =>{
//     setPointsList([...pointsList.filter((p) => p != point), newPoint])
//   }
//   return (
//     <Mafs
//       onClick={(point) =>
//         movePoints
//           ? setPointsList([...pointsList, point])
//           : null
//       }
//     >
//       <Coordinates.Cartesian />
//       <Polygon points={pointsList} color={Theme.blue} />

//       {pointsList.map((point, i) => (
//         <MovablePoint
//           key={i}
//           point={point}
//           onMove={newPoint => handleMove(point, newPoint)}
//         />
//       ))}
//     </Mafs>
//   );
// }