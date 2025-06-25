import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import LoginButton from '../LoginButton'; // Adjust path if LoginButton.tsx is elsewhere
import { Stack } from 'expo-router';

// Example icons, you might use expo-vector-icons or similar
const MailIcon = () => <Text style={styles.iconText}>📧</Text>;
const ArrowIcon = () => <Text style={styles.iconText}>➡️</Text>;
const UpIcon = () => <Text style={styles.iconText}>⬆️</Text>;
const DownIcon = () => <Text style={styles.iconText}>⬇️</Text>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPrimaryDisabled, setIsPrimaryDisabled] = useState(false);

  const handlePrimaryLogin = () => {
    Alert.alert('Primary Login', 'Primary login button pressed!');
  };

  const handleStyledLogin = () => {
    setIsLoading(true);
    Alert.alert('Styled Login', 'This button shows loading state for 2s!');
    setTimeout(() => setIsLoading(false), 2000); // Simulate network request
  };

  const handleIconLogin = (position: string) => {
    Alert.alert('Icon Login', `Login with icon at '${position}' pressed`);
  };

  const togglePrimaryDisabled = () => setIsPrimaryDisabled(!isPrimaryDisabled);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Login Examples (All Positions)' }} />

        <LoginButton
          onPress={handlePrimaryLogin}
          title="Primary Action"
          disabled={isPrimaryDisabled}
          style={styles.buttonMargin}
        />

        <LoginButton
          onPress={handleStyledLogin}
          title={isLoading ? "Signing In..." : "Login with Loading"}
          loading={isLoading}
          style={[styles.buttonMargin, styles.customButton]}
          textStyle={styles.customButtonText}
        />

        <LoginButton
          onPress={() => handleIconLogin('left')}
          title="Icon Left"
          icon={<MailIcon />}
          iconPosition="left"
          style={styles.buttonMargin}
        />

        <LoginButton
          onPress={() => handleIconLogin('right')}
          title="Icon Right"
          icon={<ArrowIcon />}
          iconPosition="right"
          style={[styles.buttonMargin, {backgroundColor: '#28a745'}]}
        />

        <LoginButton
          onPress={() => handleIconLogin('top')}
          title="Icon Top"
          icon={<UpIcon />}
          iconPosition="top"
          style={[styles.buttonMargin, {backgroundColor: '#17a2b8'}]}
          textStyle={{marginTop: 4}} // Add a bit more space if needed for vertical
        />

        <LoginButton
          onPress={() => handleIconLogin('bottom')}
          title="Icon Bottom"
          icon={<DownIcon />}
          iconPosition="bottom"
          style={[styles.buttonMargin, {backgroundColor: '#fd7e14'}]}
          textStyle={{marginBottom: 4}} // Add a bit more space if needed for vertical
        />

        <LoginButton
          onPress={togglePrimaryDisabled}
          title={isPrimaryDisabled ? "Enable Primary Button" : "Disable Primary Button"}
          style={[styles.buttonMargin, { backgroundColor: '#6c757d'}]}
        />

        <LoginButton
          onPress={() => Alert.alert("Disabled by Prop", "This shouldn't happen")}
          title="Permanently Disabled"
          disabled={true}
          style={styles.buttonMargin}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 20, // Added padding for scroll view ends
    paddingHorizontal: 20,
  },
  buttonMargin: {
    marginBottom: 15,
    width: '85%', // Make buttons take more width for better demo
  },
  customButton: {
    backgroundColor: '#ffc107', // A yellow color
    borderColor: '#e0a800',
    borderWidth: 2,
  },
  customButtonText: {
    color: '#343a40', // Dark text for yellow button
    fontWeight: 'normal',
  },
  iconText: { // Basic style for text-based icons if needed
    fontSize: 18,
  }
});
