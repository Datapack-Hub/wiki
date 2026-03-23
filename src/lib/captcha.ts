const data = [{ name: "jigsaw", correct: [true, true, true, true, true, true, false, false, false] }];

export const getCorrect = (name: string) => data.find(e => e.name === name)?.correct;
export const getRandomCaptchaName = () => data[Math.floor(Math.random() * data.length)].name;
