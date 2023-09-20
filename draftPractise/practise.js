function isPangram(string) {
  let checkString = string;
  const uniqueLetters = Array.from(new Set(checkString.replace(/\s/g, "").toLowerCase()));
  console.log(uniqueLetters.length);
  return uniqueLetters.length >= 27;
}

isPangram("The quick brown fox jumps over the lazy dog");

