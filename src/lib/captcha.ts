const captchas = [{ name: "jigsaw", correct: [true, true, true, true, true, true, false, false, false] }];

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const getRandomCaptcha = async () => {
  const captcha = captchas[Math.floor(Math.random() * captchas.length)];
  return {
    name: captcha.name,
    images: shuffle(
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        url: `/captcha/images/${captcha.name}/${i}.png`,
      }))
    ),
  };
};

export const getCorrect = async (name: string) => captchas.find(e => e.name === name)?.correct;
