import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Font } from "expo";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Text,
  Footer,
  FooterTab,
  Content
} from "native-base";
import { Board } from "../rest-server/src/Board";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSolve = this.handleSolve.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  handleSolve() {
    this.props.setLoading(true);
    fetch("http://jorgeadolfo.com:1234/api/solve", {
      method: "POST",
      body: JSON.stringify(this.props.matrix.matrix),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.setLoading(false);
        // const moves = [...this.props.matrix.recordedMoves]
        // .map(this.props.matrix.getOppositeDir)
        this.props.animateMoveDirections(
          data.moves.reverse(),
          data.t,
          data.solved
        );
      })
      .catch(err => {
        this.props.setLoading(false);
        console.log(JSON.stringify(err, null, 2));
      });
    // const solvable = this.props.matrix.isSolvable()
    // this.props.toast(solvable? 'This can be solvable' : 'this can not be solvable')
  }

  handleShuffle() {
    this.props.shuffleBoard();
  }

  render() {
    return (
      <Container>
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Title style={{ marginTop: 20 }}>15 Puzzle</Title>
        </Header>
        <Content>{this.props.children}</Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.handleShuffle}>
              <Icon name="apps" />
              <Text>Shuffle</Text>
            </Button>
            <Button onPress={this.handleSolve}>
              <Icon name="person" />
              <Text>Solve</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
