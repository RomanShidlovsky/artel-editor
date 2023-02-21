import {Align, asComponent, Block, BlockArgs, Canvas, Grid, lineFeed, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"

export function WorkAreaCanvas(name: string,
                         args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e) {
        e.style.overflow = "auto"
        Canvas(name,{
          render(e){
            const app = use(App)
            app.canvas = e;
            e.className = s.Border
            //e.width = e.parentElement!.getBoundingClientRect().width
            e.width = app.cellSize * app.columnNumber
            console.log(app.columnNumber * app.cellSize)
            console.log(e.width)
            e.height = app.cellSize * app.rowNumber

            const context = e.getContext('2d')
            context!.fillStyle = "white"
            context!.fillRect(0,0, e.width, e.height)
            if (context != null)
            {
              context.strokeStyle = "rgb(0,0,0)"
              let x = 0
              const yMax = app.cellSize * app.rowNumber

              for (let i = 0; i < app.columnNumber ; i++)
              {
                x += app.cellSize
                context.beginPath()
                context.moveTo(x,0)
                context.lineTo(x, yMax)
                context.stroke()
              }

              let y = 0
              const xMax = app.cellSize * app.columnNumber

              for (let i = 0; i < app.rowNumber; i++) {
                y += app.cellSize
                context.beginPath()
                context.moveTo(0,y)
                context.lineTo(xMax, y)
                context.stroke()
              }

              context.font = "14px Comic Sans MS";

              context.textAlign = "center"

              let contextWidth = context.lineWidth;
              console.log(app.places)
              for (let [key, value] of app.places) {
                context.lineWidth = value.borderWidth!;
                context.strokeStyle = value.color!;
                const indexes = app.parseSquarePlace(key);
                const posX = indexes[0] * app.cellSize;
                const posY = indexes[1] * app.cellSize;
                if (indexes.length == 2){
                  context.strokeRect(posX, posY, app.cellSize, app.cellSize);
                } else {
                  const width = (indexes[2] - indexes[0] + 1) * app.cellSize;
                  const height = (indexes[3] - indexes[1] + 1) * app.cellSize;
                  context.strokeRect(posX, posY, width, height);
                }
              }
              context.lineWidth = contextWidth;

              for (let [key, value] of app.textQueue) {
                const ind = app.parseTextPlace(key)
                const posX = ind[0] * app.cellSize + app.cellSize / 2
                const posY = ind[1] * app.cellSize + app.cellSize / 2 + 3.5
                context.fillStyle = value.color!;
                context.fillText(value.body!, posX, posY)
              }
            }
          }
        })
      }
    }))
  )
}


