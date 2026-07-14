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
//--------------Final Question---------------
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const mcContainer = document.getElementById("mc-container");
const questionChoices = document.getElementById("mc-container")
const topicQ = [{
        title: "Review Question",
        text: `Andrea is driving to school at \\(12\\) miles per hour. Her school is \\(3\\) miles away. How long does it take her to drive to school?`,
        type: 'mc',
        choices: ['\\(A) \\frac{1}{4}\\)', '\\(B) \\textup{3 hours}\\)', '\\(C) \\textup{3 minutes}\\)', '\\(D) \\textup{15 hours}\\)', '\\(E) \\textup{15 minutes}\\)'],
        answer: '\\(E) \\textup{15 minutes}\\)',
        solution: `<b>\\(E) \\textup{15 minutes}\\)</b><p>Using what we know about speed, distance, and time, we can set up the equation \\(12x=3\\). We thus have that \\(x=\\frac{1}{4}\\) hours. We must multiply \\(\\frac{1}{4} \\times 60=15\\) to find the number of minutes it takes her`,
    },
    {
        title: "Review Question",
        text: `Andrea is driving to school at \\(12\\) miles per hour. Her school is \\(3\\) miles away. Which equation models this?`,
        type: 'mc',
        choices: ['\\(A) 3x=12\\)', '\\(B) x+12=3\\)', '\\(C) 12x=3\\)', '\\(D) \\frac{x}{3}=12\\)', '\\(E) 12+3=x\\)'],
        answer: '\\(C) 12=x\\)',
        solution: `<b>\\(C) 12x=3\\)</b><p>We use the equation \\(s=\\frac{d}{t}\\). We know our speed, \\(s\\) is \\(12\\) and our distance \\(d\\) is \\(3\\), so we have \\(12=\\frac{3}{t}\\) and multiplying \\(t\\), or \\(x\\) on either side, gives \\(12t=3\\)`,
    },
    {
        title: "Review Question",
        text: `<p>Which equation models this problem?</p><p>Louis and Charles are racing. Louis is currently \\(15\\) meters ahead and running at a pace of \\(5 \\frac{m}{s}\\). What is the minimum speed Charles has to run at to catch up to Louis in a minute?</p>`,
        type: 'mc',
        choices: ['\\(A) 15x+5=60\\)', '\\(B) 60x=315\\)', '\\(C) 60x=300\\)', '\\(D) 300x=75\\)', '\\(E) 5x+15=315\\)'],
        answer: '\\(B) 60x=315\\)',
        solution: `<b>\\(B) 60x=315\\)</b><p>Louis has a \\(15\\) meter headstart and a speed of \\(5 \\frac{m}{s}\\). He will be running for \\(60\\) seconds, so he will run \\(300\\) meters plus his \\(15\\) second headstart, which sums to \\(315\\). Charles has \\(60\\) seconds at whatever speed he is at to catch up. Thus, we model \\(60x=315\\)`,
    },
    {
        title: "Review Question",
        text: `<p>Louis and Charles are racing. Louis is currently \\(15\\) meters ahead and running at a pace of \\(5 \\frac{m}{s}\\). What is the minimum speed Charles has to run at to catch up to Louis in a minute?</p>`,
        type: 'mc',
        choices: ['\\(A) 5 \\frac{m}{s}\\)', '\\(B) 5 \\frac{1}{4} \\frac{m}{s}\\)', '\\(C) 5 \\frac{1}{2} \\frac{m}{s}\\)', '\\(D) 5 \\frac{3}{4} \\frac{m}{s}\\)', '\\(E) 6 \\frac{m}{s}\\)'],
        answer: '\\(B) 5 \\frac{1}{4} \\frac{m}{s}\\)',
        solution: `<b>\\(B) 5 \\frac{1}{4} \\frac{m}{s}\)</b><p>Louis has a \\(15\\) meter headstart and a speed of \\(5 \\frac{m}{s}\\). He will be running for \\(60\\) seconds, so he will run \\(300\\) meters plus his \\(15\\) second headstart, which sums to \\(315\\). Charles has \\(60\\) seconds at whatever speed he is at to catch up. Thus, we model \\(60x=315\\). Dividing \\(\\frac{315}{60}\\) gives \\(5 \\frac{1}{4})`,
    },
    {
        title: "Review Question",
        text: `<p>What does \\(x\\) represent? <p>Louis and Charles are racing. Louis is currently \\(15\\) meters ahead and running at a pace of \\(5 \\frac{m}{s}\\). What is the minimum speed Charles has to run at to catch up to Louis in a minute?</p>
        $$
        60x=315
        $$`,
        type: 'mc',
        choices: [`\\(A) \\textup{Louis's speed}\\)`, `\\(B) \\textup{Louis's distance traveled}\\)`, `\\(C) \\textup{Charle's speed}\\)`, `\\(D) \\textup{Charle's distance traveled}\\)`, `\\(E) \\textup{The time Charles runs for}\\)`],
        answer: `\\(C) \\textup{Charle's speed}\\)`,
        solution: `<b>\\(C) \\textup{Charles's speed}\\)</b><p>The unknown the question is asking for and that we are solving for is Charles's speed, represented by \\(x\\). \\(60\\) represents the time he runs for and \\(315\\) the distance he needs to cover.`
    },
    {
        title: "Review Question",
        text: `Which relation is correct?`,
        type: 'mc',
        choices: ['\\(A) d=\\frac{s}{t}\\)', '\\(B) t=\\frac{s}{d}\\)', '\\(C) s= \\frac{t}{d}\\)', '\\(D) s=\\frac{d}{t}\\)', '\\(E) s=dt\\)'],
        answer: '\\(D) s=\\frac{d}{t}\\)',
        solution: `<b>\\(D) s=\\frac{d}{t}\\)</b><p>This represents that speed is equal to distance divided by time. If you have difficulty remembering this, just recall that speed is, in the metric system, measured as meters per second, or \\(\\frac{m}{s}\\) where the distance, \\(m\\) is divided by the time \\(s\\)`,
    },
    {
        title: "Review Question",
        text: `Oscar and George are in a race. George is a quarter of a lap ahead (\\(100\\) meters), but he is tired and only goes at a speed of \\(3 \\frac{m}{s}\\). Oscar has more energy and goes at a speed of \\(5 \\frac{m}{s}\\). Which equation models this correctly?`,
        type: 'mc',
        choices: ['\\(A) 3g+100=5o\\)', '\\(B) 3x-100=5x\\)', '\\(C) 3x+300=50x\\)', '\\(D) 3x=5x-100\\)', '\\(E) 3g=5o+100\\)'],
        answer: '\\(D) 3x=5x+100\\)',
        solution: `<b>\\(D) 3x=5x+100\\)</b><p>Since they race for the same time, the variable is the same. We'll call it \\(x\\). George's distance is \\(3x\\) and Oscar's is \\(5x\\) minus the \\(100\\) that George is ahead, so the relation is \\(3x=5x-100\\)`
    },
    {
        title: "Review Question",
        text: `How do you add vectors?`,
        type: 'mc',
        choices: ['\\(A) \\textup{head to head}', '\\(B) \\textup{tail to tail}\\)', '\\(C) \\textup{head to tail}\\)', '\\(D) \\textup{tail to head}\\)', '\\(E) \\textup{in a straight line}\\)'],
        answer: '\\(C) \\textup{head to tail}\\)',
        solution: `<b>\\(C) \\textup{head to tail}\\)</b><p>Vectors are added by attatching the head, or arrow, of the first vector, to the tail, or origin, of the second.</p>`,
    },
    {
        title: "Review Question",
        text: `You are riding a boat that moves \\(4 \\frac{m}{s}\\) north. A current moves west \\(3 \\frac{m}{s}\\). What is the new magnitude of your speed?`,
        type: 'mc',
        choices: ['\\(A) 1 \\frac{m}{s}\\)', '\\(B) 3 \\frac{m}{s}\\)', '\\(C) 4 \\frac{m}{s}\\)', '\\(D) 5 \\frac{m}{s}\\)', '\\(E) 7 \\frac{m}{s}\\)'],
        answer: '\\(D) 5 \\frac{m}{s}\\)',
        solution: `<b>\\(D) 5 \\frac{m}{s}\\)</b><p>The vectors are perpendicular, thus we can sum them head to tail to create a resultant vector that forms the hypotenuse of a right triangle with each vector as a leg. We thus find \\(\\sqrt{3^2+4^2}=5\\)`,
    },
    {
        title: "Review Question",
        text: `Which of these is a valid method for vector addition?`,
        type: 'mc',
        choices: ['\\(A) \\textup{head to head}\\)', '\\(B) \\textup{tail to head}\\)', '\\(C) \\textup{square method}\\)', '\\(D) \\textup{parallelogram method}\\)', '\\(E) \\textup{trapezoid method}\\)'],
        answer: '\\(D) \\textup{parallelogram method}\\)',
        solution: `<b>\\(D) \\textup{parallelogram method}\\)</b><p>The parallelogram method involves creating a parallelogram with the parallel sides being formed by replicating the vectors. The different vectors originate from the origin and are addded to each other</p>`,
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
    {
      title: "Review Question",
      text: `If it takes you \\(20\\) minutes to travel \\(1\\) kilometer, what is your speed?`,
      type: 'mc',
      choices: ['\\(A) \\frac{1}{20} \\textup{m/s}\\)',  '\\(B) \\frac{5}{6} \\textup{m/s}\\)', '\\(C) 1 \\textup{m/s}\\)',  '\\(D) 50 \\textup{m/s}\\)', '\\(E) 200 \\textup{m/s}\\)'],
      answer: '\\(B) \\frac{5}{6} \\textup{m/s}\\)',
      solution: `<b>\\(B) \\frac{5}{6} \\textup{m/s}\\)</b><p>Notice that all of the potential answers are in meters per second. We need to convert our units. We have \\(1 \\textup{km}=1000\\textup{m}\\) and \\(20\\textup{minutes} = 1200 \\textup{seconds}\\).Our
      distance over time is then just \\(\\frac{1000}{1200}=\\frac{5}{6}\\)`,
    },
    {
      title: "Review Question",
      text: `A boat is going \\(8 \\textup{mph}\\) east. A current pushes it \\(6 \\textup{mph}\\) south. What is the total magnitude of its speed?`,
      type: 'mc',
      choices: ['\\(A) 2 \\textup{mph}\\)', '\\(B) 6 \\textup{mph}\\)', '\\(C) 8 \\textup{mph}\\)', '\\(D) 10 \\textup{mph}\\)', '\\(E) 14 \\textup{mph}\\)'],
      answer: '\\(D) 10 \\textup{mph}\\)',
      solution: `<b>\\(D) 10 \\textup{mph}\\)</b><p>We can draw a vector going \\(8 \\textup{mph}\\) east by drwaing an arrow from the origin that goes \\(8\\) units rightwards on the \\(x\\) axis. We then draw a line, stemming from the "head" of our last arrow, down (south) \\(6\\) units to represent the current. This forms
      a right triangle where the hypotenuse is the magnitude of speed. We calculate \\(\\sqrt{6^2+8^2}=10 \\textup{mph}\\) `,
    },
    {
      title: "Review Question",
      text: `A model plane is trying to fly north at a speed of \\(12 \\textup{mph}\\). A strong current acts eastward of the plane. The model plane's final direction magnitude is \\(13 \\textup{mph}\\). What is the magnitude of the air current?`,
      type: 'mc',
      choices: ['\\(A) 1 \\textup{mph}\\)', '\\(B) 5 \\textup{mph}\\)', '\\(C) 7.5 \\textup{mph}\\)', '\\(D) 12.5 \\textup{mph}\\)', '\\(E) 25 \\textup{mph}\\)'],
      answer: '\\(B) 5 \\textup{mph}\\)',
      solution: `<b>\\(B) 5 \\textup{mph}\\)</b><p>The model plane's vector nad the current act perpendicularly, so their sum is the hypotenuse of a right triangle with hypotenuse of length \\(13\\) and leg \\(12\\). We solve via pythagorean theorem that \\(\\sqrt{13^2-12^2}=5\\)`,
    },
    {
      title: "Review Question",
      text: `To get to work, Emma bikes to the bus stop and then rides the bus. She lives \\(2 \\textup{mi}\\) from the bus stop and bikes at a speed of \\(3 \\textup{mph}\\). The bus goes \\(30 \\textup{mph}\\). If it takes \\(3\\) hours and \\(10\\) minutes for Emma to get to work, how far is the bus stop from her workplace?`,
      choices: ['\\(A) 2 \\textup{miles}\\)', '\\(B) 5 \\textup{miles}\\)', '\\(C) 30 \\textup{miles}\\)', '\\(D) 50 \\textup{miles}\\)', '\\(E) 75 \\textup{miles}\\)'],
      answer: '\\(E) 5 \\textup{miles}\\)',
      solution: `<b>\\(E) 5 \\textup{miles}\\)</b><p>It takes her \\(\\frac{2}{3}\\) hours, or \\(\\frac{2}{3} \\times 60 = 40\\) minutes to get to the bus stop. It takes her \\(3 \\times 60 + 10 = 190\\) minutes to get to work. She thus spends \\(190-40=150\\) minutes on the bus. This is \\(2.5\\) hours, which she travels \\(30 \\times 2.5 = 75\\) miles in. `
    },
    {
      title: "Review Question",
      text: `What is the average speed of a car that travels \\(5\\) miles at \\(25\\) miles per hour and \\(6\\) miles at \\(36\\) miles per hour?`,
      type: 'mc',
      choices: ['\\(A) 25 \\textup{miles per hour}\\)', '\\(B) 30 \\textup{miles per hour}\\)', '\\(C) 31.5 \\textup{miles per hour}\\)', '\\(D) 36 \\textup{miles per hour}\\)', '\\(E) 40 \\textup{miles per hour}\\)'],
      answer: '\\(B) 30 \\textup{miles per hour}\\)',
      solution: `<b>\\(B) 30 \\textup{miles per hour}\\)</b><p>The car travels for \\(\\frac{5}{25}=\\frac{1}{5}\\) hours at \\(25\\) miles per hour and \\(\\frac{6}{36}=\\frac{1}{6}\\) hours at \\(36\\) miles per hour. The average speed is \\(\\frac{5+6}{\\frac{1}{5}+\\frac{1}{6}}=\\frac{11}{\\frac{11}{30}}=30\\)`,
    },
    {
      title: "Review Question",
      text: `How many meters are in a kilometer?`,
      choices: ['\\(A) 10\\)', '\\(B) 100\\)', '\\(C) 1000\\)', '\\(D) 10000\\)', '\\(E) 100000\\)'],
      answer: '\\(C) 1000\\)',
      solution: `<b>\\(C) 1000\\)</b><p>The prefix kilo indicates thousand</p>`,
    },
    {
      title: "Review Question",
      text: `How many minutes is \\(\\frac{17}{6}\\) hours?`,
      choices: ['\\(A) 17\\)', '\\(B) 90\\)', '\\(C) 120\\)', '\\(D) 170\\)', '\\(E) 190\\)'],
      answer: '\\(D) 170\\)',
      solution: `<b>\\(D) 170\\)</b><p>\\(\\frac{1}{6}\\) of an hour is \\(10\\) minutes, so we are looking for \\(17 \\times 10 = 170\\) minutes`
    }
    
]
topicQ.forEach(i => {
    i.type = 'mc'
})
let currentQuestion = 0
let accuracy = 0
console.log(topicQ.length)
let correctCount = 0
shuffleArray(topicQ)
function loadQuestion(){
        let topicQuestion = topicQ[currentQuestion]
        document.getElementById("question-title").innerHTML = topicQuestion.title
        document.getElementById("question-text").innerHTML = topicQuestion.text
        mcChoices.forEach(btn => btn.disabled = false)
            document.getElementById("solution-text").innerHTML = ""
    document.getElementById("solution").style.display = "none"
    document.getElementById("next-btn").style.display = "none"
    
    document.getElementById("answer-input").value = ""
            document.getElementById("answer-input").style.display = "none"
    document.getElementById("check-btn").style.display = "none"
    mcContainer.classList.add("hidden")

    if (!topicQuestion.type || topicQuestion.type === "fr") {
        document.getElementById("answer-input").style.display = "inline-block"
        document.getElementById("check-btn").style.display = "inline-block"
    }
    if (topicQuestion.type === "mc") {
        mcContainer.classList.remove("hidden")

mcChoices.forEach((btn, i) => {
            btn.style.display = "block"
            if (topicQuestion.choices[i] == null) {
                btn.style.display = "none"
            } else {
                          btn.textContent = topicQuestion.choices[i];
            btn.onclick = () => handleMCAnswer(topicQuestion.choices[i])
            }

        });
    }
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById("question-text")]).catch(()=>{})
        MathJax.typesetPromise([questionChoices]).catch(()=>{})
    }
}
function handleMCAnswer(choice) {
    document.getElementById("answer-input").value = choice; // reuse existing checker
    document.getElementById("check-btn").click();
mcChoices.forEach(btn => btn.disabled = true);
}

document.getElementById("next-btn").addEventListener("click", async function() {
        if (currentQuestion === 4){
               if (correctCount > 3){
                        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return
  }

  const userId = session.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .update({
        equationsLevel: 'completed'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Woo hoo! Looks like you finished this pathway!>"
  mcChoices.forEach(i => {
    i.style.display = "none"
  })
    document.getElementById('solution').style.display = "none";
  
                } else {
                    document.getElementById("question-title").innerHTML = "Oops! Looks Like Your Accuracy Wasn't Great. Wanna Try Again?"
document.getElementById("question-text").innerHTML = "Get at least four questions right in order to progress to the next level."
document.getElementById("answer-input").style.display = "none"
document.getElementById("check-btn").innerHTML = "Start Mastery Check"
  mcChoices.forEach(i => {
    i.style.display = "none"
  })
  document.querySelectorAll(".accuracyCircle").forEach(i => {
    i.style.backgroundColor = color
  })
  document.getElementById("solution").style.display = "none"
  document.getElementById("check-btn").style.display = "block"
document.getElementById("check-btn").addEventListener("click", work)
currentQuestion = 0
shuffleArray(topicQ)
correctCount = 0
                }
    } else if (currentQuestion < topicQ.length){
                currentQuestion += 1
                loadQuestion()
        } 
        
})

document.getElementById("question-title").innerHTML = "Let's Check Your Understanding!"
document.getElementById("question-text").innerHTML = "Get at least four questions right in order to progress to the next level."
document.getElementById("answer-input").style.display = "none"
document.getElementById("check-btn").innerHTML = "Start Mastery Check"
document.getElementById("check-btn").addEventListener("click", work)
function work() {
    document.querySelectorAll(".mc-choice").forEach(i => {
        i.style.display = "block"
    })
    loadQuestion()
    document.getElementById("check-btn").innerHTML = "Check Answer"
    document.getElementById("check-btn").removeEventListener("click", work)
    document.getElementById("check-btn").addEventListener("click", function(){
        const userAnswer = document.getElementById("answer-input").value
        const correctAnswer = topicQ[currentQuestion].answer
        const solutionText = document.getElementById("solution-text")
        const nextBtn = document.getElementById("next-btn")
        const solution = document.getElementById("solution")
        if (userAnswer === correctAnswer){
                solutionText.innerHTML = "Correct!" + topicQ[currentQuestion].solution
                document.querySelectorAll(".accuracyCircle")[currentQuestion].style.backgroundColor = "#88B0FF"
                console.log(document.querySelectorAll(".accuracyCircle")[currentQuestion].style.backgroundColor)
                correctCount += 1
        } else {
            solutionText.innerHTML = "Incorrect" + topicQ[currentQuestion].solution 
            document.querySelectorAll(".accuracyCircle")[currentQuestion].style.backgroundColor = "#FFB192"   
        }
        solution.style.display = "block"
        nextBtn.style.display = "block"
        solutionText.style.display = "block"
        MathJax.typesetPromise([solution]).catch(()=>{})
})
document.querySelectorAll(".accuracyCircle")[0].style.backgroundColor = color   
}

//-----------------------------Actual Functions Fr Fr------------------------------
const incorrectBtns = Array.from(document.querySelectorAll(".incorrect"))
incorrectBtns.forEach(btn => {
        console.log("clicked")
        btn.addEventListener("click", function() {
                document.getElementById("sdt-hint").style.display = "block"
        })
})
const correct = document.getElementById("correct")
correct.addEventListener("click", function() {
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

    function updateRace() {
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
function updateLabelOne(){
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
function updateVectors() {
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


