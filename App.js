import React from 'react'
import Layout from './components/Layout'
import Board from './components/Board'
import { Root, Toast } from 'native-base'
import { Board as BoardX } from './server/Board'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.movePiece = this.movePiece.bind(this)
    this.shuffleBoard = this.shuffleBoard.bind(this)
    this.state = {
      board: new BoardX()
    }
  }

  toast(message) {
    Toast.show({
      text: message,
      position: 'bottom',
      buttonText: 'Okay'
    })
  }

  movePiece({ val }) {
    try {
      const board = this.state.board.moveNumber(Number(val))
      this.setState({ board });
    } catch (e) {
      this.toast(e.message)
    }
  }

  shuffleBoard() {
    const board = this.state.board.shuffle()
    this.setState({ board })
  }

  render() {
    const props = {
      matrix: this.state.board,
      movePiece: this.movePiece,
      toast: this.toast,
      shuffleBoard: this.shuffleBoard
    }
    return <Root>
      <Layout {...props}>
        <Board {...props} />
      </Layout>
    </Root>
  }
}