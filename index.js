let sendBtn = document.querySelector(".dictionary-btn");
let inpt = document.querySelector(".dictionary-input");
let submitForm = document.querySelector(".dictionary-form");
const wordwrapper = document.querySelector(".word-box");
const URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

function renderWord(word) {
  word.map((el) => {
    const wordBox = document.createElement("div");
    wordBox.className = "word_wrap";
    const { meanings } = el;
    const defenetion = meanings.map((el) => el.definitions);
    const wordDefenetionArr = defenetion.map((el) => el);
    const defen = wordDefenetionArr.map((el) => el);
    const item = defen.map((el) => el);
    const mean = item.map((el) => el);
    const element = mean.map((el) => el.map((el) => el.definition));
    const wordMean = element.map((el) => el);
    const wordMeanText = document.createElement("p");
    const { phonetics } = el;
    const audioSrc = phonetics.map((el) => el.audio);
    wordMeanText.className = "word_mean";
    wordMeanText.textContent = wordMean.map((el) => el.join(""));
    console.log(el);
    wordBox.innerHTML = `<h2 class="word_name">${el.word} - <span>${
      !el.phonetic ? "" : el.phonetic
    }</span></h2>
      <p class="word_example">
        Example: “${defen[0][1] ? defen[0][0].example : "   "}”
      </p>
      <audio class="word_audio" controls>
        <source
        
          src="${audioSrc[0]}"
        />
      </audio>`;
    wordwrapper.prepend(wordBox);
    wordBox.append(wordMeanText);
  });
}

function searchWord(word) {
  fetch(URL + "/" + word)
    .then((el) => el.json())
    .then((item) => renderWord(item));
}
const submitFormFunc = (el) => {
  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchWord(inpt.value.trim());
    inpt.value = "";
  });
  //   el.innerHTML = "";
};
submitFormFunc();
