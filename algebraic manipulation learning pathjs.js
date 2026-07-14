const { createClient } = window.supabase;
const supabaseURL = 'https://joevkictcfaoofqhbhgw.supabase.co';
const supabaseKey = 'sb_publishable_8Iat4psKXuFn91uT8yuw7g_2n3Buc5w';
const supabase = createClient(supabaseURL, supabaseKey);
const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');
const toggleBrightness = document.getElementById("brightness")
const carouselLight = document.querySelectorAll("carousel-logo-light")
const carouselDark = document.querySelectorAll("carousel-logo-dark")
let colorMode = 'light'
let colorModeTrue = localStorage.getItem("colorMode")
let color = 'rgb(239, 237, 247)'
if  (colorModeTrue !== false){
       colorMode =  colorModeTrue
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
});
draggables.forEach(drag => {
    drag.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Required to allow a drop
        zone.classList.add('hovered');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('hovered');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('hovered');
        
        const dragId = e.dataTransfer.getData('text');
        const dragElement = document.getElementById(dragId);
        
        // Check if correct
        if (dragElement.getAttribute('data-match') === zone.id) {
            zone.classList.add('correct');
            dragElement.classList.add("correct")
            zone.appendChild(dragElement); // Snap item into the box
            dragElement.style.cursor = 'default';
            dragElement.setAttribute('draggable', 'false');
        }
    });
});


// ======================== Reverse PEMDAS =====================================
const reversePemdasArray = [
    { equation: `\\(2x = 4\\)`, answer: `\\div`, explanation: "Divide by 2 to undo multiplication." },
    { equation: `\\(x + 5 = 12\\)`, answer: `-`, explanation: "Subtract 5 to undo addition." },
    { equation: `\\(\\frac{x}{3} = 7\\)`, answer: `\\times`, explanation: "Multiply by 3 to undo division." },
    { equation: `\\(x - 8 = 2\\)`, answer: `+`, explanation: "Add 8 to undo subtraction." },
    { equation: `\\(10 = x + 3\\)`, answer: `-`, explanation: "Subtract 3 to isolate x." },
    { equation: `\\(-4x = 16\\)`, answer: `\\div`, explanation: "Divide by -4 to undo multiplication." },
    { equation: `\\(x + 1.5 = 5\\)`, answer: `-`, explanation: "Subtract 1.5." },
    { equation: `\\(\\frac{x}{-2} = 10\\)`, answer: `\\times`, explanation: "Multiply by -2." },
    { equation: `\\(12 = 4x\\)`, answer: `\\div`, explanation: "Divide by 4." },
    { equation: `\\(x - \\frac{1}{2} = \frac{3}{2}\\)`, answer: `+`, explanation: "Add 1/2 to both sides." },
    // Introducing 2-step (Focusing on what to do FIRST)
    { equation: `\\(2x + 3 = 11\\)`, answer: `-`, explanation: "Undo addition/subtraction FIRST (SADMEP)." },
    { equation: `\\(\\frac{x}{4} - 1 = 5\\)`, answer: `+`, explanation: "Add 1 first before dealing with the fraction." },
    { equation: `\\(5x - 7 = 13\\)`, answer: `+`, explanation: "Add 7 first." },
    { equation: `\\(\\frac{x}{2} + 10 = 15\\)`, answer: `-`, explanation: "Subtract 10 first." },
    { equation: `\\(3 = 9x + 12\\)`, answer: `-`, explanation: "Subtract 12 first." },
    { equation: `\\(100 = 10x - 50\\)`, answer: `+`, explanation: "Add 50 first." },
    { equation: `\\(\\frac{x}{10} + 0.5 = 2.5\\)`, answer: `-`, explanation: "Subtract 0.5 first." },
    { equation: `\\(14 = 2x - 6\\)`, answer: `+`, explanation: "Add 6 first." },
    { equation: `\\(1 - x = 5\\)`, answer: `-`, explanation: "Subtract 1 first (the leading positive constant)." },
    { equation: `\\(22 = \\frac{x}{3} + 4\\)`, answer: `-`, explanation: "Subtract 4 first." }
];
shuffleArray(reversePemdasArray)
const addition = document.getElementById("addition")
const subtraction = document.getElementById("subtraction")
const multiplication = document.getElementById("multiplication")
const division = document.getElementById("division")
const reversePEMDASEquation = document.getElementById("reversePEMDASEquation")
const reversePemdasSolution = document.getElementById("reversePemdasSolution")
const reversePemdasSolutionText = document.getElementById("reversePemdasSolutionText")
const reversePemdasNext = document.getElementById("reversePemdasNext")
addition.innerHTML = '\\(+\\)'
subtraction.innerHTML = '\\(-\\)'
multiplication.innerHTML = '\\(\\times\\)'
division.innerHTML = '\\(\\div\\)'
MathJax.typesetPromise([addition]).catch(()=>{})
MathJax.typesetPromise([subtraction]).catch(()=>{})
MathJax.typesetPromise([multiplication]).catch(()=>{})
MathJax.typesetPromise([division]).catch(()=>{})
let reversePemdasIndex = 0
let currentQuestionReversePEMDAS = reversePemdasArray[reversePemdasIndex]
function loadReversePemdas(){
    reversePemdasSolution.style.display = "none"
    reversePemdasSolutionText.style.display = "none"
    reversePemdasNext.style.display = "none"
    currentQuestionReversePEMDAS = reversePemdasArray[reversePemdasIndex]
    reversePEMDASEquation.innerHTML = currentQuestionReversePEMDAS.equation
    MathJax.typesetPromise([reversePEMDASEquation]).catch(()=>{});
}
addition.addEventListener("click", function(){
    if (currentQuestionReversePEMDAS.answer == '+'){
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Correct!" + currentQuestionReversePEMDAS.explanation
    } else {
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Incorrect!" + currentQuestionReversePEMDAS.explanation    
    }
    reversePemdasNext.style.display = "block"
    reversePemdasSolutionText.style.display = "block"
})
subtraction.addEventListener("click", function(){
    if (currentQuestionReversePEMDAS.answer == '+'){
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Correct!" + " " + currentQuestionReversePEMDAS.explanation
    } else {
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Incorrect!" + " " + currentQuestionReversePEMDAS.explanation    
    }
    reversePemdasNext.style.display = "block"
    reversePemdasSolutionText.style.display = "block"
})
multiplication.addEventListener("click", function(){
    if (currentQuestionReversePEMDAS.answer === '+'){
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Correct! " + " " + currentQuestionReversePEMDAS.explanation
    } else {
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Incorrect! " + " " + currentQuestionReversePEMDAS.explanation    
    }
    reversePemdasNext.style.display = "block"
    reversePemdasSolutionText.style.display = "block"
})
division.addEventListener("click", function(){
    if (currentQuestionReversePEMDAS.answer === '+'){
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Correct!" + " " + currentQuestionReversePEMDAS.explanation
    } else {
        reversePemdasSolution.style.display = "block"
        reversePemdasSolutionText.innerHTML = "Incorrect!" + " " + currentQuestionReversePEMDAS.explanation    
    }
    reversePemdasNext.style.display = "block"
    reversePemdasSolutionText.style.display = "block"
})
reversePemdasNext.addEventListener("click", function(){
    reversePemdasIndex += 1
    if (reversePemdasIndex < reversePemdasArray.length) {
        loadReversePemdas()
    } else {
        reversePemdasIndex = 0
        shuffleArray(reversePemdasArray)
        loadReversePemdas()
    }
})
let sum
loadReversePemdas()
const slider = document.getElementById('bSlider');
slider.oninput = function() {
    const bHalf = this.value / 2;
    document.getElementById('b-side').style.width = bHalf + "px";
    document.getElementById('b-bottom').style.height = bHalf + "px";
    
    // Update the "Missing Corner" dimensions
    const corner = document.getElementById('missing-corner');
    corner.style.width = bHalf + "px";
    corner.style.height = bHalf + "px";
    console.log(bHalf)
 sum = (bHalf / 10) * (bHalf / 10)
console.log(sum)
    const shutup = document.getElementById('bVal')
    shutup.innerHTML = `Equation: \\(x^2 + ${(this.value / 10).toFixed(1)}x + ${sum.toFixed(5)}\\)`;
    
    if (sum > 4){
        document.getElementById('missing-corner').innerHTML = sum.toFixed(1)
            document.getElementById('missing-corner').style.textAlign = "center"
    document.getElementById('missing-corner').style.textJustify = "center !important"
    document.getElementById('missing-corner').style.color = "var(--primary-color)"
    } else {
        document.getElementById('missing-corner').innerHTML = ""
    }
    MathJax.typesetPromise([shutup]).catch(()=>{})
}
slider.oninput()

function fillCorner() {
    document.getElementById('missing-corner').style.display = "block";
    const val = (slider.value / 20); // Scaled for display
}
fillCorner()
const subs = document.querySelectorAll(".substitute")
function substitute(){
        console.log("subbing")
        subs.forEach(sub => {
                sub.innerHTML = '\\(u\\)'
                MathJax.typesetPromise([sub]).catch(()=>{})
                sub.classList.add("u")
        })
}




// Main Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
  const helpPannel = document.getElementById("helpPannel")
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


//--------------Final Question---------------
const topicQ = [
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
  {
    title: "Review Question",
    text: `What should you do first to isolate the variable?
    $$
    x^2-25=0
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{add}\\)', '\\(B) \\textup{subtract}\\)', '\\(C) \\textup{multiply}\\)', '\\(D) \\textup{divide}\\)', '\\(E) \\textup{take the square root}\\)'],
    answer: '\\(A) \\textup{add}\\)',
    solution: `<b>\\(A) \\textup{add}\\)</b><p>We first want to get all the constant values to one side, so we would add \\(25\\) on both sides to cancel out the \\(-25\\)`
  },
  {
    title: "Review Question",
    text: `What should you do first to isolate the variable?
    $$
    2x^2=30
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{add}\\)', '\\(B) \\textup{subtract}\\)', '\\(C) \\textup{multiply}\\)', '\\(D) \\textup{divide}\\)', '\\(E) \\textup{take the square root}\\)'],
    answer: `\\(D) \\textup{divide}\\)`,
    solution: `<b>\\(D) \\textup{divide}\\)</b><p>We need to divide by \\(2\\) so that we can isolate \\(x\\) by removing its coefficient`,
  },
  {
    title: 'Review Question',
    text: `What should you do first to isolate the variable?
    $$
    14x+27=35
    $$`,
    type: 'mc',
    choices: ['\\(A) \\textup{add}\\)', '\\(B) \\textup{subtract}\\)', '\\(C) \\textup{multiply}\\)', '\\(D) \\textup{divide}\\)', '\\(E) \\textup{take the square root}\\)'],
    answer: '\\(B) \\textup{subtract}\\)',
    solution: `<b>\\(B) \\textup{subtract}\\)</b><p>We need to subtract \\(27\\) on both sides in order to cancel out the \\(27\\) and isolate \\(x\\)`
  },
  {
    title: "Review Question",
    text: `What do you need to add to complete the square?
    $$
    x^2+4x
    $$`,
    type: 'mc',
    choices: ['\\(A) 1\\)', '\\(B) 2\\)', '\\(C) 3\\)', '\\(D) 4\\)', '\\(E) 5\\)'],
    answer: '\\(D) 4\\)',
    solution: `<b>\\(D) 4\\)</b><p>We first divide the coefficient of \\(x\\), which is \\(4\\) by \\(2\\). This gives us \\(\\frac{4}{2}=2\\). We then square this to get \\(4\\). The new expression, \\(x^2+4x+4\\) can be factored into \\((x+2)(x+2)\)`,
  },
  {
    title: "Review Question",
    text: `What do you need to add to complete the square?
    $$
    x^2+6x
    $$`,
    type: 'mc',
    choices: ['\\(A) 1\\)', '\\(B) 3\\)', '\\(C) 5\\)', '\\(D) 7\\)', '\\(E) 9\\)'],
    answer: '\\(E) 9\\)',
    solution: `<b>\\(E) 9\\)</b><p>We divide \\(\\frac{6]{2}=3\\) and square that to get \\(9\\). The resulting expression \\(x^2+6x+3\\) can be factored as \\((x+3)^2\\)`,
  },
  {
    title: "Review Question",
    text: `What do you need to add to complete the square?
    $$
    x^2+2x
    $$`,
    type: 'mc',
    choices: ['\\(A) 0\\)', '\\(B) 1\\)', '\\(C) 2\\)', '\\(D) 3\\)', '\\(E) 4\\)'],
    answer: '\\(B) 1\\)',
    solution: `<b>\\(B) 1\\)</b><p>We divide \\(\\frac{2}{2}=1\\). We then square this to get \\(1\\). The new expression \\(x^2+2x+1\\) can be factored as \\((x+1)^2\\)`
  }
]
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const mcContainer = document.getElementById("mc-container");
const questionChoices = document.getElementById("mc-container")
let currentQuestion = 0
topicQ.forEach(i => {
    i.type = 'mc'
})
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
        equationsLevel: 'word problems'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Go to the next lesson: <a href='word problems learning path.html'>Word Problems</a>"
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