import React from 'react'
import { Button, Text, H1, Col, Grid, Row, Container } from 'native-base';
import { StyleSheet } from 'react-native'
import {Board as BoardX} from '../server/Board'

export default class Board extends React.Component {

  getMatrix () {
    return this.props.matrix.getMatrix()
  }

  movePiece (col) {
    this.props.movePiece(col)
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
                  borderColor: '#FFF',
                  backgroundColor: col.valid? 'green': col.color,
                  height: 200
                }}>
                  <Text onPress={this.movePiece.bind(this, col)} style={styles(col.valid).text}>
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

const styles = (flag) => StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  text: {
    color: 'white', //flag? '#75B9BE' : 'white',
    fontSize: 100,
    textAlign: 'center'
  }
});
