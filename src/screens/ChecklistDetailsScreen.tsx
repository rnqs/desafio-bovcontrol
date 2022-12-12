import React from 'react'
import { Image, Dimensions, Linking, TouchableOpacity } from 'react-native'
import { Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import styled from 'styled-components/native'

import { useChecklists } from '../context/checklists'
import ChecklistProp from '../components/ChecklistProp'
import iosShadow from '../utils/iosShadow'

export default function ChecklistDetailsScreen() {
  const { id } = useRoute().params as { id: number }
  const navigation = useNavigation()

  const { localChecklists } = useChecklists()

  const {
    latitude,
    longitude,
    farmerName,
    farmerCity,
    type,
    cowsHead,
    milkProduced,
    from,
    to,
    hadSupervision,
    updatedAt,
    createdAt,
  } = localChecklists?.find((checklist) => checklist.id === id)

  navigation.setOptions({ title: farmerName })

  return (
    <Container>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://maps.google.com/?q=${latitude},${longitude}`)
        }
      >
        <Image
          style={{
            height: (Dimensions.get('screen').width / 3) * 2,
            backgroundColor: '#309fec',
          }}
          source={{
            uri: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/pin-s+309fec(${longitude},${latitude})/${longitude},${latitude},13,0/600x400@2x?access_token=pk.eyJ1IjoicmVuYW5hcnF1ZXMiLCJhIjoiY2tnNzVnNXB3MDQxajJya2MzNHo2eGU3ZCJ9.SbRG5Z-ykCx82ccZed7oXw`,
            cache: 'force-cache',
          }}
        />
      </TouchableOpacity>
      <Spacer />
      <Card style={iosShadow}>
        <ChecklistProp
          value={`${farmerName} - ${type}`}
          propName="Fazenda"
          Icon={() => (
            <MaterialCommunityIcons name="tractor" size={28} color="#fff" />
          )}
        />
        <ChecklistProp
          value={farmerCity}
          propName="Cidade"
          Icon={() => (
            <MaterialCommunityIcons name="city" size={28} color="#fff" />
          )}
        />
      </Card>
      <Card style={iosShadow}>
        <ChecklistProp
          value={cowsHead}
          propName="Nº de vacas"
          Icon={() => (
            <MaterialCommunityIcons name="cow" size={28} color="#fff" />
          )}
        />
        <ChecklistProp
          value={milkProduced}
          propName="Total de leite produzido"
          Icon={() => <Entypo name="bucket" size={28} color="#fff" />}
        />
      </Card>
      <Card style={iosShadow}>
        <ChecklistProp
          value={from}
          propName="Fazendeiro"
          Icon={() => (
            <MaterialCommunityIcons
              name="account-cowboy-hat-outline"
              size={28}
              color="#fff"
            />
          )}
        />
        <ChecklistProp
          value={to}
          propName="Supervisor"
          Icon={() => (
            <MaterialCommunityIcons
              name="account-supervisor-outline"
              size={28}
              color="#fff"
            />
          )}
        />
        <ChecklistProp
          value={hadSupervision ? 'Sim' : 'Não'}
          propName="Teve supervisão esse mês?"
          Icon={() => (
            <Feather
              name={hadSupervision ? 'check-circle' : 'x-circle'}
              size={28}
              color="#fff"
            />
          )}
        />
      </Card>
      <Card style={iosShadow}>
        <Col>
          <Title>Ultima atualização:</Title>
          <Text>
            {updatedAt.toLocaleDateString()} - {updatedAt.toLocaleTimeString()}
          </Text>
        </Col>
        <Spacer />
        <Col>
          <Title>Checklist criada em:</Title>
          <Text>
            {createdAt.toLocaleDateString()} - {createdAt.toLocaleTimeString()}
          </Text>
        </Col>
      </Card>
      <LSpacer />
    </Container>
  )
}

const Container = styled.ScrollView`
  flex: 1;
`

const Card = styled.View`
  margin: 8px 16px;
  padding: 6px;
  background-color: #fff;
  border-radius: 8px;

  elevation: 3;
`

const Spacer = styled.View`
  margin: 4px;
`

const LSpacer = styled.View`
  margin: 18px;
`

const Col = styled.View`
  margin: 4px 0 0 12px;
`

const Title = styled.Text`
  top: -1px;
  font-size: 12px;
  font-weight: bold;
  color: #309fec;
`

const Text = styled.Text`
  flex: 1;

  top: -1px;
  font-size: 14px;
  font-weight: bold;
  color: #00234d;
`
