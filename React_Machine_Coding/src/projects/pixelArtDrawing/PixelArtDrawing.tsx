import { useCallback, useState, type CSSProperties, type KeyboardEvent } from "react";
import "./PixelArtDrawing.css";
import {
  CELL_SIZE,
  COLOR_ARRAY,
  COLOR_LABELS,
  getCheckerColor,
  getColorPickerBorder,
  GRID_SIZE,
} from "./utilities/constants";

type Mode = "draw" | "erase";

const createEmptyGrid = () =>
  Array.from({ length: GRID_SIZE }, () =>
    Array<string | null>(GRID_SIZE).fill(null),
  );

const PixelArtDrawing = () => {
  const [mode, setMode] = useState<Mode>("draw");
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_ARRAY[2]);
  const [grid, setGrid] = useState(createEmptyGrid);
  const [isDragging, setIsDragging] = useState(false);

  const applyToCell = useCallback(
    (row: number, col: number) => {
      setGrid((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = mode === "draw" ? selectedColor : null;
        return next;
      });
    },
    [mode, selectedColor],
  );

  const handleCanvasMouseDown = () => {
    setIsDragging(true);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleCellMouseDown = (row: number, col: number) => {
    applyToCell(row, col);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      applyToCell(row, col);
    }
  };

  const handleCellKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number,
  ) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      applyToCell(row, col);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setMode("draw");
  };

  return (
    <div className="pixel-art-drawing">
      <div
        className="canvas"
        style={{ "--cell-size": `${CELL_SIZE}px` } as CSSProperties}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="canvas__row">
            {row.map((cellColor, colIndex) => (
              <button
                key={colIndex}
                type="button"
                className="canvas__cell"
                aria-label={`Pixel row ${rowIndex + 1}, column ${colIndex + 1}`}
                style={{
                  backgroundColor:
                    cellColor ?? getCheckerColor(rowIndex, colIndex),
                }}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                onKeyDown={(event) =>
                  handleCellKeyDown(event, rowIndex, colIndex)
                }
              />
            ))}
          </div>
        ))}
      </div>

      <div className="toolbar">
        <div className="toolbar__modes">
          <button
            type="button"
            className={`toolbar__mode ${mode === "draw" ? "toolbar__mode--active" : ""}`}
            onClick={() => setMode("draw")}
          >
            Draw
          </button>
          <button
            type="button"
            className={`toolbar__mode ${mode === "erase" ? "toolbar__mode--active" : ""}`}
            onClick={() => setMode("erase")}
          >
            Erase
          </button>
        </div>

        <div className="toolbar__colors">
          {COLOR_ARRAY.map((color) => {
            const isSelected = selectedColor === color;
            return (
              <button
                key={color}
                type="button"
                className="toolbar__color"
                aria-label={`Select ${COLOR_LABELS[color]} color`}
                aria-pressed={isSelected}
                style={{
                  backgroundColor: color,
                  border: getColorPickerBorder(color, isSelected),
                }}
                onClick={() => handleColorSelect(color)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PixelArtDrawing;
