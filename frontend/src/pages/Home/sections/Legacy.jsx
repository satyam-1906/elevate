import LegacyPage from '../../Legacy/LegacyPage';

/**
 * Legacy section wrapper — delegates to LegacyPage which handles
 * desktop 3D constellation or mobile timeline rendering, including
 * its own <section id="legacy"> tag.
 */
export default function Legacy() {
  return <LegacyPage />;
}
