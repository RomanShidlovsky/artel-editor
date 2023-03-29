import {Align, asComponent, Block, BlockArgs, Canvas, Div, Grid, lineFeed, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"
import {colors} from "../models/ColorCollection";
import {CanvasHelper} from "../models/CanvasHelper";

export function WorkAreaCanvas(name: string,
                         args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      initialize(e) {
        e.style.overflow = 'auto'
      },
      render(e) {
        Canvas(name,{
          render(e){
            const app = use(App)
            app.canvas = e;
            e.className = s.Border
            //e.width = e.parentElement!.getBoundingClientRect().width
            e.width = app.cellSize * (app.columnNumber + 1)
            e.height = app.cellSize * (app.rowNumber + 1)

            const context = e.getContext('2d')

            if (context != null)
            {
              context.fillStyle = app.theme.workAreaColor
              context.fillRect(0,0, e.width, e.height)

              CanvasHelper.drawNet(context, app.cellSize,
                app.columnNumber, app.rowNumber, app.theme);

              let contextWidth = context.lineWidth;

              CanvasHelper.placeSquare(context, app.places, app.cellSize);

              context.textAlign = "center"
              context.lineWidth = contextWidth;
              context.fillStyle = app.theme.lineColor;

              CanvasHelper.placeText(context, app.textQueue, app.cellSize);
            }
          }
        })
      }
    }))
  )
}


