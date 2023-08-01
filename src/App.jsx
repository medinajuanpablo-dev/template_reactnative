import { createNativeStackNavigator } from "@react-navigation/native-stack";

import screens from "./screens";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="home">
      {screens.map(({ name, Component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={Component}
          options={{ animation: "slide_from_right", headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default App;
