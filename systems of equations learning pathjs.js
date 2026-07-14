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
function findSolution(){
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
function updateSliders(){
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

//--------------Final Question---------------
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const mcContainer = document.getElementById("mc-container");
const questionChoices = document.getElementById("mc-container")
let currentQuestion = 0
const topicQ = [
        {
                title: "Review Question",
                text: `Which method should you use to solve this system of equations most effectively?
                $$
                y=5x+2
                $$
                $$
                y=3x+4
                $$
                `,
                type: 'mc',
                choices: ['\\(A) \\textup{addition}\\)', '\\(B) \\textup{graphing}\\)', '\\(C) \\textup{substitution}\\)', '\\(D) \\textup{distributive property}\\)', '\\(E) \\textup{lol good question}\\)'],
                answer: '\\(C) \\textup{substitution}\\)',
                solution: `<b>\\(C) \\textup{substitution}\\)</b><p>You can actually substitute really easily and quickly in this system. Both expressions indicate \\(y\\), so we can just solve \\(3x+4=5x+2\\) for \\(x\\) by substituting the values for \\(y\\).`

        },
        {
                title: "Review Question",
                text: `Which method should you use to solve this system equations most effectively?
                $$
                2x+3y=10
                $$
                $$
                -2x+5y=18
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{addition}\\)', '\\(B) \\textup{graphing}\\)', '\\(C) \\textup{substitution}\\)', '\\(D) \\textup{distributive property}\\)', '\\(E) \\textup{lol good question}\\)'],
                answer: `\\(A) \\textup{addition}\\)`,
                solution: `<b>\\(A) \\textup{addition}\\)</b><p>We see that one equation includes \\(2x\\) and the other \\(-2x\\). Adding these would cancel them out and lead to an equation with only one variable (\\(y\\)) that you can easily solve for`,
        },
        {
                title: "Review Question",
                text: `What should your first step be in solving this system of equations by addition/subtraction?
                $$
                3x+4y=10
                $$
                $$
                2x-2y=15
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{Multiply the second equation by -2}\\)', '\\(B) \\textup{subtract the equations}\\)', '\\(C) \\textup{Isolate }x\\)', '\\(D) \\textup{Isolate }y\\)', '\\(E) \\textup{Subtract 2y from one side of the second equation}\\)'],
                answer: '\\(A) \\textup{Multiply the second equation by -2}\\)',
                solution: `<b>\\(A) \\textup{Multiply the second equation by -2}\\)</b><p>We see coefficients of \\(4\\) and \\(-2\\) for \\(y\\). If we multiply the entirety of equation \\((2)\\) by \\(2\\), \\(y\\) will have a coefficient of \\(-4\\). This will allow us to cancelt out \\(y\\) by addition`
        },
        {
                title: "Review Question",
                text: `What should your first step be in solving this system of equations by substitution?
                $$
                x^2+2x+4=y
                $$
                $$
                x+y=1
                $$
                `,
                type: 'mc',
                choices:['\\(A) \\textup{square the second equation}\\)', '\\(B) \\textup{Subtract } x \\textup{ from both sides of the second equtaion}\\)', '\\(C) \\textup{Substitute } x^2+2x+4 \\textup{ for } y \\textup{ in the second equation}\\)', '\\(D) \\textup{Substitute } x+y \\textup{ for } y \\textup{ in the first equation.}\\)', '\\(E) \\textup{Graph the equations}\\)'],
                answer: `\\(C) \\textup{Substitute } x^2+2x+4 \\textup{ for } y \\textup{ in the second equation}\\)`,
                solution: `<b>\\(C) \\textup{Substitute } x^2+2x+4 \\textup{ for } y \\textup{ in the second equation}\\)</b><p>We already see \\(y\\) isolated on one side of the first equation, so we can easily substitute that into the second equation.`
        },
        {
                title: "Review Question",
                text: `What should your first step be in solving this system of equations by graphing?
                $$
                y=10x+5
                $$
                $$
                10+y=3x
                $$`,
                type: 'mc',
                choices: [`\\(A) \\textup{Substitute } 10x+5 \\textup{ for } y \\textup{ in the second equation}\\)`, '\\(B) \\textup{Subtract equation 1 from equation 2}\\)', '\\(C) \\textup{Graph a line through the origin}\\)', '\\(D) \\textup{Identify the y-intercepts}\\)', '\\(E) \\textup{See where they intersect}\\)'],
                answer: '\\(D) \\textup{Identify the y-intercepts}\\)',
                solution: `<b>\\(D) \\textup{Identify the y-intercepts}\\)</b><p>Typically, when graphing linear equations, we start at the \\(y\\)-intercept and identify the points nearby using \\(\\frac{rise}{run}\\)`,
        },
        {
                title: "Review Question",
                text: `What should your first step be in solving this system by addition/subtraction?
                $$
                10x+25y=10
                $$
                $$
                10y+5x=7
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{Subtract 3 from both sides of the first equation}\\)', '\\(B) \\textup{Isolate } y { in both equations }\\)', '\\(C) \\textup{Isolate } x { in both equations}\\)', '\\(D) \\textup{Subtract equation 2 from equation 1}\\)', '\\(E) \\textup{Divide the first equation by 2}\\)'],
                answer: '\\(E) \\textup{Divide the first equation by 2}\\)',
                solution: `<b>\\(E) \\textup{Divide the first equation by 2}\\)</b><p>We want to ensure that the variables have matching coefficients. We see that \\(x\\) has coefficients of \\(10\\) and \\(5\\). If we divide the first equation by \\(2\\), \\(x\\) will have a coefficient of \\(5\\) and we can subtract acoordingly`,
        },
        {
                title: "Review Question",
                text: `What should your first steb be in solving this system by substitution?
                $$
                10x+5y=1
                $$
                $$
                3x+7y=1
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{Substitute } 3x+7y { for } 1 { in the first equation}\\)', '\\(B) \\textup{Multiply the first equation by \\(7\\) on both sides\\)', '\\(C) \\textup{Find the y-intercept of the second equation}\\)', '\\(D) \\textup{Find the value of } x+y\\)', '\\(E) \\textup{Isolate a variable in either equation}\\)'],
                answer: '\\(E) \\textup{Isolate a variable in either equation}\\)',
                solution: `<b>\\(E) \\textup{Isolate a variable in either equation}\\)</b><p>The point of substitution is to find one variable as a function of the other. You do this by isolating a variable so that you can substitute it into the other equation</p>`

        },
        {
                title: "Review Question",
                text: `How many solutions does the system of equations have?
                $$
                y=10x+12
                $$
                $$
                y=10x+5
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infiinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 2\\)', '\\(E) 3\\)'],
                answer: '\\(B) 0\\)',
                solution: `<b>\\(B) 0\\)</b><p>The equations have the same slope and different y-intercepts. This means they are parallel and will never meet, and thus have no solutions.</p>`
                
        },
        {
                title: "Review Question",
                text: `How many solutions does the system of equations have?
                $$
                y=2x+6
                $$
                $$
                y=4x+3
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infiinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 2\\)', '\\(E) 3\\)'],
                answer: `\\(C) 1\\)`,
                solution: `<b>\\(C) 1\\)</b><p>The equations have different \\(y-\\)intercepts and slopes, therefore, as lines that extend infinitely, they must intersect somewhere.`
        },
        {
                title: "Review Question",
                text: `How many solutions does the system of equations have?
                $$
                x^2+2x+4=y
                $$
                $$
                x=y
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infiinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 2\\)', '\\(E) 3\\)'],
                answer: `\\(B) 0\\)`,
                solution: `<b>\\(B) 0\\)</b><p>We can substitute \\(y\\) for \\(x\\) and find \\(y^2+2y+4=y\\). We rearrange such that \\(y^2+4=-y\\). We know \\(y\\) must be negative, or else \\(y^2+4\\) would need to be negative, which is not possible. However, we know that \\(x^2+2x+4\\) will never be negative (you can graph, or just realize \\(x^2+4>2x\\) always) so, there are no solutions.</p>
                <p>Another potential solution could be to graph these equations and see that they do not intersect at all</p>`,
        },
        {
                title: "Review Question",
                text: `How many solutions does the system of equation have?
                $$
                x^2+2x=y
                $$
                $$
                2x=y
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infiinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 2\\)', '\\(E) 3\\)'],
                answer: `\\(C) 1\\)`,
                solution: `<b>\\(C) 1\\)</b><p>We substitute \\(2x\\) in for \\(y\\). This gives us \\(x^2+2x=2x\\). Subtracting \\(2x\\) on either side gives \\(x^2=0\\), for \\(x=0\\)`,
        },
        {
                title: "Review Question",
                text: `Solve the system of equations
                $$
                2x+6y=26
                $$
                $$
                4x+3y=34
                $$`,
                type: 'mc',
                choices: ['\\(A) (6,7)\\)', '\\(B) (8,7)\\)', '\\(C) (8,3\\)', '\\(D) (6,3)', '\\(E) (7,2)\\)'],
                answer: '\\(E) (7,3)\\)',
                solution: `<b>\\(E (7,2)\\)</b><p>We multiply the first equation by \\(-2\\) so that the coefficients of \\(x\\) have an absolute value of \\(4\\), and then we add. This gives us \\(-9y=-18\\) so \\(y=2\\). Solving for \\(x\\) gives us \\(x=7\\)`,
        },
        {
                title: "Review Question",
                text: `Solve the system of equations
                $$
                x^2+2x=y
                $$
                $$
                2x=y
                $$`,
                type: 'mc',
                choices: ['\\(A) (0,0)\\)', '\\(B) (1,3)\\)', '\\(C) (1,2)\\)', '\\(D) (3,6)\\)', '\\(E) (4,4)\\)'],
                answer: '\\(A) (0,0)\\)',
                solution: `<b>\\(A) (0,0)\\)</b><p>We substitute \\(2x\\) for \\(y\\) and get \\(x^2+2x=2x\\). This gives us \\(x^2=0\\) for a result of \\(x=0\\). Substituting, of course, gives \\(y=0\\) for an ordered pair \\((0,0)\\)`
        },
        {
                title: "Review Question",
                text: `Solve the system of equations
                $$
                x^2+2x+4=y
                $$
                $$
                x=y
                $$`,
                type: 'mc',
                choices: ['\\(A) (0,0)\\)', '\\(B) (1,3)\\)', '\\(C) (1,2)\\)', '\\(D) (3,6)\\)', '\\(E) \\textup{no solutions}\\)'],
                answer: '\\(E) \\textup{no solutions}\\)',
                solution: `<b>\\(E) \\textup{no solutions}\\)</b>><p>We can substitute \\(y\\) for \\(x\\) and find \\(y^2+2y+4=y\\). We rearrange such that \\(y^2+4=-y\\). We know \\(y\\) must be negative, or else \\(y^2+4\\) would need to be negative, which is not possible. However, we know that \\(x^2+2x+4\\) will never be negative (you can graph, or just realize \\(x^2+4>2x\\) always) so, there are no solutions.</p>
                <p>Another potential solution could be to graph these equations and see that they do not intersect at all</p>`
        },
        {
                title: "Review Question",
                text: `How many solutions does this equation have if \\(x\\) and \\(y\\) are both real numbers?
                $$
                x+y=10
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 5\\)', '\\(E) 10\\)'],
                answer: '\\(A) \\textup{infinitely many}\\)',
                solution: `<b>\\(A) \\textup{infinitely many}\\)</b><p>There are an infinite number of real numbers, and for each of those, there exists another real number that we can add to it that makes the product \\(10\\)</p>`
        },
        {
  title: "Review Question",
                text: `How many solutions does this equation have if \\(x\\) and \\(y\\) are both non-negative integers?
                $$
                x+y=10
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 5\\)', '\\(E) 11\\)'],
                answer: '\\(E) 10\\)',
                solution: `<b>\\(E) 10\\)</b><p>The possible values for \\(x\\) are \\(0,1,2,3,4,5,6,7,8,9,10\\) and likewise for \\(y\\), each in pairs. This gives \\(11\\) possible values.</p>`
        },
        {
                title: "Review Question",
                text: `How many solutions does this equation have if \\(x\\) and \\(y\\) are both real numbers?
                $$
                x+y=5
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 5\\)', '\\(E) 10\\)'],
                answer: '\\(A) \\textup{infinitely many}\\)',
                solution: `<b>\\(A) \\textup{infinitely many}\\)</b><p>There are an infinite number of real numbers, and for each of those, there exists another real number that we can add to it that makes the product \\(5\\)</p>`

        },        
        {
                title: "Review Question",
                text: `How many solutions does this equation have if \\(x\\) and \\(y\\) are both non-negative integers?
                $$
                x+y=5
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 6\\)', '\\(E) 11\\)'],
                answer: '\\(D) 6\\)',
                solution: `<b>\\(E) 10\\)</b><p>The possible values for \\(x\\) are \\(0,1,2,3,4,5\\) and likewise for \\(y\\), each in pairs. This gives \\(6\\) possible values.</p>`
        },
        {
                title: "Review Question",
                text: `How many solutions does this equation have if \\(x\\) and \\(y\\) are both real numbers?
                $$
                x+y=20
                $$`,
                type: 'mc',
                choices: ['\\(A) \\textup{infinitely many}\\)', '\\(B) 0\\)', '\\(C) 1\\)', '\\(D) 5\\)', '\\(E) 10\\)'],
                answer: '\\(A) \\textup{infinitely many}\\)',
                solution: `<b>\\(A) \\textup{infinitely many}\\)</b><p>There are an infinite number of real numbers, and for each of those, there exists another real number that we can add to it that makes the product \\(5\\)</p>`

        },  
        
]
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
        algebraLevel: 'choose your path'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Go to the next lesson: <a href='algebraic manipulation learning path.html'>Algebraic Manipulation</a>"
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