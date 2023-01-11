import { randomUUID } from 'crypto';
import React from 'react';
import { MouseEvent, useState } from 'react';

export const useCreateDiv = () => {
  const [DivList, setDivList] = useState<React.ReactElement[]>([]);
  const [undoDivs, setUndoDiv] = useState<React.ReactElement[]>([]);

  interface returnGetCoordinatesClick {
    coordinateX: number;
    coordinateY: number;
  }

  const getCoordinatesClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): returnGetCoordinatesClick => {
    const coordinateX = event.clientX;
    const coordinateY = event.clientY;
    addElement({ coordinateX, coordinateY });

    return { coordinateX, coordinateY };
  };

  /**
   *
   * @param param0 coordinateX: number, coordinateY: number
   * @example addElement({coordinateX:500,coordinateY:500})
   */
  const addElement = ({
    coordinateX,
    coordinateY,
  }: returnGetCoordinatesClick) => {
    const div = React.createElement(
      'div',
      {
        style: {
          left: ` calc(${coordinateX}px - 5px ) `,
          top: `calc(${coordinateY}px - 5px )  `,
          zIndex: 0,
          position: 'absolute',
          width: '0.5rem',
          height: '0.5rem',
          background: 'red',
          borderRadius: '100%',
        },
        key: `key ${new Date().getTime()}`,
        placeholder: 'paint',
      },

      ''
    );
    setDivList((state) => [...state, div]);
  };

  const undo = () => {
    if (DivList.length > 0) {
      setUndoDiv((state) => [...state, DivList[DivList.length - 1]]);
      setDivList(DivList.slice(0, DivList.length - 1));
    }
  };
  const redo = () => {
    if (undoDivs.length > 0) {
      setDivList((state) => [...state, undoDivs[undoDivs.length - 1]]);
      setUndoDiv(undoDivs.slice(0, undoDivs.length - 1));
    }
  };

  return { getCoordinatesClick, undo, redo, DivList, addElement };
};
