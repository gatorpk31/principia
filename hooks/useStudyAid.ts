import { useCallback } from 'react';
import * as Print from 'expo-print';
import { colors, typography } from '../constants/theme';
import { TIERS } from '../constants/tiers';
import { ALL_CONCEPTS } from '../data';
import type { ProgressMap, Concept } from '../types';

function buildStudyAidHTML(progress: ProgressMap): string {
  const tiersWithContent = TIERS.map((tier) => {
    const concepts = ALL_CONCEPTS.filter(
      (c) => c.tierId === tier.id && progress[c.id]?.concept,
    );
    return { tier, concepts };
  }).filter(({ concepts }) => concepts.length > 0);

  const tierSections = tiersWithContent
    .map(({ tier, concepts }) => {
      const conceptItems = concepts
        .map((concept: Concept) => {
          const p = progress[concept.id];
          const formula = concept.conceptTab.formula
            ? `<div class="formula">${concept.conceptTab.formula}</div>`
            : '';
          const guidedNote = p?.guided
            ? `<p class="note">✓ Guided: ${concept.guided.problemStatement}</p>`
            : '';
          const connections =
            p?.connections && concept.connections.length > 0
              ? `<p class="connections">Connects to: ${concept.connections.map((c) => c.title).join(', ')}</p>`
              : '';

          return `
            <div class="concept">
              <h3>${concept.glyph} ${concept.title}</h3>
              <p class="summary">${concept.conceptTab.summary}</p>
              ${formula}
              ${guidedNote}
              ${connections}
            </div>`;
        })
        .join('');

      return `
        <div class="tier">
          <h2 style="color: ${tier.accentColor}">Tier ${tier.id} — ${tier.title}</h2>
          <p class="grade">${tier.gradeLevel}</p>
          ${conceptItems}
        </div>`;
    })
    .join('<hr>');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Georgia, serif; color: #1a1a1a; padding: 32px; max-width: 700px; margin: 0 auto; }
  h1 { font-size: 28px; text-align: center; margin-bottom: 4px; }
  .tagline { text-align: center; color: #666; margin-bottom: 32px; }
  h2 { font-size: 18px; margin-top: 0; }
  h3 { font-size: 15px; margin-bottom: 4px; }
  .grade { color: #888; font-size: 12px; margin-top: -8px; margin-bottom: 16px; }
  .concept { margin-bottom: 20px; padding-left: 12px; border-left: 3px solid #ddd; }
  .summary { font-size: 13px; margin: 4px 0; }
  .formula { font-family: 'Courier New', monospace; background: #f4f4f4; padding: 6px 10px; border-radius: 4px; font-size: 13px; margin: 6px 0; }
  .note { font-size: 12px; color: #555; margin: 2px 0; }
  .connections { font-size: 12px; color: #777; font-style: italic; }
  hr { border: none; border-top: 1px solid #eee; margin: 24px 0; }
</style>
</head>
<body>
  <h1>Principia Study Aid</h1>
  <p class="tagline">Mathematics from the ground up. — Generated ${new Date().toLocaleDateString()}</p>
  ${tiersWithContent.length > 0 ? tierSections : '<p>Start exploring concepts to build your study aid.</p>'}
</body>
</html>`;
}

export function useStudyAid(progress: ProgressMap) {
  const generatePDF = useCallback(async (): Promise<void> => {
    const html = buildStudyAidHTML(progress);
    await Print.printAsync({ html });
  }, [progress]);

  const getStudyAidHTML = useCallback((): string => {
    return buildStudyAidHTML(progress);
  }, [progress]);

  const exploredCount = Object.values(progress).filter((p) => p.concept).length;

  return { generatePDF, getStudyAidHTML, exploredCount };
}
