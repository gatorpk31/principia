import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, typography, fontSizes, spacing, radius } from '../../constants/theme';
import { Button } from '../ui/Button';
import type { PracticeQuestion, Concept } from '../../types';

interface PracticeTabProps {
  concept: Concept;
  accentColor: string;
  onComplete: (score: number) => void;
  onSeeConnections: () => void;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function PracticeTab({
  concept,
  accentColor,
  onComplete,
  onSeeConnections,
}: PracticeTabProps) {
  const { practice, accessibilityLevel } = concept;
  const isElementary = accessibilityLevel === 'elementary' || accessibilityLevel === 'middle';
  const minChoiceHeight = isElementary ? 56 : 48;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const question = practice[currentIndex];

  // Answer checking uses answerIndex — NEVER string comparison on choice values
  const checkAnswer = (choiceIndex: number) => {
    if (answerState !== 'unanswered') return;
    setSelectedIndex(choiceIndex);
    const isCorrect = choiceIndex === question.answerIndex;
    setAnswerState(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= practice.length) {
      const finalScore = score + (answerState === 'correct' ? 0 : 0); // already counted
      onComplete(score);
      setAllDone(true);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
      setAnswerState('unanswered');
    }
  };

  if (allDone) {
    return (
      <View style={styles.doneContainer}>
        <Text style={[styles.doneScore, { color: accentColor }]}>
          {score}/{practice.length}
        </Text>
        <Text style={styles.doneLabel}>Practice complete</Text>
        <Text style={styles.doneSubtext}>
          {score === practice.length
            ? 'Perfect! You nailed it.'
            : score >= Math.ceil(practice.length / 2)
            ? 'Good work. Review any missed steps in Guided.'
            : 'Try re-reading the Concept tab and come back.'}
        </Text>
        <Button
          label="See Connections →"
          onPress={onSeeConnections}
          fullWidth
          style={styles.connectionsBtn}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Progress indicator */}
      <View style={styles.progressRow}>
        {practice.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressPip,
              i < currentIndex
                ? { backgroundColor: accentColor }
                : i === currentIndex
                ? { backgroundColor: accentColor + '88', width: 24 }
                : { backgroundColor: colors.border2 },
            ]}
          />
        ))}
      </View>

      {/* Question */}
      <View style={styles.questionCard}>
        <Text style={styles.questionCounter}>
          Question {currentIndex + 1} of {practice.length}
        </Text>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.mathNotation && (
          <View style={[styles.mathBox, { borderColor: accentColor + '33', backgroundColor: accentColor + '0a' }]}>
            <Text style={[styles.mathText, { color: accentColor }]}>
              {question.mathNotation}
            </Text>
          </View>
        )}
      </View>

      {/* Choices */}
      <View style={styles.choices}>
        {question.choices.map((choice, i) => {
          const isCorrectAnswer = i === question.answerIndex;
          const isWrongSelected = i === selectedIndex && answerState === 'incorrect';
          const isCurrentSelected = i === selectedIndex && answerState === 'unanswered';
          const revealed = answerState !== 'unanswered';

          const borderColor = revealed
            ? isCorrectAnswer
              ? colors.green
              : isWrongSelected
              ? colors.rose
              : colors.border2
            : isCurrentSelected
            ? colors.blue
            : colors.border2;

          const bgColor = revealed
            ? isCorrectAnswer
              ? colors.greenDim
              : isWrongSelected
              ? colors.roseDim
              : colors.surface
            : isCurrentSelected
            ? colors.blueDim
            : colors.surface;

          const labelColor = revealed
            ? isCorrectAnswer
              ? colors.green
              : isWrongSelected
              ? colors.rose
              : colors.text
            : colors.text;

          return (
            <TouchableOpacity
              key={i}
              onPress={() => checkAnswer(i)}
              disabled={answerState !== 'unanswered'}
              style={[styles.choiceBase, { borderColor, backgroundColor: bgColor, minHeight: minChoiceHeight }]}
              activeOpacity={0.8}
            >
              <View style={styles.choiceLetter}>
                <Text style={[styles.choiceLetterText, { color: labelColor }]}>
                  {String.fromCharCode(65 + i)}
                </Text>
              </View>
              <Text style={[styles.choiceText, { color: labelColor }]}>{choice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback */}
      {answerState !== 'unanswered' && (
        <View
          style={[
            styles.feedback,
            answerState === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect,
          ]}
        >
          <Text
            style={[
              styles.feedbackTitle,
              { color: answerState === 'correct' ? colors.green : colors.rose },
            ]}
          >
            {answerState === 'correct' ? '✓ Correct' : '✗ Not quite'}
          </Text>
          <Text style={styles.feedbackExplanation}>{question.explanation}</Text>
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.nextButton, { backgroundColor: accentColor }]}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 < practice.length ? 'Next Question' : 'See Results'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    padding: spacing.lg,
    gap: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 4,
  },
  progressPip: {
    height: 3,
    width: 16,
    borderRadius: radius.full,
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  questionCounter: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    color: colors.text3,
    letterSpacing: 0.5,
  },
  questionText: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.md,
    color: colors.text,
    lineHeight: 26,
  },
  mathBox: {
    borderRadius: radius.sm,
    borderWidth: 1,
    padding: spacing.sm,
    alignItems: 'center',
  },
  mathText: {
    fontFamily: typography.monoBold,
    fontSize: fontSizes.md,
  },
  choices: {
    gap: spacing.sm,
  },
  choiceBase: {
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  choiceDefault: {
    borderColor: colors.border2,
    backgroundColor: colors.surface,
  },
  choiceSelected: {
    borderColor: colors.blue,
    backgroundColor: colors.blueDim,
  },
  choiceCorrect: {
    borderColor: colors.green,
    backgroundColor: colors.greenDim,
  },
  choiceIncorrect: {
    borderColor: colors.rose,
    backgroundColor: colors.roseDim,
  },
  choiceLetter: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceLetterText: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
  },
  choiceText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    flex: 1,
    lineHeight: 22,
  },
  feedback: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.base,
    gap: spacing.sm,
  },
  feedbackCorrect: {
    borderColor: colors.green + '55',
    backgroundColor: colors.greenDim,
  },
  feedbackIncorrect: {
    borderColor: colors.rose + '55',
    backgroundColor: colors.roseDim,
  },
  feedbackTitle: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
  },
  feedbackExplanation: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text,
    lineHeight: 24,
  },
  nextButton: {
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  nextButtonText: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.bg,
  },
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  doneScore: {
    fontFamily: typography.serif,
    fontSize: 64,
  },
  doneLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  doneSubtext: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    textAlign: 'center',
    lineHeight: 24,
  },
  connectionsBtn: {
    marginTop: spacing.md,
  },
});
