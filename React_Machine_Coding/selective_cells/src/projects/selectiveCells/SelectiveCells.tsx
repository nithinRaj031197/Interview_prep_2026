import { useRef, useState, type MouseEvent } from "react";
import "./SelectiveCells.css";
import { CELL_SIZE, GRID_SIZE } from "./utilities/constants";

type Cell = {
  x: number;
  y: number;
};

const SelectiveCells = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState<Cell | null>(null);
  const [end, setEnd] = useState<Cell | null>(null);
  const [selectedCells, setSelectedCells] = useState(new Set());

  const [dragStart, setDragStart] = useState<Cell | null>(null);
  const [dragEnd, setDragEnd] = useState<Cell | null>(null);

  const gridRef = useRef<HTMLDivElement | null>(null);

  const getPointFromMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {
      x,
      y,
    };
  };

  const getCellFromMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = gridRef.current!.getBoundingClientRect();
    // console.log(rect);
    // console.log("e.clientX", e.clientX);
    // console.log("e.clientY", e.clientY);
    // console.log("rect.left", rect?.left);
    // console.log("rect.top", rect?.top);
    const x = Math.floor((e.clientX - rect?.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect?.top) / CELL_SIZE);
    console.log("x", x, "y", y);
    return {
      x,
      y,
    };
  };

  const getSelectedCells = () => {
    if (!start || !end) return new Set();

    const minX = Math.min(start!.x, end!.x);
    const minY = Math.min(start!.y, end!.y);
    const maxX = Math.max(start!.x, end!.x);
    const maxY = Math.max(start!.y, end!.y);

    const selected = new Set<string>();

    for (let row = minY; row <= maxY; row++) {
      for (let col = minX; col <= maxX; col++) {
        selected.add(`${row}-${col}`);
      }
    }

    return selected;
  };

  const isInsideSelection = (row: number, col: number) => {
    if (!start || !end) return false;

    const minX = Math.min(start!.x, end!.x);
    const minY = Math.min(start!.y, end!.y);
    const maxX = Math.max(start!.x, end!.x);
    const maxY = Math.max(start!.y, end!.y);

    return minX <= col && maxX >= col && minY <= row && maxY >= row;
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const cell = getCellFromMouse(e);
    const point = getPointFromMouse(e);
    setStart(cell);
    setEnd(cell);

    setDragStart(point);
    setDragEnd(point);
    setSelectedCells(new Set());
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setEnd(getCellFromMouse(e));
    setDragEnd(getPointFromMouse(e));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedCells(getSelectedCells());
    setDragStart(null);
    setDragEnd(null);
  };

  const getSelectingBoxStyle = () => {
    if (!dragEnd || !dragStart) return { display: "none" };

    const left = Math.min(dragStart.x, dragEnd.x);
    const top = Math.min(dragStart.y, dragEnd.y);
    const width = Math.abs(dragStart.x - dragEnd.x);
    const height = Math.abs(dragStart.y - dragEnd.y);

    return {
      left,
      top,
      width,
      height,
    };
  };

  return (
    <div className="grid" ref={gridRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {[...Array(GRID_SIZE)].map((_, row: number) =>
        [...Array(GRID_SIZE)].map((_, col: number) => {
          const key = `${row}-${col}`;
          // console.log("isInsideSelection(row, col)", isInsideSelection(row, col));
          const isSelected = selectedCells.has(key) || (isDragging && isInsideSelection(row, col));
          return (
            <>
              <div key={key} className={`cell ${isSelected ? "selected" : ""}`}>
                {row}-{col}
              </div>
            </>
          );
        }),
      )}

      {isDragging && <div className="selection-box" style={getSelectingBoxStyle()}></div>}
    </div>
  );
};

export default SelectiveCells;
