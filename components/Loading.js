import React from "react";
import {
  Button,
  Text,
  H1,
  Col,
  Grid,
  Row,
  Container,
  Content,
  Spinner
} from "native-base";
import { StyleSheet } from "react-native";
import { Board as BoardX } from "../rest-server/src/Board";

export default props => (
  <Container>
    <Grid>
      <Row />
      <Row>
        <Col />
        <Col>
          <Spinner color="black" />
          <Text>
            <H1>{props.title || "Processing"}</H1>
          </Text>
        </Col>
        <Col />
      </Row>
      <Row />
      <Row />
    </Grid>
  </Container>
);
