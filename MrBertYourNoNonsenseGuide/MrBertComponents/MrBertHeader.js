import { StyleSheet, Text, View } from 'react-native';

const MrBertHeader = ({ headerTitle }) => {
  return (
    <View style={styles.mrBertWelcomeCont}>
      <View style={styles.mrBertHeaderCont}>
        <Text style={styles.mrBertHeaderText}>{headerTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mrBertWelcomeCont: {
    padding: 10,
    backgroundColor: '#203453',
    borderRadius: 22,
    width: '100%',
  },
  mrBertHeaderCont: {
    alignItems: 'center',
    gap: 12,
    padding: 13,
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#7696CA',
  },
  mrBertHeaderText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Fredoka-Bold',
    textAlign: 'center',
  },
});

export default MrBertHeader;
