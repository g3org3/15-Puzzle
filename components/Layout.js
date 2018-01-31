import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Font } from 'expo'
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Text,
  Footer,
  FooterTab,
  Content,
} from 'native-base'
import { Board } from '../server/Board';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleSolve = this.handleSolve.bind(this)
    this.handleShuffle = this.handleShuffle.bind(this)
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  handleSolve() {
    const solvable = this.props.matrix.isSolvable()
    this.props.toast(solvable? 'This can be solvable' : 'this can not be solvable')
  }

  handleShuffle() {
    this.props.shuffleBoard()
  }

  render() {
    return (
      <Container>
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Title style={{ marginTop: 20 }}>15 Puzzle</Title>
        </Header>
        <Content>
          {this.props.children}
        </Content>
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
    )
  }
}
