import {ObservableObject, raw, reactive, transactional} from "reactronic"
import { BaseHtmlDriver, HtmlSensors } from "verstak"
import { Theme } from "themes/Theme"
import { Loader } from "./Loader"
import {DarkTheme} from "../themes/DarkTheme.s";
import {LightTheme} from "../themes/LightTheme.s";
import * as monaco from 'monaco-editor'
import {ArtelMonacoClient} from "../../library/artel/packages/monaco-client/source";
import Worker from "../../library/artel/packages/monaco-client/source/worker?worker"




export class App extends ObservableObject {
  @raw readonly sensors: HtmlSensors
  version: string
  theme: Theme
  blinkingEffect: boolean
  loader: Loader
  themes: Theme[]
  darkTheme: boolean
  themeId: number
  model: monaco.editor.ITextModel | null = null
  isCreated : boolean = false
  @raw leftSide: HTMLElement | null = null
  @raw rightSide: HTMLElement | null = null
  @raw resizer: HTMLElement | null = null
  @raw x: number = 0
  @raw y: number = 0
  @raw leftWidth: number | undefined = 0
  @raw parWidth : number = 0
  textQueue : Array<Array<string>> = new Array<Array<string>>()
  newWidth: number = 0
  gridData : Array<Array<string>> = new Array<Array<string>>(5)
  places : string[] = []

  rowNumber: number = 25
  columnNumber: number = 25
  cellSize: number = 50


  rerender: boolean = false

  constructor(version: string, theme: Theme) {
    super()
    this.sensors = new HtmlSensors()
    this.themeId = 0;
    this.version = version
    this.theme = theme
    this.blinkingEffect = false
    this.darkTheme = false
    this.loader = new Loader()
    this.themes = [new LightTheme(), new DarkTheme()]
    for (let i: number = 0; i < this.gridData.length; i++) {
      this.gridData[i] = new Array<string>(5).fill("")
    }
  }

  @reactive
  protected actualizeBrowserTitle(): void {
    document.title = `Verstak Demo ${this.version}`
  }

  @reactive
  applyBlinkingEffect(): void {
    BaseHtmlDriver.blinkingEffect = this.blinkingEffect ? "verstak-blinking-effect" : undefined
  }

  @reactive
  async createModel(){
    const client = new ArtelMonacoClient([{
    name: "rysovanye",
    sourceFiles: [{name: "main.a", text: `
      используется артель
      внешняя операция сообщить(позиция: Текст, текст: Текст, цвет: Текст)
      внешняя операция прямоугольник(позиция: Текст)
      внешняя операция установитьПараметрыСетки(размерКлетки: Число, количестовСтрок: Число, количетсвоСтолбцов: Число)
    `}]
    }])
    this.model = await client.getModel(new Worker())
  }

  @transactional
  setNextTheme(): void {
    this.themeId = (this.themeId + 1) % this.themes.length
    this.theme = this.themes[this.themeId]
    monaco.editor.setTheme(this.theme.editorTheme)
  }

  @transactional
  sendMessage(place: string, message: string, color : string = "black"): void {
    let ind: number[] = this.parsePlace(place)
    const data: string[] = [place, message, color]
    this.textQueue = this.textQueue.toMutable()
    this.textQueue.push(data)
    console.log("send: ",this.textQueue)
    /*this.gridData[ind[0]][ind[1]] = message
    console.log(this.gridData[ind[0]][ind[1]])
    this.rerender = !this.rerender*/
  }

  parsePlace(place: string) : number[] {
    let i: number = place.charCodeAt(0) - 'A'.charCodeAt(0)
    let j: number = +place[1] - 1
    return [i, j]
  }

  @transactional
  placeSquare(place: string): void {
    this.places = this.places.toMutable()
    this.places.push(place)
  }

  @transactional
  reset(): void {
    /*this.gridData = new Array<Array<string>>(5)

    for (let i: number = 0; i < this.gridData.length; i++) {
      this.gridData[i] = new Array<string>(5).fill("")
    }
    this.places = []*/
    this.textQueue = new Array<Array<string>>()
  }

  @transactional
  setNetParams(cellSize: number, rowNumber?: number, columnNumber?: number) {
    this.cellSize = cellSize
    if (rowNumber) {
      this.rowNumber = rowNumber
      if (columnNumber) {
        this.columnNumber = columnNumber
      }
    }
  }
}

