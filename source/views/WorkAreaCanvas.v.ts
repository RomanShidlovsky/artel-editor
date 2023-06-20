import {asComponent, Block, BlockArgs, Canvas, Div, Span, use} from "verstak";
import {App} from "../models/App";
import * as s from "themes/Common.s"
import {drawNet, placeSquare, placeText} from "../models/CanvasHelper";

export function WorkAreaCanvas(name: string,
                               args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render() {
        const app = use(App)
        let rowHeadersContainer: HTMLElement | null = null
        let columnHeadersContainer: HTMLElement | null = null
        let tableContent: HTMLElement | null = null
        const scrollHandler = function () {
          if (tableContent) {
            if (rowHeadersContainer) {
              rowHeadersContainer.scrollTop = tableContent.scrollTop
              console.log('row ', rowHeadersContainer.scrollTop, 'table', tableContent.scrollTop )
            }
            if (columnHeadersContainer) {
              columnHeadersContainer.scrollLeft = tableContent.scrollLeft
            }
          }
        }

        Div('TableContainer', {
          initialize(e) {
            e.className = s.Wrapper
          },
          render() {
            Div('RowHeaders', {
              initialize(e) {
                e.className = s.RowHeaders
                rowHeadersContainer = e
              },
              render(e) {
                e.style.top = `${app.cellSize-0.5}px`
                e.style.height = `${610-app.cellSize}px`
                for (let row = 0; row < app.rowNumber; row++) {
                  Div(`row-${row+1}`, {
                    render(e){
                      e.style.width = `${app.cellSize}px`
                      e.style.height = `${app.cellSize}px`
                      e.className = app.theme.RowHeader
                      Span('headerText', {
                        render(e) {
                          e.style.color = app.theme.textColor
                          e.innerText = (row+1).toString()
                        }
                      })
                    }
                  })
                }
              }
            })
            Div('ColumnHeaders', {
              initialize(e) {
                e.className = s.ColumnHeaders
                columnHeadersContainer = e
              },
              render(e) {
                e.className = s.ColumnHeaders
                e.style.left = `${app.cellSize}px`
                e.style.width = `${360-app.cellSize}px`
                Div('Columns', {
                  render(e) {
                    e.style.width = `${app.cellSize* (app.columnNumber)}px`
                    for (let column = 0; column < app.columnNumber; column++) {
                      Div(`column-${column+1}`, {
                        render(e){
                          e.className = app.theme.ColumnHeader
                          e.style.paddingTop = `${0.3 * app.cellSize}px`
                          e.style.width = `${app.cellSize}px`
                          e.style.height = `${app.cellSize}px`

                          Span('centerer', {
                            initialize(e) {
                              e.className = s.Centerer
                            }
                          })
                          Span('headerText', {
                            render(e) {
                              e.className = s.Centered
                              e.innerText = app.getColumnName(column+1)
                              e.style.color = app.theme.textColor
                            }
                          })
                        }
                      })
                    }
                  }
                })

              }
            })
            Div('TableContent', {
              initialize(e) {
                e.className = s.TableContent
                tableContent = e
                e.addEventListener('scroll', scrollHandler)
              },
              render(e) {
                e.style.top = `${app.cellSize}px`
                e.style.left = `${app.cellSize}px`
                e.style.width = `calc(100% - ${app.cellSize}px)`
                e.style.height = `calc(100% - ${app.cellSize-5}px)`
                Canvas('TableCanvas', {
                  render(e) {
                    const app = use(App)
                    app.canvas = e;

                    e.width = app.cellSize * (app.columnNumber)
                    e.height = app.cellSize * (app.rowNumber)

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
        })
      }
    }))
  )
}


