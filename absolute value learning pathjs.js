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
// Main Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
//-----------------------------------Actual Functions Fr Fr-------------------------------------//


//----------------------------Absolute Value-------------------------
let absoluteValueTrace = {
        x: [],
        y: [],
        type: 'scatter'
}
function drawAbsoluteValue() {
    const exprString = document.getElementById('absoluteValueInput').value;
    
    const xValues = [];
    const yValues = [];

    try {
        const expr = math.compile(exprString);

        for (let x = -10; x <= 10; x += 0.1) {
            let scope = { x: x };
            let y = expr.evaluate(scope);
            
            xValues.push(x);
            yValues.push(y);
        }

        absoluteValueTrace = {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#88B0FF', width: 3 }
        };

        const layout = {
            xaxis: { range: [-10, 10], title: 'x' },
            yaxis: { range: [-10, 10], title: 'y' },
            hovermode: 'closest'
        };
        
        const graphTitle = document.getElementById("absoluteValueTitle")
        graphTitle.innerHTML = `Graph of \\(${exprString}\\)`
        MathJax.typesetPromise([graphTitle]).catch(()=>{})
        Plotly.newPlot('absoluteValuePlot', [absoluteValueTrace], layout);
        
    } catch (err) {
    }
}
document.getElementById("absoluteValueBtn").addEventListener("click", function(){
const traceY = absoluteValueTrace.y.map(value => value)
const traceX = absoluteValueTrace.x.map(value => value)
const newY = []
traceY.forEach(i => {
        if (i < 0){
                let replace = (i * -1)
                newY.push(replace)
        } else {
                newY.push(i)
        }
        var absoluteTraced = {
                x: traceX,
                y: newY,
                mode: 'lines',
                type: 'scatter',
                line: {color: '#ffb192'}
        }
                var layout = {
  yaxis: {
    scaleanchor: "x",
    scaleratio: 1
  }
}
        let data = [absoluteValueTrace, absoluteTraced]
        Plotly.newPlot('absoluteValuePlot', data, layout)
})
})
drawAbsoluteValue()

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

//--------------Final Question---------------
const topicQ = [
    {
        title: "Review Question",
        text: `If \\(x\\) and \\(y\\) must be integers, how many solutions does \\(|x|+|y|=1\\) have?`,
        type: 'mc',
        choices: ['\\(A) 0\\)', '\\(B) 1', '\\(C) 3\\)', '\\(D) 4\\)', '\\(E) \\textup{ infinitely many}\\)'],
        answer: '\\(D) 4\\)',
        solution: `<b>\\(D) 4\\)</b><p>Since \\(|x|\\) and \\(|y|\\) must be positive, one must be \\(0\\) and one must be \\(1\\). The \\(1\\) can be \\(x\\) or \\(y\\) (2 possibilities) and \\(1\\) or \\(-1\\), (another 2 possibitlies), giving \\(2 \\times 2 = 4\\)`,
    },
    {
        title: "Review Question",
        text: `If \\(x\\) and \\(y\\) must be integers, how many solutions does \\(2|x|+|y|=3\\) have?`,
        type: 'mc',
        choices: ['\\(A) 0\\)', '\\(B) 2\\)', '\\(C) 4\\)', '\\(D) 6\\)', '\\(E) \\textup{ infinitely many}\\)'],
        answer: '\\(D) 6\\)',
        solution: `<b></b><p>\\(2|x|\\) must be \\(0\\) or \\(2\\), meaning \\(x\\) must be \\(0, 1\\) or \\(-1\\). If \\(2|x|=0\\) than \\(y\\) is \\(3\\) or \\(-3\\). That's \\(2\\) options. If \\(2\\) is \\(1\\) or \\(-1\\), \\(y\\) must also be \\(1\\) or \\(-1\\). That's \\(2 \\times 2 = 4\\), which we
        add to the values for \\(2|x|=0\\), so we have \\(2+4=6\\)`
    },
    {
        title: "Review Question",
        text: "What does the graph of \\(y=|x|\\) look like?",
        type: 'mc',
        choices: ['\\(A) \\textup{ a letter V}\\)', '\\(B) \\textup{ an upside down letter V}\\', '\\(C) \\textup{ a straight line}\\)', '\\(D) \\textup{ a letter W}\\)', '\\(E) \\textup{ a diamond}\\)'],
        answer: '\\(A) \\textup{ a letter V}\\)',
        solution: `<b>\\(A) \\textup{ a letter V}\\)</b> For positive values of \\(x\\), it is a line with slope \\(1\\) from the origin. However, for negative values of \\(x\\), the y value becomes positive. Instead of keeping a 
        positive slope of \\(1\\), we flip around the \\(x\\) axis, reversing the slope as well. This creates two lines with endpoints at the origin making a V`,
    },
    {
        title: "Review Question",
        text: "What does the graph of \\(y=-|x|\\) look like?",
        type: 'mc',
        choices: ['\\(A) \\textup{ a letter V}\\)', '\\(B) \\textup{ an upside down letter V}\\', '\\(C) \\textup{ a straight line}\\)', '\\(D) \\textup{ a letter W}\\)', '\\(E) \\textup{ a diamond}\\)'],
        answer: '\\(B) \\textup{ an upside down letter V}\\)',
        solution: `<b>\\(B) \\textup{ an upside down letter V}\\)</b> In the graph of \\(y=|x|\\) positive values of \\(x\\), it is a line with slope \\(1\\) from the origin. However, for negative values of \\(x\\), the y value becomes positive. Instead of keeping a 
        positive slope of \\(1\\), we flip around the \\(x\\) axis, reversing the slope as well. This creates two lines with endpoints at the origin making a V</p>
        <p>When we take \\(-|x|\\), we flip the entire graph over the \\(x\\)-axis, making an upside down V`,
    },
    {
        title: "Review Question",
        text: "What does the graph of \\(|x|+|y|=1\\) look like?",
        type: 'mc',
        choices: ['\\(A) \\textup{ a letter V}\\)', '\\(B) \\textup{ an upside down letter V}\\', '\\(C) \\textup{ a straight line}\\)', '\\(D) \\textup{ a letter W}\\)', '\\(E) \\textup{ a diamond}\\)'],
        answer: '\\(E) \\textup{ a diamond}\\)',
        solution: `<b>\\(E) \\textup{ a diamond}\\)</b> \\(x\\) can be positive or negative, up to \\(1\\), and likewise for \\(y\\). The absolute value of one affects the absolute value of the other, but not the sign. This means we can have \\((+x, +y), (-x, +y), (+x, -y)\\) or \\((-x, -y)\\). There will be 
        \\(4\\) distinct segments. Induction, or logic, tells us that these wil all have slopes of \\(1\\) or \\(-1\\) and endpoints with some coordinate \\(|1|\\) and the other \\(0\\). This forms a diamond shape`,
    },
    {
        title: "Review Question",
        text: `What is/are the solution(s) to the following equation?
        $$
        |x+15|^2-25=169
        $$`,
        type: 'mc',
        choices: ['\\(A) \\textup{ only 3}\\)', '\\(B) \\textup{ only -15}\\)', '\\(C) \\textup{ only -27}\\)', '\\(D) \\textup{3, -15 and -27}\\)', '\\(E) \\textup{-3 and -27}\\)'],
        answer: '\\(E) \\textup{-3 and -27}\\)',
        solution: `<b>\\(E) \\textup{3 and -27}\\)</b><p>We first at \\(25\\) to both sides. We have \\(|x+15|^2=144\\). Squaring both sides should give us \\(|x+15|=12\\) or \\(|x+15|=-12\\), but the latter is not possible. We thus have that \\(|x+15|=12\\) and \\(x+15=12\\) or \\(x+15=-12\\). This gives \\(-3\\) and \\(-27\\)`
    },
    {
        title: "Review Question",
        text: `What is/are the solution(s)to the following equation?
        $$
        |x+15|^3-25=-368
        $$`,
        type: 'mc',
        choices: ['\\(A) \\textup{only -8}\\)', '\\(B) \\textup{ only -22}\\)', '\\(C) \\textup{ only 13}\\)', '\\(D) \\textup{ both -8 and -22}\\)', '\\(E) \\textup{ there are no real solutions}\\)'],
        answer: '\\(E) \\textup{ there are no real solutions}\\)',
        solution: `<b>\\(E) \\textup{ there are no real solutions}\\)</b><p>Adding \\(25\\) to both sides gives \\(|x+15|^3=-343\\) and taking the cube root gives \\(|x+15|=-7\\). An absolute value can never be negative, so there are no real solutions`,
    },
    {
        title: "Review Question",
        text: `What is this expression equal to?
        $$
        |-5^2 \\times 3 + 4|
        $$`,
        choices: ['\\(A) 175\\)', '\\(B) -71', '\\(C) -223\\)', '\\(D) 71\\)', '\\(C) 223\\)'],
        answer: '\\(D) 71\\)',
        solution: `<b>\\(D) 71\\)</b>$$
        |-5^2 \\times 3+4|
        $$
        $$
        |-25 \\times 3 + 4|
        $$
        <p>Notice we have \\(-25\\) because this notation implies \\(-(5)^2\\), not \\((-5)^2\\)</p>>
        $$
        |-75+4|
        $$
        $$
        |-71|
        $$
        $$
        71
        $$`
    },
    {
        title: 'Review Question',
        text: `What is this expression equal to?
        $$
        |(-7)^3|+5
        $$`,
        type: 'mc',
        choices: ['\\(A) -338\\)', '\\(B) 338\\)', '\\(C) 343\\)', '\\(D) -348\\)', '\\(E) 348\\)'],
        answer: '\\(E) 348\\)',
        solution: `<b>\\(E) 348\\)</b>
        $$
        |(-7)^3|+5
        $$
        $$
        |-343|+5
        $$
        $$
        343+5
        $$
        $$
        348
        $$`
    },
    {
        title: "Review Question",
        text: `What are the solutions to this equation?
        $$
        |x|=x^2
        $$`,
        type: 'mc',
        choices: ['\\(A) 0\\)', '\\(B) (0, 1)\\)', '\\(C) (0, 1, -1)\\)', '\\(D) (-1, 1)\\)', '\\(E) \\textup{ no solutions}\\)'],
        answer: '\\(C) (0, 1, -1)\\)',
        solution: `<b>\\(C) (0, 1, -1)\\)</b><p>We know \\(0\\) works, because \\(0^2=0\\), but we can also use \\(-1\\) and \\(1\\) because \\(1^2=1\\) and absolute value and squaring make all values positive.`
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
        functionsLevel: 'completed'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Completed this pathway!"
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