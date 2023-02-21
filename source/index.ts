import { Transaction } from "reactronic"
import { VBlock, HtmlBody, setContext } from "verstak"
import { configureDebugging } from "dbg"
import { App } from "models/App"
import { Main } from "views/Main.v"

import "../index.reset.css"
import "../public/assets/verstak.css"
import "../index.css"
import {LightTheme} from "./themes/LightTheme.s";
import {DarkTheme} from "./themes/DarkTheme.s";
import {Compilation} from "../library/artel/packages/compiler/source/compilation/Compilation";
import {Uri} from "../library/artel/packages/compiler/source/Uri";
import {Parser} from "../library/artel/packages/compiler/source/parser/Parser";



const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const version: string = "0.1"

configureDebugging()

const app = Transaction.run(null, () =>
  new App(version, new LightTheme()))


const helperArtelFunctions = `
  function прямоугольник(place, color) {
    return app.placeSquare(place, color)
  }
  function сообщить(place, message, color) {
    return app.sendMessage(place, message, color)
  }
  function установитьПараметрыСетки(cellSize, rowNumber, columnNumber) {
    return app.setNetParams(cellSize, rowNumber, columnNumber)
  }
`

VBlock.root(() => {
  HtmlBody("body", {
    render(e, b) {
      setContext(App, app)
      Main(app,"Main")
    },
  })
})

export function compileArtel(code: string) {
  const compilation = new Compilation(new Uri(['project']), [
    {
      uri: new Uri(['project', 'module']),
      sourceFiles: [
        {
          uri: new Uri(['project', 'module', 'sheet.a']),
          syntax: new Parser(code).parse(),
        }
      ]
    }
  ])
  let compilationResult
  try {
    const emitterResult = compilation.emitWithDiagnostics()
    const codeWithHelperFunction = helperArtelFunctions + emitterResult.code
    const mainFileDiagnostics = emitterResult.diagnostics[1]
    /*const syntaxErrors = mainFileDiagnostics.syntax.items.map<LanguageError>(d => ({
      kind: 'syntax',
      message: d.message,
      span: { start: d.range.start, length: d.range.length }
    }))*/
    /*const semanticErrors = mainFileDiagnostics.semantic.items.map<LanguageError>(d => ({
      kind: 'semantic',
      message: d.message,
      span: { start: d.range.start, length: d.range.length }
    }))*/
    compilationResult = {
      code: codeWithHelperFunction,
      //errors: [...syntaxErrors, ...semanticErrors]
    }
  } catch (_) {
    compilationResult = {
      code: '',
      errors: [{ kind: 'semantic', message: 'Emitter error', span: { start: 0, length: 1 } }]
    }
  }
  return compilationResult
}

