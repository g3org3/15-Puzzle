import React from "react";
import Layout from "./components/Layout";
import Board from "./components/Board";
import Loading from "./components/Loading";
import { Root, Toast, Drawer, SideBar } from "native-base";
import { Board as BoardX } from "./rest-server/src/Board";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.movePiece = this.movePiece.bind(this);
    this.shuffleBoard = this.shuffleBoard.bind(this);
    this.animateMoveDirections = this.animateMoveDirections.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.state = {
      board: new BoardX(),
      loading: false
    };
  }

  toast(message) {
    Toast.show({
      text: message,
      position: "bottom",
      buttonText: "Okay"
    });
  }

  movePiece({ val }) {
    try {
      const board = this.state.board.moveNumber(Number(val));
      this.setState({ board });
    } catch (e) {
      this.toast(e.message);
    }
  }

  shuffleBoard() {
    const { EASY, HARD, MEDIUM } = this.state.board.levels;
    const board = this.state.board.shuffle(MEDIUM);
    this.setState({ board });
  }

  async sleep(t) {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, t)
    );
  }

  async animateMoveDirections(moves, t, solved) {
    await this.sleep(t || 1000);
    while (moves.length) {
      const move = moves[moves.length - 1];
      this.setState({ board: this.state.board.moveDirection(move) });
      await this.sleep(t || 1000);
      moves.pop();
      if (this.state.board.isBoardDone()) {
        break;
      }
    }
    if (!solved) this.toast("Timeout: Could not solve.");
    else this.toast("Done!");
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  render() {
    const props = {
      matrix: this.state.board,
      movePiece: this.movePiece,
      toast: this.toast,
      shuffleBoard: this.shuffleBoard,
      animateMoveDirections: this.animateMoveDirections,
      setLoading: this.setLoading
    };

    const Content = () =>
      this.state.loading ? <Loading /> : <Board {...props} />;
    return (
      <Root>
        <Layout {...props}>
          <Content />
        </Layout>
      </Root>
    );
  }
}
