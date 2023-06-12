import {ObservableObject, raw, reactive, transactional} from "reactronic"
import {HtmlSensors} from "verstak"
import {Theme} from "themes/Theme"
import {Loader} from "./Loader"
import {DarkTheme} from "../themes/DarkTheme.s";
import {LightTheme} from "../themes/LightTheme.s";
import * as monaco from 'monaco-editor'
import {ArtelMonacoClient} from "../../library/artel/packages/monaco-client/source";
import Worker from "../../library/artel/packages/monaco-client/source/worker?worker"
import {SquareInfo} from "./SquareInfo";
import {MessageInfo} from "./MessageInfo";


export const artelFunctions = `
      используется артель
      внешняя операция сообщить(позиция: Текст, текст: Значение, цвет: Текст)
      внешняя операция прямоугольник(позиция: Текст, цвет: Текст)
      внешняя операция установить-параметры-сетки(размерКлетки: Число, количестовСтрок: Число, количетсвоСтолбцов: Число)
      внешняя параллельная операция прочитать(подсказка: Текст): Текст
      внешняя операция разобрать-строку-в-число(строка: Текст): Число?
`

const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const defaultCode = `используется рисование
используется артель

выполнить {
    пусть а = прочитать("Введите число >= 50...")
    пусть ё = разобрать-строку-в-число(а)

    пока ё == пусто или ё < 50 выполнить
    {
        сообщить("А1", "Переделывай!", "красный")
        а = прочитать("Введите число >= 50...")
        ё = разобрать-строку-в-число(а)
    }

    установить-параметры-сетки(ё как Число, 10, 10)
    сообщить("А1", "Молодец!", "светло-желто-золотистый")
}`


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
  isCreated: boolean = false
  @raw leftSide: HTMLElement | null = null
  @raw rightSide: HTMLElement | null = null
  @raw resizer: HTMLElement | null = null
  @raw x: number = 0
  @raw y: number = 0
  @raw leftWidth: number | undefined = 0
  @raw parWidth: number = 0
  @raw canvas: HTMLCanvasElement | null = null
  @raw inputId: string = ""
  @raw startX: number = 0
  @raw startY: number = 0
  @raw startTop: number = 0
  @raw startLeft: number = 0
  newWidth: number = 0
  gridData: Array<Array<string>> = new Array<Array<string>>(5)
  places: Map<string, SquareInfo> = new Map<string, SquareInfo>()
  textQueue: Map<string, MessageInfo> = new Map<string, MessageInfo>()
  rowNumber: number = 15
  columnNumber: number = 15
  cellSize: number = 75


  rerender: boolean = false

  constructor(version: string) {
    super()
    this.sensors = new HtmlSensors()
    const themeId = localStorage.getItem('themeId')
    this.themeId = themeId ? JSON.parse(themeId) : 1
    this.version = version
    this.blinkingEffect = false
    this.darkTheme = false
    this.loader = new Loader()
    this.themes = [new LightTheme(), new DarkTheme()]
    this.theme = this.themes[this.themeId]
    monaco.editor.setTheme(this.theme.editorTheme)
    for (let i: number = 0; i < this.gridData.length; i++) {
      this.gridData[i] = new Array<string>(5).fill("")
    }
  }

  @reactive
  protected actualizeBrowserTitle(): void {
    document.title = `Artel Editor ${this.version}`
  }

  @reactive
  async createModel() {
    const client = new ArtelMonacoClient([{
      name: "рисование",
      sourceFiles: [{
        name: "рисование.арт",
        text: artelFunctions
      }]
    }])
    this.model = await client.getModel(new Worker())
    this.model?.setValue(defaultCode)
  }

  @transactional
  setNextTheme(): void {
    this.themeId = (this.themeId + 1) % this.themes.length
    localStorage.setItem('themeId', JSON.stringify(this.themeId))
    this.theme = this.themes[this.themeId]
    monaco.editor.setTheme(this.theme.editorTheme)
  }

  @transactional
  sendMessage(place: string, message: any, color: string = "black"): void {
    const messageInfo = new MessageInfo()
    messageInfo.color = color
    messageInfo.body = message
    this.textQueue = this.textQueue.toMutable()
    if (this.places.has(place)) {
      this.places.delete(place);
    }
    this.textQueue.set(place, messageInfo)
  }

  parseTextPlace(index: string): number[] {
    const letters = index.match(/[А-Я]+/)![0];
    const column = this.getColumnNumber(letters)
    const row = parseInt(index.match(/\d+/)![0], 10);
    return [column - 1, row - 1];
  }

  parseSquarePlace(place: string): number[] {
    if (place.length == 2) {
      return this.parseTextPlace(place);
    }
    let strings = place.split(':');
    let ind1 = this.parseTextPlace(strings[0]);
    let ind2 = this.parseTextPlace(strings[1]);
    return [ind1[0], ind1[1], ind2[0] - 1, ind2[1] - 1];
  }

  getColumnName(n: number): string {
    const length = ALPHABET.length
    let result = "";
    while (n > 0) {
      const [quotient, remainder] = [Math.floor((n - 1) / length), (n - 1) % length];
      result = ALPHABET.charAt(remainder) + result;
      n = quotient;
    }
    return result;
  }

  getColumnNumber(name: string): number {
    const length = ALPHABET.length;
    let result = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charAt(i);
      const value = ALPHABET.indexOf(char) + 1;
      result = result * length + value;
    }
    return result;
  }

  @transactional
  placeSquare(place: string, borderWidth: number = 1, color: string = "black"): void {
    this.places = this.places.toMutable()

    if (this.places.has(place)) {
      this.places.delete(place);
    }
    const squareInfo = new SquareInfo();
    squareInfo.color = color;
    squareInfo.borderWidth = borderWidth;
    this.places.set(place, squareInfo);
  }

  @transactional
  reset(): void {
    this.textQueue = new Map<string, MessageInfo>()
    this.places = new Map<string, SquareInfo>()
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

  waitForInput(hint: string): Promise<string> {
    return new Promise((resolve) => {
      const inputField = document.getElementById(this.inputId) as HTMLInputElement;
      inputField.placeholder = hint;
      inputField.hidden = false;
      inputField.focus();

      function handleKeyUp(event: KeyboardEvent) {
        if (event.key === "Enter") {
          resolve(inputField.value);
          inputField.removeEventListener("keyup", handleKeyUp);
          inputField.hidden = true;
          inputField.value = "";
        }
      }

      inputField.addEventListener("keyup", handleKeyUp);
    });
  }
}
