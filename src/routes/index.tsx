import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ChecklistDetailsScreen from '../screens/ChecklistDetailsScreen'
import ListChecklistsScreen from '../screens/ListChecklistsScreen'
import EditChecklistScreen from '../screens/EditChecklistScreen'
import NewChecklistScreen from '../screens/NewChecklistScreen'

import DeleteChecklistButton from './HeaderButtons/DeleteChecklistButton'
import EditChecklistButton from './HeaderButtons/EditChecklistButton'
import AddChecklistButton from './HeaderButtons/AddChecklistButton'

export default function Routes() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { color: 'black' },
          headerTintColor: '#309FEC',
        }}
      >
        <Stack.Screen
          name="ListChecklists"
          component={ListChecklistsScreen}
          options={{
            headerTitle: 'Checklists',
            headerRight: AddChecklistButton,
          }}
        />
        <Stack.Screen
          name="ChecklistDetails"
          component={ChecklistDetailsScreen}
          options={({ route }) => ({
            // @ts-ignore
            title: route.params.farmerName,
            headerRight: EditChecklistButton,
          })}
        />
        <Stack.Screen
          name="EditChecklist"
          component={EditChecklistScreen}
          options={{
            headerTitle: 'Editar',
            headerRight: DeleteChecklistButton,
          }}
        />
        <Stack.Screen
          name="NewChecklist"
          component={NewChecklistScreen}
          options={{
            headerTitle: 'Nova Checklist',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
