const os = require('os')
const path = require('path')
const childs = require('child_process')

let dop = ''

if (os.type() === 'Windows_NT')
    dop = '.cmd'

function run(cmd = '') {
    let [command, ...args] = cmd.split(' ')
    let child = childs.spawn(`${path.join('node_modules', '.bin', command)}${dop}`, args)

    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
}
    
run(`watchify main.ts -p [ tsify -p tsconfig.json ] -d -p [ minifyify --no-map ] -o dist/app.js `)
// run(`node-sass --sourcemap=none --output-style=compressed styles/main.scss dist/style.css`)
// run(`node-sass --sourcemap=none --output-style=compressed --watch styles/main.scss dist/style.css`)
run(`livereload "dist, index.html"`)
run(`http-server . -c-1`)