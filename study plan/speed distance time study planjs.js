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
//-----------------------Authentication--------------------------
async function loadUserStats(userId) {
  const { data: profile, error } = await supabase
    .from('profiles')
   .select('id, username')
   .eq('id', userId)

  if (error) {
    console.error("Error downloading profile data:");
    return;
  }

  if (profile) {
    console.log(profile)
    let userProfile = profile[0]
    console.log(userProfile.username)
    document.getElementById("username-display").innerHTML = userProfile.username
    document.getElementById("btn-dashboard").innerHTML = userProfile.username
  } 
}
const loginBtn = document.getElementById("btn-login");
loginBtn.addEventListener("click", async () => {
  console.log("clicked")
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

})
const logoutBtn = document.getElementById('btn-logout');

logoutBtn.addEventListener('click', async () => {
            document.getElementById("login").style.display = "block"
  // 1. Call Supabase to clear the secure cloud session
  console.log('logging out')
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error logging out: " + error.message);
    return;
  }


  alert("You have been logged out successfully!");
  window.location.reload();
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
});
console.log(supabase)



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
    console.log("Secure adaptive practice session discovered for:", session.user.email);

    // Toggle UI display blocks safely
    if (logoutBtn) logoutBtn.style.display = 'block';
    if (login) login.style.display = "none";
    console.log("login goes invisible")
    if (createAccount) createAccount.style.display = "none"
    if (deleteAccount) deleteAccount.style.display = "block"
    if (usernameDisplayModal) usernameDisplayModal.style.display = "block"
    // 1. Fetch cloud records safely using correct lowercase columns
  const { data: profile, error } = await supabase
loadUserStats(session.user.id)
  } else  {
    console.log("No user session found. Reverting adaptive practice to Guest defaults.");
    if (typeof runDiagnostic === "function")
    
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (login) login.style.display = "block";
    if (usernameDisplay) usernameDisplay.innerHTML = "Log In";
    if (createAccount) createAccount.style.display = "block"
    if (deleteAccount) deleteAccount.style.display = "none"
    if (usernameDisplayModal) usernameDisplayModal.style.display = "none"
  }
})
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
// Main Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
import Chart from 'https://esm.sh/chart.js/auto';

const toggleBrightness = document.getElementById("brightness")
const carouselLight = document.querySelectorAll("carousel-logo-light")
const carouselDark = document.querySelectorAll("carousel-logo-dark")
let colorMode = 'light'
let colorModeTrue = localStorage.getItem("colorMode")
let color = 'rgb(239, 237, 247)'
console.log(colorModeTrue)
if  (colorModeTrue !== false){
        console.log("setting color mode")
       colorMode =  colorModeTrue
       console.log(colorModeTrue)
 if (colorMode === 'dark'){
                colorMode = 'dark';
                document.documentElement.style.colorScheme = 'dark'; 
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                toggleBrightness.textContent = "sunny"
                localStorage.setItem("colorMode", "dark")
                color = '#48485a'
        } else {
                colorMode = 'light';
                document.documentElement.style.colorScheme = 'light';
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                toggleBrightness.textContent = "bedtime"
                localStorage.setItem("colorMode", "light")
                color = 'rgb(239, 237, 247)'
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
        console.log(localStorage.getItem("colorMode"));
});

//-----------------------------Actual Functions Fr Fr------------------------------
const incorrectBtns = Array.from(document.querySelectorAll(".incorrect"))
incorrectBtns.forEach(btn => {
        console.log("clicked")
        btn.addEventListener("click", function() {
                document.getElementById("sdt-hint").style.display = "block"
        })
})
let prereqOne = false
const correct = document.getElementById("correct")
correct.addEventListener("click", function() {
         prereqOne = true
         updateLesson()
        document.getElementById("solution-text-sdt").style.display = "block"
        document.getElementById("sdt-hint").style.display = "none"
        incorrectBtns.forEach(btn => {
                btn.disabled = true
        })

});
    const r1 = document.getElementById("runner1");
    const r2 = document.getElementById("runner2");
    const headStartSlider = document.getElementById("headStartSlider");
    const leaderSpeedSlider = document.getElementById("leaderSpeedSlider");
    const chaserSpeedSlider = document.getElementById("chaserSpeedSlider");
    
    const eqLeader = document.getElementById("eqLeader");
    const eqChaser = document.getElementById("eqChaser");
    const explanation = document.getElementById("sdtExplanation");
    const catchLine = document.getElementById("catchUpLine");
   let prereqTwo = false
    function updateRace() {
      prereqTwo = true
      updateLesson()
        const d1_start = parseFloat(headStartSlider.value); 
        const s1 = parseFloat(leaderSpeedSlider.value); 
        const s2 = parseFloat(chaserSpeedSlider.value); 
        
        // Update Equation Text
        eqLeader.innerHTML = `\\(d = ${s1}t + ${d1_start}\\)`;
        eqChaser.innerHTML = `\\(d = ${s2}t\\)`;

        // Visual Start Positions
        r1.style.left = `${d1_start}%`;
        r2.style.left = `0%`;

        // Logic: s1*t + headstart = s2*t  =>  headstart = (s2 - s1)*t
        if (s2 <= s1) {
            catchLine.style.display = "none";
            explanation.innerHTML = "If the Chaser isn't faster than the Leader, they will <span style='color:red'>never catch up!</span>";
        } else {
            const relativeSpeed = s2 - s1;
            const timeToCatch = d1_start / relativeSpeed;
            const catchPoint = s2 * timeToCatch;

            if (catchPoint <= 100) {
                catchLine.style.display = "block";
                catchLine.style.left = `${catchPoint}%`;
                explanation.innerHTML = `They meet at \\(t = ${timeToCatch.toFixed(2)}\\) hours, which is \\(d = ${catchPoint.toFixed(1)}\\) miles out.`;
            } else {
                catchLine.style.display = "none";
                explanation.innerHTML = "They eventually meet, but it's off the edge of this track!";
            }
        }
        
        MathJax.typesetPromise([eqLeader, eqChaser, explanation]).catch(()=>{});
    }

[headStartSlider, leaderSpeedSlider, chaserSpeedSlider].forEach(s => s.addEventListener("input", updateRace));
    updateRace();


const avgSpeed = document.getElementById("avgSpeed")
const avgOneLabel = document.getElementById('avgOneLabel')
const avgOne = document.getElementById("avgOne")
const avgOneTime = document.getElementById("avgOneTime")
let oneTime = 5.5
let twoTime = 5.5
let oneSpeed = 55
let twoSpeed = 55
avgOne.addEventListener("input", updateLabelOne)
avgOne.addEventListener("input", updateAvgSpeed)
let prereqThree = false
function updateLabelOne(){
   prereqThree = true
   updateLesson()
    avgOneLabel.innerHTML = `Speed: ${avgOne.value} mph`
    let time = (avgOne.value / 10)
    oneTime = time
    oneSpeed = avgOne.value
    avgOneTime.innerHTML = `Time \\(\\frac{${avgOne.value}}{10}=${time}\\) hrs`
    MathJax.typesetPromise([avgOneTime]).catch(()=>{});
    MathJax.typesetPromise([avgOneLabel]).catch(()=>{});
}
const avgTwoLabel = document.getElementById("avgTwoLabel")
const avgTwo = document.getElementById("avgTwo")
const avgTwoTime = document.getElementById("avgTwoTime")
avgTwo.addEventListener("input", updateLabelTwo)
avgTwo.addEventListener("input", updateAvgSpeed)
function updateLabelTwo(){
    avgTwoLabel.innerHTML = `Speed: ${avgTwo.value} mph`
    let time = (avgTwo.value / 10)
    twoTime = time
    twoSpeed = avgTwo.value
    avgTwoTime.innerHTML = `Time: \\(\\frac{${avgTwo.value}}{10}=${time}\\) hrs`
    MathJax.typesetPromise([avgTwoTime]).catch(()=>{});
    MathJax.typesetPromise([avgTwoLabel]).catch(()=>{});
}
function updateAvgSpeed(){
    let avgSpeedVar = Math.round((((oneTime * oneSpeed) + (twoTime * twoSpeed)) / (oneTime + twoTime)), 5)
    avgSpeed.innerHTML = `Average Speed: \\(\\frac{${oneSpeed} \\times ${oneTime} + ${twoSpeed} \\times ${twoSpeed}}{${oneTime}+${twoTime}}=${avgSpeedVar}\\)`
    MathJax.typesetPromise([avgSpeed]).catch(()=>{});
}
updateAvgSpeed
updateAvgSpeed
let prereqFour = false
function updateVectors() {
   prereqFour = true
   updateLesson()
    const boatMag = parseFloat(document.getElementById("magBoat").value);
    const currMag = parseFloat(document.getElementById("magCurrent").value);
    const currAngleDeg = parseFloat(document.getElementById("angleCurrent").value);
    document.getElementById("angleVal").innerText = currAngleDeg;

    // 1. Convert to Radians (Boat is always pointing 0 deg / North for simplicity)
    const boatRad = -90 * (Math.PI / 180); // Pointing UP
    const currRad = (currAngleDeg - 90) * (Math.PI / 180); 

    // 2. Component Math (v_total_x = v1_x + v2_x)
    const bx = boatMag * Math.cos(boatRad);
    const by = boatMag * Math.sin(boatRad);
    const cx = currMag * Math.cos(currRad);
    const cy = currMag * Math.sin(currRad);

    const rx = bx + cx;
    const ry = by + cy;
    const rMag = Math.sqrt(rx*rx + ry*ry);
    const rAngle = Math.atan2(ry, rx) * (180 / Math.PI);

    // 3. Update Visuals
    document.getElementById("boatVector").style.width = boatMag + "px";
    document.getElementById("boatVector").style.transform = `rotate(${-90}deg)`;

    document.getElementById("currentVector").style.width = currMag + "px";
    document.getElementById("currentVector").style.transform = `rotate(${currAngleDeg - 90}deg)`;

    document.getElementById("resultantVector").style.width = rMag + "px";
    document.getElementById("resultantVector").style.transform = `rotate(${rAngle}deg)`;

    const explanation = document.getElementById("vectorExplanation");
    explanation.innerHTML = `
        Object Movement: \\(${boatMag}\\) units North <br>
        Current/Wind: \\(${currMag}\\) units at \\(${currAngleDeg}^\\circ\\) <br>
        <b>Resultant Speed: \\(${rMag.toFixed(1)}\\) units</b>
        <p>You calculate your movement b finding the sin of the angle times the magnitude and adding it to the object movement. Notice, we do not need cosine
        because we are going directly verticaly.</p>
    `;
    MathJax.typesetPromise([explanation]).catch(()=>{});
}

["magBoat", "magCurrent", "angleCurrent"].forEach(id => {
    document.getElementById(id).addEventListener("input", updateVectors);
});
updateVectors();



async function updateLesson() {
                        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return
  }
  const userId = session.user.id;
        if ((prereqOne == true) && (prereqTwo == true) && (prereqThree == true) && (prereqFour == true)){
    const { data, error } = await supabase
    .from('profiles')
    .update({
        speedDistanceTimeLessonCompleted: true
    })
    .eq('id', userId)  
    }  
}
