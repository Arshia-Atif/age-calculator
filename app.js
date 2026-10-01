// Strict ES5 Compatible Script
(function () {
  var calcBtn = document.getElementById('calcBtn');
  var birthdateInput = document.getElementById('birthdate');
  var resultContainer = document.getElementById('resultContainer');
  var errorMsg = document.getElementById('errorMsg');

  var yearsResult = document.getElementById('yearsResult');
  var monthsResult = document.getElementById('monthsResult');
  var daysResult = document.getElementById('daysResult');

  // Set maximum date constraint to today
  var today = new Date();
  var todayISO = today.toISOString().split('T')[0];
  birthdateInput.setAttribute('max', todayISO);

  function calculateAge() {
    var dobValue = birthdateInput.value;

    if (!dobValue) {
      showError('Please select a valid date of birth.');
      return;
    }

    var dob = new Date(dobValue);

    if (dob > today) {
      showError('Date of birth cannot be in the future!');
      return;
    }

    // Reset error
    errorMsg.classList.add('hidden');

    var birthYear = dob.getFullYear();
    var birthMonth = dob.getMonth();
    var birthDay = dob.getDate();

    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth();
    var currentDay = today.getDate();

    var years = currentYear - birthYear;
    var months = currentMonth - birthMonth;
    var days = currentDay - birthDay;

    // Adjust for negative days
    if (days < 0) {
      months--;
      // Get total days in the previous month
      var prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
      days += prevMonthDays;
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Output results
    yearsResult.textContent = years;
    monthsResult.textContent = months;
    daysResult.textContent = days;

    resultContainer.classList.remove('hidden');
  }

  function showError(msg) {
    resultContainer.classList.add('hidden');
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
  }

  // Event Listener using ES5 standard function
  calcBtn.addEventListener('click', calculateAge);
})();