export class SquareInfo {
  color: string | null = null
  private _borderWidth: number | null = null
  public get borderWidth() : number | null{
    return this._borderWidth;
  }
  public set borderWidth(value: number | null) {
    if (value! < 0){
      this._borderWidth = 1;
      return;
    }
    if (value! > 10){
      this._borderWidth = 10;
      return;
    }
    this._borderWidth = value;
  }
}
