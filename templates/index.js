module.exports = (nameComponent) => (
`import React from "react";
import { Container } from "./styled"

export default function ${nameComponent}() {
  return (
    <Container>
      <strong>Hello stranger, ${nameComponent}!</strong>
    </Container>
  );
}
`
)