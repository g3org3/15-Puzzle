
const { Board } = require('./Board')
const { log } = console

const board = new Board()
board.printBoard()

board.shuffle(0)
board.printBoard()
// board.recordedMoves.map(move => {
//   if (move === board.dirs.UP) log('UP')
//   if (move === board.dirs.DOWN) log('DOWN')
//   if (move === board.dirs.LEFT) log('LEFT')
//   if (move === board.dirs.RIGHT) log('RIGHT')
// })