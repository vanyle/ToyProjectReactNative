import React from "react";
import {
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View
} from "react-native";

import {
  Colors,
} from "react-native/Libraries/NewAppScreen";

import { TabView, SceneMap, TabBar, TabBarProps, Route } from 'react-native-tab-view';
import { MainTab, RandomTab, FavoriteTab } from "./Tabs";
import { GlobalContext, defaultValue } from "./favoriteState";

const renderScene = SceneMap({
  recipe: MainTab,
  random: RandomTab,
  favorite: FavoriteTab
});


function renderTabBar<T extends Route>(props: TabBarProps<T>){
  return (<TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#333' }}
    style={{ backgroundColor: '#0a0' }}
  />);
}

function App(){
  const layout = useWindowDimensions();
  const isDarkMode = useColorScheme() === "dark";
    
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipe', title: 'Recipes' },
    { key: 'favorite', title: 'Favorites' },
    { key: 'random', title: 'Random' },
  ]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [favoriteIds, setFavoriteIds] = React.useState<number[]>([11007]);

  return (
    <View style={{
      width: layout.width,
      height: layout.height
    }}>
      <GlobalContext.Provider value={{
        addFavorite: (id) => {
          if(favoriteIds.indexOf(id) === -1){
            setFavoriteIds([...favoriteIds, id]);
          }
        },
        removeFavorite: (id) => {
          setFavoriteIds(favoriteIds.filter((i) => i != id));
        },
        favoriteIds
      }}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}

          style={{
            marginTop: 45 /* Hardcoded value, this is problematic */
          }}
        />
      </GlobalContext.Provider>
      </View>
  );
}

export default App;
