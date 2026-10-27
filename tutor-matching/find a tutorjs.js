const { createClient } = window.supabase;
const supabaseURL = "https://joevkictcfaoofqhbhgw.supabase.co";
const supabaseKey = "sb_publishable_8Iat4psKXuFn91uT8yuw7g_2n3Buc5w";
const supabase = createClient(supabaseURL, supabaseKey);
const helpPannel = document.getElementById("helpPannel");
const calendar = document.getElementById("availabilityCalendar");
let helpOn = false;
let accountTrue = false;
let accountBtn = document.getElementById("accountBtn");
let accountPannel = document.getElementById("accountPannel");
let overlay = document.getElementById("overlay");
let account = true;
let colorMode = "light";
let colorModeTrue = localStorage.getItem("colorMode");
let color = "rgb(239, 237, 247)";
const toggleBrightness = document.getElementById("brightness");
const helpBtn = document.getElementById("helpButton");

accountBtn.addEventListener("click", function () {
  let account = true;

  document.getElementById("no-account").addEventListener("click", function () {
    if (account === false) {
      account = true;
      document.getElementById("login").style.display = "block";
      document.getElementById("signup").style.display = "none";
      document.getElementById("no-account").innerHTML =
        "Don't have an account? Sign up!";
    } else {
      document.getElementById("login").style.display = "none";
      account = false;
      document.getElementById("signup").style.display = "block";
      document.getElementById("no-account").innerHTML =
        "Already have an account? Log in!";
    }
  });
  helpPannel.style.display = "none";
  if (accountTrue === false) {
    accountPannel.style.display = "block";
    overlay.style.display = "block";
    accountTrue = true;
  } else {
    accountPannel.style.display = "none";
    overlay.style.display = "none";
    accountTrue = false;
  }
});
if (colorModeTrue !== false) {
  colorMode = colorModeTrue;
  if (colorMode === "dark") {
    colorMode = "dark";
    document.documentElement.style.colorScheme = "dark";
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    toggleBrightness.textContent = "sunny";
    localStorage.setItem("colorMode", "dark");
    color = "#48485a";
  } else {
    colorMode = "light";
    document.documentElement.style.colorScheme = "light";
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    toggleBrightness.textContent = "bedtime";
    localStorage.setItem("colorMode", "light");
    color = "rgb(239, 237, 247)";
  }
} else {
  function toggleSystemTheme() {
    const root = document.documentElement;
    if (!root.style.colorScheme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.style.colorScheme = prefersDark ? "dark" : "light";
    }
    colorMode = root.style.colorScheme;
    if (colorMode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }
  toggleSystemTheme();
}
toggleBrightness.addEventListener("click", function () {
  if (colorMode === "dark") {
    colorMode = "light";
    document.documentElement.style.colorScheme = "light";
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    toggleBrightness.textContent = "bedtime";
    localStorage.setItem("colorMode", colorMode);
  } else {
    colorMode = "dark";
    document.documentElement.style.colorScheme = "dark";
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    toggleBrightness.textContent = "sunny";
    localStorage.setItem("colorMode", colorMode);
  }
});

helpBtn.addEventListener("click", function () {
  if (helpOn === true) {
    helpPannel.style.display = "none";
    overlay.style.display = "none";
    helpOn = false;
  } else {
    helpPannel.style.display = "block";
    overlay.style.display = "block";
    helpOn = true;
  }
});

overlay.addEventListener("click", function () {
  if (helpOn === true) {
    helpPannel.style.display = "none";
    overlay.style.display = "none";
    helpOn = false;
  }
  if (accountTrue === true) {
    accountPannel.style.display = "none";
    overlay.style.display = "none";
    accountTrue = false;
  }
  document.getElementById("availabilityModal").style.display = "none"
  document.getElementById("locked").style.display = "none"
  document.querySelectorAll(".helpPannel").forEach(i => {
    i.style.display = "none"
  })
  overlay.style.display = "none";
});
async function loadUserStats(userId) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userId);
    if (profile[0].tutorUserProfile && profile[0].tutorUserProfile !== null && profile[0].tutorUserProfile !== undefined && profile[0].tutorUserProfile !== "[]"){
        userProfileLocal.push(profile[0].tutorUserProfile);
        loadTutors()
    }

  if (error) {
    return;
  }

  if (profile) {
    let userProfile = profile[0];
    document.getElementById("username-display").innerHTML =
      userProfile.username;
    document.getElementById("btn-dashboard").innerHTML = userProfile.username;
  }
}
const loginBtn = document.getElementById("btn-login");
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  if (!email || !password) {
    document.getElementById("login-error").innerHTML =
      "Please Input Both Fields";
    return;
  }
  loginBtn.disabled = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Login Error: " + error.message);
    loginBtn.disabled = false;
    loginBtn.innerText = "Login";
    return;
  }
  document.getElementById("accountPannel").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  accountTrue = false;

  loginBtn.disabled = false;
});
const logoutBtn = document.getElementById("btn-logout");

logoutBtn.addEventListener("click", async () => {
  document.getElementById("login").style.display = "block";
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error logging out: " + error.message);
    return;
  }

  alert("You have been logged out successfully!");
  window.location.reload();
});

const deleteAccountBtn = document.getElementById("btn-delete-account");

if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener("click", async () => {
    const confirmed = confirm(
      "Are you absolutely sure you want to delete your account? This will permanently erase your math rankings, diagnostic logs, and history. This action cannot be undone.",
    );

    if (!confirmed) return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const userId = session.user.id;
    const { error: dbError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (dbError) {
      alert("Error erasing profile data: " + dbError.message);
      return;
    }

    await supabase.auth.signOut();
    alert("Your account records and progress have been completely erased.");
    window.location.reload();
  });
}

document.getElementById("btn-signup").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  const username = document.getElementById("auth-username").value;
  const passwordCheck = document.getElementById("auth-password-check").value;
  if (!email || !password || !username) {
    document.getElementById("signup-error").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (password === passwordCheck) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return alert(error.message);
    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          username: username,
          curriculum: null,
        },
      ]);

      alert("Account created!");

      document.getElementById("accountPannel").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      document.getElementById("username-display").innerHTML = username;
    }
  } else {
    document.getElementById("signup-error").innerHTML =
      "Passwords do not match";
    return;
  }
});
let diagnosticIndex = 0;

console.count("Registering auth listener");
supabase.auth.onAuthStateChange(async (event, session) => {
  const accountBtn = document.getElementById("accountBtn");
  const logoutBtn = document.getElementById("btn-logout");
  const loginBtn = document.getElementById("btn-login");
  const signup = document.getElementById("no-account");
  const login = document.getElementById("login");
  const usernameDisplay = document.getElementById("username-display");
  const createAccount = document.getElementById("no-account");
  const deleteAccount = document.getElementById("btn-delete-account");
  const usernameDisplayModal = document.getElementById("btn-dashboard");
  let statsLoaded = false;
  if (statsLoaded) return;
  if (event == "INITIAL_SESSION"){
  if (session) {
    if (logoutBtn) logoutBtn.style.display = "block";
    if (login) login.style.display = "none";
    if (createAccount) createAccount.style.display = "none";
    if (deleteAccount) deleteAccount.style.display = "block";
    if (usernameDisplayModal) usernameDisplayModal.style.display = "block";
    const { data: profile, error } = await supabase;
    loadUserStats(session.user.id);
  } else {
    if (typeof runDiagnostic === "function")
      if (logoutBtn) logoutBtn.style.display = "none";
    if (login) login.style.display = "block";
    if (usernameDisplay) usernameDisplay.innerHTML = "Log In";
    if (createAccount) createAccount.style.display = "block";
    if (deleteAccount) deleteAccount.style.display = "none";
    if (usernameDisplayModal) usernameDisplayModal.style.display = "none";
    lockTutorForm()
  }
  } else if (event == "SIGNED_OUT") {
    lockTutorForm()
  }
});
const resetBtn = document.getElementById("btn-request-reset");

if (resetBtn) {
  resetBtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;

    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/update-password.html",
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Check your inbox! A secure password reset link has been sent.");
    }
  });
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const START_HOUR = 6;
const END_HOUR = 23;

const SLOT_MINUTES = 30;

const selectedCalendarAvailability = new Set();

let isDragging = false;

let dragMode = "add";

let lastPaintedKey = null;

for (let hour = START_HOUR; hour < END_HOUR; hour++) {
  for (let half = 0; half < 2; half++) {
    const minutes = hour * 60 + half * SLOT_MINUTES;

    const timeLabel = document.createElement("div");

    timeLabel.className = "calendarTimeLabel";

    if (half === 0) {
      timeLabel.textContent = formatTime(minutes);
    }

    calendar.appendChild(timeLabel);

    days.forEach((day) => {
      const slot = document.createElement("div");

      slot.className = "calendarSlot";

      slot.dataset.day = day;

      slot.dataset.minutes = minutes;

      slot.dataset.time = formatTime(minutes);

      calendar.appendChild(slot);
    });
  }
}

const calendarSlots = document.querySelectorAll(".calendarSlot");

calendarSlots.forEach((slot) => {
  slot.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    isDragging = true;

    const key = getKey(slot);

    dragMode = selectedCalendarAvailability.has(key) ? "remove" : "add";

    lastPaintedKey = null;

    paintSlot(slot);
  });

  slot.addEventListener("pointerenter", () => {
    if (!isDragging) {
      return;
    }

    paintSlot(slot);
  });

  slot.addEventListener("click", () => {});
});

document.addEventListener("pointerup", () => {
  if (!isDragging) {
    return;
  }

  isDragging = false;

  lastPaintedKey = null;

  updateSelectionEdges();
});

function paintSlot(slot) {
  const key = getKey(slot);
  if (key === lastPaintedKey) {
    return;
  }
  lastPaintedKey = key;
  if (dragMode === "add") {
    selectedCalendarAvailability.add(key);

    slot.classList.add("selectedCalendar");
  } else {
    selectedCalendarAvailability.delete(key);

    slot.classList.remove("selectedCalendar");
  }

  updateSelectionEdges();
}

function getKey(slot) {
  return slot.dataset.day + "|" + slot.dataset.minutes;
}

function updateSelectionEdges() {
  calendarSlots.forEach((slot) => {
    slot.classList.remove(
      "edge-top",
      "edge-bottom",
      "edge-left",
      "edge-right",
      "corner-top-left",
      "corner-top-right",
      "corner-bottom-left",
      "corner-bottom-right",
    );
  });

  calendarSlots.forEach((slot) => {
    if (!selectedCalendarAvailability.has(getKey(slot))) {
      return;
    }

    const day = days.indexOf(slot.dataset.day);

    const minutes = Number(slot.dataset.minutes);

    const top = isSelected(day, minutes - SLOT_MINUTES);

    const bottom = isSelected(day, minutes + SLOT_MINUTES);

    const left = isSelected(day - 1, minutes);

    const right = isSelected(day + 1, minutes);

    if (!top) {
      slot.classList.add("edge-top");
    }

    if (!bottom) {
      slot.classList.add("edge-bottom");
    }

    if (!left) {
      slot.classList.add("edge-left");
    }

    if (!right) {
      slot.classList.add("edge-right");
    }

    if (!top && !left) {
      slot.classList.add("corner-top-left");
    }

    if (!top && !right) {
      slot.classList.add("corner-top-right");
    }

    if (!bottom && !left) {
      slot.classList.add("corner-bottom-left");
    }

    if (!bottom && !right) {
      slot.classList.add("corner-bottom-right");
    }
  });
}

function isSelected(dayIndex, minutes) {
  if (dayIndex < 0 || dayIndex >= days.length) {
    return false;
  }

  return selectedCalendarAvailability.has(days[dayIndex] + "|" + minutes);
}

function formatTime(totalMinutes) {
  let hour = Math.floor(totalMinutes / 60);

  const minute = totalMinutes % 60;

  const suffix = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return hour + ":" + String(minute).padStart(2, "0") + " " + suffix;
}
function getAvailabilityData(userTimeZone) {
  const result = [];
  
  days.forEach((day) => {
    const selectedMinutes = Array.from(selectedCalendarAvailability)
      .filter((key) => key.startsWith(day + "|"))
      .map((key) => Number(key.split("|")[1]))
      .sort((a, b) => a - b);

    selectedMinutes.forEach((localMinutes) => {
      const utcObj = convertLocalMinutesToUTC(day, localMinutes, userTimeZone);
      result.push({
        day: utcObj.day,
        minutes: utcObj.minutes,
        time: formatTime(utcObj.minutes)
      });
    });
  });

  return result;
}



const subjectBank = document.getElementById("subjectBank");

const subjectChips = document.querySelectorAll(".subjectChip");

const subjectDropZones = document.querySelectorAll(".subjectDropZone");

let draggedSubject = null;

subjectChips.forEach((chip) => {
  chip.addEventListener("dragstart", () => {
    draggedSubject = chip;

    chip.classList.add("dragging");
  });

  chip.addEventListener("dragend", () => {
    chip.classList.remove("dragging");

    draggedSubject = null;
  });
});

subjectDropZones.forEach((zone) => {
  zone.addEventListener("dragover", (event) => {
    event.preventDefault();

    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", (event) => {
    if (!zone.contains(event.relatedTarget)) {
      zone.classList.remove("drag-over");
    }
  });

  zone.addEventListener("drop", (event) => {
    event.preventDefault();

    zone.classList.remove("drag-over");

    if (!draggedSubject) {
      return;
    }

    placeSubject(draggedSubject, zone);
  });
});

subjectBank.addEventListener("dragover", (event) => {
  event.preventDefault();
});

subjectBank.addEventListener("drop", (event) => {
  event.preventDefault();

  if (!draggedSubject) {
    return;
  }

  if (draggedSubject.classList.contains("placedSubject")) {
    const originalChip = document.querySelector(
      `.subjectChip[data-subject="${draggedSubject.dataset.subject}"]`,
    );

    if (originalChip) {
      originalChip.style.display = "";
    }

    draggedSubject.remove();
  }

  updateSubjectData();
});

function placeSubject(subject, destination) {
  const subjectName = subject.dataset.subject;

  if (subject.classList.contains("placedSubject")) {
    const oldZone = subject.closest(".subjectDropZone");

    if (oldZone) {
      subject.remove();

      restorePlaceholder(oldZone);
    }
  }

  const placed = document.createElement("div");

  placed.className = "placedSubject";

  placed.dataset.subject = subjectName;

  placed.textContent = subjectName;

  placed.draggable = true;

  placed.addEventListener("dragstart", () => {
    draggedSubject = placed;

    placed.classList.add("dragging");
  });

  placed.addEventListener("dragend", () => {
    placed.classList.remove("dragging");

    draggedSubject = null;
  });

  destination.appendChild(placed);

  const original = document.querySelector(
    `.subjectChip[data-subject="${subjectName}"]`,
  );

  if (original) {
    original.style.display = "none";
  }

  const placeholder = destination.querySelector(".dropPlaceholder");

  if (placeholder) {
    placeholder.remove();
  }

  updateSubjectData();
}

function restorePlaceholder(zone) {
  if (!zone.querySelector(".placedSubject")) {
    const placeholder = document.createElement("div");

    placeholder.className = "dropPlaceholder";

    placeholder.textContent = "Drop subjects here";

    zone.appendChild(placeholder);
  }
}

function updateSubjectData() {
  const result = {
    needHelp: getSubjects("need-help"),

    couldUseHelp: getSubjects("could-use-help"),

    comfortable: getSubjects("comfortable"),

    noHelp: getSubjects("no-help"),
  };
}

function getSubjects(category) {
  const zone = document.querySelector(
    `.subjectDropZone[data-category="${category}"]`,
  );

  if (!zone) {
    return [];
  }

  return Array.from(zone.querySelectorAll(".placedSubject")).map(
    (subject) => subject.dataset.subject,
  );
}
const userProfileLocal = [];

const tutorFormButton = document.getElementById("tutorFormComplete");

function setIncomplete(container, incomplete, inputs = []) {
  if (!container) return;

  container.classList.toggle("field-incomplete", incomplete);

  inputs.forEach((input) => {
    const el =
      typeof input === "string" ? document.getElementById(input) : input;
    if (el) {
      el.classList.toggle("field-incomplete-entry", incomplete);
    }
  });
}

function hasChecked(name, container) {
  return Boolean(container?.querySelector(`input[name="${name}"]:checked`));
}

function validateTutorForm() {
  const checks = [];

  function addCheck(containerId, isComplete, inputIds = []) {
    const container = document.getElementById(containerId);
    const inputs = inputIds.map((id) => document.getElementById(id));

    setIncomplete(container, !isComplete, inputs);
    checks.push({ container, isComplete });
  }

  addCheck(
    "fullNameContainer",
    Boolean(document.getElementById("fullName")?.value.trim()),
    ["fullName"],
  );

  addCheck(
    "preferredNameContainer",
    Boolean(document.getElementById("preferredName")?.value.trim()),
    ["preferredName"],
  );

  const age = document.getElementById("age");
  addCheck("ageContainer", Boolean(age?.value) && Number(age.value) > 0, [
    "age",
  ]);

  addCheck(
    "gradeContainer",
    Boolean(document.getElementById("grade")?.value.trim()),
    ["grade"],
  );

  const email = document.getElementById("email");
  addCheck(
    "emailContainer",
    Boolean(email?.value.trim()) && email.checkValidity(),
    ["email"],
  );

  const genderContainer = document.getElementById("genderContainer");
  const hasGender = hasChecked("gender", genderContainer);

  setIncomplete(genderContainer, !hasGender);
  checks.push({ container: genderContainer, isComplete: hasGender });

  const experienceContainer = document.getElementById("experienceContainer");
  const hasExperience = hasChecked("experience", experienceContainer);

  setIncomplete(experienceContainer, !hasExperience);
  checks.push({
    container: experienceContainer,
    isComplete: hasExperience,
  });

  const subjectContainer = document.getElementById(
    "subjectPreferenceContainer",
  );
  const hasSubjects = Boolean(
    subjectContainer?.querySelectorAll(".placedSubject").length,
  );

  setIncomplete(subjectContainer, !hasSubjects);
  checks.push({
    container: subjectContainer,
    isComplete: hasSubjects,
  });

  const classSizeContainer = document.getElementById("classSizeContainer");
  const hasClassSize = hasChecked("classSize", classSizeContainer);

  setIncomplete(classSizeContainer, !hasClassSize);
  checks.push({
    container: classSizeContainer,
    isComplete: hasClassSize,
  });

  const description = document.getElementById("studentDescription");
  const descriptionContainer = document.getElementById("descriptionContainer");
  const hasDescription = Boolean(description?.value.trim());

  setIncomplete(descriptionContainer, !hasDescription, ["studentDescription"]);
  checks.push({
    container: descriptionContainer,
    isComplete: hasDescription,
  });

  const timeZone = document.getElementById("timeZone");
  const hasTimeZone = Boolean(timeZone?.value);

  const availabilityContainer = document.getElementById(
    "availabilityContainer",
  );

  const hasAvailability =
    typeof selectedCalendarAvailability !== "undefined" &&
    selectedCalendarAvailability instanceof Set &&
    selectedCalendarAvailability.size > 0;
  const timingComplete = hasTimeZone && hasAvailability;

  setIncomplete(availabilityContainer, !timingComplete, ["timeZone"]);

  checks.push({
    container: availabilityContainer,
    isComplete: timingComplete,
  });

  const firstIncomplete = checks.find((check) => !check.isComplete)?.container;

  if (firstIncomplete) {
    firstIncomplete.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    firstIncomplete
      .querySelector(
        "input:not([type='radio']), textarea, select, input[type='radio']",
      )
      ?.focus({ preventScroll: true });
  }

  return checks.every((check) => check.isComplete);
}

tutorFormButton.addEventListener("click", async (event) => {
  event.preventDefault();

  if (!validateTutorForm()) return;

  const userTimeZone = document.getElementById("timeZone").value;

  const profile = {
    fullName: document.getElementById("fullName").value.trim(),
    preferredName: document.getElementById("preferredName").value.trim(),
    age: Number(document.getElementById("age").value),
    grade: document.getElementById("grade").value.trim(),
    email: document.getElementById("email").value.trim(),
    gender: document.querySelector('input[name="gender"]:checked')?.id || "",
    experience: document.querySelector('input[name="experience"]:checked')?.value || "",
    subjectPreferences: {
      needHelp: getSubjects("need-help"),
      couldUseHelp: getSubjects("could-use-help"),
      comfortable: getSubjects("comfortable"),
      noHelp: getSubjects("no-help"),
    },
    classSize: document.querySelector('input[name="classSize"]:checked')?.value || "",
    description: document.getElementById("studentDescription").value.trim(),
    timeZone: userTimeZone,
    availability: getAvailabilityData(userTimeZone),
  };

  document.getElementById("tutorSelectionWizard").style.display = "none";
  document.getElementById("tutorCatalogContainer").style.display = "block";
  userProfileLocal.push(profile);
  loadTutors();

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    await supabase
      .from("profiles")
      .update({ tutorUserProfile: userProfileLocal[0] })
      .eq("id", session.user.id)
      .select();
  }
});

[
  ["fullName", "fullNameContainer"],
  ["preferredName", "preferredNameContainer"],
  ["age", "ageContainer"],
  ["grade", "gradeContainer"],
  ["email", "emailContainer"],
  ["studentDescription", "descriptionContainer"],
  ["timeZone", "availabilityContainer"],
].forEach(([inputId, containerId]) => {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);

  if (!input || !container) return;

  function clearIfComplete() {
    const value = input.value.trim();
    const complete =
      input.type === "email"
        ? value !== "" && input.checkValidity()
        : value !== "";

    if (complete) {
      container.classList.remove("field-incomplete");
      input.classList.remove("field-incomplete-entry");
    }
  }

  input.addEventListener("input", clearIfComplete);
  input.addEventListener("change", clearIfComplete);
});

document
  .querySelectorAll(
    'input[name="gender"], input[name="experience"], input[name="classSize"]',
  )
  .forEach((input) => {
    input.addEventListener("change", () => {
      const container = input.closest(".tutorWizardQuestionContainer");

      if (container?.querySelector('input[type="radio"]:checked')) {
        container.classList.remove("field-incomplete");
      }
    });
  });
const tutors = [
  {
    name: "Bob",
    age: 15,
    prefferedFormat: ["one-on-one", "small group", "large group", "seminar"],
    topics: ["algebra", "geometry", "number theory", "probability"],
    availability: [
      {
        day: "Monday",
        start: "16:00",
        end: "12:00",
        type: "Open"
      },
    ],
    preferredGrade: [1, 2, 3],
    minLevel: 1,
    maxLevel: 5,
    competitions: ["AMC 10", "Waterloo"],
    personalStatement: "hi I'm bob. [...]",
    image: "\\images\\adalynn_le.jpeg",
    Email: "bob@saintlymath.com",
    country: "USA",
    currentSessions: [
      {
        format: "one-on-one",
        open: false,
        start: "10:00",
        end: "11:00",
        subject: "Algebra",
        weekDay: "Tuesday",
        statement: "Yo",
        capacity:  10,
        enrolled: 3,
     },
      {
        format: "small-group",
        open: true,
        capacity: 5,
        enrolled: 3,
        start: "12:00",
        end: "13:00",
        weekDay: "Monday",
        subject: "Algebra",
        statement: "Learn about algebra!",
      },
      {
        format: "large-group",
        open: true,
        capacity: 15,
        enrolled: 10,
        start: "13:00",
        end: "14:00",
        weekDay: "Monday",
        statement: "In this ____ week course, we cover _____, ____ and _____",
      },
    ],
  },
];
function createTutorCard(tutor) {
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="tutorCard howworkcard" style="flex: 0 0 50%">  
      <span style="display: flex; flex-direction: row; gap: 20px;">
      <img src=${tutor.image} alt="${tutor.name}" class="tutorImage">
      <div style="display: flex; flex-direction: column; justify-content: center; gap: 0px;">
      <h4 class="amc10subtitle" style="font-size: 35px; margin: 0;">${tutor.name}</h4>
        <p style="margin: 0;">Age: ${tutor.age}</p>
        <p style="margin: 0;">Country: ${tutor.country}</p>
        <p>
      </div>
      </span>
      <hr style="margin-bottom: 10px">
      <div id="tagsContainer" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 10px;">
      </div>
      <p>${tutor.personalStatement}</p>
    </div>`;
  const tutorCard = card.querySelector(".tutorCard");
  createAvailabilityButton(tutor, tutorCard);
  document.getElementById("tutorCardsContainer").appendChild(card);
  tutor.topics.forEach((topic) => {
    addSubjectTag(topic);
  });
}
function addSubjectTag(topic) {
  const tag = document.createElement("span");
  tag.className = "subjectTag";
  if (userProfileLocal) {
    if (
      userProfileLocal[0].subjectPreferences.needHelp.includes(
        capitalizeWords(topic),
      ) ||
      userProfileLocal[0].subjectPreferences.couldUseHelp.includes(topic)
    ) {
      tag.className = "subjectTag match";
    }
  }
  tag.innerHTML = topic;
  document.getElementById("tagsContainer").appendChild(tag);
}
function capitalizeWords(sentence) {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function createAvailabilityButton(tutor, card) {
  const button = document.createElement("button");
  button.classList = "start-practice";
  button.innerHTML = "View Availability";
  button.addEventListener("click", function () {
    loadTutorAvailability(tutor);
  });
  card.appendChild(button);
}
let view = "calendar"
function loadTutorAvailability(tutor) {
document.getElementById("availabilityModal").style.display = "block"
showTutorAvailability(tutor)
loadOpenGroups(tutor)
overlay.style.display = "block"
document.getElementById("calendarView").style.display = "block"
document.getElementById("cardsView").style.display = "none"
document.getElementById("toggleView").innerHTML = "Switch to Classes View"
view = "calendar"
}
document.getElementById("toggleView").addEventListener("click", function() {
  if (view === "calendar"){
    document.getElementById("calendarView").style.display = "none"
    document.getElementById("cardsView").style.display = "block"
    document.getElementById("toggleView").innerHTML = "Switch to Calendar View"
    view = "classes"
  } else {
document.getElementById("calendarView").style.display = "block"
document.getElementById("cardsView").style.display = "none"
document.getElementById("toggleView").innerHTML = "Switch to Classes View"
view = "calendar"
  }
})

function loadTutors(){
  document.getElementById("tutorCatalogContainer").style.display = "block";
  document.getElementById("tutorSelectionWizard").style.display = "none";
  tutors.forEach(tutor => {
    createTutorCard(tutor);
  });
}
function lockTutorForm(){
  document.getElementById("tutorCatalogContainer").style.display = "none"
  document.getElementById("tutorSelectionWizard").style.display = "none"
  document.getElementById("locked").style.display = "block"
  overlay.style.display = "block"
}
const tutorCalendar = document.getElementById("tutorCalendar")
const tutorCalendarDateTimeArray = []
for (let hour = START_HOUR; hour < END_HOUR; hour++) {

  for (let half = 0; half < 2; half++) {
    const minutes = hour * 60 + half * SLOT_MINUTES;
    const timeLabel = document.createElement("div");
    timeLabel.className = "calendarTimeLabel tutorCalendar";
    if (half === 0) {
      timeLabel.textContent = formatTime(minutes);
    }
          const id = {
      minutes: formatTime(minutes),
      type: "time slot"
     }
     tutorCalendarDateTimeArray.push(id)
    tutorCalendar.appendChild(timeLabel);
    days.forEach((day) => {
     const id = {
      day: day,
      minutes: minutes,
      time: formatTime(minutes),
      type: "day slot"
     }
      tutorCalendarDateTimeArray.push(id)
      const slot = document.createElement("div");
      slot.className = "calendarSlot tutorCalendar";
      slot.dataset.day = day;
      slot.dataset.minutes = minutes;
      slot.dataset.time = formatTime(minutes);
      tutorCalendar.appendChild(slot);
    });
  }
}
function showTutorAvailability(tutor) {
  const tzOffsetMinutes = getTimeZoneOffsetMinutes(userProfileLocal[0].timeZone)
  tutor.availability.forEach((slot) => {
  let localMinutes = formatTime(timeToMinutesPastMidnight(slot.start) + tzOffsetMinutes)
    Array.from(tutorCalendar.children).forEach((box, index) => {
      if (tutorCalendarDateTimeArray[index].type == "day slot"){
        box.innerHTML = ""
        box.backgroundColor = "var(--background-color)" 
      if (tutorCalendarDateTimeArray[index].day === slot.day && tutorCalendarDateTimeArray[index].time == localMinutes) {
        box.style.backgroundColor = "var(--highlight-color)";
        box.innerHTML = `<p>${slot.type} Session: ${localMinutes}-${formatTime(timeToMinutesPastMidnight(localMinutes) + 30)}`
        const startSlots = []
        userProfileLocal[0].availability.forEach(i => {
          startSlots.push(formatTime(timeToMinutesPastMidnight(i.time)))
        })
        if (startSlots.includes(localMinutes)){
        box.style.border = "0.5px solid var(--primary-color)"
        box.style.padding = "5px"
        box.style.borderRadius = "5px"
        box.style.fontSize="10px"
        box.style.color = "var(--primary-color)"
        } else {
        box.style.border = "0.5px solid var(--accent-color)"
        box.style.padding = "5px"
        box.style.borderRadius = "5px"
        box.style.fontSize="10px"
        box.style.color = "var(--accent-color)"
        box.style.backgroundColor = "var(--highlight-color-orange)"
        }
      }
      }  
      box.addEventListener("click", function() {
        applyToSession(tutor, slot)
  })
    });
  });
}
function getPreviousDay(day) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const index = days.indexOf(day);
  return days[(index - 1 + 7) % 7];
}

function getNextDay(day) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const index = days.indexOf(day);
  return days[(index + 1) % 7];
}
function getTimeZoneOffsetMinutes(timeZoneString) {
  const ianaMap = {
    'PT': 'America/Los_Angeles',
    'PST': 'America/Los_Angeles',
    'PDT': 'America/Los_Angeles',
    'MT': 'America/Denver',
    'MST': 'America/Denver',
    'MDT': 'America/Denver',
    'CT': 'America/Chicago',
    'CST': 'America/Chicago',
    'CDT': 'America/Chicago',
    'ET': 'America/New_York',
    'EST': 'America/New_York',
    'EDT': 'America/New_York',
    'AKT': 'America/Anchorage',  
    'HT': 'Pacific/Honolulu',   
    'UTC': 'UTC'
  };

  const resolvedTimeZone = ianaMap[timeZoneString.toUpperCase()] || timeZoneString;

  const date = new Date();
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  let tzDate;
  
  try {
    tzDate = new Date(date.toLocaleString('en-US', { timeZone: resolvedTimeZone }));
  } catch (e) {
    console.warn(`Invalid timezone "${timeZoneString}", falling back to UTC.`);
    tzDate = utcDate;
  }
  
  return (tzDate - utcDate) / 60000;
}

function convertLocalMinutesToUTC(day, localMinutes, userTimeZone) {
  const tzOffsetMinutes = getTimeZoneOffsetMinutes(userTimeZone);

  let utcMinutes = localMinutes - tzOffsetMinutes;
  let adjustedDay = day;
  if (utcMinutes < 0) {
    utcMinutes += 1440; 
    adjustedDay = getPreviousDay(day);
  } else if (utcMinutes >= 1440) {
    utcMinutes -= 1440;
    adjustedDay = getNextDay(day);
  }

  return { day: adjustedDay, minutes: utcMinutes };
}
function timeToMinutesPastMidnight(timeStr) {
  const cleanStr = timeStr.trim().toUpperCase()
  const isPM = cleanStr.includes('PM')
  const isAM = cleanStr.includes('AM')
  const timePart = cleanStr.replace(/[AP]M/i, '').trim();
  const [hourStr, minuteStr] = timePart.split(':');
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10) || 0;
  if (isPM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }
  return (hours * 60) + minutes;
}
function loadOpenGroups(tutor){
  tutor.currentSessions.forEach(session => {
    const card = document.createElement("div")
    const tzOffsetMinutes = getTimeZoneOffsetMinutes(userProfileLocal[0].timeZone)
      const enrollmentTag = document.createElement("div")
    enrollmentTag.innerHTML = `${session.enrolled}/${session.capacity} enrolled`
    if (session.capacity - session.enrolled > 3){
      enrollmentTag.classList = "subjectTag match"
    } else {
      enrollmentTag.classList = "subjectTag"
    }
    enrollmentTag.style.maxWidth = "125px"
    enrollmentTag.style.textAlign = "center"
    const subjectTag = document.createElement("div")
    subjectTag.innerHTML = session.subject
    subjectTag.style.maxWidth = "125px"
    subjectTag.style.textAlign = "center"
    console.log(userProfileLocal[0])
    if (userProfileLocal[0].subjectPreferences.couldUseHelp.includes(session.subject) || userProfileLocal[0].subjectPreferences.needHelp.includes(session.subject)){
      subjectTag.classList = "subjectTag match"
    } else {
      subjectTag.classList = "subjectTag"
    }
    const sizeTag = document.createElement("div")
    sizeTag.innerHTML = session.format
    console.log(userProfileLocal[0])
    console.log(session)
    if (session.format === userProfileLocal[0].classSize){
      sizeTag.classList = "subjectTag match"
    } else {
      sizeTag.classList = "subjectTag"
    }
    console.log(userProfileLocal[0])
    card.innerHTML = `
    <div class="howworkcard">
    <h3 class="amc10subtitle ittyBitty">${session.weekDay} - ${formatTime(timeToMinutesPastMidnight(session.start) + tzOffsetMinutes)}-${formatTime(timeToMinutesPastMidnight(session.end) + tzOffsetMinutes)}</h3>`
    const tagsContainerCard = document.createElement("div")
    tagsContainerCard.innerHTML = `<div class="tagsContainerCard" style="display: flex; flex-direction: row; gap: 10px; margin-top: "></div>`
    tagsContainerCard.querySelector(".tagsContainerCard").appendChild(enrollmentTag)
    tagsContainerCard.querySelector(".tagsContainerCard").appendChild(subjectTag)
    tagsContainerCard.querySelector(".tagsContainerCard").appendChild(sizeTag)
    card.querySelector(".howworkcard").appendChild(tagsContainerCard)
    const description = document.createElement("div")
    description.innerHTMl = session.description
    card.querySelector('.howworkcard').appendChild(description)
    const button = document.createElement("button")
    button.classList = "start-practice"
    button.innerHTML = "Apply to This Group!"
    button.style.alignSelf = "flex-start"
    button.style.jutifySelf = "flex-star"
 button.addEventListener("click", function() {
      applyToSession(tutor, session)
    })
    card.querySelector(".howworkcard").appendChild(button)
    document.getElementById("tutorGroupCardsContainer").appendChild(card)
  })
}
function applyToSession(tutor, session){
  console.log(session)
  
  document.getElementById("sessionApplicationModal").style.display = "block"
  document.getElementById("overlay").style.display = "block"
  document.getElementById("availabilityModal").style.display = "none"
  document.getElementById("applicationPreview").innerHTML = `
  <div class="howworkcard">
  <p class="par" style="color: red">*Preview of the email that your prospective tutor will recieve</p>
  <h3 class="amc10subtitle ittyBitty">A new student has applied to your session!</h3>
  <p><b>Session: </b>${session.weekDay}: ${session.start}-${session.end}
  <p><b>Name: </b>${userProfileLocal[0].fullName}</p>
  <p><b>Age: </b>${userProfileLocal[0].age}</p>
  <p><b>Gender: </b>${userProfileLocal[0].gender}</p>
  <p><b>Experience Level: </b>${userProfileLocal[0].experience}</p>
<p><b>Subject Preferences: </b>
  ${userProfileLocal[0].subjectPreferences.couldUseHelp.join(", ")}, 
  ${userProfileLocal[0].subjectPreferences.needHelp.join(", ")}
</p>
  <p><b>Description: </b>${userProfileLocal[0].description}`
  const button = document.createElement("button")
  button.classList = "start-practice"
  button.addEventListener("click", async (event) => {
    event.preventDefault()
    contactTutor(tutor, session)
  })


}
/*
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/dvrw2e5xliyht9v8sg5ptv7jht7v5puyE";

document.querySelector("#applicationForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form));

  const payload = {
    studentName: userProfileLocal[0].fullName,
    studentEmail: userProfileLoca[0].email,
    tutorEmail: tutor.email,
    roupName: `${session.weekDay} +  ${session.start}-${session.end}$` ,
    wizardDetails: {
      subject: userProfileLocal[0].couldUseHelp + userProfileLocal[0].needHelp,
      level: userProfieLocal[0].experience,
      gender: userProfileLocal[0].gender
    }
  };

  try {
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  
  } catch (error) {
    console.error(error);

  }
});
*/
document.getElementById("editApplication").addEventListener("click", function() {
  document.getElementById("tutorSelectionWizard").style.display = "block"
  overlay.style.display = "none"
  document.querySelectorAll(".helpPannel").forEach(item =>
    item.style.display = "none"
  )
  document.getElementById("tutorCatalogContainer").style.display = "none"
  document.getElementById("tutorFormComplete").style.display = "none"
  
  document.getElementById("updateApplicationEdits").style.display = "block"
  populateWizardForm(userProfileLocal[0])
})
function convertUTCMinutesToLocal(utcDay, utcMinutes, userTimeZone) {
  const tzOffsetMinutes = getTimeZoneOffsetMinutes(userTimeZone);
  let localMinutes = utcMinutes + tzOffsetMinutes;
  let adjustedDay = utcDay;
  if (localMinutes < 0) {
    localMinutes += 1440;
    adjustedDay = getPreviousDay(utcDay);
  } else if (localMinutes >= 1440) {
    localMinutes -= 1440;
    adjustedDay = getNextDay(utcDay);
  }
  return { day: adjustedDay, minutes: localMinutes };
}

function populateWizardForm(profile) {
  if (!profile) return;

  document.getElementById("fullName").value = profile.fullName || "";
  document.getElementById("preferredName").value = profile.preferredName || "";
  document.getElementById("age").value = profile.age || "";
  document.getElementById("grade").value = profile.grade || "";
  document.getElementById("email").value = profile.email || "";
  document.getElementById("studentDescription").value = profile.description || "";
  document.getElementById("timeZone").value = profile.timeZone || "";

  if (profile.gender) {
    const genderEl = document.getElementById(profile.gender) || document.querySelector(`input[name="gender"][id="${profile.gender}"]`);
    if (genderEl) genderEl.checked = true;
  }
  if (profile.experience) {
    const expEl = document.querySelector(`input[name="experience"][value="${profile.experience}"]`);
    if (expEl) expEl.checked = true;
  }
  if (profile.classSize) {
    const classEl = document.querySelector(`input[name="classSize"][value="${profile.classSize}"]`);
    if (classEl) classEl.checked = true;
  }
  document.querySelectorAll(".placedSubject").forEach(placed => {
    const subjectName = placed.dataset.subject;
    const originalChip = document.querySelector(`.subjectChip[data-subject="${subjectName}"]`);
    if (originalChip) originalChip.style.display = "";
    placed.remove();
  });
  subjectDropZones.forEach(zone => restorePlaceholder(zone));

  const categoryMap = {
    needHelp: "need-help",
    couldUseHelp: "could-use-help",
    comfortable: "comfortable",
    noHelp: "no-help"
  };

  if (profile.subjectPreferences) {
    Object.entries(profile.subjectPreferences).forEach(([key, subjects]) => {
      const dataCategory = categoryMap[key];
      const zone = document.querySelector(`.subjectDropZone[data-category="${dataCategory}"]`);
      if (zone && Array.isArray(subjects)) {
        subjects.forEach(subjectName => {
          const chip = document.querySelector(`.subjectChip[data-subject="${subjectName}"]`);
          if (chip) {
            placeSubject(chip, zone);
          }
        });
      }
    });

  selectedCalendarAvailability.clear();
  calendarSlots.forEach(slot => slot.classList.remove("selectedCalendar"));

  if (profile.availability && Array.isArray(profile.availability)) {
    const userTimeZone = profile.timeZone || "PT";
    profile.availability.forEach(slot => {
      const localObj = convertUTCMinutesToLocal(slot.day, slot.minutes, userTimeZone);
      const key = localObj.day + "|" + localObj.minutes;
      selectedCalendarAvailability.add(key);
      const slotEl = document.querySelector(`.calendarSlot[data-day="${localObj.day}"][data-minutes="${localObj.minutes}"]`);
      if (slotEl) {
        slotEl.classList.add("selectedCalendar");
      }
    });
    updateSelectionEdges();
  }
  }
}
document.getElementById("updateApplicationEdits").addEventListener("click", async (event) => {
  event.preventDefault();
  if (!validateTutorForm()) return;

  const userTimeZone = document.getElementById("timeZone").value
  const updatedProfile = {
    fullName: document.getElementById("fullName").value.trim(),
    preferredName: document.getElementById("preferredName").value.trim(),
    age: Number(document.getElementById("age").value),
    grade: document.getElementById("grade").value.trim(),
    email: document.getElementById("email").value.trim(),
    gender: document.querySelector('input[name="gender"]:checked')?.id || "",
    experience: document.querySelector('input[name="experience"]:checked')?.value || "",
    subjectPreferences: {
      needHelp: getSubjects("need-help"),
      couldUseHelp: getSubjects("could-use-help"),
      comfortable: getSubjects("comfortable"),
      noHelp: getSubjects("no-help"),
    },
    classSize: document.querySelector('input[name="classSize"]:checked')?.value || "",
    description: document.getElementById("studentDescription").value.trim(),
    timeZone: userTimeZone,
    availability: getAvailabilityData(userTimeZone),
  }

  userProfileLocal[0] = updatedProfile;

  document.getElementById("tutorSelectionWizard").style.display = "none";
  document.getElementById("tutorCatalogContainer").style.display = "block";
  document.getElementById("updateApplicationEdits").style.display = "none";
  document.getElementById("tutorFormComplete").style.display = "block";

  document.getElementById("tutorCardsContainer").innerHTML = "";
  loadTutors()

  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    await supabase
      .from("profiles")
      .update({ tutorUserProfile: updatedProfile })
      .eq("id", session.user.id)
      .select()
  }
});

const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/dvrw2e5xliyht9v8sg5ptv7jht7v5puyE";
async function contactTutor(tutor, session){
 const payload = {
  studentName: userProfileLocal[0].fullName,
  studentEmail: userProfileLocal[0].email,
  tutorEmail: tutor.email,
  groupName: `${session.weekDay}: ${session.start}-${session.end}`,
  level: userProfileLocal[0].experience,
  gender: userProfileLocal[0].gender,
  description: userProfileLocal[0].description
 }
 try{
  const response = await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  if (!response.ok) throw new Error(`Request failed ${response.status}`)
 } catch (error) {
  console.error(error)
}
}
