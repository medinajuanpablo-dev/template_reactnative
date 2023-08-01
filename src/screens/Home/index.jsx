import { Text, Box, Button } from "native-base";

function Home({ navigation }) {
  return (
    <Box flexDirection="row" justifyContent="center">
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("login")}>Login</Button>
    </Box>
  );
}

export default Home;
