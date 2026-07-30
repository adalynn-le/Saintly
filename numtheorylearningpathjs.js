const toggleBrightness = document.getElementById("brightness")
const carouselLight = document.querySelectorAll("carousel-logo-light")
const carouselDark = document.querySelectorAll("carousel-logo-dark")
let colorMode = 'light'
let colorModeTrue = localStorage.getItem("colorMode")
if  (colorModeTrue !== false){
       colorMode =  colorModeTrue
 if (colorMode === 'dark'){
                colorMode = 'dark';
                document.documentElement.style.colorScheme = 'dark'; 
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                toggleBrightness.textContent = "sunny"
                localStorage.setItem("colorMode", "dark")
        } else {
                colorMode = 'light';
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                toggleBrightness.textContent = "bedtime"
                localStorage.setItem("colorMode", "light")
        }
} else {
function toggleSystemTheme() {
  const root = document.documentElement;
  
  // 1. Check what the system preference is, or if it's already set
  if (!root.style.colorScheme) {
    // If it's not set yet, match the user's system preferences
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.style.colorScheme = prefersDark ? 'dark' : 'light';
  }
  
  colorMode = root.style.colorScheme;

  // 2. Add the correct matching class right away so the logos render correctly!
  if (colorMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
  } else {
      root.classList.add('light');
      root.classList.remove('dark');
  }
}
toggleSystemTheme();
}
toggleBrightness.addEventListener("click", function(){
        if (colorMode === 'dark'){
                colorMode = 'light';
                document.documentElement.style.colorScheme = 'light'; 
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                toggleBrightness.textContent = "bedtime"
                localStorage.setItem("colorMode", colorMode)
        } else {
                colorMode = 'dark';
                document.documentElement.style.colorScheme = 'dark';
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                toggleBrightness.textContent = "sunny"
                localStorage.setItem("colorMode", colorMode)
        }
});
 const helpPannel = document.getElementById("helpPannel")
const { createClient } = window.supabase;
const supabaseURL = 'https://joevkictcfaoofqhbhgw.supabase.co';
const supabaseKey = 'sb_publishable_8Iat4psKXuFn91uT8yuw7g_2n3Buc5w';
const supabase = createClient(supabaseURL, supabaseKey);
      let helpOn = false;
  let helpBtn = document.getElementById('helpButton')
let accountTrue = false
let accountBtn = document.getElementById("accountBtn")
let accountPannel = document.getElementById("accountPannel")
let overlay = document.getElementById("overlay")
accountBtn.addEventListener("click", function () {
        let account = true

    document.getElementById("no-account").addEventListener("click", function() {
    if (account === false){
        account = true
        document.getElementById("login").style.display = "block"
        document.getElementById("signup").style.display = "none"
                document.getElementById("no-account").innerHTML = "Don't have an account? Sign up!"
    } else {
        document.getElementById('login').style.display = "none"
        account = false
        document.getElementById("signup").style.display = "block"
        document.getElementById("no-account").innerHTML = "Already have an account? Log in!"
    }
    })
    helpPannel.style.display  = "none"
    if (accountTrue === false){
        accountPannel.style.display = "block"
        overlay.style.display = "block"
        accountTrue = true
    } else {
        accountPannel.style.display = "none"
        overlay.style.display = "none"
        accountTrue = false
    }
})
overlay.addEventListener("click", function(){
    if (helpOn === true){
        helpPannel.style.display = "none";
        overlay.style.display = "none"; 
        helpOn = false;
    } 
    if (accountTrue === true){
        accountPannel.style.display = "none"
        overlay.style.display = "none"
        accountTrue = false
    }
})
helpBtn.addEventListener("click", function () {
    if (helpOn === true){
        helpPannel.style.display = "none";
        overlay.style.display = "none"; 
        helpOn = false;
    } else {
        helpPannel.style.display = "block";
        overlay.style.display = "block";
        helpOn = true
    }
});
let statisticsLevel = ""
let propertiesOfNumbersLevel = ""
let numberSenseLevel = ""
//-----------------------Authentication--------------------------
async function loadUserStats(userId) {
  const { data: profile, error } = await supabase
    .from('profiles')
   .select('id, username, statisticsLevel, propertiesOfNumbersLevel, numberSenseLevel')
   .eq('id', userId)

  if (error) {
    console.error("Error downloading profile data:");
    return;
  }
  if (profile) {
    let userProfile = profile[0]
    document.getElementById("username-display").innerHTML = userProfile.username
    document.getElementById("btn-dashboard").innerHTML = userProfile.username
    statisticsLevel = userProfile.statisticsLevel || "not started"
    propertiesOfNumbersLevel = userProfile.propertiesOfNumbersLevel || "not started"
    numberSenseLevel = userProfile.numberSenseLevel || "not started"
    loadNodes()
    checkingForDiagnostic()
  } 
}
const loginBtn = document.getElementById("btn-login");
loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("login-email").value.trim()
    const password = document.getElementById("login-password").value
    if (!email || !password) {
        
document.getElementById("login-error").innerHTML = "Please Input Both Fields"
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
  document.getElementById('accountPannel').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
  accountTrue = false
  // 3. Pull their ELO data out of the database (Step 2 below)
  await loadUserStats(data.user.id);
  
  // Reset button state
  loginBtn.disabled = false;
  loadNodes()
  loadProgressBar()

})
const logoutBtn = document.getElementById('btn-logout');

logoutBtn.addEventListener('click', async () => {
            document.getElementById("login").style.display = "block"
  // 1. Call Supabase to clear the secure cloud session
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error logging out: " + error.message);
    return;
  }


  alert("You have been logged out successfully!");
  window.location.reload();
  statisticsLevel = "not started"
  lock()
});

const deleteAccountBtn = document.getElementById('btn-delete-account');

if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener('click', async () => {
    const confirmed = confirm("Are you absolutely sure you want to delete your account? This will permanently erase your math rankings, diagnostic logs, and history. This action cannot be undone.");
    
    if (!confirmed) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const userId = session.user.id;

    // 3. Clear their specific user row from your public profiles table
    const { error: dbError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

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
  const passwordCheck = document.getElementById("auth-password-check").value
  if (!email || !password || !username) {
    document.getElementById("signup-error").innerHTML = "Please fill out all fields"
    return;
  }



  // 2. Insert their CURRENT ELO ratings into your 'profiles' table
  if (password === passwordCheck){

      // 1. Create the user credentials using your existing supabase client
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return alert(error.message);
  if (data.user) {
    
    await supabase.from('profiles').insert([
      { 
        id: data.user.id, 
        username: username, 
      }
    ]);
    
    alert("Account created!");
    
    document.getElementById('accountPannel').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById("username-display").innerHTML = username
  }
  } else {
    document.getElementById("signup-error").innerHTML = "Passwords do not match"
    return
  }
  loadNodes()
  loadProgressBar()
});



supabase.auth.onAuthStateChange(async (event, session) => {
  const accountBtn = document.getElementById('accountBtn');
  const logoutBtn = document.getElementById('btn-logout');
  const loginBtn = document.getElementById('btn-login');
  const signup = document.getElementById('no-account');
  const login = document.getElementById('login');
  const usernameDisplay = document.getElementById("username-display");
  const createAccount = document.getElementById("no-account")
  const deleteAccount = document.getElementById("btn-delete-account")
  const usernameDisplayModal = document.getElementById("btn-dashboard")

  // A. Check if a secure user session actually exists
  if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {

    // Toggle UI display blocks safely
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (login) login.style.display = "none";
    if (createAccount) createAccount.style.display = "none"
    if (deleteAccount) deleteAccount.style.display = "block"
    if (usernameDisplayModal) usernameDisplayModal.style.display = "block"
  loadUserStats(session.user.id)
  } else  {
    lock()
    if (typeof runDiagnostic === "function")
    
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (login) login.style.display = "block";
    if (usernameDisplay) usernameDisplay.innerHTML = "Log In";
    if (createAccount) createAccount.style.display = "block"
    if (deleteAccount) deleteAccount.style.display = "none"
    if (usernameDisplayModal) usernameDisplayModal.style.display = "none"
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
      redirectTo: window.location.origin + '/update-password.html',
    });

    if (error) {
      console.error("Reset request failed:", error.message);
      alert("Error: " + error.message);
    } else {
      alert("Check your inbox! A secure password reset link has been sent.");
    }
  });
}
let completedLessons = 0
function loadNodes(){
    document.querySelector(".chooseYourPathNode").style.color = "#88B0FF"
    document.querySelector(".chooseYourPathNode").classList.remove("locked")
    document.querySelector(".chooseYourPathNode").classList.add("completedNode")
    document.querySelector(".chooseYourPathNode").querySelector(".material-symbols-rounded").innerHTML = "check"
    if (statisticsLevel == "averages"){
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("averagesNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("averagesNode").href = "averages learning path.html"
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.add("locked")
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("mediansNode").removeAttribute("href")
        completedLessons += 1
    } else if (statisticsLevel == "medians"){
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("averagesNode").removeAttribute("href")
        document.getElementById("averagesNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("mediansNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("mediansNode").href = "medians learning path.html"
        completedLessons += 2
    } else if (statisticsLevel == "completed"){
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("averagesNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("averagesNode").removeAttribute("href")
        document.getElementById("averagesNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("mediansNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("mediansNode").removeAttribute("href")
        document.getElementById("mediansNode").querySelector(".material-symbols-rounded").innerHTML = "check"
    }
    if (propertiesOfNumbersLevel == "prime factorization"){
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("primeFactorizationNode").href = "prime factorization num learning path.html"
        document.getElementById("primeFactorizationNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.add("locked")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("factoringNode").removeAttribute("href")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.add("locked")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("modularArithmeticNode").removeAttribute("href")
        completedLessons += 1
    } else if (propertiesOfNumbersLevel == "factoring"){
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("factoringNode").href = "factoring num learning path.html"
        document.getElementById("factoringNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.add("locked")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("modularArithmeticNode").removeAttribute("href")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("primeFactorizationNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("primeFactorizationNode").removeAttribute("href")
        completedLessons += 2
    } else if (propertiesOfNumbersLevel == "modular arithmetic"){
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("modularArithmeticNode").href = "modular arithmetic learning path.html"
        document.getElementById("modularArithmeticNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("factoringNode").removeAttribute("href")
        document.getElementById("factoringNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("primeFactorizationNode").removeAttribute("href")
        document.getElementById("primeFactorizationNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        completedLessons += 3
    } else if (propertiesOfNumbersLevel == "completed"){
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("primeFactorizationNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("primeFactorizationNode").removeAttribute("href")
        document.getElementById("primeFactorizationNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("factoringNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("factoringNode").removeAttribute("href")
        document.getElementById("factoringNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("modularArithmeticNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("modularArithmeticNode").removeAttribute("href")
        document.getElementById("modularArithmeticNode").querySelector(".material-symbols-rounded").innerHTML = "check"
    }
    if (numberSenseLevel == "logic"){
        document.getElementById("logicNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("logicNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("logicNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("logicNode").href = "logic num learning path.html"
        document.getElementById("logicNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("countingNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("countingNode").querySelector(".lessonNode").classList.add("locked")
        document.getElementById("countingNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("countingNode").removeAttribute("href")
        completedLessons += 1
    } else if (numberSenseLevel == "counting"){
        document.getElementById("countingNode").querySelector(".lessonNode").classList.add("currentNode")
        document.getElementById("countingNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("countingNode").querySelector(".lessonNode").classList.remove("completedNode")
        document.getElementById("countingNode").href = "counting num learning path.html"
        document.getElementById("countingNode").querySelector(".material-symbols-rounded").innerHTML = "star"
        document.getElementById("logicNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("logicNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("logicNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("logicNode").removeAttribute("href")
        document.getElementById("logicNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        completedLessons += 2
    } else if (numberSenseLevel == "completed"){
        document.getElementById("logicNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("logicNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("logicNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("logicNode").removeAttribute("href")
        document.getElementById("logicNode").querySelector(".material-symbols-rounded").innerHTML = "check"
        document.getElementById("countingNode").querySelector(".lessonNode").classList.remove("currentNode")
        document.getElementById("countingNode").querySelector(".lessonNode").classList.remove("locked")
        document.getElementById("countingNode").querySelector(".lessonNode").classList.add("completedNode")
        document.getElementById("countingNode").removeAttribute("href")
        document.getElementById("countingNode").querySelector(".material-symbols-rounded").innerHTML = "check"
    }
}
let progressBarLoaded = false
function loadProgressBar() {
  if (progressBarLoaded == false) {
    document.getElementById("progress-bar-learning").style.width = (completedLessons / 7).toLocaleString('en-US', { style: 'percent' })
    document.getElementById("lessonsCompletedLabel").innerHTML = `Lessons Completed ${completedLessons}/7`
    progressBarLoaded = true
  } 
  
}
function lock() {
  accountBtn.click()
  document.getElementById("diagnosticShow").style.display = "none"
  document.getElementById("chooseYourPath").querySelector(".lessonNode").classList.remove("currentNode")
  document.getElementById("chooseYourPath").querySelector(".lessonNode").classList.add("locked")
  document.getElementById("chooseYourPath").querySelector(".material-symbols-rounded").innerHTML = "lock"
  document.getElementById("chooseYourPath").removeAttribute("href")
  completedLessons = 0
  loadProgressBar()
  document.getElementById("lessonsCompletedLabel").innerHTML = "Log In to Access Learning Pathways!"
}


// --- Integrated Draggable Floating Scratchpad Engine ---
const scratchPopup = document.getElementById("scratchpad-popup");
const scratchHeader = document.getElementById("scratchpad-header");
const scratchCanvas = document.getElementById("scratchpad-canvas");
const toggleScratchBtn = document.getElementById("btn-toggle-scratchpad");
const clearScratchBtn = document.getElementById("btn-clear-scratchpad");
const closeScratchBtn = document.getElementById("btn-close-scratchpad");

if (scratchPopup && scratchHeader && scratchCanvas) {
  const ctx = scratchCanvas.getContext("2d");
  let isDrawing = false;
  let lastX = 0, lastY = 0;

  // --- 1. Open / Close Window Visibility Toggles ---
  function openScratchpad() {
    scratchPopup.style.display = "block";
    setupBrushColors();
  }

  function closeScratchpad() {
    toggleScratchBtn.innerHTML = "Open Scratchpad"
    scratchPopup.style.display = "none";
  }

  toggleScratchBtn.addEventListener("click", () => {
    if (scratchPopup.style.display === "none" || scratchPopup.style.display === "") {
      openScratchpad();
      toggleScratchBtn.innerHTML = "Close Scratchpad"
    } else {
      closeScratchpad();
      toggleScratchBtn.innerHTML = "Open Scratchpad"
    }
  });

  closeScratchBtn.addEventListener("click", closeScratchpad);
  
  clearScratchBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  });

  function setupBrushColors() {
    let computedColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    ctx.strokeStyle = computedColor ? computedColor : '#4A90E2'; 
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  // --- 2. Canvas Core Drawing Mechanics ---
  function getCanvasCoordinates(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  scratchCanvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const coords = getCanvasCoordinates(e);
    [lastX, lastY] = [coords.x, coords.y];
  });

  scratchCanvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    [lastX, lastY] = [coords.x, coords.y];
  });

  const stopDrawing = () => isDrawing = false;
  scratchCanvas.addEventListener("mouseup", stopDrawing);
  scratchCanvas.addEventListener("mouseleave", stopDrawing);

  // Mobile Drawing Support
  scratchCanvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const coords = getCanvasCoordinates(e);
    [lastX, lastY] = [coords.x, coords.y];
  });
  scratchCanvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    [lastX, lastY] = [coords.x, coords.y];
  });
  scratchCanvas.addEventListener("touchend", stopDrawing);


  // --- 3. Window Translation Component (Dragging Logic) ---
  let isDraggingWindow = false;
  let offsetX = 0, offsetY = 0;

  function startWindowDrag(e) {
    // Prevent text highlight selection artifacts during runtime translation
    if (e.target === clearScratchBtn || e.target === closeScratchBtn) return;
    
    isDraggingWindow = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    offsetX = clientX - scratchPopup.offsetLeft;
    offsetY = clientY - scratchPopup.offsetTop;
  }

  function dragWindow(e) {
    if (!isDraggingWindow) return;
    e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    scratchPopup.style.left = (clientX - offsetX) + "px";
    scratchPopup.style.top = (clientY - offsetY) + "px";
  }

  function stopWindowDrag() {
    isDraggingWindow = false;
  }

  // Desktop Drag Bindings
  scratchHeader.addEventListener("mousedown", startWindowDrag);
  document.addEventListener("mousemove", dragWindow);
  document.addEventListener("mouseup", stopWindowDrag);

  // Mobile Drag Bindings
  scratchHeader.addEventListener("touchstart", startWindowDrag);
  document.addEventListener("touchmove", dragWindow, { passive: false });
  document.addEventListener("touchend", stopWindowDrag);
}
let correctCount = 0;
let wrongCount = 0;
let longestStreak = 0;
function toggleSubMenu(button){
    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');
}
const doyouhateme = [
    { name: "Edward", value: 21},
    {name: "Sharpe", value: 37},
    {name: "harry", value: 10},
];
doyouhateme.sort((a,b) => a.value - b.value);



// ---------- Shuffle Function ----------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const highlight = document.getElementById("highlight");



function showHighlight() {


    // reset
    highlight.style.transition = 'none';
    highlight.style.transform = 'scaleX(0)';
    highlight.style.left = '0';
    highlight.offsetHeight; // force reflow
            // Step 1: expand from left to right
    highlight.style.transition = 'transform 0.3s ease-out';
    highlight.style.transform = 'scaleX(1)';

    // Step 2: slide left edge in to close
    setTimeout(() => {
        highlight.style.transition = 'transform 0.3s ease-in, left 0.3s ease-in';
        highlight.style.transform = 'scaleX(0)';
        highlight.style.left = '100%';
    }, 300);

    // Reset after animation
    setTimeout(() => {
        highlight.style.transition = 'none';
        highlight.style.left = '0';
        highlight.style.transform = 'scaleX(0)';
    }, 700);
}



//------------RefCards----------------
const cardOneText = document.getElementById("carousel-card-one");
const contentCardOne = `
<h2 class="amc10subtitle">Quadratics</h2>
<h3>Quadratic Formula</h3>
$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$
<h3>Standard Form</h3>
$$ax^2+bx+c$$
<h3>Factored Form</h3>
$$a(x-r_1)(x-r_2)$$
<h3>Vertex Form</h3>
$$a(x-h)^2+k$$
<h3>Discriminant</h3>
<p>If \\(b^2-4ac\\) is... </p>
<p>\\(>0\\)? →\\(2\\) real roots </p>
<p>\\(=0\\)? →\\(0\\) real roots </p>
<p>\\(<0\\)? →\\(1\\) real roots </p>
<h3><span class="material-symbols-outlined">
star_shine
</span> Why this is important <span class="material-symbols-outlined">
star_shine
</span></h3>
<p>Quadratics are generally important to know both in and outside competition math. A lot of equations and situations on the AMC can be modeled with quadratics</p>
`;
cardOneText.innerHTML = contentCardOne;
const cardTwoText = document.getElementById("carousel-card-two");
const contentCardTwo = `
<h2 class="amc10subtitle">Difference of Powers</h2>

<h3>Difference of Squares</h3>
$$a^2 - b^2 = (a+b)(a-b)$$

<h3>Difference of Cubes</h3>
$$a^3 - b^3 = (a-b)(a^2 + ab + b^2)$$

<h3>General Powers</h3>
<p>For any positive integer \(n\):</p>
$$
x^n - y^n =
$$
$$
(x-y)(x^{n-1} + x^{n-2}y + [...] + xy^{n-2} + y^{n-1})
$$
$$
x^n + y^n =
$$
$$
(x+y)(x^{n-1} - x^{n-2}y + x^{n-3}y^2 - [...] + xy^{n-2} - y^{n-1})
$$
<h3><span class="material-symbols-outlined">
star_shine
</span> Why this is important <span class="material-symbols-outlined">
star_shine
</span></h3>
<p>This is generally good to know because it saves time in the AMC 10, which is essential with an average of around 3 minutes per question</p>
`;
cardTwoText.innerHTML = contentCardTwo;
const cardThreeText = document.getElementById("carousel-card-three");
const contentCardThree = `
<h2 class="amc10subtitle">Series</h2>

<h3>Arithmetic</h3>
<p>In arithmetic series, each term is found by adding a constant number to the previous term. The sums of finite series can be found using </p>
$$
S_n=\\frac{a_1+a_n}{2}
S_n=\\frac{2a_1+(n-1)d}{2}
$$
<p>Where \\(S_n\\) is the sum, \\(a_x\\) is the \\(x\\)th term, \\(n\\) is the number of terms, and \\(d\\) is the common ifference
<h3>Geometric</h3>
<p>A geometric series occurs when each term is the previous term multiplied by a common ratio \\(r\\) </p>
<p>The sum for a finite series is</p>
$$
S_n=a\\frac{1-r^n}{1-r}
$$
<p> and for a convergent series </p>
$$
S=\\frac{a}{1-r}
$$
<h3><span class="material-symbols-outlined">
star_shine
</span> Why this is important <span class="material-symbols-outlined">
star_shine
</span></h3>
<p>Even if a series is not directly mentioned in a question, you can also easily find a way to manipulate or solve an equation by using an advanced knowledge of sequences. Look out for how patterns, sequences, etc. can be optimized with series</p>
`;
cardThreeText.innerHTML = contentCardThree;
const cardFourText = document.getElementById("carousel-card-four");
const contentCardFour = `
<h2 class="amc10subtitle">Inequalities</h2>
<h3>AM & GM Inequality</h3>
$$
\\frac{x+y}{2} \\le \\sqrt{xy}
$$
<h3><span class="material-symbols-outlined">
star_shine
</span> Why this is important <span class="material-symbols-outlined">
star_shine
</span></h3>
<p>Remember that:</p>
<p>1) Squares are ALWAYS positive</p>
<p>2) Don't solve unless you have to. You can always bind the equation with inequalities. </p>
`;
cardFourText.innerHTML = contentCardFour;
const cardFiveText = document.getElementById("carousel-card-five");
const contentCardFive = `
<h2 class="amc10subtitle">Symmetric Expressions</h2>
<h3>Symmetry</h3>
<p>Effectively, symmetry in expressions means switching \\(x\\) and \\(y\\) NEVER has an impact </p>
<h3>Most Common Exampes (Golden Pair)</h3>
$$
x+y=S
$$
$$
xy=P
$$
<p>These are important because you can derive</p>
$$
x^2+y^2=S^2-2P
$$
$$
x^3+y^3=s^3-3PS
$$
$$
x^4+y^4=(x^2+y^2)^2-2x^2y^2
$$
<h3>Quadratics Trick</h3>
<p>If \\(x\\)  and \\(y\\) are roots of the quadratic \\(z^2-Sz+P=0\\)
<p>The sum of the roots is \\(S\\) and the product is \\(P\\) (Vieta's Rules)</p>
<h3><span class="material-symbols-outlined">
star_shine
</span> Why this is important <span class="material-symbols-outlined">
star_shine
</span></h3>
<p>Algebraic manipulation is HUGE in AMC 10. Knowing symmetry can help you understand and simplify both geometry and algebra questions. </p>
`;
cardFiveText.innerHTML = contentCardFive;



// ---------Toggle Button for Questions ----------
const problemsCheckbox = document.getElementById("toggle");
const problemsCard = document.getElementById("problems-card");
const problemsWrapper = document.getElementById("problems-card");
function toggleProblems() {
loadQuestion(currentQuestion)
};

let currentQuestion = 0;

// Set initial state on page load
// Add event listener to toggle visibility



// ---------- Question Data ----------
const confettiCanvas = document.getElementById("confetti-canvas");
const myConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true
});


let questions = [
    {
        title: `AMC 10A 2020 Problem 7 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `The \\(25\\) integers from \\(-10\\) to \\(14\\), inclusive, can be arranged to form a \\(5\\)-by-\\(5\\) square in which the sum of the numbers in each row, the sum of the numbers in each column, and the sum of the
        numbers along each of the main diagonals are all the same. What is the value of the common sum?`,
        solution: `<b>10</b><p>Notice that there are multiple ways to do this, if anything because of rotational symmetry. This alone tells us that finding "the exact solution" isn't best</p>
        <p>Each number appears once. Thus, if we take the entire sum,that would give us the sum of all the rows to each other, or all the columns to each other. Since there are \\(5\\) rows/columns, we know that we can just take the total sum an divide by \\(5\\)</p>
        <p>We use the equation for the sum of all integers less than \\(n\\) which is  \\(\\frac{n(n-1)}{2}\\). We find solve this for \\(n=15\\) and then subtract \\(n=10\\). This ends up being</p>
        $$
        \\frac{15\\cdot 14}{2}-\\frac{11\\cdot 10}{2}=
        $$
        $$
        105-55
        $$
        $$
        50
        $$
        <p>Hint, this is also just 14+13+12+11=50</p>
        <p>Divide by \\(5\\)</p>
        $$
        \\frac{50}{5}=10
        $$`,
        answer: '10',
        topic: 'logic',
    },
    {
        title: `AMC 10A 4 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        text: `<p>Let \\(n\\) be the least positive integer greater than \\(1000\\) for which \\(\\textup{gcd}(63, n + 120)=21 \\textup {and gcd}(n+63, 120)=60\\)`,
        choices: ['\\(A) 12\\)', '\\(B) 15\\)', '\\(C) 18\\)', '\\(D) 21\\)', '\\(E) 24\\)'],
        answer: '\\(C) 18\\)',
        solution: `<b>18</b><p>Since \\(n+63\\) must be divisible by \\(60\\), we know it must end in \\(7\\). Thus, we are looking for a multiple of \\(21\\) greater than \\(1000\\) such that it ends in \\(7\\). Thus, the thing we are multiplying
        \\(21\\) by must end in \\(7\\). We know that \\(\\frac{1000}{21}\\) is roughly equal to \\(50\\). HOWEVER, it can't be \\(57\\) because the \\(GCD\\) would be greater for the first rule (it would be \\(63\\)). We try the next possible value: \\(67\\) (iyky). This is prime, so we don't have to worry about other 
        \\(\\textup{gcd}\\)s. We multiply \\(67\\cdot 21=1407\\) then \\(1407-120+63=1350\\) which is not divisible by \\(120\\). We keep trying this process until we get to \\(97\\) which works and makes \\(n=1917\\) for \\(1+9+1+7=18\\)`,
        topic: 'factoring',
        type: 'mc',
        used: false,
        difficulty: 4,
    },
    {
        title: `AMC 10B 2020 Problem 6 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `Driving along a highway, Megan noticed that her odometer showed \\(1591\\) (miles). This number is a palindrome-it reads the same forward and backward. Then \\(2\\) hours later,
        the odometer displayed the next higher palindrome. What was her average speed, in miles per hour, during this \\(2\\)-hour period?`,
        solution: `<b>55</b><p>We don't actually want to focus on the ones digit, because, when it comes down to that, it won't matter as much. We start bigger. We know that we want the next number to be as small as possible, so then we ideally stay in the \\(10,000\\)s territory. We then have \\(1 x x x 1\\). We, ideally,
        want to keep the thousands and tens place as \\(5\\), but, because the middle number is \\(9\\), that's not possible. Thus, we bring those up to \\(6\\) and make the middle number \\(0\\) for \\(16061\\). Her speed is \\(\\frac{16061-15951}{2}=\\frac{110}{2}=55\\)`,
        answer: '55',
        type: 'fr',
    },
    {
        title: `AMC 10B 2020 Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `<p>The decimal representation of</p>
        $$
        \\frac{1}{20^20}
        $$
        <p>consists of a string of zeros after the decimal point, followed by a \\(9\\) and then several more digits. How many zeroes are in that intial string of zeros after the decimal point?</p>`,
        solution: `<b>26</b><p>Start by writting the equation with a base \\(10\\). We can write \\(\\frac{1}{2^20 \\cdot 10^20}\\) and then try to get the \\(2^20\\) out of the denominator</p>
        $$
        \\frac{1}{2^20 \\cdot 10^20} \\cdot \\frac{5^20}{5^20} = \\frac{5^20}{10^40}\\
        $$
        <p>There will be \\(40\\) trailing zeroes by the denominator, but that still leaves the issue of the numerator. We brute force to find that there are \\(14\\) digits and realizie that what we are solving for is \\(40-14=26\\)`,
        answer: '26',
        topic: 'exponents',
    },
    {
        title: `AMC 10B 2020 Problem 15 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `Steve wrote the digits \\(1, 2, 3, 4,\\) and \\(5\\) in order repeatedly from left to right, forming a list of \\(10,000\\) digits beginning \\(123451234512...\\) He then erased every third digit from his list (that is the \\(3\\)rd, \\(6\\)th, \\(9\\)th...digits from the left),
        the erased every fourth digit from the resulting list (that is the \\(4\\)th, \\(8\\)th, \\(12\\)th,...digits from the left in what remained), and then erased every fifth digit from what remained at that point. What is the sum of the three digits that were in the positions of \\(2019, 2020, 2021\\)?`,
        solution: `<b>11</b><p>This problem really isn't as complicated as it may look. Yes, at a glance, it is long winded. However, the key to this problem is realizing that every few runs, there will be a pattern.</p>
        <p>When we erase the \\(3\\)rd, we know that it will erase the numbers \\(3, 1, 4, 2, 5\\), in that order. Whenever you erase the \\(5\\), you reset the pattern. We can write out the sequence until it reaches \\(5\\) or even just find the least common multiple of \\(3,5\\) which is \\(15\\). That being said, however, we have to 
        remove \\(5\\) values, so we are now left with a pattern of length \\(10\\):</p>
        $$
        1, 2, 4, 5, 2, 3, 5, 2, 5
        $$
        <p>We repeat this process  for removing the \\(4\\)th. We can't look for \\(5\\), anymore though, because the cycle is not of length \\(5\\). Well, to be exact, we still look for \\(5\\), but the \\(5\\) at the end of the previous cycle It gets a bit longer because the LCM of \\(10\\) and \\(4\\) is \\(20\\), and we'd be left with \\(20-5=15\\) values</p>
        $$
        1, 2, 4, 2, 3, 5, 3, 4, 1, 4, 5, 2, 5, 1, 3
        $$
        <p> We do this one more time for a cycle of length LCM(\\(5, 15\\))\\(=15\\) and we erase \\(3\\) so there are \\(12\\)</p>
        $$
        1, 2, 4, 2, 5, 3, 4, 1, 5, 2, 5, 1
        $$
        <p>There are \\(12\\), so we find the ones in the spaces of \\(2019, 2020, 2021\\) mod \\(12\\), which are \\(4, 2, 5\\) which sum to \\(11\\)</p>
        `,
        answer: '11',
        topic: 'modular arithmetic',
    },
    {
        title: `AMC 10B Problem 2020 Problem 16 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 4,
        text: `Bela and Jenn play the following game on the closed interval \\([0,n]\\) of the real number line, where \\(n\\) is a fixed integer greater than \\(4\\). They take turns playing, with Bela going first. At his first turn,
        Bela chooses any real number in the interval \\([0,n]\\). Thereafter, the player whose turn it is chooses a real number that is more than one unit away from all numbers previously chosen by either player. A player unable to choose such a number loses. Using optimal strategy, which player will win the game?`,
        type: 'mc',
        choices: ['\\(A) \\textup{Bela will always in}\\)', '\\(B) \\textup{Jenn will always win.}\\)', '\\(C) \\textup{Bela will win if and only if}  n  \\textup{is odd}\\)', '\\(D) \\textup{Jenn will win if an only if}  n  \\textup{is oddd}\\)', '\\(E) \\textup{Jenn will win if and only if} n>8\\)'],
        solution: `<b>Bella will always win</b><p>This is essentially trial and error. You look at each answer, find the case in which that happens, and test. Notice that even though there are ways for Jenn to win, if Bela plays the best way possible, she'll always win. That is to say, Bela can always win if she wants. Thus, Bela will always win`,
        answer: '\\(A) \\textup{Bela will always in}\\)',
        topic: 'casework',
    },
    {
        title: `AMC 10B Problem 2020 Problem 22 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 5,
        text: `What is the remainder when \\(2^202 + 202\\) is idivided by \\(2^101+2^51+1\\)?`,
        solution: `<b>201</b><p>If \\(x=2^50\\), we can substitute \\(\\frac{4x^4+202}{2x^2+2x+1}\\) we factor out \\((2x^2+2x+1)(2x^2-2x+1)+201\\) and divide out the denominator for \\(2x^2-2x+2\\) which we solve to be \\(201\\)</p>`,
        answer: '201',
        topic: 'factoring',

    }, 
    {
        title: `AMC 10A 2021 Spring Problem 7 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 2,
        text: `<p>Tom has a collection of \\(13\\) snakes, \\(4\\) of which are purple and \\(5\\) of which are happy. He observes that</p>
        <p>All of his happy snakes can add</p>
        <p>None of his purple snakes can subtract</p>
        <p>All of his snakes that can't subtract also can't add</p>
        <p>Which of these conclusions can be drawn about Tom's snakes?</p>`,
        type: 'mc',
        choices: ['\\(A\\) Purple snakes can add', '\\(B\\) Purple snakes are happy', '\\(C\\) Snakes that can add are purple', '\\(D\\) Happy snakes are not purple', "\\(E\\) Happy snakes can't subtract"],
        solution: `<b>Happy snakes are not purple</b><p>Let's start by using what is given to find a bit more. If no purple snakes can subtract, then all purple snakes can't subtract and thus, by the third rule, cannot add. Happy snakes, however, must be able to add. Thus, happy snakes cannot be purple</p>`,
        answer: '\\(D\\) Happy snakes are not purple',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2021 Spring Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 2,
        text: `<p>When a student multiplied the number \\(66\\) by the repeating decimal,</p>
        $$
        1.abab...\\underline{1}.\\overline{ab},
        $$
        <p>Where \\(a\\) and \\(b\\) are digits, he did not notice the notation and just multiplied \\(66\\) times \\(\\underline{1}.\\underline{a}\\underline{b}\\). Later, he found that his answer is \\(0.5\\) less than the
        correct answer. What is the \\(2\\)-digit number \\(ab\\)`,
        solution: `<b>75</b><p>Let's express what the question gives us algebraicly. We have that \\(66(1.\\overline{ab})=66(1.ab)+0.5\\). We notice a common factor for the decimals so we bring them to one side and factor: \\(66(1.\\overline{ab}-1.ab)-0.5\\). </p>
        <p>From here, I'll admit the math is shady. I'm honestly not sure if this is something youc an actually do. That being said, we effectively solve for \\(ab\\) as if it were one variable (recall that \\(ab\\) are not being multiplied, it is just the digit representation).</p>
        $$
        66(0.00ab)=0.5
        $$
        $$
        0.00ab=0.\\overline{75}
        $$
        $$
        ab=75.7575755
        $$
        <p>Based on the answer choices, assume \\(75\\)        `,
        type: 'mc',
        choices: ['\\(A) 15\\)', '\\(B) 30\\)', '\\(C) 45\\)', '\\(D) 60\\)', '\\(E) 75\\)'],
        answer: '\\(E) 75\\)',
        topic: 'algebraic manipulation',
    },
    {
        title: `AMC 10A 2021 Spring Problem 10 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `<p>Which of the following is equivalent to</p>
        $$
        (2+3)(2^2+3^2)(2^4+3^4)(2^8+3^8)(2^16+3^16)(2^32+3^32)(2^64+3^64)
        $$`,
        type: 'mc',
        choices: ['\\(A) 3^127+2^127\\)', '\\(B) 3^127+2^127+2\\cdot 3^63 + 3 \\cdot 2^63\\)', '\\(C) 3^128 - 2^128\\)', '\\(D) 3^128 + 2^128\\)', '\\(E) 5^127\\)'],
        answer: '\\(C) 3^128 - 2^128\\)',
        solution: `<b>\\(3^128 - 2^128\\)</b><p>We rewrite using the sum/difference of squares. We notice that we can write \\(\\frac{2^2-3^2}{2-3}\\). We keep multiplying by a "big one" that 
        is the conjugate of the numerator until we get \\(\\frac{2^128-3^128}{-1}=3^128-2^128}\\).</p>`,
        topic: 'factoring'
    },
    {
        title: `AMC 10A 2021 Spring Problem 11 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 2,
        text: `For which of the following integers \\(b\\) is the base-\\(b\\) number \\(2021_{b}-221_{b}\\) not divisible by \\(3\\)?`,
        type: 'mc',
        choices: ['\\(A) 3\\)', '\\(B) 4\\)', '\\(C) 6\\)', '\\(D) 7\\)', '\\(E) 8\\)'],
        solution: `<b>8</b><p>Let's start by unwinding what base \\(b\\) numbers mean. Essentially, you keep counting up, but when you reach the number of the base you are (say \\(10\\)), you reset the place (as in tens place) you are in back to \\(0\\) and then add another digit starting at\\(1\\). </p>
        <p>Thus, the way we convert bases is by dividng the number by the base, finding the remainder, writing that as a digit, then taking the quotient (w/o remainder), dividing by the base again, taking the remainder, etc. etc.</p>
        <p>This is honestly easy enough to brute force. With base \\(3\\), we get \\(2202212-812\\). We can honestly just keep doing this until we get \\(8\\) as our answer OR we notice that the bases are probably going to have some relation to the remainder mod \\(3\\) and since \\(8\\) is the only one with 
        an exclusive remainder when divided by \\(3\\) (\\(2\\)), it's porbably the answer`,
        topic: 'bases',
        answer: '\\(E) 8\\)',

    }, 
    {
        title: `AMC 10B 2021 Spring Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 2,
        text: `Mr. Zhou places all the integers from \\(1\\) to \\(225\\) into a \\(15\\) by \\(15\\) grid. he places \\(1\\) in the middle square (eighth row and eighth column) and places other numbers one by one clockwise, as shown in part in the diagram below.
        What is the sum of the greatest number and the last number that appear in the second row from the top?`,
        image: "amc1020218.png",
        solution: `<b>367</b><p>We work backwards for this. We know that the entire top row has \\(15\\) terms being with \\(15\\) largest terms of the sequence. We also know by induction that the leftmost term in a row is the largest. Thus, the largest term in the second row is \\(225-15=210\\). The smallest we can find by working backwards. Starting from \\(225\\) again, we have 
        \\(15\\) for the top row, \\(14\\) for the left, \\(14\\) for the bottom, \\(13\\) for the right, and \\(12\\) for the second top row. We subtract all of this from \\(225\\) for \\(157\\) and add this to \\(210\\) for answer \\(367\\) `,
        answer: '367',
        topic: 'logic',
    },
    {
        title: `AMC 10B 2021 Spring Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 3,
        text: 'Let \\(N=34\\cdot 34 \\cdot 63 \\cdot 270\\). What is the ratio of the sum of the odd divisors of \\(N\\) to the sum of the even divisors of \\(N\\)',
        type: 'mc',
        choices: ['\\(A) 1:16', '\\(B) 1:15\\)', '\\(C) 1:14\\)', '\\(D) 1:8\\)', '\\(E) 1:3\\)'],
        solution: `<b>1:14</b><p>We start by finding the prime factorization. We break up \\(34\\) into \\(2 \\cdot 17\\), \\(63\\) into \\(3^2 \\cdot 7\\) and \\(270\\) into \\(3^3 \\cdot 2 \\cdot 5\\) for a prime factorization of \\(2^3 \\cdot 3^5 \\cdot 5 \\cdot 7 \\cdot 17^2\\). Every even factor must have a factor of \\(2, 4\\) or \\(8\\), and
        each odd factor must be able to be multipled by \\(2, 4, \\) or \\(8\\), so the sum ratio is \\(1:2+4+8=1:14\\)`,
        answer: "\\(C) 1:14\\)",
        topic: "prime factorization",    
    },
    {
        title: `AMC 10B 2021 Spring Problem 13 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        text: "Let \\(n\\) be a positive integer and \\(d\\) be a digit such that the value of the numeral \\(32d\\) in base \\(n\\) equals \\(263\\), and the value of the numeral \\(324\\) in base \\(n\\) equals the value of the numeral  \\(11d1\\) in base six. What is \\(n+d\\)",
        used: false,
        difficulty: 3,
        solution: `<b></b><p>Recall that when we want to change a number in base \\(x\\) into base \\(10\\), we multiply the number in each digits place to \\(x\\) to the whatever-th place power (eg 2 for 100, 3 for a thousand). Thus, \\(32d\\), a base \\(n\\) number, is equal to \\(3n^2+2n+d=263\\). The second fact tell us that \\(3n^2+2n+4=216+36+6d+1\\). We solve for \\(d\\) and \\(n\\), or if we can, \\(n+d\\) directly</p>
        $$
        3n^2+2n+d=263
        $$
        $$
        3n^2+2n+4=216+36+6d+1
        $$
        $$
        3n^2+2n=263-d
        $$
        $$
        3n^2+2n=249+6d
        $$
        $$
        263-d=249+6d
        $$
        $$
        14=7d
        $$
        $$
        d=2
        $$
        <p>Substitute back in</b>
        $$
        3n^2+2n+2=263
        $$
        $$
        3n^2+2n-261=0
        $$
        <p>Quadratic formula for \\(n=9\\) with \\(n+d=9+2=11\\)</p>
        `,
        answer: '11',
        topic: 'bases'
    },
    {
        title: `AMC 10B 2021 Spring Problem 16 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`, 
        used: false,
        difficulty: 4,
        text: `Call a positive integer an uphill integer if every digit is strictly greater than the previous digit. For example, \\(1357\\), \\(89\\) and \\(5\\) are all uphill integers, but \\(32\\), \\(1240\\) and \\(466\\), are not. How many uphill integers are divisble by \\(15\\)`,
        solution: `<b>6</b><p>First off, we know it must end with a \\(5\\) because it needs ot end in \\(5\\) or \\(0\\) to be divisible by \\(15\\) and uphill integers can't end in \\(0\\)</p>
        <p>Next, we know that the digits need to sum to a number divisible by \\(3\\). We compute with using casework by the number of digits</p>
        <p>Case 1: \\(15\\) and \\(45\\) work. Notice we needed to get a number that was congruent to \\(1\\) modulo \\(3\\)</p>
        <p>Case 2: (3 digits) \\(135), \\(345\\). Since we need numbers that sum to \\(1\\) modulo \\(3\\), we know that one of the numbers must be \\(3\\)</p>
        <p>Case 3: (4 digits)) \\(1245\\),  by the same logic above, essentially but we can't use \\(3\\) (like in Case 1)</p>
        <p>Case 4: (5 digits) \\(12345\\) is the only uphill 5 digit number and it works, so we have \\(6\\) total that fit the criteria `,
        topic: 'casework',
        answer: '6',
    },
    {
        title: `AMC 10B 2021 Spring Problem 17 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `Ravon, Oscar, Aditi, Tyrone, and Kim play a card game. Each persion is given \\(2\\) cards out of a set of cards numbered \\(1, 2, 3, ..., 10\\). The score of a player is the sum of the numbers of their cards. The 
        scores of the players are as follows: Ravon-\\(11\\), Oscar-\\(4\\), Aditi-\\(7\\), Tyrone-\\(16\\), Kim-\\(17\\). Which of the following statements is true?`,
        type: 'mc',
        choices: ['\\(A) \\textup{Ravon was given card } 3\\)', '\\(B) \\textup{Aditi was given card } 3\\)', '\\(C) \\textup{Ravon was given card } 4\\)', '\\(D) \\textup{Aditi was given card } 4\\)', '\\(A) \\textup{Tyrone was given card } 7\\)'],
        solution: `<b>Ravon was given card \\(4\\)</b><p>We calculate each answer choice individually</p>
        <p>A: Ravon must have \\(8\\) then. Oscar has no other choices for a number, because he has to have \\(3\\) and \\(1\\). This makes B impossible too</p>
        <p>C: Ravon must also have \\(7\\). This means that Kim must have \\(8\\) and \\(9\\). Tyrone has \\(6\\) and \\(10\\). We get that Oscar has \\(3\\) and \\(1\\) so Aditi has \\(2\\) and \\(5\\). This checks out</p>`,
        ansewr: '\\(C) \\textup{Ravon was given card} 4\\)',
        topic: "casework",
    },
    {
        title: `AMC 10A 2021 Fall Problem 5 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: "The six-digit number \\(20210A\\) is prime for only one digit \\(A\\). What is \\(A\\)?",
        type: 'fr',
        solution: `<b>9</b><p>Obviously, we know the answer can't end in an even number because then it would be divisible by \\(2\\)</p>
        <p>We also know that the sum of digits cannot be divisible by \\(3\\). As it stands, the sum of the digits are \\(2+0+2+1+0=5\\). We need to cross out any
        numbers that are congruent to \\(1\\) modulo \\(3\\), so that takes out \\(1\\) and \\(7\\). That brings it down to \\(3\\) and \\(9\\).</p>
        <p>We then try both cases and divide by prime numbers. Starting with \\(7\\). Neither \\(202103\\) or \\(202109\\) work. Next, \\(11\\). \\(202103\\) is, so we know that 
        our answer is \\(9\\)`,
        answer: '9',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2021 Fall Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `A two-digit positive integer is said to be \\(cuddly\\) if it is equal to the sum of its nonzero tens digit and the square of its units digit. How many two-digit positive integers are cuddly?`,
        solution: `<b>1</b><p>We take the definition we are given and rewrite it into an equation. Call \\(x\\) the tens digit and \\(y\\) the units digit. We have that our number, that has to be \\(cuddly\\) is equal to \\(10x+y\\) and that it must be equal to \\(x+y^2\\) so we write \\(10x+y=x+y^2\\) or
        \\(9x=y^2-y\\). We then proceed to try out values of \\(y\\) between \\(0\\) and \\(9\\)</p>
        <p>\\(0\\): \\(x\\) must be equal to \\(0\\) so this doesn't work</p>
        <p>\\(1\\): \\(9x=1-1=0\\) so once again \\(x=0\\). This won't satisfy the two digit rule</p>
        <p>\\(2\\): \\(9x=4-2=2\\) so \\(x=\\frac{2}{9}\\). Obviously, \\(\\frac{2}{9}\\) cannot be a digit. This isn't possible</p>
        <p>\\(3\\): \\(9x=9-3=6\\) once again, not an integer solution for \\(x\\)</p>
        <p>\\(4\\): \\(9x=16-4=12\\) so still no integer</p>
        <p>\\(5\\): \\(9x=25-5\\) same issue</p>
        <p>\\(6\\): \\(9x=36-6\\) same issue</p>
        <p>\\(7\\): \\(9x=49-7\\)</p>
        <p>\\(8\\): \\(9x=64-8=56\\)</p>
        <p>\\(9\\): \\(9x=81-9\\) so \\(x=8\\)</p>
        <p>There is \\(1\\) solution`,
        answer: '1',
        topic: 'algebraic manipulation',
    },
    {
       title: `AMC 10A 2021 Fall Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
       used: false,
       difficulty: 3,
       text: `The base-nine representaiton of the number \\(N\\) is  \\(27,006,000,052_{nine}\\). What is the remainder when \\(N\\) is divided by \\(5\\)?`,
       solution: `<b>3</b><p>Brute forcing this is not an option, because we'd be calculating \\(9\\) to the \\(10\\)th power. Notice that the remainder when divided by \\(5\\) only depends on the last digit so we don't have to calculate that much. We know that to convert\\(N\\) back into base \\(10\\) we follow essentially \\(2\\cdot9^10 + 7 \\cdot 9^9\\) etc. However,
       even if we only focus on the units digit that is annoying to calculate \\(9\\) to that many powers. However, when we multiply, we only need to find the units digits of the two numbers we multiply to find the units digit of the product. And luckily, a lot of exponents follow patterns when it comes to units digits. Let's try it with \\(9\\) and make a conjecture:</p>
       $$
       9^0=1
       $$
       $$
       9^1=9
       $$
       $$
       9^2=81
       $$
       $$
       9^3=729
       $$
       <p>The units digits alternate between \\(1\\) and \\(9\\). Since there are so many zeroes in the base \\(9\\) representation, that also makes things easier. We find the sum \\(2+5+6+3+2=18\\) which is congruent to \\(3\\) modulo \\(5\\)`,
       answer: '3',
       topic: 'bases',
    },
    {
        title: `AMC 10A Fall 2021 Problem 23 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `For each positive integer \\(n\\), let \\(f_{1}(n)\\) be twice the number of positive integer divisors of \\(n\\), and for \\(j \\ge 2\\), let \\(f_{j}(n)=f_{1}(f_{j-1}(n))\\). For how many values of \\(n \\ge 50\\) is \\(f_{50}(n)=12\\)?`,
        solution: `<b>10</b><p>Let's first explain what this is saying. Essentially, for \\(f_{j}\\) you continuously use the function until you get down to \\(1\\). With \\(f_{50}\\) that looks like \\(f_{1}(f_{1}(f_{1}))\\) \\(50\\) times. Considering 
        how complex this is, there's probably a better way to solve it. </p>
        <p>That in mind, we try to figure out what we need for \\(f_{1}(n)=12\\) anyways. We need \\(6\\) positive integer divisors or a prime factorization that either looks like \\(x^5\\), or \\(x^2 \\cdot y\\). We can think of a few numbers that fit this:</p>
        <p>\\(12\\) which is \\(2^2 \\cdot 3\\)</p>
        <p>Now let's focus on \\(12\\). This is interesting because when you input it, it outputs \\(12\\) every time. Therefore, we know that \\(f_{50}(n)=12\\). Thus, any value that outputs \\(12\\) for \\(f_{1}(n)=12\\) will always output \\(12\\). We just need to find all the values that fit</[>
        <p>\\(32=2^5\\)</p>
        <p>\\(18=3^2 \\cdot 2)</p>
        <p>\\(20=2^2 \\cdot 5\\)</p>
        <p>\\(45=3^2 \\cdot 5\\)</p>
        <p>\\(50 = 5^2 \\cdot 2\\)</p>
        <p>\\(28 = 2^2 \\cdot 7\\)</p>
        <p>\\(44 = 2^2 \\cdot 11\\)</p>
        <p>We don't nescessarily know, however, that \\(f_{1}(n)\\) has to equal \\(12\\). If \\(f_{1}(n)\\) is equal to any other of those, it would also work out.</p>
        <p>Working our way up from the bottom we know that for \\(f_{1}=18\\), the prime factorization must be \\(x^8\\) or \\(x^2 \\cdot y^2\\). With prime factors, that gives us possible values of 
        \\(36\\) and only \\(36\\)</p>
        <p>Next is \\(20\\). This means that we need \\(x^9\\), or \\(x \\cdot y^4\\). This is possible with \\(48\\).</p>
        <p>Next is \\(28\\). This gives us \\(x^13\\) or \\(x \\cdot 2^7\\). None of these are possible,and thus no values of \\(f_{1}\\) above this are possible</p>
        <p>This gives us values \\(12, 18, 20, 28, 32, 40, 44, 45, 48, 50\\) which is \\(10\\) potential values. `,
        answer: '10',
        topic: 'prime factorization',
    },
    {
        title: `AMC 10A Fall 2021 Problem 3 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `The expression \\(\\frac{2021}{2020}-\\frac{2020}{2021}\\) is equal to the fraction \\(\\frac{p}{q}\\) in which \\(p\\) and \\(q\\) are positive integers whose greatest common divisor is \\(1\\). What is \\(p\\)?`,
        solution: `<b>4041</b><p>We know that adjacent, or consecutive, numbers are always relatively prime. Thus, we don't really have to worry about simplifying. We just have to find the numerator. You could probalby brute force this if you really wanted to, but let's be sensible about it. We know that we're looking for the relationship between \\(x^2+1\\) and \\(x^2\\), particulary
        the difference which ends up being \\((x+1)^2-x^2=x^2+2x+1-x^2=2x+1\\). We have \\(x=2020\\) for an ansewr of \\(4041\\).`,
        answer: '4041',
        topic: 'algebraic manipulation',
    },
    {
        title: `AMC 10A Fall 2021 Problem 5 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `Let \\(n=8^2022\\). Which of the following is equal to \\(\\frac{n}{4}\\)?`,
        type: 'mc',
        choices: ['\\(A) 4^1010\\)', '\\(B) 2^2022\\)', '\\(C) 8^2018\\)', '\\(D) 4^3031\\)', '\\(E) 4^3032\\)'],
        solution: `<b></b><p>We can simplify this if we write the numerator and denominator as exponents with the same base. We know that \\(8=2^3\\) so \\(8^2022=2^6066\\). We also know that \\(4=2^2\\) so we are looking for \\(\\frac{2^6066}{2^2}=2^6064\\). We can 
        rewrite this as \\(4^3032\\)`,
        answer: '\\(E) 4^3032\\)',
        topic: 'exponents',
    },
    {
        title: `AMC 10A Fall 2021 Problem 6 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `The least positive integer with exactly \\(2021\\) distinct positive divisors can be written in the form of \\(m \\cdot 6^k\\), where \\(m\\) and \\(k\\) are integers and \\(6\\) is not a divisor of \\(m\\). What is \\(m+k\\)?`,
        solution: `<b>58</b><p>We know that \\(6^k\\) can be written as \\(2^k \\cdot 3^k\\). We also know that the number of divisors a number has is equal to the product of \\(1\\) plus the powers in its prime facotrization. Thus, \\(2021 = 2 \\cdot (k+1)^2\\), but that's not possible because the
        powers have to be integers and \\(2021\\) is odd. That is, unless \\(m\\) is not prime. We now know for sure that \\(m\\) cannot be prime OR must be a facotr of \\(6\\). Returning to our way of finding the number of factors, we note that \\(2021=43 \\cdot 47\\) which we can find by using \\(45^2\\) and going for closer values. We know that the prime factorization must be \\(2^46 \\cdot 3^42\\) or \\(2^4 \\cdot 6^42\\) for \\(m=16\\) and \\(k=42\\) and an answer of \\(58\\) `,
        answer: '58',
        topic: 'prime factorization',
    },
    {
        title: `AMC 10A Fall 2021 Problem 7 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `Call a fraction \\(\\frac{a}{b}\\), not nescessarily in simpplest form, special if \\(a\\) and \\(b\\) are positive integers whose sum is \\(15\\). How many distinct integers can be written as the sum of two, not nescessarily different, special fractions?`,
        solution: `<b>11</b><p>First find all the special fractions</p>
        $$
        \\frac{1}{14},\\frac{2}{13},\\frac{3}{12},\\frac{4}{11},\\frac{5}{10},\\frac{6}{9},\\frac{7}{8},\\frac{8}{7},\\frac{9}{6},\\frac{10}{5},\\frac{11}{4},\\frac{12}{3},\\frac{13}{2},\\frac{14}{1}
        $$
        <p>We can write this in simplest form and then focus on only numbers with the same denominator</p>
        $$
        \\frac{1}{14},\\frac{2}{13}.\\frac{1}{4},\\frac{4}{11},\\frac{1}{2},\\frac{2}{3},\\frac{7}{8},\\frac{8}{7},\\frac{3}{2},2,\\frac{11}{4},4,\\frac{13}{2},14
        $$
        <p>First whole numbers. There are \\(3\\) of these, \\(2, 4, 14\\) for possible values, \\(4,6,16,8,18\\)</p>
        <p>Next is halves: \\(\\frac{1}{2}, \\frac{3}{2}, \\frac{13}{2}\\) for values \\(1, 2, 7, 3, 8, 13\\). The \\(8\\) overlaps so we knoly have \\(11\\) values</p>
        <p>Thirds don't repeat. As a matter of fact, no other values repeat except for quarters: \\(\\frac{1}{4}, \\frac{11}{4}\\) which can only be \\(3\\). not an original solution. There are \\(11\\) solutions`,
        answer: '11',
        topic: 'casework',
    },
    {
        title: `AMC 10A Fall 2021 Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficutly: 2,
        text: `The greatest prime number that is a divisor of \\(16384\\) is \\(2\\) because \\(16384=2^14\\). What is the sum of the digits of the greatest prime number that is a divisor of \\(16.383\\)?`,
        solution: `<b></b><p>\\(16383=16384-1=2^14-1\\) which we recognize via difference of squares to be \\((2^7+1)(2^7-1)\\). We compute these seperately. \\(2^7=128\\) so we have \\(129\\) and \\(127\\). The latter is composite, being able to be factored down into \\(3 \\cdot 43\\), but the other is prime. So we have \\(1+2+7=10\\)</p>
        <h3>Common Mistake <SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN></h3>
        <p>If it looks like a trick question, it is. It is rare for the AMC 10 to given extraneous information or reqiure you to know the prime factorization of \\(16,383\\). Just by the nature of the question, be suspicious and asume there is a clever way to take the prime factorizaiton that isn't just factor trees</p>`,
        topic: 'prime factorization',
        answer: 10,
    },
    {
        title: `AMC 10A Fall 2021 Problem 10 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `Forty slips of paper numbered \\(1\\) to \\(40\\) are placed in a hat. Alice and Bob each draw one number from the hat without replacement, keeping their numbers hidden from each other.
        Alice says "I can't tell who has the larger number." Then Bob says, "I know who has the larger number." Alice says, "You do?" Is your number prime?" Bob replies, "Yes." Alice says, "In that case, if I multiply your number by \\(100\\) and add my number, the result is a perfect square," What is the sum of the two numbers drawn from the hat?`,
        solution: `<b>27</b><p>Let's break this down individually:</p>
        <p>By Alice's first statement, we know that she does NOT have either \\(1\\) or \\(40\\), because she would know if she had one of those</p>
        <p>Since Bob knows, we know he MUST have \\(1, 40, 2\\) or \\(39\\). Since he now knows that Alice doesn;t have \\(1\\) or \\(40\\), he could have one of the latter \\(2\\) and discount \\(1\\) or \\(40\\)</p>
        <p>Bob mentions that his number is prime. The only prime number in the list was \\(2\\). Thus, he has \\(2\\).</p>
        <p>Alice multiplies \\(2 \\cdot 100\\) and adds \\(x\\) such that the result is a perfect square. The only perfect square between \\(201\\) and \\(240\\) is \\(225\\) so Alice has \\(25\\). The sum, then, is \\(27\\)`,
        answer: '27',
        topic: 'logic',
    },
    {
        title: `AMC 10A Fall 2021 Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `Which of the following conditions is sufficient to guarantee that integers \\(x, y,\\) and \\(z\\) satisfy the equation \\(x(x-y)+y(y-z)+z(z-x)=1\\)?`,
        type: 'mc',
        choices: ['\\(A) x>y\\) and \\(y=z\\)', '\\(B) x=y-1\\) and \\(y=z-1\\)', '\\(C) x=z+1\\) and \\(y=x+1\\)', '\\(D) x=z\\) and \\(y-1=x\\)', '\\(E) x+y+z=1\\)'],
        solution: `<b>\\(x=z\\) and \\(y-1=x\\)</b><p>Let's compute this for each option</p>
        <h3>A</h3>
        <p>We know that the first term is going to be some positive value. We know the second term is going to be \\(0\\) and the last term is going to be some negative value. By substitution we have \\(x^2-xy+y^2-xy=1\\) which is the same as \\((x-y)^2\\) where \\(x>y\\). This isnt enough to gaurantee</p>
        <h3>B</h3>
        <p>\\((z-2)(-3)+(z-1)(-1)+z(z-2)=-3z+6-z+1+2z-2=-2z+5=1\\), which we can't guarauntee</p>
        <h3C</h3>
        <p>\\((z+1)(-1)+(z+2)(2)+z=1\\), once again, doesn't simplify perfectly</p>
        <h3>D</h3>
        <p>\\(z(-1)+z+1+=1\\) so this is nescessarily true</p>`,
        answer: '\\(D) x=z\\) and \\(y-1=x\\)',
        topic: 'algebraic manipulation',
    },
    {
        title: `AMC 10A Fall 2021 Problem 19 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `Let \\(N\\) be a positive integer \\(7777...777\\) a \\(313\\)-digit number where each digit is a \\(7\\). Let \\(f(r)\\) be the leading digit of the \\(r\\)th root of \\(N\\). What is \\(f(2)+f(3)+f(4)+f(5)+f(6)\\)?`,
        solution: `<b>8</b><p>We can make a few basic rules. The first is that dividing by any power of \\(10\\) does not change the leading digit, because it just adds \\(0\\)s, which are insignificant. From this, we don't concern ourselves with the whole \\(313\\) digit thing and instead only focus on the leading digits of \\(7.777...\\) after a bunch of roots. We approximate that the sum ends up being
        \\(2+1+1+3+1=8\\)</p>
        <h3> Common Mistake <SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN></h3>
        <p>While there is a hack that makes this easier, if I'm being completely honest, you don't need to solve this one. If you made it to \\(19\\), it's better to check your answers or scan for easier ones that you can solve rather than struggling with such a cumbersome problem like this. Strategy is just as important as mathematical skill when it comes to competitions like these!</p>`,
        answer: '8',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2022 Problem 7 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `The least common multiple of a positive integer \\(n\\) and \\(18\\)  is \\(180\\) and te greatest common divisor of \\(n\\) and \\(45\\) is \\(15\\). What is the sum of digits of \\(n\\)?`,
        solution: `<b>3</b><p>We know by the second rule that \\(n\\) must be \\(15\\) or \\(30\\). However, the \\(LCM\\) of \\(18\\) and \\(15\\) isn't \\(180\\), it's \\(90\\), so we know \\(n=30\\) for a sum of digits \\(3\\)`,
        answer: '3',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2022 Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `A dataset consists of \\(6\\) (not distinct) positive integers \\(1,7,5,2,5\\) and \\(X\\). The average (arithmetic mean) of the \\(6\\) numbers equals a value in the data set. What is the sum of all possible values of \\(X\\)?`,
        solution: `<b>32</b><p>By the definition of a mean, we know that the sum of the numbers must be equal to \\(6 \\cdot 1 = 6, 6 \\cdot 7 = 42, 6 \\cdot 5 = 30\\) or \\(6 \\cdot 2 = 12\\). The current sum is \\(20\\) so \\(X\\) must be equal to \\(10\\) or \\(22\\) for a sum of \\(32\\)`,
        answer: '32',
        topic: 'averages',
    },
    {
        title: `AMC 10A 2022 Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `<p>On Halloween, \\(31\\) children walked into the principal's office asking for candy. They can be classified into three types: Some always lie; some always tell the truth; and some alternately lie and tell the truth. The alternaters arbitrarily choose their first response, either a lie or the truth, but each subsequent statement has the opposite truth value from its predecessor. The principal asked everyone the same three questions in this order.</p>
        <p>"Are you a truth-teller?" The principal gave a piece of candy to each of the $22$ children who answered yes.</p>
        <p>"Are you an alternater?" The principal gave a piece of candy to each of the $15$ children who answered yes.</p>
        <p>"Are you a liar?" The principal gave a piece of candy to each of the $9$ children who answered yes.</p>
        <p>How many pieces of candy did the principal give to the children who always tell the truth?`,
        solution: `<b></b><p>Let's go at this rule by rule</p>
        <p>For the first question, all truth tellers say yes, all liars say yes, and all alternaters who lied first say yes. The remaining \\(31-22=9\\) students are alternaters who said the truth</p>
        <p>For the second question, all the liars say yes and all the alternaters who lied to begin with say yes. There were \\(31-15=16\\) students who said no, but \\(9\\) of those are the alternaters from the first round. There are \\(16-9=7\\) truthtellers</p>
        <p>Since we are looking for students who always tell the truth, and truthtellers will only get candy once, they got \\(7\\) pieces of candy all together.</p>`,
        answer: '7',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2022 Problem 17 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `How many three-digit positive integers \\(abc\\) are there whose nonzero digits \\(a, b,\\) and \\(c\\) satisfy \\(0.\\overline{abc}=\\frac{1}{3}(0.\\overline{a}+0.\\overline{b}+0.\\overline{c})\\)?`,
        solution: `<b>13</b><p>We know that \\(0.\\overline{a}=\\frac{a}{9}\\). If you don't know why, try that out with any integer less than \\(10\\). Anyways, we rewrite RHS (right hand side) to \\(\\frac{abc}{27}\\). For the LHS
        we divide by \\(999\\) but make the numerator a 3 digit number \\(100a+10b+c\\) for \\(\\frac{100a+10b+c}{999}\\). We rewrite the entire equation as \\(100a+10b+c=37a+37b+37c\\) which we can solve for by solving for \\(a\\) and factoring out the GCD until we get \\(7a+3b+4c\\). Since \\((1,1,1)\\) is a solution, we 'scale that up' for every digit, whikch gives us 
        \\(9\\) solutions. But, there's still more. By trying different values for \\(a\\) and kinda just toying around with it, we get \\((4,8,1), (5,1,8), (5,9,2), (6,2,9)\\) which leaves us with \\(13\\) solutions`,
        answer: '13',
        topic: 'algebraic manipulation',
    },
    {
        title: `AMC 10A 2022 Problem 19 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `<p>Define L_{n} as the least common multiple of all the integers from \\(1\\) to \\(n\\) inclusive. There is a unique integer \\(h\\) such that</p>
        $$
        \\frac{1}{1}+\\frac{1}{2}+\\frac{1}{3}+...+\\frac{1}{17}=\\frac{h}{L_{17}}
        $$
        <p>What is the remainder when \\(h\\) is divided by \\(17\\)?</p>`,
        solution: `Let's first find what \\(L_{17}\\) is. We do this by finding the prime factorization of all the numbers, then taking the highest power of each prime factor:</p>
        $$
        1, 2^1, 3^1, 2^2, 5, 2 \\cdot 3, 7, 2^3, 3^2, 2 \\cdot 5, 11, 2^2 \\cdot 3, 13, 2 \\cdot 7, 3 \\cdot 5, 2^4, 17
        $$
        $$
        L_{17}=2^4 \\cdot 3 ^2 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 \\cdot 17
        $$
        <p>Now, we don't actually have to compute all of this because, in the end, the crazy thing is we don't have to compute \\(h\\). Because each term is a whole number, we only need to look at the last term, since we know the other ones will eventually come out to some multiple of \\(17\\). Thus, we focus on the remainder of \\(\\frac{L_{17}}{17}\\) divided by \\(17\\). We take
        \\(17\\) out of the prime factorization, so we now just have \\(\\frac{2^4 \\cdot 3^2 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13}{17}\\) which is honestly simple enough to brute force for an answer of  \\(5\\)</p>
        `,
        answer: '5',
        topic: 'prime factorization',
    },
    {
        title: `AMC 10A 2022 Problem 24 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 5,
        text: `How many strings of length \\(5\\) formed from the digits \\(0,1,2,3,4\\) are there such that for each \\(j \\in {1,2,3,4},\\) at least \\(j\\) of the digits are less than \\(j\\)?
        (For example \\(02214\\) satisfies this condition because it contains at least \\(1\\) digit less than \\(1\\), at least \\(2\\) digits less than \\(2\\) at least \\(3\\) digits less than \\(3\\), and at least \\(4\\) digits less than \\(4\\). The string \\(23404\\) does not satisfy the condition
        because it does not contain at least \\(2\\) digits less than \\(2\\).)`,
        type: 'mc',
        choices: ['\\(A) 500\\)', '\\(B) 625\\)', '\\(C) 1089\\)', '\\(D) 1199\\)', '\\(E) 1296\\)'],
        solution: `<b>1296</b><p>In my opinion, the easier way to solve this is to just split it up into cases to make it easier. The easiest way to do this is by the number of different digits:</p>
        <p>With only one digit, we can have \\(00000\\)</p>
        <p>Wit two digits, ew can have \\(01111\\), \\(00111\\), \\(00111\\), \\(01111\\), \\(00002\\), \\(00022\\), \\(00222\\), \\(00003\\), \\(00033\\), \\(00004\\). BUT the order does count. With \\(4\\) \\(0'\\)s, the alternate digit can go \\(5\\) places and, so there are \\(4 \\cdot 5\\) for this. For three zeroes,
        there are \\(10\\) ways for each because the non-zero can be take up \\(\\frac{5!}{2!(5-3)!}=10\\). There are \\(30\\). Keep going with this logic to find \\(75\\) strings.</p>
        <p>With three digits, there must be a \\(0\\), and a \\(1\\) or a \\(2\\) or both, in addition to other digits. By the same logic as above, there are \\(500) ways to do this (this is the hardest to compute, and I don't want to write out all \\(20\\) ways to get the numbers)</p>
        <p>With \\(4\\) there are \\(600\\) strings (once again, kinda a pain to solve)</p>
        <p>\\(5\\) is just \\(01234\\) which can be written in \\(5!=120\\) ways</p>
        <p>\\(1+75+500+600+120=1296\\)</p>`,
        answer: '\\(E) 1296\\)',
        topic: 'casework',
    },
    {
        title: `AMC 10B 2022 Problem 3 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `How many three-digit positive integers have an odd number of even digits?`,
        type: 'mc',
        choices: ['\\(A) 150\\)', '\\(B) 250\\)', '\\(C) 350\\)', '\\(D) 450\\)', '\\(E) 550\\)'],
        solution: `<b>450</b><p>What's tricky about this is that we're doing with \\(2\\) issues, getting an odd number of even digits, and the placement of those even digits. We break it up into cases:</p>
        <p><b>One even digit</b>There are \\(5\\) even digits and \\(5\\) odd digits.  When the leading digit is even, there are \\(4 \\cdot 5\\cdot 5 =100\\) because the first digit cannot be \\(0\\). For the other two, there are \\(5 \\cdot 5 \\cdot 5=125\\)</p>
        <p><b>Three even digits</b><p> (4 \\cdot 5\\cdot 5=100\\). We find \\(100+100+125+125=450\\)`,
        answer: '\\(D) 450\\)',
        topic: 'casework',
    },
    {
        title: `AMC 10B 2022 Problem 6 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `How many of the first ten numbers of the sequence \\(121, 11211, 1112111,...\\) are prime numbers?`,
        type: 'mc',
        choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
        solution: `<b>0</b><p>We can write each number as \\(110+11, 11100+111, 1111000+1111\\), respectively. We can factor all of these into \\(10^{n\\textup{th power}}+1 \\cdot)a number comprised of as many \\(1\\)s as \\(n\\). Since this holds true for all, there are always at least \\(2\\) factors and thus \\(0\\) primes`,
        answer: '\\(A) 0\\)',
        topic: 'factoring',
    },
    {
        title: `AMC 10B 2022 Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `<p>Consider the following \\(100\\) sets of \\(10\\) elements each:</p>
        $$
        {1,2,3,...,10},
        $$
        $$
        {11,12,13...,20}
        $$
        $$
        {21,22,23,...,30}
        $$
        $$
        {991,992,993,...1000}
        $$
        <p>How many of these sets contain exactly two multiples of \\(7\\)?</p>
        `,
        solution: `<b>42</b><p>Let's look at a few multiples of \\(7\\) and see if we can discern a pattern:</p>
        $$
        7, 14, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119, 126, 133, 140 ...
        $$
        <p>We see that the pattern of \\(7\\)s in each set goes \\(1,1,1,1,2,1,1,2,1,2,1,2,1,1,1,2\\).Disregarding the first five, we see a pattern of sets of \\(7\\) so we calculate \\(\\frac{100-5}{7} \\cdot 3 + 1=41\\) but then we also notice the modulo \\(4\\) gives us another one so we have \\(42\\)`,
        answer: '42',
        topic: 'patterns',
    },
    {
        title: `AMC 10B 2022 Problem 10 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `Camila writes down five positive integers. The unique mode of these integers is \\(2\\) greater than their median, and the median is \\(2\\) greater than their arithmetic mean. What is the least possible value for the mode?`,
        solution: `<b></b><p>Let's call our values \\(a, b, c, d, e\\). We know one value must happen at least more than once, because there is a unique mode. Call \\(e\\) and \\(d\\) the mode values and \\(c\\) the median. We have that \\(\\frac{a+b+c+2d}{5}+2=c=d-4\\). We then use the answer choices from here</p>
        <p>If the mode is \\(5\\) then \\(c\\) must be equal to \\(3\\) and the mean is \\(1\\) which isn't possible</p>
        <p>If the mode is \\(7\\) then \\(c=5\\), the mean is \\(3\\) so the values sum to a negative value, also not possible</p>
        <p>If the mode is \\(9\\) then \\(c=7\\), the mean is \\(5\\), still not possible</p>
        <p>If the mode is \\(11\\) then \\(c=9\\), the mean is \\(7\\) with the remaining values summing to \\(4\\). This is possible. We have our answer is \\(11\\)`,
        type: 'mc',
        choices: ['\\(A) 5\\)', '\\(B) 7\\)', '\\(C) 9\\)', '\\(D) 11\\)', '\\(E) 13\\)'],
        answer: '\\(D) 11\\)',
        topic: 'averages',
    },
    {
        title: `AMC 10B 2022 Problem 11 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `All the high schools in a large school district are involved in a fundraiser selling T-shirts. Which of the choices below is logically equivalent to the statement "No school bigger than Euclid HS sold more T-shirts than Euclid HS"?`,
        type: 'mc',
        choices: ['\\(A)\\) All schools smaller than Euclid HS sold fewer T-shirt than Euclid HS', '\\(B)\\) No school that sold more T-shirts than Euclid HS is bigger than Euclid HS', '\\(C)\\) All schools bigger than Euclid HS sold fewer shirts T-shirts than Euclid HS', '\\(D)\\) All schools that sold fewer T-shirts than Euclid HS are smaller than Euclid HS.', '\\(E)\\) All schools smaller than Euclid HS sold more T-shirts than Euclid HS'],
        solution: `<b>No school that sold more T-shirts than Euclid HS is bigger than Euclid HS</b><p>This isn't really the sort of question I can explain. Effectively, go through each answe rand see whether or not they match</p>
        <p>The first one can't be right because the given info doesn't say anything about smaller schools</p>
        <p>The second hsa to be right because it's rephrasing it. If no school bigger than Euclid sold more than Euclid, that means any school that did sell more was smaller</p>`,
        answer: '\\(B)\\) No school that sold more T-shirts than Euclid HS is bigger than Euclid HS',
        topic: 'logic',
    },
    {
        title: `AMC 10B 2022 Problem 13 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `The positive difference between a pair of primes is equal to \\(2\\), and the positive difference between the cubes of the two primes is \\(31106\\). What is the sum of the digits of the least prime that is greater than those two primes?`,
        solution: `<b>16</b><p>We write the given info as the equations \\(x-y=2\\) and \\(x^3-y^3=31106\\). We solve by substitution</p>
        $$
        x=2+y
        $$
        $$
        y^3+6y^2+12y+8-y^3=31106
        $$
        $$
        (y-73)(y+71)=0
        $$
        <p>We have values \\(71, 73\\) with the next highest prime being \\(79\\) for \\(7+9=16\\)</p>`,
        answer: `16`,
        topic: 'algebraic manipulation',
    },
    {
        title: `AMC 10B 2022 Problem 14 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `Suppose that \\(S\\) is a subset of \\({1,2,3,...,25}\\) such that the sum of any two (not nescessarily distinct) elements of \\(S\\) is never an element of \\(S\\) What is the maximum number of elements \\(S\\) may contain?`,
        solution: `<b>13</b><p>Essentially, we just need doubling the smallest value to be greater than the largest value, \\(25\\). This occurs when the smallest value is greater than \\(\\frac{25}{2}\\), so we have a smallest value \\(13\\) for \\(13\\) elements`,
        answer: '13',
        topic: 'logic',
    },
    {
        title: `AMC 10B 2022 Problem 17 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `One of the following numbers is not divisible by any prime number less than \\(10\\). Which is it?`,
        choices: ['\\(A) 2^606 -1\\)', '\\(B) 2^606 +1\\)', '\\(C) 2^607 -1', '\\(D) 2^607 + 1\\)', `\\(E) 2^607 + 3&607\\)`],
        solution: `<b>2^607-1</b><p>This is a really difficult one, if I'm being honest. I doubt you would actually want/have time to do this in its entirety on a test</p>
        <p>There are a few solutions for this, but my favorite does not require any advanced knowledge. All you have to do is recall that exponents create patterns in the units digit. By finding the pattern for units digits in \\(2\\) (2,4,8,6\\), we know that the units digits are \\(3,5,7,8,5\\) (we find the pattern for \\(3\\) for the ast one), repsectively</p>
        <p>Right off the bat, we know that \\(B\\) and \\(E\\) are divisible by \\(5\\). We have \\(3\\) options left. Using modular arithmetic, we find \\(A\\) and \\(D\\) to be divisible by \\(3\\) which leaves us just with \\(C\\).`,
        answer: '\\(C) 2^607 -1',
        topic: 'modular arithmetic',
    },
    {
        title: `AMC 10A 2023 Problem 3 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: "How many positiveperfect squares less than \\(2023\\) are divisible by \\(5\\)?",
        solution: `<b>8</b><p>We know that for a perfect square to be divisible by \\(5\\), its root should be a multiple of \\(5\\). We just need to find what square of a number divisible of \\(5\\) is closest to and less than \\(2023\\). We know that 
        \\(2023\\) is closed to \\(2025=45^2\\), so we're looking at \\(44\\), which has \\(\\frac{44}{8}=8\\frac{4}{5}\\) \\(5's\\) so there are \\(8\\) total`,
        answer: '8',
        topic: "squares",
    },
    {
        title: `AMC 10A 2023 Problem 5 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `How many digits are in the base \\(10\\) representation of \\(8^5 \\cdot 5^1- \\cdot 15^5\\)?`,
        type: 'mc',
        choices: ['\\(A) 14\\)', '\\(B) 15\\)', '\\(C) 16\\)', '\\(D) 17\\)', '\\(E) 18\\)'],
        solution: `<b>18</b><p>We break this down into its prime factorization. We have \\(8^5=2^15, 15^5=3^5 \\cdot 5^5\\) for a total \\(2^15 \\cdot 5^15 \\cdot 3^5\\). We know there are \\(15\\) trailing zeroes, but we also need to find
        the number of digits in \\(3^5\\) which we can brute force to find \\(243\\) so there are \\(18\\) digits`,
        answer: '\\(E) 18\\)',
        topic: 'prime factorization',
    },
    {
        title: `AMC 10A 2023 Problem 9 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `A digital display shows the current date as an \\(8\\)-digit integer consisting of a \\(4\\)-digit year, followed by a \\(2\\)idigit month, followed by a \\(2\\)-digit date within the month. For example, Arbor Day this year
        is displayed as \\(20230428\\). For how many dates in \\(2023\\) does each digit appear an even number of times in the \\(8\\)-digit display for that date?`,
        solution: `<b>9</b><p>The first digit must be \\(0\\) or \\(1\\). The first \\(4\\) digits are set. We know we need at least one more \\(3\\) and one more \\(0\\). If the month as a \\(0\\), we can have Jan \\(13\\)th, Jan \\(31\\)st, Feb \\(23\\)th, March \\(11\\)th, March \\(22\\)nd, Oct \\(13\\)th, Oct \\(31\\)st. For the \\(0\\) NOT in the month, we have November \\(3\\)rd and \\(30\\)th`,
        answer: '9',
        topic: "casework",
    },
    {
        title: `AMC 10A 2023 Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `<p>How many three-digit positive integers \\(N\\) satisfy the following properties?</p>
        <p>The number \\(N\\) is divisible by \\(7\\)</p>
        <p>The number formed by reversing the digits of \\(N\\) is divisible by \\(5\\)</p>`,
        solution: `<b>14</b><p>It's reverse must be divisible by \\(5\\), so we know it must end in \\(5\\) or \\(0\\) in the hundredths place. The latter is not possible, so we're looking for how many numbers between \\(500\\) and \\(599\\) are divisible by \\(7\\). We divide both of these and take the difference</p>
        $$
        \\frac{599}{7}=85
        $$
        $$
        \\frac{500}{7}=71
        $$
        $$
        85=71=14
        $$`,
        answer: '14',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2023 Problem 16 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `In a table tennis tournament every participant played every other participant exactly once. Although there were twice as many right-handed players as left-handed players, the number of games won by left-handed players was \\(40%\\) more than the number of games won by right-handed players. (There were no ties and no ambidextrous players.) What is the total number of games played?`,
        solution: `<b>48</b>The total number of games \\(x\\) is equal to those won by the right-handed players plus those won by the left hand players \\(y+z\\), respectively. We know that \\(y=1.4z\\) so we have \\(x=2.4z\\). Since all values must be integers, we know that \\(x\\) must be divisible by \\(12\\). That gives us \\(36\\) and \\(48\\). Since each game is decided by choosing \\(2\\) people, we need \\(x\\) choose \\(2\\) to be 
        possible, which is only possible for \\(48\\)`,
        type: 'mc',
        choices: ['\\(A) 15\\)', '\\(B) 36\\)', '\\(C) 45\\)', '\\(D) 48\\)', '\\(E) 66\\)'],
        answer: '\\(D) 48\\)',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2023 Problem 23 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 5,
        text: `<b></b><p>If the positive integer \\(c\\) has positive integer divisors \\(a\\) and \\(b\\) with \\(c=ab\\), then \\(a\\) and \\(b\\) are said to be \\(complementary\\) divisors of \\(c\\). Suppose that \\(N\\) is a positive integer that has one complementary pair of divisors that differ by \\(20\\) and another pair of complementary divisors that differ by \\(23\\). What is the sum of the digits of \\(N\\)?`,
        solution: `<b></b><p>We have that \\(N=x^2+20x\\) and \\(N=y^2+23y\\). We know by logic that \\(x>y\\) and \\(x+20 < y+23\\). We can descripte the relationship as either \\(x=y+1\\) or \\(x=y+2\\), because if we went any higher, it would defy the second rule we set. We create the following equations:</p>
        $$
        y^2+23y=y^2+22y+21
        $$
        $$
        y^2+23y=y^2+24y+44
        $$
        <p>Solve</p>
        $$
        0=-y+21
        $$
        $$
        y=21
        $$
        <p>Since the other one becomes negative, we have \\(y=21\\) and input that to find \\(x=22\\). We have \\(N=924\\) for sum of digits \\(15\\)`,
        answer: '15',
        topic: 'algebraic manipulation',
    },
    {
        title: `AMC 10B 2023 Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `What is the units digit of \\(2022^2023 + 2023^2022\\)?`,
        solution: `<b>7</b><p>We need to understand that unit digits are cyclic to best comprehend this. For \\(2\\), it goes \\(2,4,8,6,\\), so the units digit of \\(2022^2023=8\\). For \\(3\\) it's \\(3,9,7,1\\) so the unit digit is \\(9\\). Addint this gives \\(17\\). Thus, the units digit is \\(7\\)`,
        answer: '7',
        topic: 'powers'
    },
    {
        title: `AMC 10B 2023 Problem 11 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `Suzzane went to the bank and withdrew \\($800\\). The teller gave her this amount of using \\($20\\) bills, \\($50\\) bills, and \\($100\\) bills, with at least one of each denominator. How many different collections of bills could Suzanne have recieved?`,
        solution: `<b>21</b><p>We write the equation as \\(2x+5y+10z=80\\) (we divide by \\(10\\)) and solve by casework using the smallest denominaton</p>
        <p>There is one \\(2\\). There's \\(78\\) left, which sin't nescessary unless we have more \\(2\\)s. We must have some multiple of \\(5\\) \\(2\\)s</p>
        <p>There are \\(5\\) \\(2\\)s. There's \\(70\\). We can do casework from this with different amounts of \\(10\\)s. There are \\(6\\) ways for this to happen</p>
        <p>There are \\(10\\) \\(2\\)s. There's \\(60\\) left so \\(5\\) ways</p>
        <p>There are \\(15\\) \\(2\\)s with \\(50\\) left and thus \\(4\\)</p>
        <p>And so on and so on until we reach \\(1\\). We then have \\(6+5+4+3+2+1=21\\)`,
        answer: '21',
        type: 'fr',
        topic: 'casework',
    },
    {
        title: `AMC 10B 2023 Problem 15 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `What is the least positive integer \\(m\\) such that \\(m \\cdot 2! \\cdot 3! \\cdot 4! \\cdot 5! ... 16!\\) is a perfect square?`,
        solution: `<b></b><p>The sequence, which we'll call \\(S\\) is a perfect square when each number appears an even number of times in the prime factorization. We expand and find that \\(2!, 4!, 6!...16!\\) will all have odd exponents</p>
        <p>Thus, we just need \\(m \\cdot 2\\cdot 4 \\cdot 6 ... 16\\) to be a perfect square which we factorize and find \\(m=70\\) at lowest`,
        answer: '70',
        topic: 'prime factorization',
    },
    {
        title: `AMC 10B 2023 Problem 16 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `Define an \\(upno\\) to be a positive integer of \\(2\\) or more digits where the digits are strictly increasing moving left to right. Similarly, define a \\(downo\\) to be a positive integer of \\(2\\) or more digits where the digits are strictly decreasing moving eft to right. For instance, the number
        \\(258\\) is an upno and \\(8620\\) is a downo. Let \\(U\\)  equal to the total number of \\(upnos\\) and let \\(D\\) equal the total number of \\(downos\\). What is \\(|U-D|\\)`,
        solution: `<b>512</b><p>This ends up being a really long-winded solution. However, I will outline thegeneral process. Do some basic casework with leading digits until you find a conjecture about the differences between numbers</p>
        <p>Use that to create a geometric sequence and solve for the total number of \\(upnos\\) and \\(downos\\)</p>`,
        type:'mc',
        choices: ['\\(A) 512\\)', '\\(B) 10\\)', '\\(C) 0\\)', '\\(D) 9\\)', '\\(E) 511\\)'],
        topic: 'casework',
        answer: '\\(A) 512\\)',
    },
    {
        title: `AMC 10B 2023 Problem 18 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `<p>Suppose \\(a, b,\\) and \\(c\\) are positive integers such that</p>
        $$
        \\frac{a}{14}+\\frac{b}{15}=\\frac{c}{210}
        $$
        <p>Which of the following statements are necessarily true?</p>
        <p>\\(I.\\) If \\(\\textup{gcd}(a,14)=1\\) or \\(\\textup{gcd}(b,15)=1\\) or both, then \\(\\textup{gcd}(c,210)=1\\)</p>
        <p>\\(II.\\) If \\(\\textup{gcd}(c,210)=1\\), then \\(\\textup{gcd}(a,14)=1\\) or \\(\\textup{gcd}(b,15)=1\\) or both</p>
        <p>\\(III.\\) \\(\\textup{gcd}(c,210)=1\\) if and only if \\(\\textup{gcd}(a,14)=\\textup{gcd}(b,15)=1\\)</p>`,
        type: 'mc',
        choices: ['\\(A) I, II, \\textup{and} III\\)', '\\(B) I \\textup{only}\\)', '\\(C) I \\textup{and} II \\textup{only}\\)', '\\(D) III \\textup{only}\\)', '\\(E) II \\textup{and} III \\textup{only}\\)'],
        solution: `<b>E</b><p>The first one isn't true. If you don't know why, try \\(\\frac{3}{2}+\\frac{2}{6}\\) which would simpify into something in the \\(6\\)th territory, because you can simplify one.</p>
        <p>The second one is true...I'm not really sure how to explain it but we can try induction and simple intuition + logic. I sorta just asummed, if I'm bieng honest</p>
        <p>Since there is no option for just \\(II\\\), we know that it must be \\(II\\) and \\(III\\)`,
        answer:'\\(E) II \\textup{and} III \\textup{only}\\)',
        topic: 'logic',
    },
    {
        title: `AMC 10A 2024 Problem 3 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `What is the sum of the digits of the smallest prime that can be written as a sum of \\(5\\) distinct primes?`,
        solution: `<b>7</b><p>We know that the smallest prime would be the sum of the \\(5\\) smallest primes. However, the smallest prime is \\(2\\) which, when summed with \\(4\\) other odd numbers, would become even. Thus, we can't use \\(2\\). We try the next \\(5\\) smallest prime numbers \\(3, 5, 7, 11, 13\\). This sums to \\(39\\). Still not prime. We substitute \\(13\\) for \\(17\\) which gives us \\(43\\). We have that \\(4+3=7\\)`,
        answer: '7',
        topic: 'primes',
    },
    {
        title: `AMC 10A 2024 Problem 4 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `The number \\(2024\\) is written as the sum of not nescessarily distinct two-digit numbers. What is the least number of two-digit numbers need to write this sum?`,
        solution: `<b></b><p>We want to use as many large numbers as possible so that we use as little two digit numbers of possible. Obviously, the largest 2-digit number is \\(99\\) so divide \\(2024\\) by that: \\(\\frac{2024}{99} = 20\\) with remainder \\(44\\). There are thus \\(21\\) two digit numbers.`,
        answer: '21',
        topic: 'arithmetic',
    },
    {
        title: `AMC 10A 2024 Problem 5 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `What is the least value of \\(n\\) such that \\(n!\\) is a multiple of \\(2024\\)?`,
        solution: `<b>23</b><p>We find the prime factorization of \\(2024\\) to be \\(2^3 \\cdot 11 \\cdot 23\\). The highest prime number is \\(23\\) in this, so it must be at least \\(23\\)`,
        answer: '23',
        topic: 'prime factorization'
    },
    {
        title: `AMC 10A 2024 Problem 7 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `The product of three integers is \\(60\\). What is the least possible positive sum of the three integers?`,
        solution: `<b>3</b><p>We know that the sum is minimized when factors are nearest to each other. However, we are not told that the factors have to be positive, just the sum. We still want to numbers to be close, however.</p>
        <p>We list the prime factorization as \\(2^2\\cdot 3 \\cdot 5\\). What we CAN do is have one be \\(1\\). Thus, we take the cloesest thing to the square root, \\(6\\) and \\(10\\) and make the \\(6\\) and \\(1\\) negative for a sum of \\(3\\) `,
        type: 'mc',
        choices: ['\\(A) 2\\)', '\\(B) 3\\)', '\\(C) 5\\)', '\\(D) 6\\)', '\\(E) 13\\)'],
        answer: '\\(B) 3\\)',
        topic: "optimization"
    },
    {
        title: `AMC 10A 2024 Problem 10 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `Consider the following operation. Given a positive integer \\(n\\), if \\(n\\) is a multiple of \\(3\\), then you replace \\(n\\) by \\(\\frac{n}{3}\\). If \\(n\\) is not a multiple of \\(3\\), then you replace \\(n\\) by \\(n+10\\).
        For example, beginning with \\(n=4\\), this procedure gives\\(4\\rightarrow 14 \\rightarrow 24\\rightarrow 8 \\rightarrow 18 \\rightarrow 6\\rightarrow 2 \\rightarrow 12\\rightarrow ...\\). Suppose you start with \\(n=100\\). What value results if you perform this operation exactly \\(100\\) times `,
        solution: `<b></b><p>Let's try this a few times and see if we can make a conjecture. We have \\(100 \\rightarrow 110 \\rightarrow 120 \\rightarrow 40 \\rightarrow 50 \\rightarrow 60\\rightarrow 20 \\rightarrow 30\\). From here, the sequence repeats \\(20, 30,10\\). We use some modular arithmetic</p>
        We find the remainder of \\(\\frac{100-5}{3}\\) to be \\(2\\). Thus, we have the second term in the sequence \\(30\\)`,
        answer: '30',
        topic: 'modular arithmetic',
    },
    {
        title: `AMC 10A 2024 Problem 15 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `Let \\(M\\) be the greatest integer such that both \\(M+1213\\) and \\(M+3773\\) are perfect squares. What is the units digit of \\(M\\)?`,
        solution:  `<b>8</b><p>Write equations \\(M+1213=x^2\\) and (M+3773=(x+y)^2\\). It's sort of trivial that \\(y\\) should be as small as possible</p>
        <p>If you don't get why, think of it this way: Imagine the square root parent function. That's similar to what's happening, if you call the enitre \\(LHS\\) \\(x\\) and the \\(RHS\\) \\(y\\).</p>
        <p>Recall that the slope of the graph diminishes over time. What that tells us is that as \\(x\\) becomes larger, the difference between the roots decreases</p>
        <p>Ok, back to the problem. We want to minimize the difference, \\(y\\) should equal \\(1\\), right? Not exactly. Since both constants are odd and \\(M\\) must be constant for both equations, they will either both be
        odd or even. If the root is only one away, then the square should be odd and even. Thus, we need to use \\(2\\) for \\(y\\) instead. We now have</p>
        $$
        M+1213=x^2
        $$
        $$
        M+3773=(x+2)^2
        $$
        $$
        3733-1213=x^2+4x+4-x^2
        $$
        $$
        2520=4x+4
        $$
        $$
        2516=4x
        $$
        $$
        x=629
        $$
        <p>We find the square of this to be \\(395641\\) and subtract \\(1213\\) for a units digit of \\(8\\)</p>`,
        answer: '8',
        topic: 'powers',
    },
    {
        title: `AMC 10A 2024 Problem 18 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `There are exactly \\(K\\) positive integers \\(5 \\le b \\le 2024\\) such that the base-\\(b\\) integer \\(2024_{b}\\) is divisible by \\(16\\)(where \\(16\\) is in base ten). What is the sum of the digits of \\(K\\)?`,
        solution: `<b>20</b><p>We convert \\(2024_{b}\\) to base \\(10\\) by creating the equation \\(2b^3+2b+4\\). We need \\(\\frac{2b^3+2b+4}{16}\\) to be a whole numberWe can simplify this down by writing
        \\(\\frac{b^3+b}{8}+\\frac{1}{4}\\) is a whole number. We thus have that \\(\\frac{b^3+b}{8}=\\frac{3}{4}+x\\) where \\(x\\) is effectively any whole number. This is similar to how you would solve a sine graph, if that makes sense</p>
        <p>We solve for every different value of \\(x\\)</p>
        <p>When \\(x=0\\) we have </p>
        $$
        b^3+b=24
        $$
        <p>We can't solve this, not as an integer, at least that works. Also, we need numbers within the range \\(5 \\le b \\le 2024\\)</p>
        <p>Since the question specifies integers, that's what we look for. Also, instead of just solving for a certain value, we make things a lot easier for us by just seeing if we can get \\(b^3+b+2\\) to be \\(0 \\textup{mod} 8\\)</p>
        <p>We start with \\(b=5\\) which gives \\(125+5+2=132\\) which leaves a remainder of \\(4\\)</p>
        <p>For \\(b=6\\) we have a reaminder of \\(0\\)</p>
        <p>For \\(b=7\\) we have\\(0\\)</p>
        <p>For \\(b=8\\) we have \\(2\\)</p>
        <p>Obviously, we don't want to keep going like this, because that'd take a bunch of time. What we do instead is find a pattern. Notice (if you keep going) that every for every \\(8\\) values, \\(3\\) are divisible by \\(8\\). We multiply \\(759\\) by \\(\\frac{3}{8}\\) but then subtract one for the 
        value of \\(b\\) that is out of range (\\(b=3\\)). We add \\(7+5+8=20\\)
        `,
        answer: '20',
        topic: 'bases',
    },
    {
        title: `AMC 10A 2024 Problem 20 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `<p>Let \\(S\\) be a subset of \\({1,2,3,...,2024}\\) such that the following two conditions hold:</p>
        <p>If \\(x\\) and \\(y\\) are distinct elemtns of \\(S\\), then \\(|x-y|>2\\)</p>
        <p>If \\(x\\) and \\(y\\) are distinct odd elements of \\(S\\), then \\(|x-y|>6\\)</p>
        <p>What is the maximum possible number of elements in \\(S\\)?`,
        solution: `<b>608</b><p>The difference beween two odd numbers must be at least \\(8\\) because it has to be greater than \\(6\\) and the difference between odd numbers must be even.</p>
        We find that if we start at \\(1\\) we find \\(252\\) elements, with the highest being \\(2017\\). We now work on the 1st rule</p>
        <p>Let's start at \\(1\\). We can't have \\(2\\) or \\(3\\) so the next one must be \\(4\\). This gives us a total of \\(506\\) elements. However, it also leaves us with a lot of...empty space. What would happen if we made the difference between odd numbers bigger?</p>
        <p>Let's make the differnece \\(10\\). We have a highest value of \\(2021\\) for \\(203\\) total odd numbers. Adding the evens, we can do \\(4\\) and \\(8\\). This gives us \\(609\\), but remember to subtract one at the top that would go out of range</p>
        <h3>Common Mistake <SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN></h3>
        <p>The most obvious solution isn't always the right one. Notice how it was surprisingly simple for such a hard question, the first solution, I mean..? That's a sign that you can probably spend a few more minutes at the very least checking your answer and looking for contradictions`,
        type: 'mc',
        choices: ['\\(A) 436\\)', '\\(B) 506\\)', '\\(C) 608\\)', '\\(D) 654\\)', '\\(E) 675\\)'],
        answer: '\\(C) 608\\)',
        topic: 'optimization',
    },
    {
        title: `AMC 10A 2024 Problem 21 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 5,
        text: `The numbers, in order, of each row and the numbers, in order, of each column of a \\(5 \\times 5\\) array of integers form an arithmetic progression of length \\(5\\). The numbers in positions \\((5,5), (2,4), (4,3),\\) and \\((3,1)\\) are \\(0,47,16,\\) and \\(12\\) respectively. What number 
        is in position \\((1,2)\\)?`,
        solution: `<b>29</b><p>Just off the bat, this is a really annoying problem to solve. There is quite a bit of algebra in it, and honestly, if I saw this on the AMC 10 I would skip it. That being said, here's how to solve it</p>
        <p>We start at \\(0\\) and label the values vertically and horizontally intersecting it. We call the vertical ones \\(x, 2x, 3x, 4x\\) and the horizontal ones \\(y, 2y, 3y, 4y\\). Now, we see that the relationship for the middle column is \\(2b-16\\). It then follows that the values in that column are \\(2b, 16, 32-2b, 48-4b,64-6b\\)</p>
        <p>We see a relationship in the second row, you add \\(4b\\). Thus, \\(3a=48+4b\\). We also note that the relationship for the third row is \\(10-b\\). Thus, \\(2a=52-4b\\). we solve the system of equations</p>
        $$
        3a+48+4b
        $$
        $$
        2a=52-4b
        $$
        $$
        5a=100
        $$
        $$
        a=20
        $$
        $$
        b=3
        $$
        <p>We have \\(4a=80\\) and \\(64-6b=46\\) for a difference of \\(17\\) so we have an answer of \\(46-17=29\\)`,
        answer: '29',
        topic: 'series',
    },
    {
        title: `AMC 10B 2024 Problem 1 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `In a long line of people arranged left to right, the \\(1013\\)th person from the left is also the \\(1010\\)th person from the right. How many people are in the line?`,
        solution: `<b>2022</b><p>This is easy, right? I mean you just add them? Nope, because the issue with that is you would count the person twice. What you do instead is add and subtract \\(1\\) for \\(1013+1010-1=2022\\)</p>
        <h3>Common Mistake <SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN><SPAN CLASS="MATERIAL-SYMBOLS-OUTLINED">
EXCLAMATION
</SPAN></h3>
        <p>This is a prime example of how the AMC 10 can be tricky. Especially for earlier problems like these, be very careful not to lose easy points, especially given that you are penalized for wrong answers</p>`,
        topic: 'logic',
        type: 'mc',
        choices: ['\\(A) 2021\\)', '\\(B) 2022\\)', '\\(C) 2023\\)', '\\(D) 2024\\)', '\\(E) 2025\\)'],
        answer: '\\(B) 2022\\)',
    },
    {
        title: `AMC 10B 2024 Problem 5 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `<p>In the following expression, Melanie changed some of the plus signs to minus signs:</p>
        $$
        1+3+5+7+...+97+99
        $$
        <p>Wehn the new expression was evaluated, it was negative. What is the least number of plus signs that Melanie could've changed to minus signs?`,
        solution: `<b>15</b><p>We have the sum of the first \\(n\\) odd numbers to be \\(n^2\\) so the original equation sums to \\(2500\\). Obviously, we make all the highest numbers negative. To find the sum of the highest 
        odd numbers to be \\(2500-(50-x)^2\\) which must be greater than \\(1250\\). We solve</p>
        $$
        2500-(50-x)^2>1250
        $$
        $$
        2500-x^2+100x-2500 > 1250
        $$
        $$
        -x^2+100x>1250
        $$
        <p>We see that \\(15\\) is the least value of \\(x\\) that fits this</p>`,
        type: 'mc',
        choices: ['\\(A) 14\\)', '\\(B) 15\\)', '\\(C) 16\\)', '\\(D) 17\\)', '\\(E) 18\\)'],
        topic: 'inequalities',
    },
    {
        title: `AMC 10B 2024 Problem 7 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `What is the remainder when \\(7^2024 + 7^2025 + 7^2026\\) is divided by \\(19\\)?`,
        solution: `<b>0</b><p>We factor out \\(7^2024\\) for \\(7^2024(1+7+49)\\) or \\(7^2024(57)\\). Since \\(57\\) is divisible by \\(19\\) (being \\(19 \\cdot 3\\)\\), we have a remainder of \\(0\\)`,
        topic: 'factoring',
        answer: '0',
    },
    {
       title: `AMC 10B 2024 Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
       used: false,
       difficulty: 2,
       text: `Let \\(N\\) be the product of all the positive integer divisors of \\(42\\). What is the units digit of \\(N\\)?`,
       solution: `<b>6</b><p>Through pure logic, we know that the product of all divisors of \\(42\\) will be some power of \\(42\\).</p>
       <p>The prime factorization of \\(42\\) is \\(2 \\cdot 3 \\cdot 7\\) for a total of \\(8\\) factors and \\(4\\) factor pairs. Thus, \\(42\\) is raised to the \\(4\\)th power. </p>
       <p>The units digit will follow a pattern, so we just find the pattern for \\(2\\) to be \\(2, 4, 8, 6\\). Thus, the units digit is \\(6\\)` ,
       answer: '6',
       topic: 'prime factorization',
    },
    {
        title: `AMC 10B 2024 Problem 12 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `A group of \\(100\\) students from different countries meet at a mathematics competition. Each student speaks the same number of languages, and, for every pair of students \\(A\\) and \\(B\\), student \\(A\\)
        and \\(B\\), student \\(A\\) speaks some language that student \\(B\\) does not speak, and student \\(B\\) speaks some language that student \\(A\\) does not speak. What is the least possible total 
        number of languages spoken by all students?`,
        solution: `<b>9</b><p>What the question is asking is how many languages there need to be such that picking any random two students guarantees that they don't have the same combination of languages. We need for each student to have a unique combination of languages</p>
        <p>Using the answer choices, we go through them each and arduously find a number for which of \\(n\\) choosing \\(x\\) languages leads to over \\(100\\) possibilities. What that means is that there's more than \\(100\\) combinations of languages, thus meaning each student has their own individual one. We start with \\(9\\).</p>
        <p>Logic dictates that they ca't all speak one language, or two. We try three which gives \\(\\frac{9!}{3!6!}=84\\). Next try \\(\\frac{9!}{4!5!}=126\\) This works so we have our answer to be \\(9\\)`,
        type: 'mc',
        choices: ['\\(A) 9\\)', '\\(B) 10\\)', '\\(C) 12\\)', '\\(D) 51\\)', '\\(E) 100\\)'],
        topic: 'combinations',
    },
    {
        title: `AMC 10B 2024 Problem 15 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 3,
        text: `A list of \\(9\\) real numbers consists of \\(1, 2.2, 3.2, 5.2, 6.2\\) and \\(7\\) as well as \\(x, y,\\) and \\(z\\) with \\(x \\le y \\le z\\). The range of the list is \\(7\\) and the mean and the median are both positive integers. how many ordered triples \\(x,y,z\\) are possible?`,
        solution: `<b>3</b><p>We either have \\(x=0\\) or \\(z=8\\) and that \\(y\\) must be the medain. The sum of all the numbers must be divisible by \\(9\\) in order for the mean to be a whole number. The current sum is \\(24.8\\) so the remaining numbers must sum to \\(2.2, 11.2, 20.2\\). \\(2.2\\) isn't possible unless we hvae a negative \\(x\\), which we can't without 
        disrupting the range. For \\(11.2\\), we know that the median \\(y\\) must be between \\(3.2\\) and \\(5.2\\) so it's either \\(4\\) or \\(5\\). The prior makes \\(x\\) and \\(z\\) which contradicts our previous statement but is still correct (lesson in oversimplifaction, not always the best) and the latter gives \\(0\\) and \\(6.2\\)</p>
        <p>For \\(20.2\\) we need as many high numbers as possible so we have \\(z=8\\). This leaves \\(12.2\\) left and we know that \\(y\\) must be an integer and the median. However, that's not possible. \\(y\\) must be greater so that we can "offset" the median. (gee I'm contradicting myself quite a bit) that gives a median of \\(x=6\\) for \\(y=6.2\\) and \\(3\\) possible answers`,
        type: 'mc',
        choices: ['\\(A) 1\\)', '\\(B) 2\\)', '\\(C) 3\\)', '\\(D) 4\\)', '\\(E) \\textup{infinitely many}\\)'],
        answer: '\\(C) 3\\)',
        topic: 'logic',
    },
    {
        title: `AMC 10B 2024 Problem 16 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `Jerry likes to play with numbers. One day, he wrote all the integers from \\(1\\) to \\(2024\\) on the whiteboard. Then he repeatedly chose four numbers on the whiteboard, erased them, and replaced them by either their sum or their product. (For example, Jerry's first step might have been to erase
        \\(1,2,3\\) and \\(5\\), and then write either \\(1\\) their sum, or \\(30\\) their product, on the whiteboard). After repeatedly performing this operation, Jerry noticed that all the remaining numbers on the whiteboard were odd. What is the maximum possible number of integers on the whiteboard at that time?
        `,
        solution: `<b>1010</b><p>We eliminate all answers except \\(1010\\) and \\(1013\\) right off the bat because we know that the number of remaining integers must be congruent modulo \\(3\\) to \\(2024\\). This is because we rmeove a net \\(3\\) integers each round, so that needs to stay constant</p>
        <p>Assuming Jerry uses the best strategy, he would remove \\(3\\) even integers and \\(1\\) odd and take the sum of them because that would sum to an odd number no matter what. There are \\(\\frac{2024}{2}=1012\\) even integers so eventually he hits a roadblock and is left with one even integer and \\(1012\\) odd integers (because for every odd integer he took away he added one). He then proceeds to get another odd integer by adding the even to \\(3\\) odds which removes \\(2\\0 but adds \\(1\\) for \\(1010\\)`,
        type: 'mc',
        choices: ['\\(A) 1010\\)', '\\(B) 1011\\)', '\\(C) 1012\\)', '\\(D) 1013\\)', '\\(E) 1014\\)'],
        answer: '\\(A) 1010\\)',
        topic: 'logic',
    },
    {
        title: `AMC 10B 2024 Problem 18 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 5,
        text: "How many different remainders can result when the \\(100\\textup{th}\\) power of any integer is divided by \\(125\\)?",
        solution: `<b>2</b><p>Any integer can be written as \\(5x, 5x+1, 5x+2, 5x+3, 5x+4\\). When we raise these to the \\(100\\)th power, they will leave specific remainders. For \\(5x\\) it leaves \\(0\\) because the \\(5\\) effectively "handles" the \\(125\\). Not quite sure how else to explain it. We also notice that \\(5x+4 = 5(x+1)-1\\) and the same logic for \\(5x+3\\). \\(5x \\pm 1\\) or \\(2\\) give remainder of \\(1\\) (see link for more complex proof)</p>`,
        answer: '2',
        topic: 'factoring'
    },
    {
        title: `AMC 10B 2024 Problem 23 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 5,
        text: `<p>The Fibonacci numbers are defined by \\(F_{1}=1, F_{2}=1,\\) and \\(F_{n}=F_{n-1}+F_{n-2}\\) for \\(n \\ge 3\\) What is</p>
        $$
        \\frac{F_{2}}{F_{1}}+\\frac{F_{4}}{F_{2}}+\\frac{F_{6}}{F_{3}}+...+\\frac{F_{20}}{F_10}}?
        $$`,
        solution: `<b>319</b><p>So...if you really wanted to, you could brute force this if nescessary. It sucks, yes, but if you run out of time, it's what you gotta do. It's also not that bad...when I saw this problem I thought it would go all the way up to \\(2024\\) so at least there's that</p>
        <p>Now the actual solving. We try our best to find a pattern. We compute the first few values to be \\(1\\), \\(3\\), \\(4\\), \\(7\\), \\(11\\)...This is familiar, right? That's because it is similar to the Fibbonaci sequence itself! We keep going to find the remaining values to be 
        \\(1, 3, 4, 7, 11, 18, 29, 47, 76, 123\\) which sum to \\(319\\)`,
        answer: '319',
        topic: 'patterns',
    },
    {
        title: `AMC 10A 2025 Problem 5 <span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 1,
        text: `<p>Consider the sequence of positive integers</p>
        $$
        1,2,1,2,3,2,1,2,3,4,3,2,1,2,3,4,5,4,3,2,1,2,3,4,5,6,5,4,3,2,1,2,...
        $$
        <p>What is the \\(2025\\)th term in this sequence?`,
        solution: `<b>45</b>Let's try to find a pattern. The most obvious one pertains to \\(1\\)s because those appear the most. We have ones in positions \\(1,3,7,13,18\\). The difference between these are consecutively larger even numbers (\\(+2,+4,+6\\)). </p>
        <p>We know the sum of the first \\(n\\) even numbers is \\(n(n+1)\\) which we modify to be \\(n(n+1)+1\\) to fit our predicament. Keep in mind that we're calling the first \\(1\\) the \\(0\\)th. We now try to find the one nearest to \\(2025\\). We solve</p>
        $$
        n^2+n-1=2025
        $$
        <p>This won't yield a rational number, but we try \\(n=44\\) because we know \\(2025=45^2\\) so it must be close to there. That gives us \\(1981\\). We subtract \\(2025-1981\\) and get \\(44\\) but add \\(1\\) to account for the \\(1\\) at the start 
        `,
        type: 'mc',
        choices: ['\\(A) 5\\)', '\\(B) 15\\)', '\\(C) 16\\)', '\\(D) 44\\)', '\\(E) 45\\)'],
        answer: '\\(E) 45\\)',
        topic: 'patterns',
    },
    {
        title: `AMC 10A 2025 Problem 8 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 2,
        text: `<p>Agnes writes the following four statements on a blank piece of paper</p>
        <p> - At least one of these statements is true</p>
        <p> - At least two of these statements are true</p>
        <p> - At least two of these statements are false</p>
        <p> - At least one of these statements is false</p>
        <p>Each statement is either true or false. How many false statements did Agnes write on the paper?`,
        solution: `<b>1</b><p>Let's work our way through each one</p>
        <p>If the first one is true, it fuffils itself. If it is false then everything else must also be false. Then, the last statement must be false and none of the statements can be false. That's a contradiction so the first one is true</p>
        <p>If the second one is true, both the first and second statements are fufilled. If it is false then everything else is false, and we reach the same issue as before</p>
        <p>If the third statement is true, then it creates a contradiction because we already have three true statements. The third statement is false</p>
        <p>The last one has to be true because we already proved one is false</p>
        <p>There is only one false statement</p>`,
        type: 'mc',
        choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
        answer: `\\(B) 1\\)`,
        topic: 'logic',
    },
    {
        title: `AMC 10A 2025 Problem 17 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `Let \\(N\\) be the unique positive integer such that dividng \\(273436\\) by \\(N\\) leaves a remainder of \\(16\\) and dividing \\(272760\\) by \\(N\\) leaves a remainder of \\(15\\). What is the tens digit of \\(N\\)?`,
        solution: `<b>4</b><p>We have that \\(x \\cdot N + 16 = 273436\\) and that \\(y \\cdot N + 15 = 272760\\). We can also rewrite this into
        \\(x \\cdot N = 273420\\) and \\(y \\cdot N = 272745\\). We effectively need the \\(GCF\\) of the two constants. </p>
        <p>We start with some prime factorization. We get \\(273420 = 2^2 \\times 3^2 \\times 5 \\times 7^2 \\times 31\\) and \\(272745=3^2 \\cdot 5 \\cdot 11 \\cdot 19 \\cdot 29\\) so we have an overlaping \\(3^2 \\times 5\\) which gives \\(45\\) for a tens digit of \\(4\\)</p>`,
        answer: '4',
        topic: `prime factorization`,
    },
    {
        title: `AMC 10A 2024 Problem 24 <span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span><span class="material-symbols-outlined">
star
</span>`,
        used: false,
        difficulty: 4,
        text: `Call a positive integer fair if no digit is used more than once, it has no \\(0\\)s and no digit is adjacent to two
        greater digits. For example, \\(196, 23\\) and \\(12463\\) are fair, but \\(1546, 320,\\) and \\(34321\\) are not. How many fair positive integers are there?`,
        type: 'mc',
        choices: ['\\(A) 511\\)', '\\(B) 2584\\)', '\\(C) 9841\\)', '\\(D) 17711\\)', '\\(E) 19682\\)'],
        solution: `<b>\\(9841\\)</b><p>What the restraint about not being adjacent to two greater numbers effectively tells us that the number has to be strictly ascending or descending. Call the highest number \\(n\\). For every digit where \\(x < n\\) \\(x\\) must be before, after, or not included. That gives \\(3^{n-1}\\). We 
        compute the sum of the arithmetic series for all values of \\(n\\) which gives \\(9841\\)`,
        answer: `\\(C) 9841\\)`,
        topic: 'series',
    },
]


// ---------- DOM Elements ----------
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const checkBtn = document.getElementById("check-btn");
const solutionDiv = document.getElementById("solution");
const solutionText = document.getElementById("solution-text");
const solutionLink = document.getElementById("solution-link");
const nextBtn = document.getElementById("next-btn");
const popup = document.getElementById("popup");
const backBtn = document.querySelector(".back-btn");
const progressBar = document.getElementById("progress-bar")
const mcContainer = document.getElementById("mc-container");
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const questionChoices = document.getElementById("mc-container")
const submitSolutionButton = document.getElementById("submit-a-solution");
const submitSolutionForm = document.getElementById("submit-a-solution-form");

let questionsAnswered = 0;
let percentage = 0;
let percetnageStr = "0";
//--------------Progress Bar---------------
function progressBarFunction() {
questionsAnswered++;
percentage = ((questionsAnswered) / questions.length) * 100;
progressBar.style.width = percentage + "%";
}


// ---------- Load Question ----------
function loadQuestion(index) {
    submitSolutionForm.style.display = "none";
    submitSolutionButton.style.display='block'
    const q = questions[index];
    mcChoices.forEach(btn => btn.disabled = false);


    questionTitle.innerHTML = q.title;
    questionText.innerHTML = q.text;

    solutionText.innerHTML = "";
    solutionDiv.style.display = "none";
    nextBtn.style.display = "none";

    // Reset
    answerInput.value = "";
    answerInput.style.display = "none";
    checkBtn.style.display = "none";
    mcContainer.classList.add("hidden");

    // ----- FREE RESPONSE -----
    if (!q.type || q.type === "fr") {
        answerInput.style.display = "inline-block";
        checkBtn.style.display = "inline-block";
    }

    // ----- MULTIPLE CHOICE -----
    if (q.type === "mc") {
        mcContainer.classList.remove("hidden");

        mcChoices.forEach((btn, i) => {
            btn.textContent = q.choices[i];
            btn.onclick = () => handleMCAnswer(q.choices[i]);
        });
    }

    if (window.MathJax) {
        MathJax.typesetPromise([questionText]).catch(()=>{});
        MathJax.typesetPromise([questionChoices]).catch(()=>{});
    }
}


//----------Load Cards-------------


//-----------MCQ----
function handleMCAnswer(choice) {
    answerInput.value = choice; // reuse existing checker
    checkBtn.click();
mcChoices.forEach(btn => btn.disabled = true);

}




// ---------- Popup ----------
function showPopup(message, isCorrect) {
    popup.textContent = message;
    popup.style.backgroundColor = isCorrect ? "#4CAF50" : "#f44336";
    popup.style.opacity = "1";
    setTimeout(() => popup.style.opacity = "0", 2000);
}


// ---------- Check Answer ----------
checkBtn.addEventListener("click", function () {
    const userAnswer = answerInput.value.trim();
    const correctAnswer = questions[currentQuestion].answer.trim();
    if (userAnswer === correctAnswer && nextBtn.style.display==="none") {
            progressBarFunction();
            correctCount++;
        solutionText.innerHTML = `<span class="material-symbols-outlined">
check
</span> Correct! ` + questions[currentQuestion].solution;

      // Existing confetti
       myConfetti({ particleCount: 160, spread: 200, origin: { x: 0.2, y: 1 } });
        myConfetti({ particleCount: 160, spread: 200, origin: { x: 0.8, y: 1 } });

        showHighlight();
        } else if (userAnswer !== correctAnswer && nextBtn.style.display === "none") {
            progressBarFunction();
        wrongCount++;
        solutionText.innerHTML = `<span class="material-symbols-outlined">
close_small
</span> Incorrect. ` + questions[currentQuestion].solution;
        problemsWrapper.classList.add("shake");
        setTimeout(() => problemsWrapper.classList.remove("shake"), 400);
    }
    solutionDiv.style.display = "block";
    nextBtn.style.display = "inline-block";

    if (window.MathJax) {
        MathJax.typesetPromise([solutionDiv, questionText]).catch(()=>{});
    }
});

// ---------- Next Question ----------
nextBtn.addEventListener("click", function () {
    // Slide out
    problemsWrapper.classList.add("slide-out");

    setTimeout(() => {
        // Remove slide-out and load next question
        problemsWrapper.classList.remove("slide-out");
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion(currentQuestion);

            // Slide in effect
            problemsWrapper.classList.add("slide-in");
            setTimeout(() => problemsWrapper.classList.remove("slide-in"), 350);
        } else {
    questionTitle.textContent = "All done!";
    questionText.textContent = "You've completed all questions.";
    answerInput.style.display = "none";
    checkBtn.style.display = "none";
    nextBtn.style.display = "none";
    solutionDiv.style.display = "none";
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    }


    // Show stats dashboard
    document.getElementById("stats-dashboard").classList.remove("hidden");
    document.getElementById("total-questions").textContent = questions.length;
    document.getElementById("correct-answers").textContent = correctCount;
    document.getElementById("wrong-answers").textContent = wrongCount;
}

    }, 300); // matches slide-out duration
});




// ---------- Enter Key ----------
answerInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && nextBtn.style.display === "none") {
        e.preventDefault();
        checkBtn.click();
    } if (e.key === "Tab" && nextBtn.style.display !== "none") {
        e.preventDefault();
        nextBtn.click();
    }
});





//---------------Infinite Scroll----------

const track = document.querySelector('.carousel-track');
const trackWrapper = document.querySelector('.carousel-track-wrapper');
const cards = Array.from(track.children);
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

const cardWidth = cards[0].offsetWidth + 16; // margin included
const visibleCards = Math.floor(trackWrapper.offsetWidth / cardWidth);


// Clone first and last visibleCards for smooth looping
for (let i = 0; i < visibleCards; i++) {
  track.appendChild(cards[i].cloneNode(true)); // end
  track.insertBefore(cards[cards.length - 1 - i].cloneNode(true), track.firstChild); // start
}

const allCards = Array.from(track.children);
let index = visibleCards; // start at first real card

track.style.transform = `translateX(-${cardWidth * index}px)`;

// Move carousel
function moveCarousel() {
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${cardWidth * index}px)`;
}

// Button clicks
rightBtn.addEventListener('click', () => {
  index++;
  moveCarousel();
});

leftBtn.addEventListener('click', () => {
  index--;
  moveCarousel();
});

// Infinite loop logic
track.addEventListener('transitionend', () => {
  let needsReset = false;

  if (index >= allCards.length - visibleCards) {
    index = visibleCards;
    needsReset = true;
  }

  if (index < visibleCards) {
    index = allCards.length - visibleCards * 2;
    needsReset = true;
  }

  if (needsReset) {
    requestAnimationFrame(() => {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${cardWidth * index}px)`;

      // Force reflow so browser commits transform
      track.offsetHeight;

      // Restore transition for future moves
      track.style.transition = 'transform 0.5s ease';
    });
  }
});
let allQ = []
const logicQuestions = [
    {
        title: "Review Question",
        text: `<p>What is the inverse of this statement?<p>
        <p>If you take the AMC 10, then you are really smart</p>`,
        choices: ['\\(A) \\textup{If you are really smart, then you take the AMC 10}\\)', '\\(B) \\textup{If you are not taking the AMC 10, then you are not really smart}\\)', '\\(C) \\textup{If you are not really smart, then you are not taking the AMC 10}\\)', '\\(D) \\textup{You are taking the AMC 10 if and only if you are really smart}\\)'],
        answer: '\\(B) \\textup{If you are not taking the AMC 10, then you are not really smart}\\)',
        solution: '<b>\\(B) \\textup{If you are not taking the AMC 10, then you are not really smart}\\)</b><p>To take the inverse, you negate both the hypothesis and conclusion'
    },
    {
        title: "Review Question",
        text: `<p>What is the converse of this statement?<p>
        <p>If you take the AMC 10, then you are really smart</p>`,
        choices: ['\\(A) \\textup{If you are really smart, then you take the AMC 10}\\)', '\\(B) \\textup{If you are not taking the AMC 10, then you are not really smart}\\)', '\\(C) \\textup{If you are not really smart, then you are not taking the AMC 10}\\)', '\\(D) \\textup{You are taking the AMC 10 if and only if you are really smart}\\)'],
        answer: '\\(A) \\textup{If you are really smart, then you take the AMC 10}\\)',
        solution: '<b>\\(A) \\textup{If you are really smart, then you take the AMC 10}\\)</b><p>To take the converse, you switch both the hypothesis and conclusion' 
    },
    {
        title: "Review Question",
        text: `<p>What is the contrapositive of this statement?<p>
        <p>If you take the AMC 10, then you are really smart</p>`,
        choices: ['\\(A) \\textup{If you are really smart, then you take the AMC 10}\\)', '\\(B) \\textup{If you are not taking the AMC 10, then you are not really smart}\\)', '\\(C) \\textup{If you are not really smart, then you are not taking the AMC 10}\\)', '\\(D) \\textup{You are taking the AMC 10 if and only if you are really smart}\\)'],
        answer: '\\(C) \\textup{If you are not really smart, then you are not taking the AMC 10}\\)',
        solution: '<b>\\(C) \\textup{If you are not really smart, then you are not taking the AMC 10}\\)</b><p>To take the contrapositive, you negate  and switch both the hypothesis and conclusion'
    },
    {
        title: "Review Question",
        text: `<p>What is the biconditional of this statement?<p>
        <p>If you take the AMC 10, then you are really smart</p>`,
        choices: ['\\(A) \\textup{If you are really smart, then you take the AMC 10}\\)', '\\(B) \\textup{If you are not taking the AMC 10, then you are not really smart}\\)', '\\(C) \\textup{If you are not really smart, then you are not taking the AMC 10}\\)', '\\(D) \\textup{You are taking the AMC 10 if and only if you are really smart}\\)'],
        answer: '\\(D) \\textup{You are taking the AMC 10 if and only if you are really smart}\\)',
        solution: '<b>\\(D) \\textup{You are taking the AMC 10 if and only if you are really smart}\\)</b><p>The biconditional is in the form conclusion if and only if hypothesis,'
    },
    {
        title: "Review Question",
        text: `Which symbol demonstrates a union/the overlapping area between two factors?`,
        choices: ['\\(A) =\\)', '\\(B) \\equiv\\)', '\\(C) \\cap\\)', '\\(D) \\subset\\)'],
        answer: '\\(C) \\cap\\)',
        solution: `<b>\\(C) \\cap\\)</b>`,
    },
    {
        title: 'Review Question',
        text: `Which symbol demonstrates a subset/fully contained set within something else?`,
        choices: ['\\(A) =\\)', '\\(B) \\equiv\\)', '\\(C) \\cap\\)', '\\(D) \\subset\\)'],
        answer: '\\(D) \\subset\\)',
        solution: '\\(D) \\subset\\)',
    },
    {
        title: `Review Question`,
        text: `What is the baseline ratio for cardinality?`,
        choices: ['\\(A) 0:1\\)', '\\(B) 1:1\\)', '\\(C) 1:2\\)', '\\(D) 2:3\\)', '\\(E) 3:4\\)'],
        answer: `\\(B) 1:1\\)`,
        solution: `\\(B) 1:1\\)</b><p>Cardinality involves matching sets one by one, with a 1:1 ratio, and seeing what is left over to determine size`
    },
    {
        title: "Review Question",
        text: `Which branch of set theory is known for being more intuition based?`,
        choices: ['\\(A) \\textup{ Naive set theory}\\)', '\\(B) \\textup{ Axiomatic set theory}\\)'],
        answer: '\\(A) { Naive set theory}\\)',
        solution: `<b>\\(A) { Naive set theory}\\)</b><p>Naive set theory involves making conclusions based on one statement by following the implications of it with intuition.`
    },
    {
        title: "Review Question",
        text: `Which branch of set theory uses rules to restrict paradoxes?`,
        choices: ['\\(A) \\textup{ Naive set theory}\\)', '\\(B) \\textup{ Axiomatic set theory}\\)'],
        answer: '\\(B) \\textup{ Axiomatic set theory}\\)',
        solution: `<b>\\(B) \\textup{ Axiomatic set theory}\\)</b><p>Axiomatic set theory involves setting rules (known as axioms) to prevent paradoxes and contradictions`
    }
]
logicQuestions.forEach(i => {
    i.topic = 'logic'
})
allQ.push(logicQuestions[0])
const countingQuestions = [
  {
    title: "Review Question",
    text: "A positive integer is called an <i>uphill integer</i> if every digit is strictly greater than the previous digit (e.g., \\(137\\) or \\(289\\)). How many \\(3\\)-digit uphill integers are there?",
    type: "mc",
    choices: [
      "\\(A) 36\\)",
      "\\(B) 72\\)",
      "\\(C) 84\\)",
      "\\(D) 120\\)",
      "\\(E) 504\\)"
    ],
    answer: "\\(C) 84\\)",
    solution: "<b>\\(C) 84\\)</b><p></p>Choosing any 3 distinct non-zero digits from \\(\\{1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\) uniquely forms exactly one uphill integer because the digits must be placed in strictly increasing order. \\(0\\) cannot be used because no positive digit can precede it. Thus, the number of \\(3\\)-digit uphill integers is \\(\\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84\\)."
  },
  {
    title: "Review Question",
    text: "How many \\(3\\)-digit uphill integers are divisible by \\(5\\)?",
    type: "mc",
    choices: [
      "\\(A) 4\\)",
      "\\(B) 6\\)",
      "\\(C) 10\\)",
      "\\(D) 12\\)",
      "\\(E) 15\\)"
    ],
    answer: "\\(B) 6\\)",
    solution: "<b>\\(B) 6\\)</b><p></p>For an integer to be divisible by \\(5\\), its last digit must be \\(0\\) or \\(5\\). Since digits in an uphill integer strictly increase, the last digit cannot be \\(0\\). Therefore, the last digit must be \\(5\\). The first two digits must be chosen from \\(\\{1, 2, 3, 4\\}\\) in strictly increasing order. The number of ways to pick 2 digits from these 4 options is \\(\\binom{4}{2} = 6\\)."
  },
  {
    title: "Review Question",
    text: "How many \\(3\\)-digit positive integers have a tens digit that is strictly greater than both the hundreds digit and the units digit?",
    type: "mc",
    choices: [
      "\\(A) 120\\)",
      "\\(B) 200\\)",
      "\\(C) 240\\)",
      "\\(D) 285\\)",
      "\\(E) 330\\)"
    ],
    answer: "\\(C) 240\\)",
    solution: "<b>\\(C) 240\\)</b><p></p>Let the number be \\(abc\\). We require \\(b > a\\) and \\(b > c\\), where \\(a \\in \\{1, \\dots, 9\\}\\) and \\(c \\in \\{0, \\dots, 9\\}\\). We split into cases based on the tens digit \\(b\\):<br>• If \\(b = 2\\): \\(a\\) has 1 choice (\\(1\\)), \\(c\\) has 2 choices (\\(0, 1\\)) \\(\\rightarrow 1 \\times 2 = 2\\).<br>• If \\(b = 3\\): \\(a\\) has 2 choices, \\(c\\) has 3 choices \\(\\rightarrow 2 \\times 3 = 6\\).<br>• Generally, for a fixed \\(b\\), there are \\((b - 1) \\times b\\) valid numbers.<br>Summing for \\(b = 2\\) through \\(9\\): \\(2 + 6 + 12 + 20 + 30 + 42 + 56 + 72 = 240\\)."
  },
  {
    title: "Review Question",
    text: "How many \\(4\\)-digit positive integers contain at least one digit equal to \\(7\\)?",
    type: "mc",
    choices: [
      "\\(A) 3168\\)",
      "\\(B) 3888\\)",
      "\\(C) 4168\\)",
      "\\(D) 5832\\)",
      "\\(E) 6000\\)"
    ],
    answer: "\\(A) 3168\\)",
    solution: "<b>\\(A) 3168\\)</b><p></p>We use complementary counting. First, the total number of \\(4\\)-digit integers is \\(9000\\) (from \\(1000\\) to \\(9999\\)).<br>Next, count how many \\(4\\)-digit integers contain <b>no</b> digits equal to \\(7\\):<br>• Thousands digit: 8 choices (excluding \\(0\\) and \\(7\\))<br>• Hundreds digit: 9 choices (excluding \\(7\\))<br>• Tens digit: 9 choices<br>• Units digit: 9 choices<br>Total without \\(7\\) = \\(8 \\times 9 \\times 9 \\times 9 = 5832\\).<br>Subtracting from the total gives \\(9000 - 5832 = 3168\\)."
  },
  {
    title: "Review Question",
    text: "Three standard \\(6\\)-sided dice are rolled. What is the probability that the product of the three numbers rolled is even?",
    type: "mc",
    choices: [
      "\\(A) 1/8\\)",
      "\\(B) 3/8\\)",
      "\\(C) 1/2\\)",
      "\\(D) 3/4\\)",
      "\\(E) 7/8\\)"
    ],
    answer: "\\(E) 7/8\\)",
    solution: "<b>\\(E) 7/8\\)</b><p></p>Using complementary counting, the product of three numbers is odd if and only if <b>all three rolls are odd</b>.<br>The probability of rolling an odd number on a single die is \\(\\frac{1}{2}\\).<br>The probability that all three dice land on odd numbers is \\(\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}\\).<br>Therefore, the probability that the product is even (the complement) is \\(1 - \\frac{1}{8} = \\frac{7}{8}\\)."
  },
  {
    title: "Review Question",
    text: "How many non-empty subsets of \\(\\{1, 2, 3, 4, 5, 6, 7, 8\\}\\) contain at least one even number?",
    type: "mc",
    choices: [
      "\\(A) 128\\)",
      "\\(B) 240\\)",
      "\\(C) 241\\)",
      "\\(D) 255\\)",
      "\\(E) 256\\)"
    ],
    answer: "\\(B) 240\\)",
    solution: "<b>\\(B) 240\\)</b><p></p>The total number of non-empty subsets of an 8-element set is \\(2^8 - 1 = 255\\).<br>The complement consists of non-empty subsets containing <i>only</i> odd numbers from \\(\\{1, 3, 5, 7\\}\\). The number of non-empty subsets of these 4 odd numbers is \\(2^4 - 1 = 15\\).<br>Subtracting the complement from the total gives \\(255 - 15 = 240\\)."
  },
  {
    title: "Review Question",
    text: "How many non-negative integer solutions \\((x, y, z)\\) satisfy the equation \\(x + y + z = 10\\)?",
    type: "mc",
    choices: [
      "\\(A) 36\\)",
      "\\(B) 55\\)",
      "\\(C) 66\\)",
      "\\(D) 78\\)",
      "\\(E) 120\\)"
    ],
    answer: "\\(C) 66\\)",
    solution: "<b>\\(C) 66\\)</b><p></p>Using the Stars and Bars formula \\(\\binom{n + k - 1}{k - 1}\\) for distributing \\(n = 10\\) items into \\(k = 3\\) bins:<br>\\(\\binom{10 + 3 - 1}{3 - 1} = \\binom{12}{2} = \\frac{12 \\times 11}{2} = 66\\)."
  },
  {
    title: "Review Question",
    text: "In how many ways can \\(8\\) identical candies be distributed among \\(4\\) children if some children may receive no candies?",
    type: "mc",
    choices: [
      "\\(A) 120\\)",
      "\\(B) 165\\)",
      "\\(C) 210\\)",
      "\\(D) 330\\)",
      "\\(E) 495\\)"
    ],
    answer: "\\(B) 165\\)",
    solution: "<b>\\(B) 165\\)</b><p></p>This is a classic Stars and Bars problem where we distribute \\(n = 8\\) stars (candies) into \\(k = 4\\) bins (children) with \\(k - 1 = 3\\) bars.<br>The formula \\(\\binom{n + k - 1}{k - 1}\\) gives \\(\\binom{8 + 4 - 1}{4 - 1} = \\binom{11}{3} = \\frac{11 \\times 10 \\times 9}{3 \\times 2 \\times 1} = 165\\)."
  },
  {
    title: "Review Question",
    text: "How many positive integer solutions \\((a, b, c, d)\\) satisfy \\(a + b + c + d = 12\\)?",
    type: "mc",
    choices: [
      "\\(A) 120\\)",
      "\\(B) 165\\)",
      "\\(C) 220\\)",
      "\\(D) 495\\)",
      "\\(E) 1320\\)"
    ],
    answer: "\\(B) 165\\)",
    solution: "<b>\\(B) 165\\)</b><p></p>Since each variable must be at least \\(1\\), we give \\(1\\) unit to each of the 4 variables first. This leaves \\(12 - 4 = 8\\) units to distribute freely among the 4 variables.<br>Using Stars and Bars for non-negative integers: \\(\\binom{8 + 4 - 1}{4 - 1} = \\binom{11}{3} = 165\\).<br>Alternatively, distributing \\(n\\) items with strictly positive bins gives \\(\\binom{n - 1}{k - 1} = \\binom{12 - 1}{4 - 1} = \\binom{11}{3} = 165\\)."
  },
  {
    title: "Review Question",
    text: "How many \\(3\\)-digit positive integers have a sum of digits equal to \\(6\\)?",
    type: "mc",
    choices: [
      "\\(A) 15\\)",
      "\\(B) 18\\)",
      "\\(C) 21\\)",
      "\\(D) 28\\)",
      "\\(E) 36\\)"
    ],
    answer: "\\(C) 21\\)",
    solution: "<b>\\(C) 21\\)</b><p></p>Let the number be \\(abc\\) with \\(a + b + c = 6\\). The hundreds digit \\(a\\) must be at least \\(1\\) (so \\(a' = a - 1 \\ge 0\\)), while \\(b, c \\ge 0\\).<br>Rewriting the equation: \\(a' + b + c = 6 - 1 = 5\\).<br>Since no single variable can exceed \\(5\\), there are no overcounting restrictions to subtract. We use Stars and Bars with \\(n = 5\\) stars and \\(k = 3\\) bins:<br>\\(\\binom{5 + 3 - 1}{3 - 1} = \\binom{7}{2} = 21\\)."
  }
];
countingQuestions.forEach(i => {
    i.topic = 'counting'
})
allQ.push(countingQuestions[0])
const primeFactorizationQuestions = [
    {
        title: "Review Question",
        text: `Given that the GCF of \\(26\\) and \\(34\\) is, \\(2\\), what is the LCM?`,
        choices: ['\\(A) 34\\)', '\\(B) 52\\)', '\\(C) 130\\)', '\\(D) 442\\)', '\\(E) 884\\)'],
        answer: '\\(D) 442\\)',
        solution: `<b>\\(D) 442\\)</b><p>Since we know the GCF, we can divide \\(\\frac{26}{2}=13\\) and multiply \\(13 \\times 34\\). This gives us \\(442\\). We can check this by dividng \\(\\frac{34}{2}=17\\) and finding \\(26 \\times 17 = 442\\)`,
    },
    {
        title: "Review Question",
        text: `What is the GCF and LCM (in that order) of \\(10\\) and \\(15\\)?`,
        type: 'mc',
        choices: ['\\(A) 5 \\textup{ and } 15\\)', '\\(B) 2 \\textup{ and } 3\\)', '\\(C) 3 \\textup{ and } 30\\)', '\\(D) 30 \\textup{ and } 2\\)', '\\(E) 5 \\textup{ and } 30\\)'],
        answer: '\\(E) 5 \\textup{ and } 30\\)', 
        solution: `<b>\\(E) 5 \\textup{ and } 30\\)</b><p>We can find the prime factorizations to be \\(10 = 2 \\times 5\\) and \\(15 = 3 \\times 5\\) which GCF of \\(5\\). The LCM must be \\(15 \\times 2 = 10 \\times 3 = 30\\)`,
    },
    {
        title: "Review Question",
        text: `What is \\(2^3 \\times 3\\) the prime factorization of?`,
        choices: ['\\(A) 6\\)', '\\(B) 12\\)', '\\(C) 23\\)', '\\(D) 24\\)', '\\(E) 32\\)'],
        answer: '\\(D) 24\\)',
        solution: `<b>\\(D) 24\\)</b><p>\\(2 \\times 2 \\times 2 \\times 3 = 8 \\times 3 = 24\\)`,
    },
    {
        title: "Review Question",
        text: `What is \\(2^8 \\times 3^3\\) the prime factorization of?`,
        choices: ['\\(A) 27\\)', '\\(B) 54\\)', '\\(C) 256\\)', '\\(D) 668\\)', '\\(E) 6912\\)'],
        answer: '\\(E) 6912\\)',
        solution: `<b>\\(E) 6912\\)</b><p>\\(2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 3 = 256 \\times 27 = 6912\\)`,
    },
    {
        title: "Review Question",
        text: `What is the prime factorization of \\(60\\)?`,
        choices: ['\\(A) 5 \\times 12\\)', '\\(B) 2 \\times 2 \\times 5\\)', '\\(C) 2^2 \\times 3 \\times 5\\)', '\\(D) 3^2 \\times 5\\)', '\\(E) 12\\)'],
        answer: '\\(C) 2^2 \\times 3 \\times 5\\)',
        solution: `<b>\\(C) 2^2 \\times 3 \\times 5\\)</b><p> We can continuously divide \\(60\\) and its resulting factors until we reach only prime factors`,
    },
    {
        title: "Review Question",
        text: `What is the prime factorization of \\(90\\)?`,
        type: 'mc',
        choices: ['\\(A) 2^3 \\times 3 \\times 5\\)', '\\(B) 2 \\times 3^2 \\times 5\\)', '\\(C) 9 \\times 10\\)', '\\(D) 5 \\times 9 \\times 2\\)', '\\(E) 2 \\times 3 \\times 5\\)'],
        answer: '\\(B) 2 \\times 3^2 \\times 5\\)',
        solution: `<b>\\(B) 2 \\times 3^2 \\times 5\\)</b><p>We divide factors we know until we get down to \\(2 \\times 3^2 \\times 5\\)`,
    },
    {
        title: "Review Question",
        text: "What is the GCF of \\(2643\\) and \\(4281\\)?",
        type: 'mc',
        choices: ['\\(A) 1\\)', '\\(B) 2\\)', '\\(C) 3\\)', '\\(D) 6\\)', '\\(E) 7\\)'],
        answer: '\\(C) 3\\)',
        solution: `<b>\\(C) 3\\)</b><p>We can immediately rule out \\(6\\) and \\(2\\) because neither is even. Since we're looking for the <i>greatest</i> common factor,
        we start from \\(7\\) and work backwards. </p>
        <p>We can use the "chop" technique for checking divisibility by \\(7\\)</p>
        <p>\\(264 - (3 \\times 2) = 258\\)</p>
        <p>\\(26 - (4 \\times 2) = 9\\)</p>
        <p>\\(9\\) is not a multiple of \\(7\\) so \\(2643\\) is not a multiple of \\(7\\)</p>
        <p>Next, we check the sum of digits for divisibility by \\(3\\)</p>
        <p>\\(2+6+4+3=15\\)</p>
        <p>\\(15\\) is divisible by \\(3\\), so \\(2643\\) is divisible by \\(3\\)</p>
        <p>\\(4+2+8+1=15\\)</p>
        <p>\\(15\\) is divisible by \\(3\\), so \\(4281\\) is divisible by \\(3\\).</p>
        <p>The GCF is \\(3\\)`,
    },
    {
        title: "Review Question",
        text: `What is the first step to solving this expression
        $$
        \\frac{1}{3} + \\frac{2}{5}
        $$`,
        choices: ['\\(A) \\textup{ add 1+2 and 3+5}\\)', '\\(B) \\textup{ multiply 1 and 3 by 3}\\)', '\\(C) \\textup{ multiply 2 and 5 by 5}\\)', '\\(D) \\textup{ find the LCM of 1 and 2}\\)', '\\(E) \\textup{ find the LCM of 3 and 5}\\)'],
        answer: '\\(E) \\textup{ find the LCM of 3 and 5}\\)',
        solution: `<b>'\\(E) \\textup{ find the LCM of 3 and 5}\\)'</b><p>We need the denominators to be equal, so we multiply \\(3\\) and \\(5\\) by what is nescessary to get to their LCM`,
    },
    {
        title: "Review Question",
        text: `If the number \\(60\\) has a prime factorization of \\(2^2 \\times 3 \\times 5\\), how many factors does it have?`,
        choices: ['\\(A) 3\\)', '\\(B) 4\\)', '\\(C) 10\\)', '\\(D) 12\\)', '\\(E) 23\\)'],
        answer: '\\(D) 12\\)',
        solution: `<b>\\(D) 12\\)</b><p>We raise each exponent by \\(1\\) and multiply:
        $$
        (2+1) \\times (1+1) \\times (1+1) = 
        $$
        $$
        3 \\times 2 \\times 2 = 
        $$
        $$
        12
        $$`,
    },
    {
        title: "Review Question",
        text: `How many factors does \\(36\\) have?`,
        choices: ['\\(A) 2\\)', '\\(B) 4\\)', '\\(C) 9\\)', '\\(D) 11\\)', '\\(E) 12\\)'],
        answer: '\\(C) 9\\)',
        solution: `<b>\\(C) 9\\)</b>$$
        36 = 2^2 \\times 3^2
        $$
        $$
        (2+1) \\times (2+1) = 
        $$
        $$
        3 \\times 3 = 
        $$
        $$
        9
        $$`
    }
]
primeFactorizationQuestions.forEach(i => {
    i.topic = 'prime factorization'
})
allQ.push(primeFactorizationQuestions[0])
const factoringQuestions = [
 {
    title: "Review Question",
    text: `What factoring trick can you use on this expression?
    $$
    x^2-9
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{completing the square}\\)', `\\(B) \\textup{Simon's Favorite Factoring Trick}\\)`, '\\(C) \\textup{Difference of Squares}\\)', '\\(D) \\textup{Sophie Germain Identity}\\)', '\\(E) \\textup{Factoring By Grouping}\\)'],
    answer: '\\(C) \\textup{Difference of Squares}\\)',
    solution: `<b>\\(C) \\textup{Difference of Squares}\\)</b><p>We see two squares in this expression. \\(x^2=(x)^2\\) and \\(9=3^2\\). We are finding the difference between them, so we use the difference of squares identity: \\(a^2-b^2=(a+b)(a-b)\\)`,
  },
  {
    title: "Review Question",
    text: `Factor the following expression:
    $$
    x^2-9
    $$`,
    type: 'mc',
    choices: ['\\(A) (x+3)(x+3)\\)', '\\(B) (x+3)(x-3)\\)', '\\(C) (x-3)(x-3)\\)', '\\(D) (x+9)(x-9)\\)', '\\(C) (x-3)^2\\)'],
    answer: '\\(B) (x+3)(x-3)\\)',
    solution: `<b>\\(B) (x+3)(x-3)\\)</b><p>We see two squares in this expression. \\(x^2=(x)^2\\) and \\(9=3^2\\). We are finding the difference between them, so we use the difference of squares identity: \\(a^2-b^2=(a+b)(a-b)\\)`
  },
  {
    title: "Review Question",
    text: `Which factoring trick can you use on this expression?
    $$
    x^2+5x+6
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{completing the square}\\)', `\\(B) \\textup{Simon's Favorite Factoring Trick}\\)`, '\\(C) \\textup{Difference of Squares}\\)', '\\(D) \\textup{Sophie Germain Identity}\\)', '\\(E) \\textup{Factoring By Grouping}\\)'],
    answer: '\\(E) \\textup{Factoring by Grouping}\\)',
    solution: `<b>\\(E) \\textup{Factoring by Grouping}\\)</b><p>We can factor this by grouping because two of the factors of \\(6\\) sum to \\(5\\) (\\(2\\) and \\(3\\)). This gives us \\((x+2)(x+3)\\)`,
  },
  {
    title: "Review Question",
    text: `Factor the following expression:
    $$
    x^2+5x+6
    $$
    `,
    type: 'mc',
    choices: ['\\(A) (x+2)^2\\)', '\\(B) (x+3)^2\\)', '\\(C) (x+3)(x-2)\\)', '\\(D) (x+2)(x+3)\\)', '\\(E) (x+6)(x-1)\\)'],
    answer: '\\(D) (x+2)(x+3)\\)',
    solution: '<b>\\(D) (x+2)(x+3)\\)</b><p>We can factor this by grouping because two of the factors of \\(6\\) sum to \\(5\\) (\\(2\\) and \\(3\\)). This gives us \\((x+2)(x+3)\\)</p>',    
  },
  {
    title: "Review Question",
    text: `Which factoring trick can you use on this expression?
    $$
    xy+2x+6y+12
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{completing the square}\\)', `\\(B) \\textup{Simon's Favorite Factoring Trick}\\)`, '\\(C) \\textup{Difference of Squares}\\)', '\\(D) \\textup{Sophie Germain Identity}\\)', '\\(E) \\textup{Factoring By Grouping}\\)'],
    answer: `\\(B) \\textup{Simon's Favorite Factoring Trick}\\)`,
    solution: `<b>\\(B) \\textup{Simon's Favorite Factoring Trick}\\)</b><p>When we see \\(xy\\) as a term, we immediately assume SFFT. We know that \\(j=2\\) and \\(k=6\\). We factor out \\(x\\) first for \\(x(y+2)+6y+12\\) and then \\(6\\) for \\((x+6)(y+2)\\)`,
  },
  {
    title: "Review Question",
    text: `Factor the following expression:
    $$
    xy+2x+6y+12
    $$`,
    type: 'mc',
    choices: ['\\(A) 6x+2y\\)', '\\(B) (x+2)(y+6)\\)', '\\(C) (x+6)(x+2)\\)', '\\(D) (x+3)(y+4)\\)', '\\(E) 12x+12y\\)'],
    answer: `\\(C) (x+6)(x+2)\\)`,
    solution: `<b>\\(C) (x+6)(x+2)\\)</b><p>When we see \\(xy\\) as a term, we immediately assume SFFT. We know that \\(j=2\\) and \\(k=6\\). We factor out \\(x\\) first for \\(x(y+2)+6y+12\\) and then \\(6\\) for \\((x+6)(y+2)\\)`,
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    x^2+5x
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: '\\(B) \\textup{expression}\\)',
    solution: `<b>\\(B) \\textup{expression}\\)</b><p>There is no equal sign and no indication to the value of \\(x^2+5x\\). This means it is an expression not a complete equation`
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    x^2+5x=10
    $$
    `,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: `\\(A) \\textup{equation}\\)`,
    solution: `<b>\\(A) \\textup{equation}\\)</b><p>We do see an equal sign that relates two expressions through a confined relationship. Thus, this is an equation</p>`
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    x+4
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: `\\(B) \\textup{expression}\\)`,
    solution: `<b>\\(B) \\textup{expression}\\)</b><p>There is no equal sign and relation, thus this is an expression.`
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    x+4=y+3
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: '\\(A) \\textup{equation}\\)',
    solution: '<b>\\(A) \\textup{equation}\\)</b><p>We do see an equal sign, which ensures that this is indeed an equation instead of an expression.'
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    2^x+6
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: `\\(B) \\textup{expression}`,
    solution: `<b>\\(B) \\textup{expression}\\)</b><p>There is no equal sign, so the given value is an expression</p>`,
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    2^x+6=43
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: '\\(A) \\textup{equation}\\)',
    solution: `<b>\\(A) \\textup{equation}\\)</b><p>There is an equal sign, thus, we know that this must be an equation</p>`
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    6x+54-36
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: '\\(B) \\textup{expression}\\)',
    solution: `<b>\\(B) \\textup{expression}\\)</b><p>There is no equal sign so this is an expression</p>`,
  },
  {
    title: "Review Question",
    text: `Is this an equation or an expression?
    $$
    6x+54-36=70534
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{equation}\\)', '\\(B) \\textup{expression}\\)'],
    answer: `\\(A) \\textup{equation}\\)`,
    solution: `<b>\\(A) \\textup{equation}\\)</b><p>There is an equal sign which indicates this is an expression</p>`,
  },
 
]
factoringQuestions.forEach(i => {
    i.topic = 'factoring'
})
allQ.push(factoringQuestions[0])
const modularArithmeticQuestions = [
{
        title: "Review Question",
        text: `What is \\(2^3 \\times 3\\) the prime factorization of?`,
        choices: ['\\(A) 6\\)', '\\(B) 12\\)', '\\(C) 23\\)', '\\(D) 24\\)', '\\(E) 32\\)'],
        answer: '\\(D) 24\\)',
        solution: `<b>\\(D) 24\\)</b><p>\\(2 \\times 2 \\times 2 \\times 3 = 8 \\times 3 = 24\\)`,
    },
    {
        title: "Review Question",
        text: `What is \\(2^8 \\times 3^3\\) the prime factorization of?`,
        choices: ['\\(A) 27\\)', '\\(B) 54\\)', '\\(C) 256\\)', '\\(D) 668\\)', '\\(E) 6912\\)'],
        answer: '\\(E) 6912\\)',
        solution: `<b>\\(E) 6912\\)</b><p>\\(2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 3 = 256 \\times 27 = 6912\\)`,
    },
    {
        title: "Review Question",
        text: `What is the prime factorization of \\(60\\)?`,
        choices: ['\\(A) 5 \\times 12\\)', '\\(B) 2 \\times 2 \\times 5\\)', '\\(C) 2^2 \\times 3 \\times 5\\)', '\\(D) 3^2 \\times 5\\)', '\\(E) 12\\)'],
        answer: '\\(C) 2^2 \\times 3 \\times 5\\)',
        solution: `<b>\\(C) 2^2 \\times 3 \\times 5\\)</b><p> We can continuously divide \\(60\\) and its resulting factors until we reach only prime factors`,
    },
    {
        title: "Review Question",
        text: `What is the prime factorization of \\(90\\)?`,
        type: 'mc',
        choices: ['\\(A) 2^3 \\times 3 \\times 5\\)', '\\(B) 2 \\times 3^2 \\times 5\\)', '\\(C) 9 \\times 10\\)', '\\(D) 5 \\times 9 \\times 2\\)', '\\(E) 2 \\times 3 \\times 5\\)'],
        answer: '\\(B) 2 \\times 3^2 \\times 5\\)',
        solution: `<b>\\(B) 2 \\times 3^2 \\times 5\\)</b><p>We divide factors we know until we get down to \\(2 \\times 3^2 \\times 5\\)`,
    },
    {
        title: "Review Question",
        text: `If \\(6 \\equiv 0 \\mod{3}\\) and \\(2 \\equiv 2 \\mod{3}\\), what is \\((6+2) \\mod{3}\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 8\\)'],
        answer: ['\\(C) 2\\)'],
        solution: `<b>\\(C) 2\\)</b><p>Since both are given modulo \\(3\\), we can simply add the modular remainders, which is \\(0+2\\), which gives a remainder of \\(2\\)`,
    },
    {
        title: "Review Question",
        text: `If \\(6 \\equiv 0 \\mod{3}\\) and \\(2 \\equiv 2 \\mod{3}\\), what is \\(12 \\mod{3}\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
        answer: '\\(A) 0\\)',
        solution: `<b>\\(A) 0\\)</b><p>We multiply the modular remainders for \\(0 \\times 2 = 0\\)`,
    },
    {
        title: "Review Question",
        text: `If \\(26 \\equiv 2 \\mod{4}\\) and \\(43 \\equiv 3 \\mod{4}\\), what is \\((26+43) \\mod{4}\\)?`,
        choices: ['\\(A) 1\\)', '\\(B) 2\\)', '\\(C) 3\\)', '\\(D) 5\\)', '\\(E) 6\\)'],
        answer: '\\(A) 1\\)',
        solution: `<b>\\(A) 1\\)</b><p>We add the modular remainders for \\(2+3=5\\). However, this is greater than \\(4\\), so we find \\(5 \\mod{4}=1\\)`,
    },
    {
        title: "Review Question",
        text: `If \\(26 \\equiv 2 \\mod{4}\\) and \\(43 \\equiv 3 \\mod{4}\\), what is \\((26 \\times 43) \\mod{4}\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
        answer: '\\(C) 2\\)',
        solution: `<b>\\(C) 2\\)</b><p>We multiply the modular remainders to find \\(2 \\times 3 = 6\\), which is \\(geq 4\\), so we find \\(6 \\mod{4} = 2\\)`,
    },
    {
        title: 'Review Question',
        text: `What is \\(-7 \\mod{3}\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
        answer: '\\(C) 2\\)',
        solution: `<b>\\(C) 2\\)</b><p>We find \\(|-7| \\equiv 1 \\mod{3}\\), so we find \\(-1+3=2\\)`
    },
    {
        title: "Review Question",
        text: `What is \\(-12 \\mod{5}\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) 1\\', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
        answer: '\\(D) 3\\)',
        solution: `<b>\\(D) 3\\)</b><p>We find \\(|-12| \\equiv 2 \\mod{5}\\), so we find \\(-2+5=3\\)`
    }
]
modularArithmeticQuestions.forEach(i => {
    i.topic = 'modular arithmetic'
})
allQ.push(modularArithmeticQuestions[0])
const averagesQuestions = [
   {
    title: "Review Question",
    text: `What is the arithmetic mean of \\(1\\) and \\(100\\)?`,
    choices: ['\\(A) 25\\)', '\\(B) 50\\)', '\\(C) 50.5\\)', '\\(D) 51\\)', '\\(E) 101\\)'],
    answer: `\\(C) 50.5\\)`,
    solution: `<b>\\(C) 50.5\\)</b><p>\\(\\frac{1+100}{2}=\\frac{101}{2}=50.5\\)`,
   },
   {
    title: 'Review Question',
    text: `What is the arithmetic mean of \\(26\\) and \\(43\\)?`,
    choices: ['\\(A) 30\\)', '\\(B) 32.5\\)', '\\(C) 33.5\\)', '\\(D) 34.5\\)', '\\(E) 69\\)'],
    answer: '\\(D) 34.5\\)',
    solution: `<b>\\(D) 34.5\\)</b><p>\\(\\frac{26+43}{2}=\\frac{69}{2}=34.5\\)`,
   },
   {
    title: "Review Question",
    text: `What is the arithmetic mean of \\(5\\), \\(28\\) and \\(54\\)?`,
    choices: ['\\(A) 16.5\\)', '\\(B) 29\\)', '\\(C) 41\\)', '\\(D) 42.5\\)', '\\(E) 87\\)'],
    answer: '\\(B) 29\\)',
    solution: `<b>\\(B) 29\\)</b><p>\\(\\frac{5+28+54}{3}=\\frac{87}{3}=29\\)`,
   },
   {
    title: "Review Question",
    text: `What is the arithmetic mean of \\(2\\), \\(4\\), and \\(5\\)?`,
    choices: ['\\(A) 3\\)', '\\(B) 3 \\frac{2}{3}\\)', '\\(C) 4 \\frac{1}{2}\\)', '\\(D) 4 \\frac{2}{3}\\)', '\\(E) 5\\)'],
    answer: '\\(B) 3 \\frac{2}{3}\\)</b><p>\\(\\frac{2+4+5}{3}=\\frac{11}{3} = 3 \\frac{2}{3}\\)',
   },
   {
    title: "Review Question",
    text: `What is the geometric mean of \\(4\\) and \\(16\\)?`,
    choices: ['\\(A) 6\\)', '\\(B) 8\\)', '\\(C) 10\\)', '\\(D) 32\\)', '\\(E) 64\\)'],
    answer: '\\(B) 8\\)',
    solution: `<b>\\(B) 8\\)</b><p>\(\\sqrt{4 \\times 16} = \\sqrt{64} = 8\\)</p>`
   },
   {
    title: "Review Question",
    text: `What is the geometric mean of \\(3\\) and \\(12\\)?`,
    choices: ['\\(A) 5\\)', '\\(B) 6\\)', '\\(C) 7.5\\)', '\\(D) 9\\)', '\\(E) 10\\)'],
    answer: '\\(B) 6\\)',
    solution: `<b>\\(B) 6\\)</b><p>\\(\\sqrt{3 \\times 12} = \\sqrt{36} = 6\\)`,
   },
   {
    title: "Review Question",
    text: `What is the geometric mean of \\(2\\) and \\(8\\)?`,
    choices: ['\\(A) 2\\)', '\\(B) 3\\)', '\\(C) 4\\)', '\\(D) 5\\)', '\\(E) 6\\)'],
    answer: '\\(C) 4\\)',
    solution: `<b>\\(C) 4\\)</b><p>\\(\\sqrt{2 \\times 8} = \\sqrt{16} = 4\\)`
   },
   {
    title: "Review Question",
    text: `Is arithmetic or geometric mean greater for non-negative numbers?`,
    choices: ['\\(A) \\textup{ Always arithmetic}\\)', '\\(B) \\textup{ Always geometric}\\)', '\\(C) \\textup{ Arithmetic is greater than or equal to geometric}\\)', '\\(D) \\text{ Geometric is greater than or equal to arithmetic}\\)', '\\(E) \\textup{ There is no clear relation/both can be greater}\\)'],
    answer: `\\(C) \\textup{ Arithmetic is greater than or equal to geometric}\\)`,
    solution: `<b>\\(C) \\textup{ Arithmetic is greater than or equal to geometric}\\)</b><p>This is true through the AM-GM inequality`,
   },
   {
        title: "Review Question",
        text: `If you travel \\(10\\) miles at \\(50\\) miles per hour, and another \\(10\\) miles at \\(30\\) miles per hour, what is your average speed?`,
        type: 'mc',
        choices: ['\\(A) 30 \\textup{mph}\\)', '\\(B) 32.5 \\textup{mph}\\)', '\\(C) 35 \\textup{mph}\\)', '\\(D) 37.5 \\textup{mph}\\)', '\\(E) 40 \\textup{mph}\\)'],
        answer: '\\(D) 37.5 \\textup{mph}\\)',
        solution: `<b>\\(D) 37.5 \\textup{mph}\\)</b><p>You travel for \\(\\frac{1}{5} \\textup{hours} = 12 \\textup{minutes}\\) at \\(50\\) miles per hour and \\(\\frac{1}{3} \\textup{hours} = 20 \\textup{minutes}\\) at \\(30\\) miles per hour. We thus calculate the weighted average to be \\(\\frac{20}{\\frac{1}{5}+\\frac{1}{3}}=37.5\\)`
    },
    {
      title: "Review Question",
      text: `If you travel \\(100\\) miles at \\(80\\) miles per hour, and another \\(100\\) miles at \\(10\\) miles per hour, what is your average speed?`,
      type: 'mc',
      choices: ['\\(A) 11 \\frac{5}{6} \\textup{mph}\\)', '\\(B) 12 \\frac{2}{3} \\textup{mph}\\)', '\\(C) 15 \\frac{11}{12} \\textup{mph}\\)', '\\(D) 17 \\frac{17}{9} \\textup{mph}\\)', '\\(E) 45 \\textup{mph}\\)'],
      answer: `\\(D) 17 \\frac{17}{9} \\textup{mph}\\)`,
      solution: `<b>\\(D) 17 \\frac{17}{9} \\textup{mph}\\)</b><p>We have \\(\\frac{100}{80}=\\frac{5}{4} \\textup{hrs}\\) and \\(\\frac{100}{10} = 10 \\textup{hrs}\\). Thus, we have \\(\\frac{200 \\textup{mi}}{11.25 \\textup{hrs}}=17\\frac{7}{9}\\)`
    },
]
averagesQuestions.forEach(i => {
    i.topic = 'averages'
})
allQ.push(averagesQuestions[0])
const mediansQuestions = [
    {
        title: "Review Question",
        text: `How is a median different than the average of a dataset?`,
        choices: ['\\(A) \\textup{ it includes outliers}\\)', '\\(B) \\textup{ it does not include outliers}\\)', '\\(C) \\textup{ it accounts for the entire range}\\)', '\\(D) \\textup{ it indicates how spread out a dataset is}\\)'],
        answer: '\\(B) \\textup{ it does not include outliers}\\)',
        solution: `<b>\\(B) \\textup{ it does not include outliers}\\)</b><p>A median only considers the numerical value of the middle element, rather than including each value. Thus, outliers have minimal importance.`,
    },
    {
        title: 'Review Question',
        text: `What should you do first when finding the median of a dataset?`,
        choices: ['\\(A) \\textup{ cross out the first 2 values}\\)', '\\(B) \\textup{ cross out the first and last values}\\)', '\\(C) \\textup{ order the dataset in ascending order}\\)', '\\(D) \\textup{ Find the average of the dataset}\\)', '\\(E) \\textup{ Find the average of the middle two values}\\)'],
        answer: '\\(C) \\textup{ order the dataset in ascending order}\\)',
        solution: '\\(C) \\textup{ order the dataset in ascending order}\\)',
    },
    {
        title: 'Review Question',
        text: `What is the median of \\(2, 6, 4, 3\\)?`,
        choices: ['\\(A) 2\\)', '\\(B) 3\\)', '\\(C) 3 \\frac{1}{2}\\)', '\\(D) 3 \\frac{3}{4}\\)', '\\(E) 5\\)'],
        answer: '\\(E) 5\\)',
        solution: `<b>\\(E) 5\\)</b>
        $$
        2, 3, 4, 6
        $$
        $$
        3, 4
        $$
        \\frac{3+4}{2}=3.5
        $$
        `,
    },
    {
        title: "Review Question",
        text: 'What is the median of \\(2, 8, 5, 4, 3\\)?',
        choices: ['\\(A) 2\\)', '\\(B) 3\\)', '\\(C) 4\\)', '\\(D) 5\\)', '\\(E) 8\\)'],
        answer: '\\(C) 4\\)',
        solution: `<b>\\(C) 4\\)</b>
        $$
        2, 3, 4, 5, 8
        $$
        $$
        3, 4, 5
        $$
        $$
        4
        $$`,
    },
    {
        title: "Review Question",
        text: `Is the mean or median of a data set larger?`,
        choices: ['\\(A) \\textup{ always the mean}\\)', '\\(B) \\textup{ always the median}\\)', '\\(C) \\textup{ there is no consistent relationship}\\)'],
        answer: '\\(C) \\textup{ there is no consistent relationship}\\)',
        solution: `<b>\\(C) \\textup{ there is no consistent relationship}\\)</b><p>The median is simply reliant on the visual center whereas the mean accounts for all values, and is susceptible to outliers.`
    }
]
mediansQuestions.forEach(i => {
    i.topic = 'medians'
})
allQ.push(mediansQuestions[0])
allQ.forEach(i => i.title = "Review Question")
// ---------- Shuffle Questions ----------
shuffleArray(questions);
currentQuestion = 0;
shuffleArray(allQ)
let currentQuestionDiagnosticIndex = 0
let currentQuestionDiagnostic = allQ[0]
document.getElementById("restart-btn").addEventListener("click", function() {
    // Reset variables
    questionsAnswered = 0;
    progressBar.style.width = "0%"
    currentQuestion = 0;
    correctCount = 0;
    wrongCount = 0;
    longestStreak = 0;

    // Hide dashboard
    document.getElementById("stats-dashboard").classList.add("hidden");

    // Show questions again
    loadQuestion(currentQuestion);
    problemsWrapper.classList.remove("hidden");
});


submitSolutionButton.addEventListener("click", function() {
        submitSolutionForm.style.display = 'block';
        submitSolutionButton.style.display = 'none';
})

loadQuestion(currentQuestion)
progressBarFunction()

async function saveUserStatsToCloud() {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return; 
  }
          console.log(statisticsLevel)
        console.log(propertiesOfNumbersLevel)
        console.log(numberSenseLevel)
  const userId = session.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .update({
statisticsLevel: statisticsLevel,
propertiesOfNumbersLevel: propertiesOfNumbersLevel,
numberSenseLevel: numberSenseLevel,


    })
    .eq('id', userId); 

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }

  
}
async function checkingForDiagnostic(){
if (statisticsLevel === "not started" || statisticsLevel == ""){
    document.getElementById("diagnosticHide").style.display = "none"
    document.getElementById("diagnosticShow").style.display = "block"
} else {
    document.getElementById("diagnosticHide").style.display = "block"
    document.getElementById("diagnosticShow").style.display = "none"
}
}

document.getElementById("skipButton").addEventListener("click", function() {
    document.getElementById("diagnosticHide").style.display = "block"
    document.getElementById("diagnosticShow").style.display = "none"
    statisticsLevel = "averages"
    propertiesOfNumbersLevel = "prime factorization"
    numberSenseLevel = "logic"
})
document.getElementById("startButton").addEventListener("click", async function() {
    statisticsLevel = "completed"
    propertiesOfNumbersLevel = "completed"
    numberSenseLevel = "completed"
    loadDiagnostic()
    document.getElementById("startButton").style.display = "none"
    document.getElementById("skipButton").style.display = "none"
    
})

const statisticsTopics = ["averages", "medians"]
const propertiesOfNumbersTopics = ["prime factorization", "factoring", "modular arithmetic"]
const numberSenseTopics = ["logic", "counting"]
let statisticsTopicsLowestIndex = 3
let propertiesOfNumbersLowestIndex = 4
let numberSenseLowestIndex = 3

function diagnosticCheck(answerInput){
    document.querySelectorAll(".mc-choiceDiagnostic").forEach(btn => {
        btn.disabled = true
    })
    document.getElementById("solutionDiagnostic").style.display = "inline"
    if (answerInput == currentQuestionDiagnostic.answer){
        document.getElementById("solution-text-diagnostic").innerHTML = "Correct!" + currentQuestionDiagnostic.solution
    } else {
        document.getElementById("solution-text-diagnostic").innerHTML = "Incorrect!" + currentQuestionDiagnostic.solution 
        if (statisticsTopics.indexOf(currentQuestionDiagnostic.topic) !== -1){
            if (statisticsTopicsLowestIndex > statisticsTopics.indexOf(currentQuestionDiagnostic.topic)){
                statisticsTopicsLowestIndex = statisticsTopics.indexOf(currentQuestionDiagnostic.topic)
                statisticsLevel = currentQuestionDiagnostic.topic
            }
        } else if ((propertiesOfNumbersTopics.indexOf(currentQuestionDiagnostic.topic) !== -1)) {
            if (propertiesOfNumbersTopics.indexOf(currentQuestionDiagnostic.topic) < propertiesOfNumbersLowestIndex) {
                propertiesOfNumbersLowestIndex = propertiesOfNumbersTopics.indexOf(currentQuestionDiagnostic.topic)
                propertiesOfNumbersLevel = currentQuestionDiagnostic.topic
            }
        } else if ((numberSenseTopics.indexOf(currentQuestionDiagnostic.topic) !== -1)){
            if (numberSenseTopics.indexOf(currentQuestionDiagnostic.topic) < numberSenseLowestIndex) {
                numberSenseLowestIndex = numberSenseTopics.indexOf(currentQuestionDiagnostic.topic)
                numberSenseLevel = currentQuestionDiagnostic.topic
            }
        }
    }
    MathJax.typesetPromise([document.getElementById('solution-text-diagnostic')]).catch(()=>{});
}
function loadDiagnostic() {
    // 1. Hide the solution box whenever a new diagnostic question loads
    const solutionBox = document.getElementById("solutionDiagnostic");
    if (solutionBox) {
        solutionBox.style.display = "none";
    }

    document.getElementById("mc-containerDiagnostic").style.display = "inline";
    document.getElementById("questionTitleDiagnostic").innerHTML = currentQuestionDiagnostic.title;
    document.getElementById("questionTextDiagnostic").innerHTML = currentQuestionDiagnostic.text;

    const options = document.querySelectorAll(".mc-choiceDiagnostic");
    options.forEach((btn, i) => {
        if (currentQuestionDiagnostic.choices[i] == null) {
            btn.style.display = "none";
        } else {
            btn.disabled = false;
            btn.style.display = "block";
            btn.innerHTML = currentQuestionDiagnostic.choices[i];
            if (window.MathJax) {
                MathJax.typesetPromise([btn]).catch(() => {});
            }
            btn.onclick = function() {
                diagnosticCheck(currentQuestionDiagnostic.choices[i]);
            };
        }
    });

    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('questionTextDiagnostic')]).catch(() => {});
    }
}
document.getElementById("next-btnDiagnostic").addEventListener("click", function() {
    if (currentQuestionDiagnosticIndex < (allQ.length - 1)){
        currentQuestionDiagnosticIndex += 1
        currentQuestionDiagnostic = allQ[currentQuestionDiagnosticIndex]
        loadDiagnostic()
        document.getElementById("solutionDiagnostic").style.display = "none"
    } else {
        document.getElementById("diagnosticHide").style.display = "block"
        document.getElementById("diagnosticShow").style.display = "none"
        console.log(statisticsLevel)
        console.log(propertiesOfNumbersLevel)
        console.log(numberSenseLevel)
        saveUserStatsToCloud()
        loadNodes()
    }
})