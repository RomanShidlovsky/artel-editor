import { Block, BlockArgs, $, Render} from "verstak"

export function WorkArea(name: string,
  args?: BlockArgs<HTMLElement, void, void>,
  render?: Render<HTMLElement, void, void>) {
  return (
    Block(name, args, (e, b) => {
      $`Hello`
    })
  )
}
