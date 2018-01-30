import React from 'react'
import { Button, Text, H1, Col, Grid, Row, Container, Toast } from 'native-base';
import { StyleSheet } from 'react-native'
import {Board as BoardX} from '../server/Board'

export default class Board extends React.Component {

  constructor(props) {
    super(props)
    // this.movePiece = this.movePiece.bind(this)
    this.state = {
      board: new BoardX()
    }
  }

  getMatrix () {
    return this.state.board.getMatrix()
  }

  movePiece (col) {
    try {
      const board = this.state.board.moveNumber(Number(col.val))
      this.setState({ board });
    } catch (e) {
      Toast.show({
        text: e.message,
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
  }

  render() {
    return <Container>
      <Grid>
        {
          this.getMatrix().map((row, rindex) => (
            <Col key={`A${rindex}`} style={{ height: 500 }}>
              {row.map((col, cindex) => (
                <Col key={`${rindex}-${cindex}`} style={{
                  borderWidth: 1,
                  borderColor: '#fff',
                  backgroundColor: col.color,
                  height: 200
                }}>
                  <Text onPress={this.movePiece.bind(this, col)} style={styles.text}>
                    {col.val!==' 0'? col.val : '-'}
                  </Text>
                </Col>
              ))}
            </Col>
          ))
        }
      </Grid>
    </Container>
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  text: {
    color: 'white',
    fontSize: 100,
    textAlign: 'center'
  }
});
