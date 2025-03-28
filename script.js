const inputElemnts = document.querySelectorAll(".card__input");
const calcButton = document.querySelector(".card__button");
const resetButton = document.querySelector(".reset__button");

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};
const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};
const isValidDate = (dayElement, monthElement, yearElement) => {
  let isValid = [false, false, false];

  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    isValid[0] = true;
    dayElement.classList.remove("card__input--error");
  }
  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    isValid[1] = true;
    monthElement.classList.remove("card__input--error");
  }
  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    isValid[2] = true;
    yearElement.classList.remove("card__input--error");
  }
  return isValid.every((item) => item === true);
};

const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthdate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  if (today.getDate() === birthdate.getDate()) {
    const elemntWishes = document.createElement("p");
    const wishesText = document.createTextNode(
      "Today marks your birthday, HBD🎈🎆🎇🎉"
    );
    elemntWishes.appendChild(wishesText);
    const divWishes = document.querySelector(".birthday__wishes");
    divWishes.appendChild(elemntWishes);
  }
  return age;
};

const onClickHandler = () => {
  const dayElement = document.querySelector('.card__input[name="day"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const yearElement = document.querySelector('.card__input[name="year"]');
  const resultElement = document.querySelector(".card__resultValue");

  if (!isValidDate(dayElement, monthElement, yearElement)) {
    return;
  }

  resultElement.textContent = calculateAge(
    yearElement.value,
    monthElement.value,
    dayElement.value
  );
};

const onResetHandler = () => {
  inputElemnts.forEach((input) => (input.value = ""));
  document.querySelector(".card__resultValue").textContent = "--";

  document.querySelector(".birthday__wishes").innerHTML = "";
};

inputElemnts.forEach((item) => {
  item.addEventListener(
    "keydown",
    (event) => event.key === "Enter" && onClickHandler()
  );
});

calcButton.addEventListener("click", onClickHandler);
resetButton.addEventListener("click", onResetHandler);
