export function create(tagName: string, clasName: string, childs: Array<HTMLElement> = []) {
    let elem = document.createElement(tagName)
    elem.className = clasName

    return elem
}