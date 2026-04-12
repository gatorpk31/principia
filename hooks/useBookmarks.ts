import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/config';

export interface BookmarksHook {
  bookmarks: string[];
  isBookmarked: (conceptId: string) => boolean;
  toggleBookmark: (conceptId: string) => Promise<void>;
}

export function useBookmarks(): BookmarksHook {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.bookmarks).then((raw) => {
      if (raw) {
        try {
          setBookmarks(JSON.parse(raw));
        } catch {
          // corrupted — reset
          setBookmarks([]);
        }
      }
    });
  }, []);

  const isBookmarked = useCallback(
    (conceptId: string) => bookmarks.includes(conceptId),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    async (conceptId: string) => {
      setBookmarks((prev) => {
        const next = prev.includes(conceptId)
          ? prev.filter((id) => id !== conceptId)
          : [...prev, conceptId];
        AsyncStorage.setItem(ASYNC_STORAGE_KEYS.bookmarks, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  return { bookmarks, isBookmarked, toggleBookmark };
}
