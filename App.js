import React from 'react'
import Layout from './components/Layout'
import Board from './components/Board'
import { Root } from 'native-base'
import { Board as BoardX } from './server/Board'

export default class App extends React.Component {
  render() {
    return <Root>
      <Layout>
        <Board />
      </Layout>
    </Root>
  }
}