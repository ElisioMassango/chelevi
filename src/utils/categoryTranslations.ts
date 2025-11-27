// Category translation utility
import { useLanguage } from '../contexts/LanguageContext';

// Category ID to translation key mapping
const CATEGORY_TRANSLATION_MAP: Record<number, { pt: string; en: string }> = {
  1: { pt: 'Bolsas', en: 'Bags' },
  2: { pt: 'Sapatos', en: 'Heels' },
};

// Category name to translation key mapping (fallback)
const CATEGORY_NAME_MAP: Record<string, { pt: string; en: string }> = {
  'bolsas': { pt: 'Bolsas', en: 'Bags' },
  'sapatos': { pt: 'Sapatos', en: 'Heels' },
};

/**
 * Translate category name based on ID or name
 * @param categoryId - Category ID from API
 * @param categoryName - Category name from API (fallback)
 * @param language - Current language ('pt' | 'en')
 * @returns Translated category name
 */
export function translateCategoryName(
  categoryId?: number,
  categoryName?: string,
  language: 'pt' | 'en' = 'pt'
): string {
  // Try to translate by ID first
  if (categoryId && CATEGORY_TRANSLATION_MAP[categoryId]) {
    return CATEGORY_TRANSLATION_MAP[categoryId][language];
  }

  // Fallback to name-based translation
  if (categoryName) {
    const normalizedName = categoryName.toLowerCase().trim();
    
    // Check exact match
    if (CATEGORY_NAME_MAP[normalizedName]) {
      return CATEGORY_NAME_MAP[normalizedName][language];
    }

    // Check if name contains any category keyword
    for (const [key, translations] of Object.entries(CATEGORY_NAME_MAP)) {
      if (normalizedName.includes(key)) {
        return translations[language];
      }
    }
  }

  // Return original name if no translation found
  return categoryName || '';
}

/**
 * Hook to get translated category name
 * @param categoryId - Category ID from API
 * @param categoryName - Category name from API (fallback)
 * @returns Translated category name based on current language
 */
export function useCategoryTranslation(categoryId?: number, categoryName?: string): string {
  const { language } = useLanguage();
  return translateCategoryName(categoryId, categoryName, language);
}

