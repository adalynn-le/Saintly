
// Main Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
import Chart from 'https://esm.sh/chart.js/auto';

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
//------------------Inequalities Graph------------------
// Function to update the Inequality Graph based on user input (y > mx + b)
function updateInequalityGraph() {
        let m = document.getElementById("slopeInput").value
        let b = document.getElementById('interceptInput').value

    const ctx = document.getElementById('inequalityCanvas').getContext('2d');
    
    // Generate linear data points
    const labels = [];
    const points = [];
    for (let x = -10; x <= 10; x++) {
        labels.push(x);
        points.push(m * x + b);
    }

    // Destroy existing chart to prevent ghosting
    if (window.inequalityChart) window.inequalityChart.destroy();
    let isGreaterThan = document.getElementById("signInput").value
    console.log(isGreaterThan)
    window.inequalityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: isGreaterThan ? 'y > mx + b' : 'y < mx + b',
                data: points,
                borderColor: '#3498db',
                fill: isGreaterThan ? 'end' : 'origin', // Shades UP for >, DOWN for <
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderDash: [5, 5], // Dashed line for strict inequalities (not inclusive)
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                y: { min: -10, max: 10, grid: { color: '#eee' } },
                x: { min: -10, max: 10, grid: { color: '#eee' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}
document.getElementById("graphButton").addEventListener("click", updateInequalityGraph)
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
const topicQ = [
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        x^2+13 \\leq 38
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\geq 5\\)', '\\(B) x \\leq 5\\)', '\\(C) x \\geq -5\\)', '\\(D) x \\leq -5\\)', '\\(E) -5 \\leq x \\leq 5\\)'],
        answer: '\\(E) -5 \\leq x \\leq 5\\)',
        solution: `<b>\\(E) -5 \\leq x \\leq 5\\)<b/><p>We start by subtracting \\(13\\) on either side of the inequality, givin us \\(x^2 \\leq 25\\). Naturall, we want to just square, but this is tricky with inequalities, and especialy with squares,
        so we also need to account for the negative value. We know that \\(x \\leq 5\\) is an upper bound, but for negative values of \\(x\\), \\(x \\geq -5\\) is also an option, making \\(x\\) bound by \\(-5 \\leq x \\leq 5\\)`
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        -5x-13 \\leq 12
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\geq 5\\)', '\\(B) x \\leq 5\\)', '\\(C) x \\geq -5\\)', '\\(D) x \\leq -5\\)', '\\(E) -5 \\leq x \\leq 5\\)'],
        answer: '\\(A) x \\geq 5\\)',
        solution: `<b>\\(A) x \\geq 5\\)</b><p>
        $$
        -5x \\leq 25
        $$
        $$
        x \\geq 5
        $$`
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        5x-13 \\leq 12
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\geq 5\\)', '\\(B) x \\leq 5\\)', '\\(C) x \\geq -5\\)', '\\(D) x \\leq -5\\)', '\\(E) -5 \\leq x \\leq 5\\)'],
        answer: '\\(B) x \\leq 5\\)',
        solution: `<b>\\(B) x \\leq 5\\)</b><p>
        $$
        5x \\leq 25
        $$
        $$
        x \\leq 5
        $$`
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        -5x-13 \\leq 12
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\geq 5\\)', '\\(B) x \\leq 5\\)', '\\(C) x \\geq -5\\)', '\\(D) x \\leq -5\\)', '\\(E) -5 \\leq x \\leq 5\\)'],
        answer: '\\(A) x \\geq 5\\)',
        solution: `<b>\\(A) x \\geq 5\\)</b><p>
        $$
        -5x \\leq 25
        $$
        $$
        x \\geq 5
        $$`
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        2^{-x} - 46 \\leq-14
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\geq 5\\)', '\\(B) x \\leq 5\\)', '\\(C) x \\geq -5\\)', '\\(D) x \\leq -5\\)', '\\(E) -5 \\leq x \\leq 5\\)'],
        answer: '\\(C) x \\geq -5\\)',
        solution: `<b>\\(C) x \\geq -5\\)</b><p>
        $$
        2^{-x} \\leq 32
        $$
        $$
         -x \\leq \\log_{2}(32)
        $$
        $$
        x \\geq -5
        $$`
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        -5x \\geq -25
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\geq 5\\)', '\\(B) x \\leq 5\\)', '\\(C) x \\geq -5\\)', '\\(D) x \\leq -5\\)', '\\(E) -5 \\leq x \\leq 5\\)'],
        answer: '\\(D) x \\leq -5\\)',
        solution: `<b>\\(D) x \\leq -5\\)</b><p></p>
        $$
        x \\leq 5
        $$
        <p>Divide \\(-5\\) on both sides and switch the sign of the inequality`
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        -x^2+7x-10 \\geq 0
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\leq 2 \\textup{ or } x \\geq 5\\)', '\\(B) x \\leq 2\\)', '\\(C) x \\geq 5\\)', '\\(D) x=2, x=5\\)', '\\(E) 2 \\leq x \\leq 5\\)'],
        answer: '\\(E) 2 \\leq x \\leq 5\\)',
        solution: `<b>\\(E) 2 \\leq x \\leq 5\\)</b><p>We need to factor this. We first factor out \\(-1\\) for </p>
        $$
        -(x^2-7x+10) \\geq 0
        $$
        <p>Factoring gives</p>
        $$
        -(x-5)(x-2) \\geq 0
        $$
        $$
        (x-5)(x-2) \\leq 0
        $$
        <p>We are either looking at \\(x \\leq 2, x \\geq 5\\) or \\(2 \\leq x \\leq 5\\)</p>
        <p>We input an arbitrary value between them, lets say \\(3\\), to check. That gives \\(-9+27-10 \\geq 0\\). This is true, so we know that it is the latter, \\(2 \\leq x \\leq 5\\)
        `,
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        -x^2+7x-10 \\leq 0
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\leq 2 \\textup{ or } x \\geq 5\\)', '\\(B) x \\leq 2\\)', '\\(C) x \\geq 5\\)', '\\(D) x=2, x=5\\)', '\\(E) 2 \\leq x \\leq 5\\)'],
        answer: '\\(A) x \\leq 2 \\textup{ or } x \\geq 5\\)',
        solution: `<b>\\(A) x \\leq 2 \\textup{ or } x \\geq 5\\)</b><p>We need to factor this. We first factor out \\(-1\\) for </p>
        $$
        -(x^2-7x+10) \\leq 0
        $$
        <p>Factoring gives</p>
        $$
        -(x-5)(x-2) \\leq 0
        $$
        $$
        (x-5)(x-2) \\geq 0
        $$
        <p>We are either looking at \\(x \\leq 2, x \\geq 5\\) or \\(2 \\leq x \\leq 5\\)</p>
        <p>We input an arbitrary value between them, lets say \\(3\\), to check. That gives \\(-9+27-10 \\geq 0\\). This is not true, so we know that it is the former, \\(x \\leq 2 \\textup{ or } x \\geq 5\\)
        `,   
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        3^{x}+14 \\leq 23
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\leq 2 \\textup{ or } x \\geq 5\\)', '\\(B) x \\leq 2\\)', '\\(C) x \\geq 5\\)', '\\(D) x=2, x=5\\)', '\\(E) 2 \\leq x \\leq 5\\)'],
        answer: '\\(B) x \\leq 2\\)',
        solutino: `<b>\\(B) x \\leq 2\\)</b>
        $$
        3^{x} \\leq 9
        $$
        $$
        x \\leq \\textup{log}_{3}(9)
        $$
        $$
        x \\leq 2
        $$
        `,
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        \\frac{1}{x}+\\frac{7}{12} \\geq \\frac{47}{60}
        $$`,
        type: 'mc',
        choices: ['\\(A) x \\leq 2 \\textup{ or } x \\geq 5\\)', '\\(B) x \\leq 2\\)', '\\(C) x \\geq 5\\)', '\\(D) x=2, x=5\\)', '\\(E) 2 \\leq x \\leq 5\\)'],
        answer: '\\(C) x \\geq 5\\)',
        solution: `<b>\\(C) x \\geq 5\\)</b>
        $$
        \\frac{1}{x}+\\frac{35}{60} \\geq \\frac{47}{60}
        $$
        $$
        \\frac{1}{x} \\geq \\frac{12}{60}
        $$
        $$
        \\frac{1}{x} \\geq \\frac{1}{5}
        $$
        $$
        x \\geq 5
        `,
    },
    {
        title: "Review Question",
        text: `Solve the inequality:
        $$
        3^{x}+14 < x
        $$`,
        type: 'mc',
        choices: ['\\(A) \\textup{no real solutions}\\)', '\\(B) \\textup{all real numbers}\\)', '\\(C) x > 14\\)', '\\(D) x < -3\\)', '\\(E) x = \\infty\\)'],
        answer: '\\(A) \\textup{no real solutions}\\)',
        solution: `<b>\\(A) \\textup{no real solutions}</b><p>\\(3^{x}\\) can never be negative and adding \\(14\\) will never make it negative, so we know that any negative value of \\(x\\) wont work. For positive values, exponential
        functions grow incredibly fast and thus outpace the growth of \\(x\\). It also can't be \\(0\\) because that would make it \\(15 < 0\\), which, of course, is not true. Thus, no value of \\(x\\) satisfies this inequality `
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
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const mcContainer = document.getElementById("mc-container");
const questionChoices = document.getElementById("mc-container")
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
        functionsLevel: 'absolute value'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Go to the next lesson: <a href='absolute value learning path.html'>Absolute Value</a>"
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