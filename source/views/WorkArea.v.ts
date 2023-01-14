import {Align, asComponent, Block, BlockArgs, Grid, HtmlText, lineFeed, PlainText} from "verstak"
import * as s from "themes/Common.s"
import {cx} from "@emotion/css";

export function WorkArea(name: string,
                         args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Grid(name, asComponent(args, {
      render(e, b) {
        // Blocks can be layed out automatically
        // based on their order and line feeds.
        Ruler("1", Align.Left, true)
        Ruler("A", Align.Top + Align.Center)
        Ruler("B", Align.Top + Align.Center)
        Ruler("C", Align.Top + Align.Center);
        Ruler("D", Align.Top + Align.Center);
        Ruler("E", Align.Top + Align.Center); lineFeed()
        Ruler("2", Align.Left); lineFeed()
        Ruler("3", Align.Left); lineFeed()
        Ruler("4", Align.Left); lineFeed()
        Ruler("5", Align.Left); lineFeed()
        // Blocks can also be layed out
        // explicitly in exact cells.
        let s : string = 'ABCDE'
        const size = 5
        for (let i = 0; i < size; i++){
          for (let j = 1; j <= size; j++){
            let place = s[i] + j.toString()
            ExampleData(place, "Hello")
            //ExampleData(place, "Hello")
          }
        }
      },
    }))
  )
}

function Ruler(title: string, alignFrame: Align, overlap?: boolean) {
  Block(`#${title}`, {
    alignFrame,
    widthOverlap: overlap,
    render(e, b) {
      e.style.zIndex = "1"
      e.style.fontSize = "smaller"
      HtmlText(`&nbsp;${title}`)
    }
  })
}

function ExampleData(place: string, text: string) {
  Block(place, {
    place, // absolute position inside grid
    alignContent: Align.Center + Align.CenterV,
    initialize(e, b) {
      e.className = cx(s.WrapStyle, s.Important)
    },
    render(e, b) {
      e.innerText = text
    }
  })
}
