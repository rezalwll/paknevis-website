export type HeroStickyItem = {
  title: string;
  body: string;
};

export type FeatureItem = {
  title: string;
  desc: string;
  grad: string;
  iconBg: string;
  icon: string;
};

export type PricingBenefitItem = {
  title: string;
  description: string;
  icon: string;
};

export type PricingStepItem = {
  text: string;
  icon: string;
};

export type AboutMilestoneItem = {
  year: string;
  title: string;
  desc: string;
};

export type AboutValueItem = {
  title: string;
  desc: string;
};

export type PolicySection = {
  title: string;
  body?: string;
  points?: string[];
};
