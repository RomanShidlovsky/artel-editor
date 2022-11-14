import { Grid, BlockArgs, Block, PlainText, HtmlText, lineFeed, Align, asComponent } from "verstak"
import * as s from "themes/Common.s"
import * as monaco from 'monaco-editor'

export function Editor(name: string,
  args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      render(e,b){
        e.id = 'container'
        monaco.editor.create(e, {
          value: 'console.log("Hello, world!")',
          language: 'javascript',
          automaticLayout: true
        })
      }
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

function ExampleData(place: string) {
  Block(place, {
    place, // absolute position inside grid
    alignContent: Align.Center + Align.CenterV,
    initialize(e, b) {
      e.className = s.Important
    },
    render(e, b) {
      PlainText(place)
    }
  })
}
