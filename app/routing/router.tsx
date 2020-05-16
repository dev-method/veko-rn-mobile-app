import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../screens/main_screen'
import FormScreen from '../screens/form'
import CatalizatorScreen from '../screens/catalizator/catalizator'
import CommonScreen from '../screens/common/common'
import Detail from '../screens/position_detail'
import RareScreen from '../screens/rare/rare'
import Calculator from '../screens/calculator'
import ElectroScreen from '../screens/electro'
import MapScreen from '../screens/map_screen'
import Catalog from '../screens/catalizator/catalog'
import ForeignCatalog from '../screens/catalizator/foreign-catalog'

const CommonStack = createStackNavigator({
        Common: {
            screen: CommonScreen,
            navigationOptions: {
                title: '',
            },
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: '',
            },
        }
    },
    {
        initialRouteName: "Common",
        mode: 'modal',
        headerMode: 'none',
    },

);

const RareStack = createStackNavigator({
        Rare: {
            screen: RareScreen,
            navigationOptions: {
                title: '',
            },
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: '',
            },
        }
    },
    {
        initialRouteName: "Rare",
        mode: 'modal',
        headerMode: 'none',
    },

);

const MainStack = createStackNavigator({
        Main: {
            screen: MainScreen,
        },
        Common: {
            screen: CommonStack,
            navigationOptions: {
                title: '',
            },
        },
        Rare: {
            screen: RareStack,
            navigationOptions: {
                title: '',
            },
        },
        Calc: {
            screen: Calculator,
            navigationOptions: {
                title: '',
            },
        },
        Catalizator: {
            screen: CatalizatorScreen,
            navigationOptions: {
                title: '',
            },
        },
        Map: {
            screen: MapScreen,
            navigationOptions: {
                title: '',
            },
        },
        Form: {
            screen: FormScreen,
            navigationOptions: {
                title: '',
            },
        },
        Electro: {
            screen: ElectroScreen,
            navigationOptions: {
                title: '',
            },
        },
        Catalog: {
            screen: Catalog,
            navigationOptions: {
                title: ''
            }
        },
        ForeignCatalog: {
            screen: ForeignCatalog,
            navigationOptions: {
                title: ''
            }
        },
    },
    {
        initialRouteName: "Main",
        mode: 'modal',
        headerMode: 'none',
    },

);


export const AppContainer=createAppContainer(MainStack);

