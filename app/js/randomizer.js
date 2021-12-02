const imgPlaygroundRandomizer = (imgPathsArray, outputCount=25) => {
  const resultImages = new Set();

  do {
    const rIndex = Math.floor(Math.random() * imgPathsArray.length);
    resultImages.add(imgPathsArray[rIndex]);
  } while (resultImages.size !== outputCount);

  const guessIndex = Math.floor(Math.random() * outputCount);
  const imgArray = Array.from(resultImages);

  return {
    playground: imgArray,
    guess: imgArray[guessIndex],
  }
};

