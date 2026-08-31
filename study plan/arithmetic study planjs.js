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



// Main Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//------------Division Modeling-------------------
const numerator = document.getElementById("numerator")
const denominator = document.getElementById("denominator")
const fracLabel = document.getElementById("fracRepLabel")
const fracRepTwo = document.getElementById('fracRepTwo')
let numeratorVal = numerator.value
let denominatorVal = denominator.value
let prereqOne = false
function numeratorUpdate(){
   prereqOne = true
   updateLesson()
    document.getElementById("numeratorLabel").innerHTML = `Numerator: \\(${numerator.value}\\)`
    MathJax.typesetPromise([document.getElementById('numeratorLabel')]).catch(()=>{})
    numeratorVal = numerator.value
    fracLabel.innerHTML = `\\(${numeratorVal} \\div ${denominatorVal} = ${numeratorVal / denominatorVal}\\)`
    MathJax.typesetPromise([fracLabel]).catch(()=>{})
    fracRepTwo.innerHTML = `\\(\\frac{${numeratorVal}}{${denominatorVal}}\\)`
    MathJax.typesetPromise([fracRepTwo]).catch(()=>{})
    updatePieChart()
    updateRatio()

}
let prereqTwo = false
function denominatorUpdate(){
   prereqTwo = true
   updateLesson()
    document.getElementById("denominatorLabel").innerHTML = `Denominator: \\(${denominator.value}\\)`
    MathJax.typesetPromise([document.getElementById('denominatorLabel')]).catch(()=>{})
    denominatorVal = denominator.value
    fracLabel.innerHTML = `\\(${numeratorVal} \\div ${denominatorVal} = ${numeratorVal / denominatorVal}\\)`
    MathJax.typesetPromise([fracLabel]).catch(()=>{})
    fracRepTwo.innerHTML = `\\(\\frac{${numeratorVal}}{${denominatorVal}}\\)`
    MathJax.typesetPromise([fracRepTwo]).catch(()=>{})
    updatePieChart()
    updateRatio()
}
numerator.addEventListener("input", function(){
    numeratorUpdate()
})
denominator.addEventListener("input", function(){
    denominatorUpdate()
})
function updatePieChart() {
    const n = parseInt(document.getElementById("numerator").value);
    const d = parseInt(document.getElementById("denominator").value);
    const wedge = document.getElementById("pieWedge");
    
    // 1. Calculate the percentage and angle
    const percent = n / d;
    const angle = percent * 360;
    
    // 2. Math for the Arc Path
    // We start at the top (100, 20) and rotate clockwise
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    // Convert angle to radians
    const radians = (angle - 90) * Math.PI / 180.0;
    
    // Calculate the end point of the arc
    const x = centerX + (radius * Math.cos(radians));
    const y = centerY + (radius * Math.sin(radians));
    
    // If the fraction is more than 50%, the SVG needs a "large arc flag"
    const largeArcFlag = percent > 0.5 ? 1 : 0;
    
    // Create the "d" attribute for the path
    // M: Move to center, L: Line to top, A: Arc command, Z: Close path
    let dPath;
    if (percent >= 1) {
        // Just draw a full circle if fraction is 1/1 or more
        dPath = `M 100 100 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0`;
    } else {
        dPath = [
            "M", centerX, centerY,
            "L", centerX, centerY - radius,
            "A", radius, radius, 0, largeArcFlag, 1, x, y,
            "Z"
        ].join(" ");
    }
    
    wedge.setAttribute("d", dPath);
    
    // 3. Update the fraction label text
    if (window.MathJax) MathJax.typeset();
}

// Call this inside your existing update functions!
const ratio1 = document.getElementById("ratio1")
const ratio2 = document.getElementById("ratio2")
const ratio3 = document.getElementById("ratio3")
const ratio4 = document.getElementById("ratio4")
const ratio5 = document.getElementById("ratio5")
const ratio6 = document.getElementById("ratio6")
const ratio7 = document.getElementById("ratio7")
const ratio8 = document.getElementById("ratio8")
const ratio9 = document.getElementById("ratio9")
const ratio10 = document.getElementById("ratio10")
function updateRatio(){
        document.getElementById("ratioLabel").innerHTML = `\\(${numeratorVal}:${denominatorVal}\\)`
        MathJax.typesetPromise([document.getElementById("ratioLabel")]).catch(()=>{})
        if (numeratorVal == 1) {
                ratio2.style.display = "none"
                ratio3.style.display = "none"
                ratio4.style.display = "none"
                ratio5.style.display = "none"
        } else if (numeratorVal == 2){
                console.log(numeratorVal)
                ratio2.style.display = "inline-block"
                ratio3.style.display = "none"
                ratio4.style.display = "none"
                ratio5.style.display = "none"
        } else if (numeratorVal == 3){
                ratio2.style.display = "inline-block"
                ratio3.style.display = "inline-block"
                ratio4.style.display = "none"
                ratio5.style.display = "none"     
        } else if (numeratorVal == 4){
                ratio2.style.display = "inline-block"
                ratio3.style.display = "inline-block"
                ratio4.style.display = "inline-block"
                ratio5.style.display = "none"
        } else if (numeratorVal == 5){
                ratio2.style.display = "inline-block"
                ratio3.style.display = "inline-block"
                ratio4.style.display = "inline-block"
                ratio5.style.display = "inline-block"
        }
        
        if (denominatorVal == 1) {
                ratio7.style.display = "none"
                ratio8.style.display = "none"
                ratio9.style.display = "none"
                ratio10.style.display = "none"
        } else if (denominatorVal == 2){
                ratio7.style.display = "inline-block"
                ratio8.style.display = "none"
                ratio9.style.display = "none"
                ratio10.style.display = "none"
        } else if (denominatorVal == 3){
                ratio7.style.display = "inline-block"
                ratio8.style.display = "inline-block"
                ratio9.style.display = "none"
                ratio10.style.display = "none"     
        } else if (denominatorVal == 4){
                ratio7.style.display = "inline-block"
                ratio8.style.display = "inline-block"
                ratio9.style.display = "inline-block"
                ratio10.style.display = "none"
        } else if (denominatorVal == 5){
                ratio7.style.display = "inline-block"
                ratio8.style.display = "inline-block"
                ratio9.style.display = "inline-block"
                ratio10.style.display = "inline-block"
        }
}
updateRatio()
let prereqThree = false
const chop = document.getElementById("chop")
chop.addEventListener('click', function() {
   startChop()
})
function startChop() {
   prereqThree = true
   updateLesson()
    let numStr = document.getElementById("sevenInput").value;
    const display = document.getElementById("chopAnimation");
    display.innerHTML = ""; // Clear previous

    if (!numStr || numStr.length < 2) {
        display.innerHTML = "<p style='color: red; font-size: 1rem;'>Enter at least a 2-digit number!</p>";
        return;
    }

    runChopStep(numStr, display);
}

function runChopStep(numStr, display) {
    if (numStr.length < 2) {
        let finalNum = parseInt(numStr);
        let resultText = (finalNum % 7 === 0) ? 
            `<b style="color: var(--primary-color);">${finalNum} is divisible by 7</b>` : 
            `<b style="color: var(--accent-color);">${finalNum} is not divisible by 7.</b>`;
        display.innerHTML += `<p>${resultText}</p>`;
        return;
    }

    // 1. Separate the last digit
    let rest = numStr.slice(0, -1);
    let lastDigit = numStr.slice(-1);
    let doubled = parseInt(lastDigit) * 2;
    let newNum = parseInt(rest) - doubled;

    // 2. Create the visual "Chop"
    let stepHtml = document.createElement("div");
    stepHtml.style.marginBottom = "15px";
    stepHtml.innerHTML = `
        <span style="color: #88B0FF;">${rest}</span><span style="color: var(--accent-color); text-decoration: line-through;">${lastDigit}</span> 
        <span style="font-size: 1rem;"> → (${lastDigit} × 2 = ${doubled})</span><br>
        <span>${rest} - ${doubled} = <b>${newNum}</b></span>
    `;
    display.appendChild(stepHtml);

    // 3. Pause, then do it again if the number is still large
    if (newNum > 99 || newNum < -99) {
        setTimeout(() => runChopStep(newNum.toString(), display), 1500);
    } else {
        setTimeout(() => {
            let isDiv = newNum % 7 === 0;
            display.innerHTML += `<p>${newNum} is ${isDiv ? "" : "not"} a multiple of 7</p>`;
        }, 1000);
    }
}
function trachtenberg12(inputNum) {
    let numStr = "0" + inputNum; // Always pad with a leading zero
    let result = "";
    let carry = 0;
    let steps = [];

    // Loop from right to left
    for (let i = numStr.length - 1; i >= 0; i--) {
        let current = parseInt(numStr[i]);
        let neighbor = (i === numStr.length - 1) ? 0 : parseInt(numStr[i + 1]);
        
        // The Rule: (Double the digit) + neighbor + any carry from previous step
        let work = (current * 2) + neighbor + carry;
        
        // Calculate the digit to write down and the new carry
        let digitToWrite = work % 10;
        carry = Math.floor(work / 10);
        
        result = digitToWrite.toString() + result;

        // Save the step for your UI animation
        steps.push({
            digit: current,
            neighbor: neighbor,
            calculation: `(${current} × 2) + ${neighbor} + carry(${carry > 0 ? carry : 0})`,
            resultSoFar: result
        });
    }

    // Clean up: remove leading zero if it exists
    if (result.startsWith("0")) result = result.substring(1);

    return { finalAnswer: result, process: steps };
}async function showTrachtenberg12() {
    const num = document.getElementById("trachInput").value;
    const output = document.getElementById("trachSteps");
    const data = trachtenberg12(num);
    
    output.innerHTML = ""; // Clear old steps

    for (let step of data.process) {
        let div = document.createElement("div");
        div.className = "trach-step-card";
        div.innerHTML = `
            <p>Scanning digit <b>${step.digit}</b>...</p>
            <code>${step.calculation} = ${step.resultSoFar[0]}</code>
            <p>Current Result: <b>${step.resultSoFar}</b></p>
        `;
        output.prepend(div); // Add newest step to the top
        await new Promise(r => setTimeout(r, 800)); // Animation pause
    }
}


async function updateLesson() {
                        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return
  }
  console.log(prereqOne, prereqTwo, prereqThree)

  const userId = session.user.id;
        if ((prereqOne == true) && (prereqTwo == true) && (prereqThree == true)){
    const { data, error } = await supabase
    .from('profiles')
    .update({
        arithmeticLessonCompleted: true
    })
    .eq('id', userId)  
    }  
}