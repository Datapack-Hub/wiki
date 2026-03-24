const captchas = [
  {
    name: "jigsaw",
    preheading: "Select all squares with a",
    heading: "valid Jigsaw Block placement.",
    keepImageOrder: false,
    correct: [true, true, true, true, true, true, false, false, false],
  },
  {
    name: "typo",
    preheading: "Select all squares with a",
    heading: "typo.",
    keepImageOrder: true,
    correct: [true, false, true, true, false, true, false, false, false],
  },
  {
    name: "herobrine",
    preheading: "Select all squares with",
    heading: "Herobrine.",
    keepImageOrder: true,
    correct: [false, false, false, true, true, false, false, false, false],
  },
];

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const getRandomCaptcha = async () => {
  const captcha = captchas[Math.floor(Math.random() * captchas.length)];
  const unshuffledImages = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    url: `/captcha/images/${captcha.name}/${i}.png`,
  }));
  return {
    name: captcha.name,
    preheading: captcha.preheading,
    heading: captcha.heading,
    images: captcha.keepImageOrder ? unshuffledImages : shuffle(unshuffledImages),
  };
};

export const getCorrect = async (name: string) => captchas.find(e => e.name === name)?.correct;
