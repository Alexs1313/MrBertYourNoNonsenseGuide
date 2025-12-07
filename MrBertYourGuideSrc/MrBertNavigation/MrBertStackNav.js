import { createStackNavigator } from '@react-navigation/stack';
import MrBertIntro from '../MrBertScreens/MrBertIntro';
import MrBertBottomTabs from './MrBertBottomTabs';

const Stack = createStackNavigator();

const MrBertStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MrBertIntr" component={MrBertIntr} />
      <Stack.Screen name="MrBertBottomTabs" component={MrBertBottomTabs} />
    </Stack.Navigator>
  );
};

export default MrBertStackNav;
