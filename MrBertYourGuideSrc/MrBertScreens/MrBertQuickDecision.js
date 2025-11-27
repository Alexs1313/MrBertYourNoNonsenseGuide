import React, { useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Share,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import MrBertLayout from '../MrBertComponents/MrBertLayout';
import MrBertHeader from '../MrBertComponents/MrBertHeader';

const { height } = Dimensions.get('window');

const mrBertThinkingImages = [
  require('../../assets/images/mrbertthink1.png'),
  require('../../assets/images/mrbertthink2.png'),
  require('../../assets/images/mrbertthink3.png'),
];

const mrBertAnswers = ['Yes', 'No', 'Maybe'];

const MrBertQuickDecisions = () => {
  const [mrBertMode, setMrBertMode] = useState('start');
  const [mrBertQuestion, setMrBertQuestion] = useState('');
  const [mrBertAnswer, setMrBertAnswer] = useState('');
  const [mrBertImageIndex, setMrBertImageIndex] = useState(0);

  const mrBertFadeAnim = useRef(new Animated.Value(1)).current;

  const mrBertAnimateThinking = () => {
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step > 2) {
        clearInterval(interval);
        mrBertFinishThinking();
        return;
      }

      mrBertFadeAnim.setValue(0);
      setMrBertImageIndex(step);

      Animated.timing(mrBertFadeAnim, {
        toValue: 1,
        duration: 1100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 800);
  };

  const mrBertFinishThinking = () => {
    const random =
      mrBertAnswers[Math.floor(Math.random() * mrBertAnswers.length)];
    setMrBertAnswer(random);
    setMrBertMode('result');
  };

  const mrBertOnDecide = () => {
    if (mrBertQuestion.trim().length === 0) return;

    setMrBertMode('thinking');
    setMrBertImageIndex(0);
    mrBertAnimateThinking();
  };

  const mrBertShareResult = () => {
    Share.share({
      message:
        Platform.OS === 'ios'
          ? `Question: ${mrBertQuestion}\nMr Bert: ${mrBertAnswer}!`
          : `Question: ${mrBertQuestion}\nMr Goldbert: ${mrBertAnswer}!`,
    });
  };

  const mrBertRestart = () => {
    setMrBertMode('start');
    setMrBertQuestion('');
  };

  return (
    <MrBertLayout>
      <View style={mrBertStyles.mrBertWrap}>
        <MrBertHeader headerTitle="Quick Decisions" />

        {mrBertMode === 'start' && (
          <>
            <Image
              source={require('../../assets/images/mrbertthink1.png')}
              style={{ top: 0 }}
            />

            <View style={{ width: '100%', alignItems: 'center', top: -80 }}>
              <View style={mrBertStyles.mrBertBox}>
                <View style={mrBertStyles.mrBertBoxInner}>
                  <Text style={mrBertStyles.mrBertTitle}>
                    {Platform.OS === 'ios'
                      ? 'Ask Mr Bert:'
                      : 'Ask Mr Goldbert:'}
                  </Text>
                  <Text style={mrBertStyles.mrBertSubtitle}>
                    And get the response “Yes”, “No” or “Maybe”
                  </Text>

                  <TextInput
                    value={mrBertQuestion}
                    onChangeText={setMrBertQuestion}
                    placeholder="Your question to decide:"
                    placeholderTextColor="#A8B3C4"
                    style={mrBertStyles.mrBertInput}
                    maxLength={40}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={mrBertStyles.mrBertMainBtn}
                onPress={mrBertOnDecide}
              >
                <Text style={mrBertStyles.mrBertMainBtnText}>Decide</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {mrBertMode === 'thinking' && (
          <>
            <Animated.Image
              source={mrBertThinkingImages[mrBertImageIndex]}
              style={[{ marginTop: 30, opacity: mrBertFadeAnim }]}
            />

            <View style={[mrBertStyles.mrBertBox, { top: -40 }]}>
              <View style={mrBertStyles.mrBertBoxInner}>
                <Text style={mrBertStyles.mrBertTitle}>
                  {Platform.OS === 'ios'
                    ? 'Mr Bert think...'
                    : 'Mr Goldbert think...'}
                </Text>
              </View>
            </View>
          </>
        )}

        {mrBertMode === 'result' && (
          <>
            <Image source={mrBertThinkingImages[2]} style={{ marginTop: 30 }} />

            <View style={{ width: '100%', alignItems: 'center', top: -30 }}>
              <View style={mrBertStyles.mrBertBox}>
                <View style={mrBertStyles.mrBertBoxInner}>
                  <Text style={mrBertStyles.mrBertSubtitle}>
                    question: {mrBertQuestion}
                  </Text>
                  <Text style={mrBertStyles.mrBertResultText}>
                    {Platform.OS === 'ios' ? 'Mr Bert' : 'Mr Goldbert'}:{' '}
                    {mrBertAnswer}!
                  </Text>
                </View>
              </View>

              <View style={mrBertStyles.mrBertRow}>
                <TouchableOpacity
                  style={[mrBertStyles.mrBertMainBtn, { marginTop: 0 }]}
                  onPress={mrBertRestart}
                >
                  <Text style={mrBertStyles.mrBertMainBtnText}>Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={mrBertStyles.mrBertIconBtn}
                  onPress={mrBertShareResult}
                >
                  <Image
                    source={require('../../assets/images/mrbertshare.png')}
                    style={{ width: 26, height: 26 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </MrBertLayout>
  );
};

const mrBertStyles = StyleSheet.create({
  mrBertWrap: {
    flex: 1,
    alignItems: 'center',
    padding: 28,
    paddingTop: height * 0.073,
    paddingBottom: 130,
  },
  mrBertBox: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
    marginTop: 15,
  },
  mrBertBoxInner: {
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
    padding: 18,
    alignItems: 'center',
    gap: 12,
  },
  mrBertTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Fredoka-Bold',
  },
  mrBertSubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Fredoka-Regular',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  mrBertResultText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Fredoka-Bold',
    marginTop: 6,
  },
  mrBertInput: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#0D1A31',
    borderRadius: 12,
    padding: 18,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Fredoka-Regular',
  },
  mrBertMainBtn: {
    backgroundColor: '#FB8609',
    width: 206,
    height: 56,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  mrBertMainBtnText: {
    color: '#14243E',
    fontSize: 22,
    fontFamily: 'Fredoka-Bold',
  },
  mrBertRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 15,
  },
  mrBertIconBtn: {
    width: 56,
    height: 56,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FB8609',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MrBertQuickDecisions;
