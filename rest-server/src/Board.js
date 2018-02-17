const { solve, isSolvable } = require('./solve')

/**
 * Dirs
 * @desc enum directions
 */
exports.dirs = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}

/**
 * getOppositeDir
 * @param {direction} dir
 * @returns {direction} opposite
 */
exports.getOppositeDir = dir => {
  const ops = [1, 0, 3, 2]
  return ops[dir]
}

/**
 * Board
 *
 * @param {any} matrix
 */
exports.Board = function Board (matrix) {
  this.matrix = matrix || [
    [' 1', ' 2', ' 3', ' 4'],
    [' 5', ' 6', ' 7', ' 8'],
    [' 9', '10', '11', '12'],
    ['13', '14', '15', ' 0']
  ]
  this.moves = []
  this.positions = Array(16).fill({})
  this.recordedMoves = []

  /**
   * Board.searchZero
   * @param {Matrix} matrix
   * @returns position of zero
   */
  this.searchZero = matrix => {
    let zrow = -1
    let zcol = -1
    matrix.map((row, rindex) =>
      row.map((col, cindex) => {
        if (!Number(col)) {
          zrow = rindex
          zcol = cindex
        }
        this.positions[Number(col)] = { row: rindex, col: cindex }
      })
    )
    return { zrow, zcol }
  }
  if (!validateMatrix(this.matrix)) {
    throw new Error('Invalid matrix data to create a board, missing numbers')
  }
  this.zeroPosition = this.searchZero(this.matrix)
  // done

  /**
   * levels
   * @desc enum for shuffle levels
   */
  this.levels = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2
  }

  this._shuffle = n => {
    let dir = random(0, 4)
    let counter = n || 3
    while (counter) {
      try {
        this.moveDirection(dir)
        counter--
        this.recordedMoves.push(dir)
      } catch (e) {}
      dir = random(0, 4)
    }
  }

  this.shuffle = level => {
    const { EASY, MEDIUM, HARD } = this.levels
    switch (level) {
      case EASY: {
        this._shuffle(6)
        break
      }
      case MEDIUM: {
        let rightPieces = this.howManyAreCorrect()
        while (rightPieces >= 6) {
          console.log(rightPieces)
          this._shuffle(16)
          rightPieces = this.howManyAreCorrect()
        }
        break
      }
      case HARD: {
        let rightPieces = this.howManyAreCorrect()
        while (rightPieces === 0) {
          this._shuffle(20)
          rightPieces = this.howManyAreCorrect()
        }
        break
      }
    }
    return this
  }

  this.howManyAreCorrect = () => {
    return this.isBoardSolved()
      .map(row => row.filter(a => a))
      .reduce((acum, item) => {
        item.map(i => acum.push(i))
        return acum
      }, []).length
  }

  this.dirs = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
  }

  this.getOppositeDir = dir => {
    const ops = [1, 0, 3, 2]
    return ops[dir]
  }

  this.isBoardDone = () => {
    if (this.howManyAreCorrect() === 16) {
      this.recordedMoves = []
      return true
    }
    return false
  }

  this.moveDirection = dir => {
    const { UP, DOWN, LEFT, RIGHT } = this.dirs
    const { zcol, zrow } = this.zeroPosition
    switch (dir) {
      case UP: {
        return this.move(zrow - 1, zcol)
      }
      case DOWN: {
        return this.move(zrow + 1, zcol)
      }
      case LEFT: {
        return this.move(zrow, zcol - 1)
      }
      case RIGHT: {
        return this.move(zrow, zcol + 1)
      }
      default: {
        return this
      }
    }
  }

  this.isBoardSolved = () => {
    const solution = [
      [' 1', ' 2', ' 3', ' 4'],
      [' 5', ' 6', ' 7', ' 8'],
      [' 9', '10', '11', '12'],
      ['13', '14', '15', ' 0']
    ]
    const correctness = this.matrix.map((row, r) =>
      row.map((col, c) => col == solution[r][c])
    )
    return correctness
  }

  /**
   * moveNumber
   * @param num
   * @returns boolean
   */
  this.moveNumber = num => {
    if (!(num >= 0 && num <= 15)) throw Error('invalid number to move')
    const { row, col } = this.getPos(num)
    return this.move(row, col)
  }

  this.getPos = num => {
    return this.positions[num]
  }

  this.isInRange = (row, col) => {
    return row >= 0 && row < 4 && (col >= 0 && col < 4)
  }

  /**
   * move
   * @param row
   * @param col
   * @returns boolean
   */
  this.move = (row, col) => {
    if (!this.isValidMove(row, col)) {
      const value = this.isInRange(row, col) ? `${this.matrix[row][col]}` : ''
      throw new Error(`Not valid move`)
    }
    this.moves.push({
      row,
      col,
      zeroPosition: Object.assign({}, this.zeroPosition)
    })
    const val = this.matrix[row][col]
    const { zrow, zcol } = this.zeroPosition
    this.matrix[row][col] = ' 0'
    this.matrix[zrow][zcol] = val
    this.zeroPosition = { zrow: row, zcol: col }

    // update postisions
    this.positions[0] = { row, col }
    this.positions[Number(val)] = { row: zrow, col: zcol }
    return this
  }

  /**
   * undoLastMove
   * @returns Number between base and N
   */
  this.undoLastMove = () => {
    const lastMove = this.moves.pop()
    const { zrow, zcol } = lastMove.zeroPosition
    this.move(zrow, zcol)
  }

  /**
   * isValidMove
   * @param row
   * @param col
   * @returns Number between base and N
   */
  this.isValidMove = (row, col) => {
    if (row < 4 && row >= 0 && (col < 4 && col >= 0)) {
      const { zrow, zcol } = this.zeroPosition
      if (zrow === row) {
        return zcol + 1 === col || zcol - 1 === col
      } else if (zcol === col) {
        return zrow + 1 === row || zrow - 1 === row
      } else {
        return false
      }
    }
    return false
  }

  this.solve = () => solve.bind(this)()
  this.isSolvable = () => isSolvable.bind(this)()

  this.animate = (moves, options) => {
    const t = 2000
    const verbose = (options || {}).verbose
    moves.map((move, i) => {
      setTimeout(() => {
        this.moveNumber(move)
        if (verbose) this.printBoard()
      }, t * i)
    })
  }

  this.getMatrix = () => {
    const matrix = [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]]
    const correctness = this.isBoardSolved()
    this.matrix.map((row, r) => {
      row.map((col, c) => {
        matrix[c][r] = { val: col, color: '#1B2F33', valid: correctness[r][c] }
      })
    })
    return matrix
  }

  this.boardToMatrix = board => {
    const matrix = [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]]
    board.map((row, c) => {
      row.map((col, r) => {
        matrix[r][c] = col.val
      })
    })
    return matrix
  }

  this.printBoard = () => {
    console.log('\nBoard')
    this.matrix.map(row => console.log(row.join(' | ')))
  }
}

/**
 * random
 *
 * @param {any} base
 * @param {any} n
 * @returns Number between base and N
 */
function random (base, n) {
  return Math.floor(Math.random() * n) + base
}

/**
 * prettyN
 *
 * @param {any} n
 * @returns string
 */
function prettyN (n) {
  if (n < 10) return ' ' + n
  return n
}

/**
 * shuffle
 *
 * @param {any} matrix
 * @returns Array[][]
 */
function shuffle (matrix) {
  const length = 16
  const values = Array(length).fill(false)
  return matrix.map(row =>
    row.map(col => {
      let val = random(0, length)
      while (values[val]) {
        val = random(0, length)
      }
      values[val] = true
      return prettyN(val)
    })
  )
}

/**
 * validateMatrix
 *
 * @param {any} matrix
 * @returns boolean
 */
function validateMatrix (matrix) {
  const length = 16
  const values = Array(length).fill(false)
  matrix.map(row =>
    row.map(col => {
      try {
        if (Number(col) < length && Number(col) >= 0) {
          values[Number(col)] = true
        }
      } catch (e) {}
      return col
    })
  )

  return values.filter(a => a).length === length
}
