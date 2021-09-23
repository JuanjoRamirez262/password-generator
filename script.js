// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  var passwordLength = setPasswordLenght();
  var characterTypeFlag = false;
  while(!characterTypeFlag){
    var lowerCaseCharacter = setLowerCaseCharacter();
    var upperCaseCharacter = setUpperCaseCharacter();
    var numericCharacter = setNumericCharacter();
    var specialCharacter = setSpecialCharacter();
    characterTypeFlag = lowerCaseCharacter || upperCaseCharacter || numericCharacter || specialCharacter
    if (!characterTypeFlag){
      alert("The password need to have at least one type of character.")
    }
  }
  var passwordChecked = false;
  while (!passwordChecked) {
    var possibleCharacters = concatCharacterArray(lowerCaseCharacter, upperCaseCharacter, numericCharacter, specialCharacter)
    var possiblePassword = pickCharacters(possibleCharacters, passwordLength);
    passwordChecked = checkPasswordConditions(possiblePassword, lowerCaseCharacter, upperCaseCharacter, numericCharacter, specialCharacter);
  }
  var password = possiblePassword.join('')
  return (password)
}

function isNumeric(val) {
  return /^-?\d+$/.test(val);
}

function setPasswordLenght() {
  var passwordLength = prompt("Choose a length of at least 8 characters and no more than 128 characters");
  if(!isNumeric(passwordLength)){
    alert("Please enter a valid number.")
    setPasswordLenght();
  }
  if (passwordLength < 8 || passwordLength > 128) {
    alert("This lenght is not allowed. Please try again.");
    setPasswordLenght();
  }
  return passwordLength;
}

function setLowerCaseCharacter() {
  return window.confirm("Want to include lower case characters? (i.e. a, b or c)")
}

function setUpperCaseCharacter() {
  return window.confirm("Want to include upper case characters? (i.e. X, Y or Z)")
}

function setNumericCharacter() {
  return window.confirm("Want to include numeric characters? (i.e. 5, 6 or 8)")
}

function setSpecialCharacter() {
  return window.confirm("Want to include special characters? (i.e. %, & or #)")
}

function concatCharacterArray(lower, upper, numeric, special) {
  var lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var upperCaseArray = lowerCaseArray.map(lowerCaseArray => lowerCaseArray.toUpperCase());
  var numericArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var specialArray = [' ', '!', '\"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '.', '-', '/', ':', ';', '<', '>', '=', '?', '@', '[', ']', '\\', '^', '_', '`', '{', '|', '}', '~'];
  var possibleCharacterArray = [];
  if (lower) {
    possibleCharacterArray = possibleCharacterArray.concat(lowerCaseArray);
  }
  if (upper) {
    possibleCharacterArray = possibleCharacterArray.concat(upperCaseArray);
  }
  if (numeric) {
    possibleCharacterArray = possibleCharacterArray.concat(numericArray);
  }
  if (special) {
    possibleCharacterArray = possibleCharacterArray.concat(specialArray);
  }
  return possibleCharacterArray
}

function pickCharacters(possibleArray, resultLenght) {
  var passwordCandidate = []
  var length = possibleArray.length;
  for (let i = 0; i < resultLenght; i++) {
    var x = Math.floor(Math.random() * (length));
    passwordCandidate.push(possibleArray[x])
  }
  return passwordCandidate
}

function checkPasswordConditions(possiblePassword, lowerCaseCharacter, upperCaseCharacter, numericCharacter, specialCharacter) {
  var lowerCaseArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var upperCaseArray = lowerCaseArray.map(lowerCaseArray => lowerCaseArray.toUpperCase());
  var numericArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var specialArray = [' ', '!', '\"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '.', '-', '/', ':', ';', '<', '>', '=', '?', '@', '[', ']', '\\', '^', '_', '`', '{', '|', '}', '~'];
  var lowerCondition = true;
  var upperCondition = true;
  var numericCondition = true;
  var specialCondition = true;

  if (lowerCaseCharacter) {
    lowerCondition = findCommonElements(possiblePassword, lowerCaseArray);
  }
  if (upperCaseCharacter) {
    upperCondition = findCommonElements(possiblePassword, upperCaseArray);
  }
  if (numericCharacter) {
    numericCondition = findCommonElements(possiblePassword, numericArray);
  }
  if (specialCharacter) {
    specialCondition = findCommonElements(possiblePassword, specialArray);
  }
  if (lowerCondition && upperCondition && numericCondition && specialCondition) {
    return true
  } else {
    return false
  }
}

function findCommonElements(arr1, arr2) {
  return arr1.some(item => arr2.includes(item))
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
