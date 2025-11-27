import MrBertStackNav from './MrBertYourGuideSrc/MrBertNavigation/MrBertStackNav';
import MrBertLoader from './MrBertYourGuideSrc/MrBertComponents/MrBertLoader';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const App = () => {
  const [isVisibleStack, setIsVisibleStack] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleStack(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      {isVisibleStack ? <MrBertStackNav /> : <MrBertLoader />}
    </NavigationContainer>
  );
};

export default App;
