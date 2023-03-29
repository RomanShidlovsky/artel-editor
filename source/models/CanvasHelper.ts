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
    const app = use(App);
    let x = cellSize
    const yMax = cellSize * (rowNumber + 1)

    context.font = "14px Comic Sans MS";
    context.textAlign = "center"
    context.fillStyle = theme.lineColor
    context.strokeStyle = theme.lineColor
    let textX = cellSize * 1.5
    let textY = cellSize * 0.75 //+ 3.5
    const yText = cellSize / 2

    for (let i = 0; i <= columnNumber; i++) {
      context.beginPath()
      context.moveTo(x, cellSize / 2)
      context.lineTo(x, yMax)
      context.stroke()
      if (i != columnNumber)
        context.fillText(app.getColumnName(i + 1), textX, textY)
      x += cellSize
      textX += cellSize
    }

    let y = cellSize
    const xMax = cellSize * (columnNumber + 1)
    textX = cellSize * 0.75
    textY = 1.6 * cellSize
    context.textAlign = "end"

    for (let i = 0; i <= rowNumber; i++) {
      context.beginPath()
      context.moveTo(cellSize / 2, y)
      context.lineTo(xMax, y)
      context.stroke()
      if (i != rowNumber)
        context.fillText((i + 1).toString(), textX, textY)
      y += cellSize
      textY += cellSize
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
    const posX = (indexes[0] + 1) * cellSize;
    const posY = (indexes[1] + 1) * cellSize;
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
    const posX = (ind[0] + 1) * cellSize + cellSize / 2
    const posY = (ind[1] + 1) * cellSize + cellSize / 2 + 3.5

    context.fillStyle = colors[value.color!];
    context.fillText(value.body!, posX, posY)
  }
}

