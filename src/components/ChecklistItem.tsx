import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import styled from 'styled-components/native'

import { Checklist } from '../services/db/models/Checklist'
import iosShadow from '../utils/iosShadow'

interface ChecklistItemProps {
  itemData: Checklist
}

export default function ChecklistItem({ itemData }: ChecklistItemProps) {
  const navigation = useNavigation()

  return (
    <TouchableContainer
      style={iosShadow}
      activeOpacity={0.7}
      onPress={() =>
        // @ts-ignore
        navigation.navigate('ChecklistDetails', {
          id: itemData.id,
          farmerName: itemData.farmerName,
        })
      }
    >
      <Row>
        <Title>{itemData.farmerName}</Title>
        <SText>{itemData.createdAt.toLocaleDateString()}</SText>
      </Row>
      <Spacer />
      <Row>
        <Feather name="user" size={16} color="#309FEC" />
        <Text>{itemData.from}</Text>
      </Row>
      <Row>
        <Feather name="map-pin" size={16} color="#309FEC" />
        <Text>{itemData.farmerCity}</Text>
        {/* <Button>
          <ButtonText>Ver detalhes</ButtonText>
        </Button> */}
      </Row>
    </TouchableContainer>
  )
}

const TouchableContainer = styled.TouchableOpacity`
  margin: 8px 16px;
  padding: 8px 10px;
  background-color: #fff;
  border-radius: 8px;

  elevation: 3;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 6px;
`

const Spacer = styled.View`
  margin: 4px;
`

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

const Text = styled.Text`
  flex: 1;

  top: -1px;
  margin-left: 6px;
  font-size: 14px;
  font-weight: bold;
  color: #00234d;
`

const SText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #444;
`

const Button = styled.View`
  padding: 2px 8px;
  border-radius: 6px;
  background-color: #309fec;
`
const ButtonText = styled.Text`
  top: -0.5px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`
