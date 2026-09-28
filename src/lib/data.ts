export type AwsService = {
  icon: string;
  name: string;
};

export const services: AwsService[] = [
  { icon: "🪣", name: "S3" },
  { icon: "🖥️", name: "EC2" },
  { icon: "⚡", name: "Lambda" },
  { icon: "🗄️", name: "DynamoDB" },
  { icon: "🌐", name: "CloudFront" },
  { icon: "🔐", name: "IAM" },
];

export type Prize = {
  id: string;
  name: string;
  icon: string;
  tickets: number;
  blurb: string;
};

export const prizes: Prize[] = [
  {
    id: "stickers",
    name: "AWS Stickers",
    icon: "✨",
    tickets: 4,
    blurb: "Slap some cloud pride on your laptop.",
  },
  {
    id: "button",
    name: "Custom Button",
    icon: "🔘",
    tickets: 8,
    blurb: "Hit the button maker — pick your design.",
  },
  {
    id: "diary",
    name: "Club Diary",
    icon: "📓",
    tickets: 14,
    blurb: "Notebook for notes, ideas, and cert goals.",
  },
  {
    id: "tote",
    name: "Tote Bag",
    icon: "🛍️",
    tickets: 22,
    blurb: "Top-shelf prize. Carry textbooks in style.",
  },
];
