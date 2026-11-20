import { getMetadata } from './aem.js';

export function getPageMetadata() {
  return {
    title: getMetadata('title'),
    description: getMetadata('description'),
    author: getMetadata('author'),
    businessUnit: getMetadata('business-unit'),
    campaign: getMetadata('campaign'),
    audience: getMetadata('audience'),
    readingTime: getMetadata('reading-time'),
  };
}

export function getSectionMetadata(section) {
  return {
    animate: section.dataset.animate || '',
    trackClicks: section.dataset.trackClicks || '',
    faqCategory: section.dataset.faqCategory || '',
    trackImpression: section.dataset.trackImpression || '',
    ctaId: section.dataset.ctaId || '',
  };
}
