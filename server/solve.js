/**
  [
    [' 1', ' 2', ' 3', ' 4'],
    [' 5', ' 6', ' 7', ' 8'],
    [' 9', '10', '11', '12'],
    ['13', '14', '15', ' 0']
  ]
 */
/**
 * solve
 * @param {*} matrix 
 */
exports.solve = (matrix) => {
  // TODO: find algorithm
  return []
}

exports.isSolvable = function () {
  let parity = 0
  for (var tile = 0; tile < 15; tile++) {
    for (var tileBefore = 0; tileBefore < tile; tileBefore++) {
      const value = {
        before: getValue(this.matrix, tileBefore),
        current: getValue(this.matrix, tile)
      }
      if (value.before > value.current) {
        parity++
      }
    }
  }
  if (this.zeroPosition.zrow === 0 || this.zeroPosition.zrow === 2) {
    parity++
  }

  return (parity % 2) === 0
}
/**
BOOL isSolvable()
{
  int parity = 0;
  for (int tile = 0; tile < 15; tile++)
  {
    for (int tileBefore = 0; tileBefore < tile; tileBefore++)
    {
      if (Puzzle[tileBefore] > Value[tile])
        parity++;
    }
  }
  // add 1 to parity if empty tile is in row 0 or 2 (and not in 1 or 3)
  if ((row & 1) == 0)
    parity++;
  // if parity is even -> puzzle sovable
  return ((parity & 1) == 0);
}
*/

function getValue (matrix, tile) {
  const pos = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },

    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },

    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },

    { row: 3, col: 0 },
    { row: 3, col: 1 },
    { row: 3, col: 2 },
    { row: 3, col: 3 },
  ]
  const { row, col } = pos[tile]
  return Number(matrix[row][col])
}
