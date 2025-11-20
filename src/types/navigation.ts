export type MainTabParamList = {
    Catalog: undefined;
    Profile: undefined;
};

export type MainStackParamList = {
    DetailScreen: undefined;
    SettingScreen: undefined;
    MainTab: MainTabParamList;  
};

export type MainDrawerParamList = {
    MainStack: MainStackParamList;  
};