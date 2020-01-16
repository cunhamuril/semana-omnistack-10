import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Perfil no Github'
      }
    }
  }, {
    // Configurações padrões de navegação
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false, // Título que aparece junto com botão voltar (apenas no iOS)
      headerStyle: {
        backgroundColor: '#7D40E7',
      }
    }
  })
)

export default Routes;