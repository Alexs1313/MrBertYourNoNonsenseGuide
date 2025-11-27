import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Platform,
} from 'react-native';
import MrBertLayout from '../MrBertComponents/MrBertLayout';
import MrBertHeader from '../MrBertComponents/MrBertHeader';
import { mrBertDailyCards } from '../MrBertData/mrBertDailyCards';

const { height } = Dimensions.get('window');

const MrBertDailyCards = () => {
  const [mrBertIndex, setMrBertIndex] = useState(0);

  const mrBertNextCard = () => {
    if (mrBertIndex < mrBertDailyCards.length - 1) {
      setMrBertIndex(mrBertIndex + 1);
    }
  };

  const mrBertPrevCard = () => {
    if (mrBertIndex > 0) {
      setMrBertIndex(mrBertIndex - 1);
    }
  };

  const mrBertShareCard = async () => {
    await Share.share({
      message: mrBertDailyCards[mrBertIndex],
    });
  };

  return (
    <MrBertLayout>
      <View style={mrBertStyles.mrBertWrap}>
        <MrBertHeader
          headerTitle={
            Platform.OS === 'ios' ? 'Daily Bert-Card' : 'Daily Goldbert-Card'
          }
        />

        <View style={mrBertStyles.mrBertCard}>
          <View style={mrBertStyles.mrBertCardInner}>
            <Text style={mrBertStyles.mrBertCardText}>
              {mrBertDailyCards[mrBertIndex]}
            </Text>
          </View>
        </View>

        <View style={mrBertStyles.mrBertRow}>
          <TouchableOpacity
            style={mrBertStyles.mrBertNavBtn}
            onPress={mrBertPrevCard}
            disabled={mrBertIndex === 0}
          >
            <Text style={mrBertStyles.mrBertNavBtnText}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={mrBertStyles.mrBertIconBtn}
            onPress={mrBertShareCard}
          >
            <Image
              source={require('../../assets/images/mrbertshare.png')}
              style={{ width: 26, height: 26 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={mrBertStyles.mrBertNavBtn}
            onPress={mrBertNextCard}
            disabled={mrBertIndex === mrBertDailyCards.length - 1}
          >
            <Text style={mrBertStyles.mrBertNavBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
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
  mrBertCard: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
    marginTop: 52,
  },
  mrBertCardInner: {
    padding: 22,
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
    minHeight: 210,
  },
  mrBertCardText: {
    color: '#FFFFFF',
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'Fredoka-Bold',
    lineHeight: 25,
  },
  mrBertRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 22,
    flexWrap: 'wrap',
  },
  mrBertNavBtn: {
    backgroundColor: '#FB8609',
    width: 114,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  mrBertNavBtnText: {
    color: '#14243E',
    fontSize: 22,
    fontFamily: 'Fredoka-Bold',
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

export default MrBertDailyCards;
