import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, typography, fontSizes, spacing, radius, tierColor } from '../constants/theme';
import { Button } from '../components/ui/Button';
import { useProgress } from '../hooks/useProgress';
import { useSubscription } from '../hooks/useSubscription';
import {
  loadReviewMap,
  recordAnswer,
  buildSession,
  type ReviewMap,
  type ReviewItem,
} from '../services/review';

export { ErrorBoundary } from 'expo-router';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function Review() {
  const router = useRouter();
  const { progress, isLoading: progressLoading } = useProgress();
  const { isPremium, isLoading: subLoading } = useSubscription();

  const [reviewMap, setReviewMap] = useState<ReviewMap | null>(null);
  const [session, setSession] = useState<ReviewItem[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<ReviewItem[]>([]);
  const [allDone, setAllDone] = useState(false);

  // Build the session once progress + subscription state are ready
  useEffect(() => {
    if (subLoading || progressLoading || session) return;
    (async () => {
      const map = await loadReviewMap();
      setReviewMap(map);
      setSession(buildSession(map, progress, isPremium));
    })();
  }, [subLoading, progressLoading, isPremium, progress, session]);

  const item = session?.[currentIndex];

  const checkAnswer = useCallback(
    async (choiceIndex: number) => {
      if (!item || !reviewMap || answerState !== 'unanswered') return;
      setSelectedIndex(choiceIndex);
      const isCorrect = choiceIndex === item.question.answerIndex;
      setAnswerState(isCorrect ? 'correct' : 'incorrect');
      Haptics.notificationAsync(
        isCorrect
          ? Haptics.NotificationFeedbackType.Success
          : Haptics.NotificationFeedbackType.Error,
      );
      if (isCorrect) {
        setScore((s) => s + 1);
      } else {
        setMissed((m) => [...m, item]);
      }
      const next = await recordAnswer(
        reviewMap,
        item.concept.id,
        item.questionIndex,
        isCorrect,
      );
      setReviewMap(next);
    },
    [item, reviewMap, answerState],
  );

  const handleNext = () => {
    if (!session) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= session.length) {
      setAllDone(true);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
      setAnswerState('unanswered');
    }
  };

  const retryMissed = () => {
    setSession(missed);
    setMissed([]);
    setScore(0);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswerState('unanswered');
    setAllDone(false);
  };

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator color={colors.gold} />
        </View>
      </SafeAreaView>
    );
  }

  if (session.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Nothing to review yet</Text>
          <Text style={styles.emptyText}>
            Explore a few concepts and answer their practice questions —
            Mixed Review will bring back what you need to see again, right
            when you need to see it.
          </Text>
          <Button label="Back" onPress={() => router.back()} style={styles.doneBtn} />
        </View>
      </SafeAreaView>
    );
  }

  if (allDone) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={[styles.doneScore, { color: colors.gold }]}>
            {score}/{session.length}
          </Text>
          <Text style={styles.doneLabel}>Review complete</Text>
          <Text style={styles.emptyText}>
            {missed.length === 0
              ? 'Everything answered correctly — these questions will return on a longer interval.'
              : `${missed.length} question${missed.length === 1 ? '' : 's'} to look at again. Missed questions come back sooner.`}
          </Text>
          {missed.length > 0 && (
            <Button label="Retry Missed Questions" onPress={retryMissed} fullWidth style={styles.doneBtn} />
          )}
          <Button label="Done" onPress={() => router.back()} fullWidth style={styles.doneBtn} />
        </View>
      </SafeAreaView>
    );
  }

  const question = item!.question;
  const accent = tierColor(item!.concept.tierId);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Mixed Review</Text>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressRow}>
          {session.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressPip,
                i < currentIndex
                  ? { backgroundColor: accent }
                  : i === currentIndex
                  ? { backgroundColor: accent + '88', width: 24 }
                  : { backgroundColor: colors.border2 },
              ]}
            />
          ))}
        </View>

        {/* Question — with its source concept so review reinforces context */}
        <View style={styles.questionCard}>
          <Text style={[styles.sourceLabel, { color: accent }]}>
            {item!.concept.title} · Tier {item!.concept.tierId}
          </Text>
          <Text style={styles.questionCounter}>
            Question {currentIndex + 1} of {session.length}
          </Text>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.mathNotation ? (
            <View
              style={[
                styles.mathBox,
                { borderColor: accent + '33', backgroundColor: accent + '0a' },
              ]}
            >
              <Text style={[styles.mathText, { color: accent }]}>
                {question.mathNotation}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Choices */}
        <View style={styles.choices}>
          {question.choices.map((choice, i) => {
            const isCorrectAnswer = i === question.answerIndex;
            const isWrongSelected = i === selectedIndex && answerState === 'incorrect';
            const revealed = answerState !== 'unanswered';

            const borderColor = revealed
              ? isCorrectAnswer
                ? colors.green
                : isWrongSelected
                ? colors.rose
                : colors.border2
              : colors.border2;
            const bgColor = revealed
              ? isCorrectAnswer
                ? colors.greenDim
                : isWrongSelected
                ? colors.roseDim
                : colors.surface
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
                style={[styles.choiceBase, { borderColor, backgroundColor: bgColor }]}
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
              style={[styles.nextButton, { backgroundColor: accent }]}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 < session.length ? 'Next Question' : 'Finish Review'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  container: {
    padding: spacing.lg,
    gap: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  closeText: {
    fontFamily: typography.body,
    fontSize: fontSizes.lg,
    color: colors.text3,
  },
  progressRow: { flexDirection: 'row', gap: 4 },
  progressPip: { height: 3, width: 16, borderRadius: radius.full },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  sourceLabel: {
    fontFamily: typography.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 0.5,
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
  mathText: { fontFamily: typography.monoBold, fontSize: fontSizes.md },
  choices: { gap: spacing.sm },
  choiceBase: {
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 48,
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
  choiceLetterText: { fontFamily: typography.mono, fontSize: fontSizes.xs },
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
  feedbackTitle: { fontFamily: typography.bodyMedium, fontSize: fontSizes.base },
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
  doneScore: { fontFamily: typography.serif, fontSize: 64 },
  doneLabel: {
    fontFamily: typography.bodyMedium,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  emptyTitle: {
    fontFamily: typography.serif,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  emptyText: {
    fontFamily: typography.body,
    fontSize: fontSizes.base,
    color: colors.text2,
    textAlign: 'center',
    lineHeight: 24,
  },
  doneBtn: { marginTop: spacing.sm },
});
