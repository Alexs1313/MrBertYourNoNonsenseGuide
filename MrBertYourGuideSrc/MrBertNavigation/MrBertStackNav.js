import { createStackNavigator } from '@react-navigation/stack';
import MrBertIntro from '../MrBertScreens/MrBertIntro';
import MrBertBottomTabs from './MrBertBottomTabs';

const Stack = createStackNavigator();

const MrBertStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MrBertIntro" component={MrBertIntro} />
      <Stack.Screen name="MrBertBottomTabs" component={MrBertBottomTabs} />
    </Stack.Navigator>
  );
};

export default MrBertStackNav;
