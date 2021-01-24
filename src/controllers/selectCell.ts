export function SelectColumnCell(e: React.MouseEvent, arr: number[]) {
  let cell = e.currentTarget
  if (cell.classList.contains("Selected")) {
    cell.classList.remove("Selected")
    arr.splice(arr.indexOf(parseInt(cell.innerHTML) - 1), 1)
  } else {
    cell.classList.add("Selected")
    arr.push(parseInt(cell.innerHTML) - 1)
  }
}
