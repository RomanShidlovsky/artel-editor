import {Align, asComponent, Block, BlockArgs, Canvas, Div, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"
import {drawNet, placeSquare, placeText} from "../models/CanvasHelper";

export function WorkAreaCanvas(name: string,
                               args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render() {
        const app = use(App)
        Div('TableContainer', {
          widthGrowth: 1,
          heightGrowth: 0.5,
          heightMax: "630px",

          initialize(e) {
            e.className = s.Wrapper
          },
          render(e) {
            Div('RowHeaders', {})
            Div('ColumnHeaders', {})
            Canvas('TableCanvas', {
              initialize(el) {
                el.className = s.TableCanvas


                const mouseMoveHandler = function (e: MouseEvent) {
                  const dx = e.clientX - app.startX
                  const dy = e.clientY - app.startY
                  const leftLimit = -(el.width - el.parentElement!.clientWidth)
                  const topLimit = -(el.height - el.parentElement!.clientHeight)

                  const newTop = Math.max(topLimit, Math.min(100, app.startTop + dy));
                  const newLeft = Math.max(leftLimit, Math.min(100, app.startLeft + dx))

                  el.style.top = newTop.toString() + 'px'
                  el.style.left = newLeft.toString() + 'px'
                }

                const mouseUpHandler = () => {
                  el.removeEventListener('mousemove', mouseMoveHandler)
                  el.removeEventListener('mouseup', mouseUpHandler)
                  el.removeEventListener('mouseleave', mouseUpHandler)
                }

                const mouseDownHandler = function (e: MouseEvent) {
                  app.startX = e.clientX
                  app.startY = e.clientY
                  app.startTop = parseInt(el.style.top) || 100;
                  app.startLeft = parseInt(el.style.left) || 100;
                  el.addEventListener('mousemove', mouseMoveHandler)
                  el.addEventListener('mouseup', mouseUpHandler)
                  el.addEventListener('mouseleave', mouseUpHandler)
                }
                el.addEventListener('mousedown', mouseDownHandler)
              },
              render(e) {
                const app = use(App)
                app.canvas = e;

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


