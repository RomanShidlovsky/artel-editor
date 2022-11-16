import { Grid, BlockArgs, Block, PlainText, HtmlText, lineFeed, Align, asComponent } from "verstak"
import * as s from "themes/Common.s"
import * as monaco from 'monaco-editor'

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import styles from "./MonacoEditor.module.scss"

// declare global {
//   interface Window {
//     MonacoEnvironment: monaco.Environment | undefined
//   }
// }

(self as any).MonacoEnvironment = {
  getWorker(_workerId: string, label: string): Worker {
    switch (label) {
      case "json":
        return new jsonWorker()
      case "css":
        return new cssWorker()
      case "html":
      case "handlebars":
      case "razor":
        return new htmlWorker()
      case "typescript":
      case "javascript":
        return new tsWorker()
      default:
        return new editorWorker()
    }
  }
}

export function Editor(name: string,
  args?: BlockArgs<HTMLElement, void, void>) {
  return (
    Block(name, asComponent(args, {
      initialize(e){
        monaco.editor.create(e, {
          value: 'console.log("Hello, world!")',
          language: "typescript",
          automaticLayout: true,
        })
      }
    }))
  )
}



