import { StyledNavigationView } from "@/app-screens/styles/home-tab";
import { StyledPageWrapper, StyledSafeAreaView } from "@/helpers/styles";
import { useAuth } from "@/services/context/auth";
import { useUser } from "@/services/context/user";
import Button from "@/ui/button";
import Text from "@/ui/text";
import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const { logoutUser } = useAuth();
  const { resetUser } = useUser();
  const router = useRouter();

  // console.log("[RefreshToken]:", getRefreshToken());

  const handleLogout = async () => {
    console.log("[Logout]:");
    await logoutUser();
    resetUser();
  };

  // const { data } = useGet(GET_TEST_LIST);

  // console.log("[Data]:", data);

  return (
    <StyledSafeAreaView>
      <StyledPageWrapper spacingHorizontal="md">
        {/* <TextInput
            borderVariant="whole"
            borderRadius={8}
            paddingHorizontal={8}
          />

          <Icon name="car" />
          <Card>
            <CText i18n="Hello" variant="h1.bold" />
          </Card>
          <Text style={[styles.title, { fontFamily: fontFamily.regular }]}>
            Home
          </Text>

          <Text style={styles.status}>
            Status: {hasUserLoggedIn ? "Logged In" : "Not Logged In"}
          </Text> */}
        <Button onPress={handleLogout}>Logout</Button>
        {/* <View style={styles.buttonContainer}>
            {!hasUserLoggedIn ? (
              <StyledButton onPress={() => setHasUserLoggedIn(true)}>
                <StyledButtonText>Login</StyledButtonText>
              </StyledButton>
            ) : (
              <StyledButton onPress={handleLogout}>
                <StyledButtonText>Logout</StyledButtonText>
              </StyledButton>
            )}
          </View> */}

        <StyledNavigationView>
          <Link
            href={{
              pathname: "/protected/edit-profile",
            }}
            style={styles.link}
          >
            <Text align="center">Edit Profile</Text>
          </Link>
          <Link
            href={{
              pathname: "/protected/profile-details",
              params: {
                id: 1,
              },
            }}
            style={styles.link}
          >
            <Text align="center">Profile Details</Text>
          </Link>
          {/* <Link href={{ pathname: "/screen1" }} style={styles.link}>
              <Text>Go to Screen 1</Text>
            </Link> */}
        </StyledNavigationView>
      </StyledPageWrapper>
    </StyledSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  status: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  link: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});
