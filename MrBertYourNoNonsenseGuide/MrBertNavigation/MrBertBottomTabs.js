import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import MrBertMoodBoost from '../MrBertScreens/MrBertMoodBoost';
import MrBertQuickDecision from '../MrBertScreens/MrBertQuickDecision';
import MrBertHabitsKick from '../MrBertScreens/MrBertHabitsKick';
import MrBertDailyCards from '../MrBertScreens/MrBertDailyCards';
import MrBertBookmarks from '../MrBertScreens/MrBertBookmarks';

const Tab = createBottomTabNavigator();

const MrBertBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.mrBertTabs,
        tabBarActiveTintColor: '#FB8609',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="MrBertMoodBoost"
        component={MrBertMoodBoost}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/mrbettab1.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MrBertQuickDecision"
        component={MrBertQuickDecision}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/mrbettab2.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MrBertHabitsKick"
        component={MrBertHabitsKick}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/mrbettab3.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MrBertDailyCards"
        component={MrBertDailyCards}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/mrbettab4.png')}
              tintColor={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MrBertBookmarks"
        component={MrBertBookmarks}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/mrbettab5.png')}
              tintColor={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  mrBertTabs: {
    marginHorizontal: 28,
    elevation: 0,
    paddingTop: 12,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    paddingBottom: 10,
    borderRadius: 22,
    borderTopWidth: 0,
    backgroundColor: '#203453',
    height: 60,
  },
});

export default MrBertBottomTabs;
