import * as React from 'react'
import styled from 'styled-components/native'

interface ChecklistProp {
  propName: string
  value: string | number
  Icon: () => React.ReactElement
}

export default function ChecklistProp({
  propName,
  value,
  Icon,
}: ChecklistProp) {
  return (
    <Container>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Col>
        <Title>{propName}</Title>
        <Text>{value}</Text>
      </Col>
    </Container>
  )
}

const Container = styled.View`
  margin: 8px;

  flex-direction: row;
`

const Col = styled.View`
  margin: 4px 0 0 12px;
`

const IconWrapper = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #309fec;
  /* border: 2.5px solid #309fec; */

  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  top: -1px;
  font-size: 14px;
  font-weight: bold;
  color: #309fec;
`

const Text = styled.Text`
  flex: 1;

  top: -1px;
  font-size: 18px;
  font-weight: bold;
  color: #00234d;
`
