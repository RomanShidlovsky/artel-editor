import {Align, asComponent, Block, BlockArgs, Canvas, Grid, lineFeed, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"
import {colors} from "../models/ColorCollection";

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
            e.width = app.cellSize * (app.columnNumber + 1)
            console.log(app.columnNumber * app.cellSize)
            console.log(e.width)
            e.height = app.cellSize * (app.rowNumber + 1)

            const context = e.getContext('2d')
            context!.fillStyle = "white"
            context!.fillRect(0,0, e.width, e.height)
            if (context != null)
            {
              context.strokeStyle = "rgb(0,0,0)"
              let x = app.cellSize
              const yMax = app.cellSize * (app.rowNumber + 1)

              context.font = "14px Comic Sans MS";
              context.textAlign = "center"
              context.fillStyle = "black"
              let textX = app.cellSize * 1.5
              let textY = app.cellSize * 0.75 //+ 3.5
              const yText = app.cellSize / 2

              for (let i = 0; i <= app.columnNumber ; i++)
              {
                context.beginPath()
                context.moveTo(x,app.cellSize/2)
                context.lineTo(x, yMax)
                context.stroke()
                if (i != app.columnNumber)
                  context.fillText(app.getColumnName(i+1), textX, textY)
                x += app.cellSize
                textX += app.cellSize
              }

              let y = app.cellSize
              const xMax = app.cellSize * (app.columnNumber + 1)
              textX = app.cellSize * 0.75
              textY = 1.6 * app.cellSize
              context.textAlign = "end"

              for (let i = 0; i <= app.rowNumber; i++) {
                context.beginPath()
                context.moveTo(app.cellSize/2, y)
                context.lineTo(xMax, y)
                context.stroke()
                if(i != app.rowNumber)
                  context.fillText((i+1).toString(), textX, textY)
                y += app.cellSize
                textY += app.cellSize
              }



              let contextWidth = context.lineWidth;
              console.log(app.places)
              for (let [key, value] of app.places) {
                context.lineWidth = value.borderWidth!;
                context.strokeStyle = colors[value.color!];
                const indexes = app.parseSquarePlace(key);
                const posX = (indexes[0] + 1) * app.cellSize;
                const posY = (indexes[1] + 1) * app.cellSize;
                if (indexes.length == 2){
                  context.strokeRect(posX, posY, app.cellSize, app.cellSize);
                } else {
                  const width = (indexes[2] - indexes[0] + 2) * app.cellSize;
                  const height = (indexes[3] - indexes[1] + 2) * app.cellSize;
                  context.strokeRect(posX, posY, width, height);
                }
              }

              context.textAlign = "center"
              context.lineWidth = contextWidth;

              for (let [key, value] of app.textQueue) {
                const ind = app.parseTextPlace(key)
                const posX = (ind[0] + 1) * app.cellSize + app.cellSize / 2
                const posY = (ind[1] + 1) * app.cellSize + app.cellSize / 2 + 3.5
                console.log(colors[value.color!])

                context.fillStyle = colors[value.color!];
                context.fillText(value.body!, posX, posY)
              }
            }
          }
        })
      }
    }))
  )
}


