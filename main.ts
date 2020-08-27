import { ButtonsList } from './lib/buttons'
import { create } from './lib/element'

class Calc {
  static view = document.querySelector('.view')
  static _v: string = '0'
  static hystory: string[] = []

  static get variable() {
    let i = parseInt(this._v)
    if (!isNaN(i) && i === 0)
      this._v = ''

    return this._v
  }
  static set variable(v: string) {
    if (!v.length)
      v = '0'

    this._v = v
    this.view.innerHTML = v

  }

  static init() {
    let keyboard = create('table', 'keyboard')

    let keyOn = (v) => {
      return () => {
        let vs = this.variable

        if (/[0-9]/.test(v))
          this.variable += v
        if (/[\.\-\/\*\+]/.test(v) && !/[\.\-\/\*\+]/.test(vs[vs.length - 1]))
          this.variable += v
        if (v === '=')
          this.variable = eval(this.variable).toString()

        if (v === 'C') {
          this.hystory = []
          this.variable = ''
        }
        if (v === '<') {
          try {
            this.variable = this.hystory.pop()
          } catch (e) {
            this.variable = ''
          }
        }
        else if (vs !== this.variable)
          this.hystory.push(vs)
      }

    }

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      let v = e.key

      if (v === 'Enter')
        v = '='
      if (v === 'Backspace')
        v = '<'
      if (v === 'Escape')
        v = 'C'

      keyOn(v)()
    })

    for (let keyString of ButtonsList) {
      let tr = create('tr', 'keyboard-row')
      let buttons = keyString.split(';')

      for (let button of buttons) {
        let td = create('td', 'keyboard-key')

        let v = td.innerText = button.replace(/[\[\|]/g, '')

        td.onclick = keyOn(v)

        if (button.indexOf('|') !== -1)
          td.setAttribute('rowspan', '2')
        if (button.indexOf('[') !== -1)
          td.classList.add('soft')

        tr.appendChild(td)
      }

      keyboard.appendChild(tr)
    }

    document.querySelector('.container').appendChild(keyboard)
  }
}

Calc.init()