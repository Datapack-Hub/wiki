export type Captcha = {
  name: string;
  preheading: string;
  heading: string;
  images: {
    id: number;
    url: string;
  }[];
};

const captchas: { name: string; preheading: string; heading: string; shuffle?: boolean; correct: boolean[] }[] = [
  {
    name: "jigsaw",
    preheading: "Select all squares with a",
    heading: "valid Jigsaw Block placement.",
    shuffle: true,
    correct: [true, true, true, true, true, true, false, false, false],
  },
  {
    name: "typo",
    preheading: "Select all squares with a",
    heading: "typo.",
    correct: [true, false, true, true, false, true, false, false, false],
  },
  {
    name: "herobrine",
    preheading: "Select all squares with",
    heading: "Herobrine.",
    correct: [false, false, false, true, true, false, false, false, false],
  },
  {
    name: "pregnancy",
    preheading: "Select all squares with",
    heading: "abusive parents.",
    correct: [false, true, true, true, true, true, true, true, true],
  },
  {
    name: "creeper",
    preheading: "Select all squares with a",
    heading: "Creeper.",
    shuffle: true,
    correct: [false, true, true, true, true, true, false, true, false],
  },
];

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const getRandomCaptcha = async (exclude?: string) => {
  const filteredCaptchas = captchas.filter(e => e.name !== exclude);
  const captcha = filteredCaptchas[Math.floor(Math.random() * filteredCaptchas.length)];
  const unshuffledImages = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    url: `/captcha/images/${captcha.name}/${i}.png`,
  }));

  return {
    name: captcha.name,
    preheading: captcha.preheading,
    heading: captcha.heading,
    images: captcha.shuffle ? shuffle(unshuffledImages) : unshuffledImages,
  } satisfies Captcha;
};

export const getCorrect = async (name: string) => captchas.find(e => e.name === name)?.correct;
