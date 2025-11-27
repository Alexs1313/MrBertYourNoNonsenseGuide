import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MrBertLayout from '../MrBertComponents/MrBertLayout';
import MrBertHeader from '../MrBertComponents/MrBertHeader';
import { mrBertQuotes } from '../MrBertData/mrBertQuotes';
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
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const MRBERT_STORAGE_KEY = 'mrbert_bookmarks';

const MrBertMoodBoost = () => {
  const [mrBertMode, setMrBertMode] = useState('start');
  const [mrBertCurrentQuote, setMrBertCurrentQuote] = useState('');
  const [mrBertBookmarks, setMrBertBookmarks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      mrBertLoadBookmarks();
    }, []),
  );

  const mrBertLoadBookmarks = async () => {
    const saved = await AsyncStorage.getItem(MRBERT_STORAGE_KEY);
    if (saved) setMrBertBookmarks(JSON.parse(saved));
  };

  const mrBertGenerateQuote = () => {
    const random =
      mrBertQuotes[Math.floor(Math.random() * mrBertQuotes.length)];
    setMrBertCurrentQuote(random);
  };

  const mrBertStartBoost = () => {
    mrBertGenerateQuote();
    setMrBertMode('quote');
  };

  const mrBertBackToStart = () => {
    setMrBertMode('start');
  };

  const mrBertIsBookmarked = mrBertBookmarks.some(
    b => b.text === mrBertCurrentQuote,
  );

  const mrBertToggleBookmark = async () => {
    if (mrBertIsBookmarked) {
      const updated = mrBertBookmarks.filter(
        b => b.text !== mrBertCurrentQuote,
      );
      setMrBertBookmarks(updated);
      await AsyncStorage.setItem(MRBERT_STORAGE_KEY, JSON.stringify(updated));
      return;
    }

    const now = new Date();
    const date =
      now.getDate().toString().padStart(2, '0') +
      '.' +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      '.' +
      now.getFullYear();

    const newItem = {
      text: mrBertCurrentQuote,
      date,
    };

    const updated = [...mrBertBookmarks, newItem];
    setMrBertBookmarks(updated);
    await AsyncStorage.setItem(MRBERT_STORAGE_KEY, JSON.stringify(updated));
  };

  const mrBertShareQuote = async () => {
    await Share.share({
      message: mrBertCurrentQuote,
    });
  };

  return (
    <MrBertLayout>
      <View style={mrBertStyles.mrBertWrap}>
        <MrBertHeader headerTitle="Get Your Mood Boost" />

        <Image
          source={require('../../assets/images/mrbertmoddimg.png')}
          style={[
            { top: 25 },
            mrBertMode === 'quote' && { height: 300, width: 300 },
          ]}
        />

        {mrBertMode === 'start' && (
          <>
            <View style={mrBertStyles.mrBertBox}>
              <View style={mrBertStyles.mrBertBoxInner}>
                <Text style={mrBertStyles.mrBertTitle}>Boost Your Mood</Text>
                <Text style={mrBertStyles.mrBertDescription}>
                  Sharp daily encouragement straight from Mr Bert.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[mrBertStyles.mrBertMainBtn, { marginTop: 13 }]}
              onPress={mrBertStartBoost}
            >
              <Text style={mrBertStyles.mrBertMainBtnText}>Boost my mood</Text>
            </TouchableOpacity>
          </>
        )}

        {mrBertMode === 'quote' && (
          <>
            <View style={mrBertStyles.mrBertBox}>
              <View style={mrBertStyles.mrBertBoxInner}>
                <Text style={mrBertStyles.mrBertTitle}>
                  {Platform.OS === 'ios'
                    ? 'Mr Bert`s Advice:'
                    : 'Mr Goldbert`s Advice:'}
                </Text>
                <Text style={mrBertStyles.mrBertDescription}>
                  {mrBertCurrentQuote}
                </Text>
              </View>
            </View>

            <View style={mrBertStyles.mrBertRow}>
              <TouchableOpacity
                style={[
                  mrBertStyles.mrBertIconBtn,
                  {
                    backgroundColor: mrBertIsBookmarked ? '#FB8609' : '#14243E',
                  },
                ]}
                onPress={mrBertToggleBookmark}
              >
                <Image
                  source={require('../../assets/images/mrbertbook.png')}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={mrBertStyles.mrBertMainBtn}
                onPress={mrBertBackToStart}
              >
                <Text style={mrBertStyles.mrBertMainBtnText}>Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={mrBertStyles.mrBertIconBtn}
                onPress={mrBertShareQuote}
              >
                <Image
                  source={require('../../assets/images/mrbertshare.png')}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>
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
  },
  mrBertBoxInner: {
    alignItems: 'center',
    gap: 12,
    padding: 18,
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
  },
  mrBertTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Fredoka-Bold',
    marginBottom: 10,
  },
  mrBertDescription: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Fredoka-Regular',
    paddingHorizontal: 20,
    lineHeight: 26,
  },
  mrBertMainBtn: {
    backgroundColor: '#FB8609',
    width: 206,
    height: 56,
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
    gap: 14,
    marginTop: 18,
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

export default MrBertMoodBoost;
