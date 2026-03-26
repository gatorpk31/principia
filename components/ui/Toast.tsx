import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast(): ToastContextType {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const showToast = useCallback((msg: string) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    setMessage(msg);
    setVisible(true);

    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();

    hideTimer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 400, useNativeDriver: true }),
      ]).start(() => setVisible(false));
    }, 3000);
  }, [opacity, translateY]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const toastStyle: Animated.WithAnimatedObject<ViewStyle> = {
    ...styles.toast,
    top: insets.top + spacing.sm,
    opacity,
    transform: [{ translateY }],
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View style={toastStyle} pointerEvents="none">
          <Text style={styles.text}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.surface3,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    zIndex: 9999,
    alignItems: 'center',
  },
  text: {
    fontFamily: typography.body,
    fontSize: fontSizes.sm,
    color: colors.text2,
    textAlign: 'center',
  },
});
