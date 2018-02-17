const express = require('express')
const router = express.Router()
const { version } = require('../package.json')
const { Board, dirs, getOppositeDir } = require('./Board')

router.get('/', (req, res) => {
  res.json({ message: 'up', version })
})

router.post('/solve', (req, res) => {
  const matrix = req.body
  const board = new Board([].concat(matrix))
  const { moves, cicles, solved } = solveBoard(board)
  let t = 6
  if (cicles < 5) {
    t = 600
  } else if (cicles < 10) {
    t = 300
  } else if (cicles < 20) {
    t = 100
  } else if (cicles < 50) {
    t = 80
  }
  res.json({ version, moves, t, solved })
})

/**
 * solveBoard
 * @param {Board} board
 * @desc while the board is not solve it will calculate and combine the fitness functions
 */
function solveBoard (board) {
  const moves = []
  let quit = false
  let cicles = 0
  while (!board.isBoardDone() && !quit) {
    const up = tryMove(board, dirs.UP, dirs.DOWN, moves)
    const down = tryMove(board, dirs.DOWN, dirs.UP, moves)
    const left = tryMove(board, dirs.LEFT, dirs.RIGHT, moves)
    const right = tryMove(board, dirs.RIGHT, dirs.LEFT, moves)

    const min = { value: up, dir: dirs.UP }
    if (down < min.value) {
      min.value = down
      min.dir = dirs.DOWN
    }
    if (left < min.value) {
      min.value = left
      min.dir = dirs.LEFT
    }
    if (right < min.value) {
      min.value = right
      min.dir = dirs.RIGHT
    }

    console.log({ cicles, min, up, right, down, left })
    moves.push(min.dir)
    board.moveDirection(min.dir)
    cicles += 1
    if (cicles >= 100) {
      quit = true
    }
  }
  console.log({ cicles })
  return { cicles, moves, solved: !quit }
}

module.exports = router

/**
 * tryMove
 * @desc Tries the move if valid calculates the diferent fitness functions and combines them
 * @param {Board} board
 * @param {direction} dir
 * @param {direction} opposite
 * @param {Array} moves
 * @returns {num} fitnessValuesCombined
 */
function tryMove (board, dir, opposite, moves) {
  try {
    if (getOppositeDir(dir) === moves[moves.length - 1]) return 1000000000
    board.moveDirection(dir)
    const result = (fitnessDistance(board) + fitnessIsInPlace(board)) / 2
    board.moveDirection(opposite)
    return result
  } catch (e) {
    return 1000000000
  }
}

/**
 * fitenessIsInPlace
 * @desc add 1 for each tile that is not in the correct place, normalized
 * @param {Board} board
 * @returns value {0..1}
 */
function fitnessIsInPlace (board) {
  let pos = 0
  let sum = 0
  board.matrix.map(row => {
    return row.map(col => {
      pos++
      if (pos !== 16) {
        sum += Number(col) === pos ? 0 : 1
      }
    })
  })
  return sum / 15
}

/**
 * fitnessHumam
 * @desc variation of the distance function it includes a weight for the specific tile
 * @param {Board} board
 * @returns value {0..1}
 */
function fitnessHuman (board) {
  let sum = 0
  const place = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 0, c: 2 },
    { r: 0, c: 3 },
    { r: 1, c: 0 },
    { r: 1, c: 1 },
    { r: 1, c: 2 },
    { r: 1, c: 3 },
    { r: 2, c: 0 },
    { r: 2, c: 1 },
    { r: 2, c: 2 },
    { r: 2, c: 3 },
    { r: 3, c: 0 },
    { r: 3, c: 1 },
    { r: 3, c: 2 },
    { r: 3, c: 3 }
  ]
  board.matrix.map((row, i) => {
    row.map((col, j) => {
      if (Number(col) !== 0) {
        const { r, c } = place[Number(col) - 1]
        const distance = abs(r - i) + abs(c - j)
        sum += distance * (17 - Number(col))
      }
    })
  })
  return sum / 200
}

/**
 * fitnessDistance
 * @param {Board} board
 * @desc calculates the distance where the tile needs to be and its normalized
 * @returns value {0..1}
 */
function fitnessDistance (board) {
  let sum = 0
  const place = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 0, c: 2 },
    { r: 0, c: 3 },
    { r: 1, c: 0 },
    { r: 1, c: 1 },
    { r: 1, c: 2 },
    { r: 1, c: 3 },
    { r: 2, c: 0 },
    { r: 2, c: 1 },
    { r: 2, c: 2 },
    { r: 2, c: 3 },
    { r: 3, c: 0 },
    { r: 3, c: 1 },
    { r: 3, c: 2 },
    { r: 3, c: 3 }
  ]
  board.matrix.map((row, i) => {
    row.map((col, j) => {
      if (Number(col) !== 0) {
        const { r, c } = place[Number(col) - 1]
        const distance = abs(r - i) + abs(c - j)
        sum += distance
      }
    })
  })
  return sum / 20
}

/**
 * fitenessTerrible
 *
 * @param {Board} board
 * @returns value {0..1}
 */
function fitnessTerrible (board) {
  return board.isBoardDone() ? 0 : 1
}

/**
 * abs
 * @desc get absolute value
 * @param {any} num
 * @returns num
 */
function abs (num) {
  if (num < 0) return num * -1
  else return num
}
