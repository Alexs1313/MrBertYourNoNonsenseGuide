import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MrBertLayout from '../MrBertComponents/MrBertLayout';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const MrBertIntro = () => {
  const [mrBettGetStartedIdx, setMrBettGetStartedIdx] = useState(0);
  const navigation = useNavigation();
  const [isVisibleLoader, setIsVisibleLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleLoader(false);
    }, 2000);
  }, []);

  return (
    <MrBertLayout>
      {isVisibleLoader ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={require('../../assets/images/mrbertloader.png')} />
        </View>
      ) : (
        <View style={styles.mrBertWelcomeWrap}>
          {mrBettGetStartedIdx === 0 && (
            <Image source={require('../../assets/images/mrbeton1.png')} />
          )}
          {mrBettGetStartedIdx === 1 && (
            <Image source={require('../../assets/images/mrbeton2.png')} />
          )}
          {mrBettGetStartedIdx === 2 && (
            <Image source={require('../../assets/images/mrbeton3.png')} />
          )}
          {mrBettGetStartedIdx === 3 && (
            <Image source={require('../../assets/images/mrbeton4.png')} />
          )}

          <View style={styles.mrBertWelcomeCont}>
            <View style={styles.mrBertWelcomeInsideCont}>
              <Text style={styles.mrBertWelcomeText}>
                {mrBettGetStartedIdx === 0 &&
                  'Explore the Best of National Gramado'}
                {mrBettGetStartedIdx === 1 && 'One Card a Day'}
                {mrBettGetStartedIdx === 2 && 'Stuck? Ask Bert'}
                {mrBettGetStartedIdx === 3 && 'Boost Your Momentum'}
              </Text>
              <Text style={styles.mrBertWelcomeDescription}>
                {mrBettGetStartedIdx === 0 &&
                  'Quick, sharp, no-nonsense guidance for your day.'}
                {mrBettGetStartedIdx === 1 &&
                  'Get a unique daily insight. Short, bold, and brutally clear.'}
                {mrBettGetStartedIdx === 2 &&
                  'A or B, go or stay, start or skip — Mr Bert decides fast.'}
                {mrBettGetStartedIdx === 3 &&
                  'Smart nudges and small pushes to keep your day moving.'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.mrBertGetStartedBtn}
            onPress={() =>
              mrBettGetStartedIdx === 3
                ? navigation.navigate('MrBertBottomTabs')
                : setMrBettGetStartedIdx(mrBettGetStartedIdx + 1)
            }
          >
            <Text style={styles.mrBertGetStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      )}
    </MrBertLayout>
  );
};

const styles = StyleSheet.create({
  mrBertWelcomeWrap: {
    flex: 1,
    alignItems: 'center',
    padding: 28,
    paddingTop: height * 0.06,
  },
  mrBertWelcomeCont: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
  },
  mrBertWelcomeInsideCont: {
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
    paddingTop: 30,
    paddingBottom: 50,
    minHeight: 230,
  },
  mrBertWelcomeText: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Fredoka-Bold',
    marginBottom: 10,
  },
  mrBertWelcomeDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Fredoka-Regular',
    paddingHorizontal: 30,
  },
  mrBertGetStartedBtn: {
    marginTop: 40,
    backgroundColor: '#FB8609',
    width: 206,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  mrBertGetStartedText: {
    color: '#14243E',
    fontSize: 22,
    fontFamily: 'Fredoka-Bold',
  },
});

export default MrBertIntro;
