console.log("running")
// Main Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
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
let algebraLevel = "arithmetic"
let equationsLevel = "algebraic manipulation"
let functionsLevel = "functions and graphing"
let alternateSkillsLevel = "series"
//-----------------------Authentication--------------------------
async function loadUserStats(userId) {
  console.log("loading stats")
  const { data: profile, error } = await supabase
    .from('profiles')
   .select('id, username, algebraLevel, equationsLevel, functionsLevel, alternateSkillsLevel')
   .eq('id', userId)

  if (error) {
    console.error("Error downloading profile data:");
    return;
  }

  if (profile) {
    let userProfile = profile[0]
    console.log(userProfile.algebraLevel)
    document.getElementById("username-display").innerHTML = userProfile.username
    document.getElementById("btn-dashboard").innerHTML = userProfile.username
    algebraLevel = userProfile.algebraLevel || "arithmetic"
    equationsLevel = userProfile.equationsLevel || "algebraic manipulation"
    functionsLevel = userProfile.functionsLevel || "functions and graphing"
    alternateSkillsLevel = userProfile.alternateSkillsLevel || "series"
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
  algebraLevel = "arithmetic"
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
});
//-------------------------------Fininding Solutions (Nonlinear)------------------------------
const solutionTextWord = document.getElementById("solutionTextWord")
let graphOne = {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines',
    line: {color: '#88B0FF', width: 3}
}
let graphTwo = {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines',
    line: {color: '#ffb192', width: 3}
}
let exprString = 'x^2'
let exprStringTwo = 'x'
function drawGraphOne() {
    exprString = document.getElementById('eqInputOne').value;
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
            graphOne = {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#88B0FF', width: 3 }
        };
        const graphTitle = document.getElementById("twoGraphTitle")
        graphTitle.innerHTML = `Graph of \\(${exprString}\\) and \\(${exprStringTwo}\\)`
        MathJax.typesetPromise([graphTitle]).catch(()=>{})
        Plotly.newPlot('twoGraphPlot', [graphOne, graphTwo]);
        

    } catch (err) {
        console.error('Error occurred while evaluating the expression:', err);
    }
}
function drawGraphTwo() {
    exprStringTwo = document.getElementById('eqInputTwo').value;
    const xValues = [];
    const yValues = [];
      try {
        const expr = math.compile(exprStringTwo);

        for (let x = -10; x <= 10; x += 0.1) {
            let scope = { x: x };
            let y = expr.evaluate(scope);
            
            xValues.push(x);
            yValues.push(y);
        }
            graphTwo = {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#ffb192', width: 3 }
        };
        const graphTitle = document.getElementById("twoGraphTitle")
        graphTitle.innerHTML = `Graph of \\(${exprString}\\) and \\(${exprStringTwo}\\)`
        MathJax.typesetPromise([graphTitle]).catch(()=>{})
        Plotly.newPlot('twoGraphPlot', [graphOne, graphTwo]);
        

    } catch (err) {
        console.error('Error occurred while evaluating the expression:', err);
    }
}
let prereqOne = true
updateLesson()
function findSolution(){
   prereqOne = true
   updateLesson()
    console.log("clicked")
    const solutionsX = []
    const solutionsY = []
    const solutionSet = []
    let exprStringOne = document.getElementById("eqInputOne").value
    let exprStringTwoTwo = document.getElementById("eqInputTwo").value
        const exprSolve = math.compile(exprStringOne)
        const exprTwoSolve = math.compile(exprStringTwoTwo)
    for (let x= -50; x < 50; x += 0.01){
        console.log("running")
        let scope= { x: x}
        let yOne = exprSolve.evaluate(scope)
        let yTwo = exprTwoSolve.evaluate(scope)
        if (Math.abs(yOne - yTwo) < 0.01){
            solutionsX.push(Math.round((x*1000)) / 10000)
            let yOneRounded = Math.round((yOne * 10000)) / 10000
            solutionsY.push(Math.round(yOne))
            console.log(solutionsX)
        }
    }
    let index = 0
    solutionsX.forEach(i => {
        let push = `(${i}, ${solutionsY[index]})`
        solutionSet.push(push)
        index += 1
        console.log(solutionSet)
        console.log("operation done")
    })
    if (solutionsX.length === 0){
        console.log("no solutions")
        solutionTextWord.innerHTML = "No Solutions (notice that our simulation cannot always increment every solution and is not always accurate)"
    } else {
        solutionTextWord.innerHTML = `\\(${solutionSet}\\) (notice that our simulation cannot always increment every solution and is not always accurate)`
    }
    MathJax.typesetPromise([solutionTextWord]).catch(()=>{})
}
drawGraphOne()
drawGraphTwo()

//----------------------------Diophantine-----------------------------
const nonDiophantineEquation = document.getElementById("nonDiophantineEquation")
nonDiophantineEquation.innerHTML = '\\(x+y=10\\)'
MathJax.typesetPromise([nonDiophantineEquation]).catch(()=>{})
let nonDiophantineAnswer = 10;
const nonDiophantineInput = document.getElementById("nonDiophantineSlider")
const nonDiophantineOutput = document.getElementById("nonDiophantineOutput")
const nonDiophantineLabel = document.getElementById("nonDiophantineExampleLabel")
nonDiophantineLabel.innerHTML = '\\(x=\\)'
let prereqTwo = false
function updateSliders(){
   prereqTwo = true
   updateLesson()
    console.log("running")
    let xCont= parseFloat(nonDiophantineInput.value)
    nonDiophantineAnswer = 10 - xCont 
    nonDiophantineLabel.innerHTML = `\\(x=${xCont}\\)`
    nonDiophantineOutput.innerHTML = `\\(y=${nonDiophantineAnswer}\\)`
    MathJax.typesetPromise([nonDiophantineLabel]).catch(()=>{})
    MathJax.typesetPromise([nonDiophantineOutput]).catch(()=>{})
}
updateSliders()
nonDiophantineInput.addEventListener("input", updateSliders)

const diophantineEquation = document.getElementById("diophantineEquation")
diophantineEquation.innerHTML = '\\(x+y=10\\)'
MathJax.typesetPromise([diophantineEquation]).catch(()=>{})
let diophantineAnswer = 10;
const diophantineInput = document.getElementById("diophantineSlider")
const diophantineOutput = document.getElementById("diophantineOutput")
diophantineOutput.innerHTML = '\\(y=5\\)'
MathJax.typesetPromise([diophantineOutput]).catch(()=>{})
const diophantineLabel = document.getElementById("diophantineExampleLabel")
diophantineLabel.innerHTML = '\\(x=5\\)'
MathJax.typesetPromise([diophantineLabel]).catch(()=>{})
function updateStepSlider(){
    console.log("running")
    let xCont= parseFloat(diophantineInput.value)
    diophantineAnswer = 10 - xCont 
    diophantineLabel.innerHTML = `\\(x=${xCont}\\)`
    diophantineOutput.innerHTML = `\\(y=${diophantineAnswer}\\)`
    MathJax.typesetPromise([diophantineLabel]).catch(()=>{})
    MathJax.typesetPromise([diophantineOutput]).catch(()=>{})
}
updateSliders()
diophantineInput.addEventListener("input", updateStepSlider)
async function updateLesson() {
                        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return
  }

  const userId = session.user.id;
  console.log(prereqOne, prereqTwo)
        if ((prereqOne == true) && (prereqTwo == true)){
    const { data, error } = await supabase
    .from('profiles')
    .update({
        systemsOfEquationsLessonCompleted: true
    })
    .eq('id', userId)  
    }  
}
document.getElementById("eqInputOne").addEventListener("input", function() {
   drawGraphOne()
})
document.getElementById("eqInputTwo").addEventListener("input", function() {
   drawGraphTwo()
})
document.getElementById("findSolution").addEventListener('click', function() {
   findSolution()
})