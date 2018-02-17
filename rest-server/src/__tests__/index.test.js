const { Board } = require('../Board')

describe('Board test', () => {
  it('should throw errors for invalid moves', () => {
    const board = new Board()

    expect(board.zeroPosition.zrow).toEqual(3)
    expect(board.zeroPosition.zcol).toEqual(3)
    expect(() => board.move(1, 2)).toThrowError()
    expect(() => board.move(2, 2)).toThrowError()
    expect(() => board.move(3, 3)).toThrowError()
    board.move(3, 2)
  })

  it('should be a valid move', () => {
    const board = new Board()
    expect(board.zeroPosition.zrow).toEqual(3)
    expect(board.zeroPosition.zcol).toEqual(3)
    board.move(3, 2)
    expect(board.zeroPosition.zrow).toEqual(3)
    expect(board.zeroPosition.zcol).toEqual(2)
  })

  it('should undo last move move', () => {
    const board = new Board()
    board.move(3, 2)
    board.undoLastMove()
    expect(board.zeroPosition.zrow).toEqual(3)
    expect(board.zeroPosition.zcol).toEqual(3)
  })

  it('should be a valid move', () => {
    const board = new Board()
    board.move(2, 3)
    expect(board.zeroPosition.zrow).toEqual(2)
    expect(board.zeroPosition.zcol).toEqual(3)
  })

  it('should move a number', () => {
    const board = new Board()
    expect(board.positions[15]).toEqual({ row: 3, col: 2 })
    board.moveNumber(15)
    expect(board.zeroPosition.zrow).toEqual(3)
    expect(board.zeroPosition.zcol).toEqual(2)
  })

  it('should update positions', () => {
    const board = new Board()
    board.moveNumber(15)
    expect(board.positions[15]).toEqual({ row: 3, col: 3 })

    expect(board.positions[11]).toEqual({ row: 2, col: 2 })
    board.moveNumber(11)
    expect(board.positions[11]).toEqual({ row: 3, col: 2 })
  })
})
