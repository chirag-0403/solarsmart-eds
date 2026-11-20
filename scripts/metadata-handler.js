import { getMetadata } from './aem.js';

export function getPageMetadata() {
  return {
    title: getMetadata('og:title'),
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


export function initializeDigitalData() {
  window.digitalData = window.digitalData || {};

  window.digitalData.page = getPageMetadata();

  window.digitalData.sections = [
    ...document.querySelectorAll('main > .section'),
  ].map((section, index) => ({
    sectionIndex: index + 1,
    sectionClasses: section.className,
    ...getSectionMetadata(section),
  }));

  return window.digitalData;
}
