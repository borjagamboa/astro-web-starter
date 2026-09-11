export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface TestimonialAvatar {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface TestimonialSource {
  label: string;
  href?: string;
}

export interface TestimonialData {
  quote: string;
  name?: string;
  role?: string;
  organization?: string;
  context?: string;
  avatar?: TestimonialAvatar;
  source?: TestimonialSource;
  rating?: number;
  ratingMax?: number;
  publicable?: boolean;
}

export interface ProofItem {
  value: string;
  label: string;
  description?: string;
  /** @deprecated Use description instead. */
  context?: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}
