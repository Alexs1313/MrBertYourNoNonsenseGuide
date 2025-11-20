import { ScrollView, View } from 'react-native';

const MrBertLayout = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D1A31' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default MrBertLayout;
