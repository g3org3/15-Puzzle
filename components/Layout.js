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

export default class App extends React.Component {
  //checking state for if font is loaded or not.
  state = {
    fontLoaded: false,
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true })
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
            <Button active>
              <Icon name="apps" />
              <Text>Shuffle</Text>
            </Button>
            <Button>
              <Icon name="person" />
              <Text>Solve</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
