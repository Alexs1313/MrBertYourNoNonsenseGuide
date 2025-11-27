import React, { useState, useCallback } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MrBertLayout from '../MrBertComponents/MrBertLayout';
import MrBertHeader from '../MrBertComponents/MrBertHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const MRBERT_STORAGE_KEY = 'mrbert_bookmarks';

const MrBertBookmarks = () => {
  const [mrBertBookmarks, setMrBertBookmarks] = useState([]);
  const mrBertNavigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      mrBertLoadBookmarks();
    }, []),
  );

  const mrBertLoadBookmarks = async () => {
    const saved = await AsyncStorage.getItem(MRBERT_STORAGE_KEY);
    if (saved) setMrBertBookmarks(JSON.parse(saved));
  };

  const mrBertDeleteBookmark = async quoteText => {
    const updated = mrBertBookmarks.filter(b => b.text !== quoteText);
    setMrBertBookmarks(updated);
    await AsyncStorage.setItem(MRBERT_STORAGE_KEY, JSON.stringify(updated));
  };

  const mrBertShareQuote = async quote => {
    await Share.share({
      message: quote.text,
    });
  };

  return (
    <MrBertLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <View style={mrBertStyles.mrBertWrap}>
          <MrBertHeader headerTitle="Bookmarked Mood" />

          {mrBertBookmarks.length === 0 && (
            <>
              <Image
                source={require('../../assets/images/mrbertbokkmarkscr.png')}
                style={{ top: 40 }}
              />

              <View style={mrBertStyles.mrBertEmptyBox}>
                <Text style={mrBertStyles.mrBertEmptyText}>
                  Youre did not bookmarked any advice
                </Text>
              </View>

              <TouchableOpacity
                style={mrBertStyles.mrBertExploreBtn}
                onPress={() =>
                  mrBertNavigation.navigate('MrBertBottomTabs', {
                    screen: 'MrBertMoodBoost',
                  })
                }
              >
                <Text style={mrBertStyles.mrBertExploreText}>Explore</Text>
              </TouchableOpacity>
            </>
          )}

          {mrBertBookmarks.length > 0 && <View style={{ height: 20 }} />}

          {mrBertBookmarks.length > 0 &&
            mrBertBookmarks.map((item, index) => (
              <View key={index} style={mrBertStyles.mrBertQuoteCard}>
                <View style={mrBertStyles.mrBertQuoteInner}>
                  <Text style={mrBertStyles.mrBertQuoteDate}>{item.date}</Text>
                  <Text style={mrBertStyles.mrBertQuoteText}>{item.text}</Text>

                  <View style={mrBertStyles.mrBertRow}>
                    <TouchableOpacity
                      style={mrBertStyles.mrBertIconBtnOrange}
                      onPress={() => mrBertDeleteBookmark(item.text)}
                    >
                      <Image
                        source={require('../../assets/images/mrbertbook.png')}
                        style={{ width: 26, height: 26 }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={mrBertStyles.mrBertIconBtnGray}
                      onPress={() => mrBertShareQuote(item)}
                    >
                      <Image
                        source={require('../../assets/images/mrbertshare.png')}
                        style={{ width: 26, height: 26 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </MrBertLayout>
  );
};

const mrBertStyles = StyleSheet.create({
  mrBertWrap: {
    flex: 1,
    alignItems: 'center',
    padding: 28,
    paddingTop: height * 0.073,
  },

  mrBertEmptyBox: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
    marginTop: 10,
  },
  mrBertEmptyText: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    padding: 18,
    fontFamily: 'Fredoka-Bold',
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
  },
  mrBertExploreBtn: {
    marginTop: 18,
    backgroundColor: '#FB8609',
    width: 206,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  mrBertExploreText: {
    color: '#14243E',
    fontSize: 22,
    fontFamily: 'Fredoka-Bold',
  },

  mrBertQuoteCard: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
    marginBottom: 10,
    marginTop: 5,
  },
  mrBertQuoteInner: {
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
    padding: 18,
    alignItems: 'center',
    gap: 10,
  },
  mrBertQuoteDate: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Fredoka-Bold',
  },
  mrBertQuoteText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Fredoka-Regular',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  mrBertRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  mrBertIconBtnOrange: {
    width: 56,
    height: 56,
    borderRadius: 22,
    backgroundColor: '#FB8609',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mrBertIconBtnGray: {
    width: 56,
    height: 56,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FB8609',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MrBertBookmarks;
