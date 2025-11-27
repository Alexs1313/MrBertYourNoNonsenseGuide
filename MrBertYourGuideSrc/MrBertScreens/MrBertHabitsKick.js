import React, { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MrBertLayout from '../MrBertComponents/MrBertLayout';
import MrBertHeader from '../MrBertComponents/MrBertHeader';
import { useFocusEffect } from '@react-navigation/native';
import { mrBertHabitsKick } from '../MrBertData/mrBertHabitsKick';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';

const { height } = Dimensions.get('window');

const MRBERT_STORAGE_TASK = 'mrbert_habits_task';
const MRBERT_STORAGE_DATE = 'mrbert_habits_last_done';

const MrBertHabitsKick = () => {
  const [mrBertTask, setMrBertTask] = useState(null);
  const [mrBertMode, setMrBertMode] = useState('ready');
  const [mrBertTimer, setMrBertTimer] = useState(300);
  const mrBertIntervalRef = useRef(null);
  const [mrBertRemain, setMrBertRemain] = useState('24:00');

  useEffect(() => {
    const mrBertUpdateRemain = async () => {
      const text = await mrBertGetRemainingTimeText();
      setMrBertRemain(text);
    };

    mrBertUpdateRemain();
    const interval = setInterval(mrBertUpdateRemain, 60000);

    return () => clearInterval(interval);
  }, [mrBertMode]);

  useFocusEffect(
    useCallback(() => {
      mrBertInitTask();
    }, []),
  );

  const mrBertInitTask = async () => {
    const lastDone = await AsyncStorage.getItem(MRBERT_STORAGE_DATE);
    if (lastDone) {
      const lastTime = Number(lastDone);
      const now = Date.now();
      const diff = now - lastTime;

      if (diff < 86400000) {
        setMrBertMode('done');
        return;
      }
    }

    const savedTask = await AsyncStorage.getItem(MRBERT_STORAGE_TASK);

    if (savedTask) {
      setMrBertTask(JSON.parse(savedTask));
    } else {
      const shuffled = [...mrBertHabitsKick].sort(() => Math.random() - 0.5);
      const firstTask = shuffled[0];
      setMrBertTask(firstTask);
      await AsyncStorage.setItem(
        MRBERT_STORAGE_TASK,
        JSON.stringify(firstTask),
      );
    }
  };

  const mrBertStartTask = () => {
    setMrBertMode('running');
    setMrBertTimer(300);

    mrBertIntervalRef.current = setInterval(() => {
      setMrBertTimer(prev => {
        if (prev <= 1) {
          clearInterval(mrBertIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const mrBertRestartTimer = () => {
    setMrBertTimer(300);
  };

  const mrBertFinishTask = async () => {
    clearInterval(mrBertIntervalRef.current);
    const now = Date.now();
    await AsyncStorage.setItem(MRBERT_STORAGE_DATE, now.toString());
    setMrBertMode('done');
  };

  const mrBertShareTask = () => {
    if (!mrBertTask) return;
    Share.share({
      message: `${mrBertTask.title}\n${mrBertTask.subtitle}`,
    });
  };

  const mrBertGetRemainingTimeText = async () => {
    const lastDone = await AsyncStorage.getItem(MRBERT_STORAGE_DATE);
    if (!lastDone) return '24:00';

    const lastTime = Number(lastDone);
    const now = Date.now();
    const diff = 86400000 - (now - lastTime);

    if (diff <= 0) return '00:00';

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <MrBertLayout>
      <View style={mrBertStyles.mrBertWrap}>
        <MrBertHeader headerTitle="Habits Kick:" />

        <Image
          source={require('../../assets/images/mrbertbokkmarkscr.png')}
          style={{ top: 40 }}
        />

        {mrBertMode === 'done' && (
          <View style={mrBertStyles.mrBertBox}>
            <View style={mrBertStyles.mrBertBoxInner}>
              <Text style={mrBertStyles.mrBertTitle}>Good Job!</Text>
              <Text style={mrBertStyles.mrBertSmallText}>
                Bring back tomorrow!
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  gap: 8,
                }}
              >
                <Image
                  source={require('../../assets/images/mrberttimer.png')}
                />
                <Text style={mrBertStyles.mrBertClockText}>{mrBertRemain}</Text>
              </View>
            </View>
          </View>
        )}

        {mrBertMode === 'ready' && mrBertTask && (
          <>
            <View style={mrBertStyles.mrBertBox}>
              <View style={mrBertStyles.mrBertBoxInner}>
                <Text style={mrBertStyles.mrBertTitle}>{mrBertTask.title}</Text>
                <Text style={mrBertStyles.mrBertSubtitle}>
                  {mrBertTask.subtitle}
                </Text>
              </View>
            </View>

            <View style={mrBertStyles.mrBertRow}>
              <TouchableOpacity
                style={mrBertStyles.mrBertIconBtn}
                onPress={mrBertRestartTimer}
              >
                <Image
                  source={require('../../assets/images/mrbertrefresh.png')}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={mrBertStyles.mrBertMainBtn}
                onPress={mrBertStartTask}
              >
                <Text style={mrBertStyles.mrBertMainBtnText}>Start Task</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={mrBertStyles.mrBertIconBtn}
                onPress={mrBertShareTask}
              >
                <Image
                  source={require('../../assets/images/mrbertshare.png')}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>
            </View>
          </>
        )}

        {mrBertMode === 'running' && mrBertTask && (
          <>
            <View style={mrBertStyles.mrBertBox}>
              <View style={mrBertStyles.mrBertBoxInner}>
                <Text style={mrBertStyles.mrBertTitle}>{mrBertTask.title}</Text>
                <Text style={mrBertStyles.mrBertSubtitle}>
                  {mrBertTask.subtitle}
                </Text>
              </View>
            </View>

            <View style={mrBertStyles.mrBertRow}>
              <TouchableOpacity
                style={mrBertStyles.mrBertIconBtn}
                onPress={mrBertRestartTimer}
              >
                <Image
                  source={require('../../assets/images/mrbertrefresh.png')}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  mrBertStyles.mrBertMainBtn,
                  mrBertTimer === 0 && { backgroundColor: '#FB8609' },
                ]}
                onPress={mrBertTimer === 0 ? mrBertFinishTask : null}
              >
                <Text style={mrBertStyles.mrBertMainBtnText}>
                  {mrBertTimer === 0
                    ? 'Finish'
                    : `${Math.floor(mrBertTimer / 60)}:${(mrBertTimer % 60)
                        .toString()
                        .padStart(2, '0')}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={mrBertStyles.mrBertIconBtn}
                onPress={mrBertShareTask}
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
    paddingTop: height * 0.07,
    paddingBottom: 130,
  },
  mrBertBox: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
    marginTop: 10,
  },
  mrBertBoxInner: {
    padding: 20,
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
    alignItems: 'center',
    gap: 10,
  },
  mrBertTitle: {
    fontFamily: 'Fredoka-Bold',
    color: '#FFFFFF',
    fontSize: 26,
    textAlign: 'center',
  },
  mrBertSubtitle: {
    fontFamily: 'Fredoka-Regular',
    color: '#FFFFFF',
    fontSize: 17,
    textAlign: 'center',
  },
  mrBertSmallText: {
    fontFamily: 'Fredoka-Regular',
    color: '#FFFFFF',
    fontSize: 20,
  },
  mrBertClockText: {
    fontFamily: 'Fredoka-Regular',
    color: '#FFF',
    fontSize: 20,
  },
  mrBertRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
  },
  mrBertMainBtn: {
    backgroundColor: '#FB8609',
    width: 180,
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

export default MrBertHabitsKick;
