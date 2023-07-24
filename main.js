const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const gradientBox = document.querySelector(".gradient-box");
const direction = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textArea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

//para di lng magbug kung mag reload
if (location.reload) {
  console.log("nagreload");
  gradientBox.style.background = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
  document.body.style.background = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
  textArea.innerHTML = `background: linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
}

//gets random color
//pa explain bwas kay chatGPT
const getRandomColor = () => {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomHex}`;
};
/* In this code snippet, 0xffffff is a hexadecimal representation of the decimal value 16777215. 
This number is used as the maximum value to generate a random hexadecimal color code that is a valid six-digit code.
when Math.random() * 0xffffff is evaluated, it generates a random number between 0 and 16777215, 
which is then rounded down to the nearest whole number using Math.floor(). 
The resulting number is then converted to a string representation of a hexadecimal color code using .toString(16). */

const copyCode = () => {
  //Copying textArea value and updating Button text
  // navigator.clipboard.writeText(textArea.value);
  // copyBtn.innerText = "Code Copied";

  // Creating a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = textArea.value;
  document.body.appendChild(tempInput);

  // Selecting and copying the text
  tempInput.select();
  document.execCommand("copy");

  // Removing the temporary input element and updating button text
  document.body.removeChild(tempInput);
  copyBtn.innerText = "Code Copied";
  setTimeout(() => (copyBtn.innerText = "Copy Code"), 2000);
};

function setGradient(isRandom) {
  if (isRandom) {
    color1.value = getRandomColor();
    color2.value = getRandomColor();
  }
  const gradient = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
  document.body.style.background = gradient;
  gradientBox.style.background = gradient;
  textArea.innerHTML = `background: ${gradient}`;
  // console.log(gradient);
  // console.log(direction.value);
}

/*una na dapat addEventListener("input", setGradient) lng ni
but since ginsudlan ta sa isRamdom condition ang setGradient for producing a random color from the getRandomColor function
we need to set it to false kay ang blank or No arugment is i thought considered true so we really need to specify it to falsy*/
colorInputs.forEach((input) => {
  //calling setGradient() everytime user pics a color
  input.addEventListener("input", () => setGradient(false));
});

direction.addEventListener("change", () => setGradient(false));
refreshBtn.addEventListener("click", () => setGradient(true));
copyBtn.addEventListener("click", copyCode);
