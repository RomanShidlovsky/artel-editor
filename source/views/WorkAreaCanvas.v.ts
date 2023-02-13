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

              for (let i = 0; i < app.textQueue.length; i++){
                const data: string[] | undefined = app.textQueue[i]
                if (data != undefined)
                {
                  console.log("render: ",data)
                  const ind = app.parsePlace(data[0])
                  const posX = ind[0] * app.cellSize + app.cellSize / 2
                  const posY = ind[1] * app.cellSize + app.cellSize / 2 + 3.5
                  context.fillStyle = data[2];
                  context.fillText(data[1], posX, posY)
                }
              }
            }
          }
        })
      }
    }))
  )
}
