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
function numeratorUpdate(){
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
function denominatorUpdate(){
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
function startChop() {
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



//--------------Final Question---------------
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const mcContainer = document.getElementById("mc-container");
const questionChoices = document.getElementById("mc-container")
let currentQuestion = 0
const topicQ = [
    {
        title: "Reivew Question",
        text: "Without using a calculator, which of the following is divisible by \\(7\\)?",
        type: 'mc',
        choices: ['\\(A) 2643\\)', '\\(B) 1265\\)', '\\(C) 254\\)', '\\(D) 1778\\)', '\\(E) 2854\\)'],
        answer: '\\(D) 1778\\)',
        solution: `<b>\\(D) 1778\\)</b><p>We can use the "chop" technique for checking divisibility by \\(7\\)</p>
        <p>\\(264 - (3 \\times 2) = 258\\)</p>
        <p>\\(26 - (4 \\times 2) = 9\\)</p>
        <p>\\(9\\) is not a multiple of \\(7\\) so \\(2643\\) is not a multiple of \\(7\\)</p>
        <p>\\(126-(5 \\times 2) = 116\\)</p>
        <p>\\(11 - (6 \\times 2) = -1\\)</p>
        <p>\\(-1\\) is not a multiple of \\(7\\) so \\(1265\\) is not a multiple of \\(7\\)</p>
        <p>\\(25 - (4 \\times 2) = 17\\)</p>
        <p>\\(17\\) is not a multiple of \\(7\\) so \\(254\\) is not a multiple of \\(7\\)</p>
        <p>\\(177 - (8 \\times 2) = 161\\)</p>
        <p>\\(16 - (1 \\times 2) = 14\\)</p>
        <p>\\(14\\) is a multiple of \\(7\\) so \\(1778\\) is a multiple of \\(7\\)</p>
        <p>\\(285 - (4 \\times 2) = 277\\)</p>
        <p>\\(27 - (7 \\times 2) = 13\\)</p>
        <p>\\(13\\) is not a multiple of \\(7\\) so \\(2854\\) is not a multiple of \\(7\\)`,
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
        text: "Which is NOT a representation of \\(0.75\\)?",
        type: 'mc',
        choices: ['\\(A) \\frac{3}{4}\\)', '\\(B) 4:3\\)', '\\(C) \\textup{three quarters}\\)', '\\(D) \\frac{75}{100}\\)', '\\(E) \\textup{a pie chart split into quarters with three filled}\\)'],
        answer: '\\(B) 4:3\\)',
        solution: `<b>\\(B) 4:3\\)</b><p>First, we start by representing as a fraction. We have \\(75\\) hundreths, or \\(\\frac{75}{100}=\\frac{3}{4}\\), which can also be written as \\(\\textup{three quarters}\\). Visually, this could
        be represented as a pie chart with three of four sections shaded. As a ratio, this would be \\(3:4\\) not \\(4:3\\)`,
    },
    {
        title: "Review Question",
        text: `<p>What kind of sequence is this?</p>
        $$
        1,2,4,8,16,32
        $$`,
        type: 'mc',
        choices: ['\\(A) \\textup{arithmetic}\\)', '\\(B) \\textup{geometric}\\)', '\\(C) \\textup{algebraic}\\)', '\\(D) \\textup{doubling}\\)', '\\(E) \\textup{series}\\)'],
        answer: '\\(B) \\textup{geometric}\\)',
        solution: `<b>\\(B) \\textup{geometric}\\)</b><p>A geometric sequence is one where each item is related to the prior through a common ratio. In this example, each 
        number is double the last. The common ratio is \\(2\\)</p>
        <p>This is not an arithmetic sequence because there is no common, constant difference. Algebraic, doubling, and series sequences do not exist in the context of arithmetic.`,
    },
    {
        title: "Review Question",
        text: `Which of the following is not a "basic operation" of arithmetic? `,
        choices: ['\\(A) \\textup{prime factorization}\\)', '\\(B) \\textup{subtraction}\\)', '\\(C) \\textup{multiplication}\\)', '\\(D) \\textup{division}\\)', '\\(E) \\textup{addition}\\)'],
        answer: '\\(A) \\textup{prime factorization}\\)',
        solution: '<b>\\(A) \\textup{prime factorization}\\)</b><p>Prime factorization is the only of these options that is not a main operation in arithmetic. It does not return one single real number per operation.</p>',
    },
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
        text: `What is \\(2643+2854\\)?`,
        type: 'mc',
        choices: ['\\(A) 5497\\)', '\\(B) 4497\\)', '\\(C) 4597\\)', '\\(4590\\)', '\\(D) 5590\\)'],
        answer: '\\(A) 5497\\)',
        solution: `<b>\\(A) 5497\\)</b><p>You can solve this with basic arithmetic and addition.</p>`
    },
    {
        title: "Review Question",
        text: "What is \\(81 \\div 3\\)?",
        type: 'mc',
        choices: ['\\(A) 9\\)', '\\(B) 6\\)', '\\(C) 54\\)', '\\(D) 25\\)', '\\(E) 27\\)'],
        answer: '\\(E) 27\\)',
        solution: `<b>\\(E) 27\\)</b><p>Solve through basic arithmetic and division</p>`,
    },
    {
        title: "Review Question",
        text: "Which of these numbers is divisible by \\(3\\)?",
        type: 'mc',
        choices: ['\\(A) 253\\)', '\\(B) 2254\\)', '\\(C) 2643\\)', '\\(D) 2854\\)', '\\(E) 3604\\)'],
        answer: `\\(C) 2643\\)`,
        solution: `<b>\\(C) 2643\\)</b><p>We check the sums of digits</p>
        <p>\\(2+5+3 = 10\\)</p>
        <p>\\(10\\) is not divisible by \\(3\\) so \\(253\\) is not divisible by \\(3\\)</p>
        <p>\\(2+2+5+4=13\\)</p>
        <p>\\(13\\) is not divisible by \\(3\\) so \\(2254\\) is not divisible by \\(3\\)</p>
        <p>\\(2+6+4+3=15\\)</p>
        <p>\\(15\\) is divisible by \\(3\\) so \\(2643\\) is divisible by \\(3\\)</p>
        <p>\\(2+8+5+4=19\\)</p>
        <p>\\(19\\) is not divisible by \\(3\\) so \\(2854\\) is not divisible by \\(3\\)</p>
        <p>\\(3+6+0+4=13\\)</p>
        <p>\\(13\\) is not divisible by \\(3\\) so \\(3604\\) is not divisible by \\(3\\)`
    },
    {
        title: "Review Question",
        text: "Which of these numbers is NOT divisible by \\(4\\)?",
        type: 'mc',
        choices: ['\\(A) 232\\)', '\\(B) 580\\)', '\\(C) 604\\)', '\\(D) 742\\)', '\\(E) 892\\)'],
        answer: '\\(D) 742\\)',
        solution: `<b>\\(D) 742\\)</b><p>We look at the last two digits of each number</p>
        <p>\\(32\\) is divisible by \\(4\\) so \\(232\\) is divisible by \\(4\\)</p>
        <p>\\(80\\) is divisible by \\(4\\) so \\(580\\) is divisible by \\(4\\)</p>
        <p>\\(4\\) is divisible by \\(4\\) so \\(604\\) is divisible by \\(4\\)</p>
        <p>\\(42\\) is not divisible by \\(4\\) so \\(742\\) is not divisible by \\(4\\)</p>
        <p>\\(92\\) is divisble by \\(4\\) so \\(892\\) is divisible by \\(4\\)`,
    },
    {
        title: "Review Question",
        text: "Which does not represent multiplication?",
        type: 'mc',
        choices: ['\\(A) \\times\\)', '\\(B) \\cdot\\)', '\\(C) *\\)', '\\(D) +\\)', '\\(E) (x)(y)\\)'],
        answer: '\\(D) +\\)',
        solution: `<b>\\(D) +\\)</b><p>Option \\(D\\) is a symbol for addition. All of the rest can be used to show multiplication for two numbers`,
    },
    {
        title: "Review Question",
        text: "Which key word does not indicate addition?",
        type: 'mc',
        choices:['\\(A) \\textup{each}\\)', '\\(B) \\textup{total}\\)', '\\(C) \\textup{sum}\\)', '\\(D) \\textup{combined}\\)', '\\(E) \\textup{alltogether}\\)'],
        answer: '\\(A) \\textup{each}\\)',
        solution: `<b>\\(A) \\textup{each}\\)</b><p>The keyword "each" represents division, where a quantity is divided evenly between parts, so that each part is equal. The rest represent a general collective indicative of addition.`,
    }, 
    {
        title: "Review Question",
        text: "Which key word does not indicate subtraction?",
        type: 'mc',
        choices: ['\\(A) \\textup{difference}\\)', '\\(B) \\textup{alltogether}\\)', '\\(C) \\textup{left over}\\)', '\\(D) \\textup{remaining}\\)', '\\(E) \\textup{remove}\\)'],
        answer: '\\(B) \\textup{alltogether}\\)',
        solution: `<b>\\(B) \\textup{alltogether}\\)</b><p>Alltogether is a keyword for addition. The rest indicate either taking something away or what is left when you take something away.</p>`,
    },
    {
        title: "Review Question",
        text: `Which key word does not indicate division?`,
        type: 'mc',
        choices: ['\\(A) \\textup{part}\\)', '\\(B) \\textup{over}\\)', '\\(C) \\textup{fraction}\\)', '\\(D) \\textup{portion}\\)', '\\(E) \\textup{area}\\)'],
        answer: `\\(E) \\textup{area}\\)`, 
        solution: `<b>\\(E) \\textup{area}\\)</b><p>Area represents multiplication because the formula involves multiplying base times height. The rest represent parts of a whole which are a key part of division`,
    },
    {
        title: "Review Question",
        text: `Which key word does not indicate multiplication?`,
        type: 'mc',
        choices: ['\\(A) \\textup{fraction}\\)', '\\(B) \\textup{area}\\)', '\\(C) \\textup{product}\\)', '\\(D) \\textup{proportional}\\)', '\\(E) \\textup{double}\\)'],
        answer: '\\(A) \\textup{fraction}\\)',
        solution: `<b>\\(A) \\textup{fraction}\\)</b><p>Fractions are a indication of division. The rest represent multiplication or repeated addition of a constant common difference.`,
    },
    {
        title: "Review Question",
        text: `<p>What kind of sequence is this?</p>
        $$
        1,4,7,10,13,16
        $$`,
        type: 'mc',
        choices: ['\\(A) \\textup{arithmetic}\\)', '\\(B) \\textup{geometric}\\)', '\\(C) \\textup{series}\\)', '\\(D) \\textup{mathematical}\\', '\\(E) \\textup{ascending}\\)'],
        answer: `\\(A) \\textup{arithmetic}\\)`,
        solution: `<b>\\(A) \\textup{arithmetic}\\)</b><p>The numbers in the sequence increase by a common difference of \\(3\\). This is characteristic of an arithmetic sequence</p>`,
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
        text: `What does the keyword "alltogether" indicate?`,
        type: 'mc',
        choices: ['\\(A) \\textup{addition}\\)', '\\(B) \\textup{subtraction}\\)', '\\(C) \\textup{multiplication}\\)', '\\(D) \\textup{division}\\)', '\\(E) \\textup{fractions}\\)'],
        answer: '\\(A) \\textup{addition}\\)',
        solution: `<b>\\(A) \\textup{addition}\\)</b><p>Alltogether implies a total collective of items, or a sum of items (addition).`,
    }
    
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
            if (topicQuestion.choices[i] !== null) {
            btn.textContent = topicQuestion.choices[i];
            btn.onclick = () => handleMCAnswer(topicQuestion.choices[i])
            } else {
                btn.style.display = "none"
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
        algebraLevel: 'systems of equations'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Go to the next lesson: <a href='systems of equations learning path.html'>Systems of Equations</a>"
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