import {Align, asComponent, Block, BlockArgs, Canvas, Grid, lineFeed, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"

export function WorkAreaCanvas(name: string,
                         args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render() {
        Canvas(name,{
          render(e){
            e.className = s.Border
            e.width = e.parentElement!.getBoundingClientRect().width
            e.height = 550
            const app = use(App)

            const context = e.getContext('2d')
            context!.fillStyle = "white"
            context!.fillRect(0,0, e.width, e.height)
            if (context != null)
            {
              context.strokeStyle = "rgb(0,0,0)"
              let x = 0
              const yMax = app.cellSize * app.rowNumber

              let cellCount = Math.floor(e.width / app.cellWidth)
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
              cellCount = Math.floor(e.height / app.cellWidth)
              for (let i = 0; i < app.rowNumber; i++) {
                y += app.cellSize
                context.beginPath()
                context.moveTo(0,y)
                context.lineTo(xMax, y)
                context.stroke()
              }

              context.font = "14px Comic Sans MS";
              context.fillStyle = "red";
              context.textAlign = "center"

              for (let i = 0; i < app.textQueue.length; i++){
                const data: string[] | undefined = app.textQueue[i]
                if (data != undefined)
                {
                  console.log("render: ",data)
                  const ind = app.parsePlace(data[0])
                  const posX = ind[0] * app.cellWidth + app.cellWidth / 2
                  const posY = ind[1] * app.cellWidth + app.cellWidth / 2 + 3.5

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
