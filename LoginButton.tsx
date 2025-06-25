import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
  View,
} from 'react-native';

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
  View,
} from 'react-native';

interface LoginButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom'; // Updated here
  activeOpacity?: number;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left', // Updated default here
  activeOpacity = 0.7,
}) => {
  const isDisabled = disabled || loading;
  const isVerticalLayout = iconPosition === 'top' || iconPosition === 'bottom';

  const iconContent = loading ? (
    <ActivityIndicator
      size="small"
      color={StyleSheet.flatten([styles.text, textStyle]).color || '#ffffff'}
      style={isVerticalLayout ? styles.iconSpacingVertical : styles.iconSpacingHorizontal}
    />
  ) : icon ? (
    <View style={isVerticalLayout ? styles.iconSpacingVertical : styles.iconSpacingHorizontal}>
      {icon}
    </View>
  ) : null;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isVerticalLayout && styles.buttonVerticalLayout,
        isDisabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={activeOpacity}
    >
      <View style={[
        styles.contentContainer,
        isVerticalLayout ? styles.contentContainerVertical : styles.contentContainerHorizontal
      ]}>
        {(iconPosition === 'left' || iconPosition === 'top') && iconContent}
        {!loading && <Text style={[styles.text, textStyle, isDisabled && styles.disabledText]}>{title}</Text>}
        {(iconPosition === 'right' || iconPosition === 'bottom') && iconContent}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center', // Center content for both row/column
    justifyContent: 'center', // Center content for both row/column
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // flexDirection will be managed by contentContainer or specific button style
  },
  buttonVerticalLayout: {
    // Potentially add specific styles if button itself needs to change for vertical
    // e.g. if padding needs to be different by default
  },
  disabledButton: {
    backgroundColor: '#a0c7e4',
    elevation: 0,
    shadowOpacity: 0,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerHorizontal: {
    flexDirection: 'row',
  },
  contentContainerVertical: {
    flexDirection: 'column',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#c0c0c0',
  },
  iconSpacingHorizontal: {
    marginHorizontal: 8, // Applied to both left/right for simplicity here
                           // Or could be iconSpacingLeft, iconSpacingRight
  },
  iconSpacingVertical: {
    marginVertical: 4, // Smaller vertical spacing
  },
});

export default LoginButton;
