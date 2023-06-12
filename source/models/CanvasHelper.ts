import {Theme} from "../themes/Theme";
import {use} from "verstak";
import {App} from "./App";
import {SquareInfo} from "./SquareInfo";
import {colors} from "./ColorCollection";
import {MessageInfo} from "./MessageInfo";

export function drawNet(
  context: CanvasRenderingContext2D,
  cellSize: number,
  columnNumber: number,
  rowNumber: number,
  theme: Theme
) {
  if (context != null) {
    let x = 0
    const yMax = cellSize * (rowNumber + 1)

    context.font = "14px Comic Sans MS";
    context.textAlign = "center"
    context.fillStyle = theme.lineColor
    context.strokeStyle = theme.lineColor
    
    for (let i = 0; i <= columnNumber+1; i++) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, yMax)
      context.stroke()
      x += cellSize
    }

    let y = 0
    const xMax = cellSize * (columnNumber + 1)
    for (let i = 0; i <= rowNumber; i++) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(xMax, y)
      context.stroke()
      y += cellSize
    }
  }
}


export function placeSquare(
  context: CanvasRenderingContext2D,
  places: Map<string, SquareInfo>,
  cellSize: number
) {
  const app = use(App);
  for (let [key, value] of places) {
    context.lineWidth = value.borderWidth!;
    context.strokeStyle = colors[value.color!];
    const indexes = app.parseSquarePlace(key);
    const posX = (indexes[0]) * cellSize;
    const posY = (indexes[1]) * cellSize;
    if (indexes.length == 2) {
      context.strokeRect(posX, posY, cellSize, cellSize);
    } else {
      const width = (indexes[2] - indexes[0] + 2) * cellSize;
      const height = (indexes[3] - indexes[1] + 2) * cellSize;
      context.strokeRect(posX, posY, width, height);
    }
  }
}

export function placeText(
  context: CanvasRenderingContext2D,
  textQueue: Map<string, MessageInfo>,
  cellSize: number
) {
  const app = use(App)
  for (let [key, value] of textQueue) {
    const ind = app.parseTextPlace(key)
    const posX = (ind[0]) * cellSize + cellSize / 2
    const posY = (ind[1]) * cellSize + cellSize / 2 + 3.5

    context.fillStyle = colors[value.color!];
    context.fillText(value.body!, posX, posY)
  }
}

