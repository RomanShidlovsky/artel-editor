import {Align, asComponent, Block, BlockArgs, Canvas, Div, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"
import {drawNet, placeSquare, placeText} from "../models/CanvasHelper";

export function WorkAreaCanvas(name: string,
                               args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render() {
        Block('qwe', {
          widthGrowth: 1,
          heightGrowth: 0.5,
          heightMax: "630px",
          alignContent: Align.Left + Align.Top,
          alignFrame: Align.Stretch,
          initialize(e){

          },
          render(e) {
            e.style.overflow = 'auto'
            Canvas(name, {
              render(e) {
                const app = use(App)
                app.canvas = e;
                e.className = s.Border
                e.width = app.cellSize * (app.columnNumber + 1)
                e.height = app.cellSize * (app.rowNumber + 1)

                const context = e.getContext('2d')

                if (context != null) {
                  context.fillStyle = app.theme.workAreaColor
                  context.fillRect(0, 0, e.width, e.height)

                  drawNet(context, app.cellSize,
                    app.columnNumber, app.rowNumber, app.theme);

                  let contextWidth = context.lineWidth;

                  placeSquare(context, app.places, app.cellSize);

                  context.textAlign = "center"
                  context.lineWidth = contextWidth;
                  context.fillStyle = app.theme.lineColor;

                  placeText(context, app.textQueue, app.cellSize);
                }
              }
            })
          }
        })
      }
    }))
  )
}


