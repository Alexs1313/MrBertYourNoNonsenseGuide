import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import MrBertStackNav from './MrBertYourNoNonsenseGuide/MrBertNavigation/MrBertStackNav';
import MrBertLoader from './MrBertYourNoNonsenseGuide/MrBertComponents/MrBertLoader';

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
