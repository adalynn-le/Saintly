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



//------------------------Linear Equations-------------------
let xInput = "1"
let yInput = "0"
function updateTrace() {
    // 1. Get values from 
    // input fields
     xInput = document.getElementById('slope').value;
     yInput = document.getElementById('yIntercept').value;
     if (xInput == ""){
        xInput = "1"
     }
     if (yInput == ""){
        yInput = "0"
     }

    // 2. Convert string input into arrays (e.g., "5, 6" -> [5, 6])
    const newYArray = [parseInt(yInput), (parseInt(yInput)+parseInt(xInput))]
    const newXArray = [0,1]
    for (let i=2; i<100; i++){
        newYArray.push((parseInt(yInput))+(parseInt(xInput) * i))
        newXArray.push(i)
    }
    
    // 3. Update the plot efficiently
    // Note: Restyle expects nested arrays for x/y data updates
    var data = {
        x: [newXArray],
        y: [newYArray],
        type: 'scatter',
        line: {color: '#88B0FF'}
    };
    Plotly.restyle('myDiv', data)
    
}
document.getElementById("slope").addEventListener("input", updateTrace)
document.getElementById("yIntercept").addEventListener("input", updateTrace)
var trace1 = {
  x: [0, 100],
  y: [0,100],
  type: 'scatter',
  line: {color: '#88B0FF'}
};


var set = [trace1];

Plotly.newPlot('myDiv', set);



const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

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
//------------------------Quadratic------------------------
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.quadraticCurveTo(110, 250, 200, 20);
ctx.stroke();

//------------------------Exponential----------------------
let b = 2
let xArray = []
let yArray = []
var exponentsPlot = {
        x: [],
        y: [],
        type: 'scatter'
        
}
for (let i = 0; i < 11; i+= 0.001){
        let y = (b ** i)
        xArray.push(i)
        yArray.push(y)
        exponentsPlot = {
                x: xArray,
                y: yArray,
                type: 'scatter',
                line: {color: '#88B0FF'}
        }
}
var setTwo = exponentsPlot
Plotly.newPlot('exponentialGraph', [setTwo])
let trace = {
        x: [],
        y: [],
        type: 'scatter',
                    mode: 'lines',
            line: { color: '#88B0FF', width: 3 }
}



//-----------------------------Inverse-------------------------------
function drawGraph() {
    const exprString = document.getElementById('eqInput').value;
    
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

        trace = {
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
        
        const graphTitle = document.getElementById("graphTitle")
        graphTitle.innerHTML = `Graph of \\(${exprString}\\)`
        MathJax.typesetPromise([graphTitle]).catch(()=>{})
        Plotly.newPlot('graphPlot', [trace], layout);
        
    } catch (err) {
    }
}
const inverse = document.getElementById('inverseBtn')
inverse.addEventListener("click", function(){
        const yNew = []
        const traceX = trace.x.map(value => value)
        traceX.forEach(i => {
        yNew.push(i)
        })
        const xNew = []
        const traceY = trace.y.map(value => value)
        traceY.forEach(i => {
                xNew.push(i)
        })
        let inverse = {
                x: xNew,
                y: yNew,
                type: 'scatter',
                mode: 'lines',
                name: 'inverse'
        }
        const dottedX = []
        const dottedY = []
        for (let i = 0; i < 100; i++){
             dottedX.push(i)
             dottedY.push(i)   
        }
        let dottedLine = {
                x: dottedX,
                y: dottedY,
                type: 'scatter',
                line: {dash: 'dot', color: '#5D5D66' },
                mode: 'lines',
                name: 'line of reflection',
        }
        var layout = {
  yaxis: {
    scaleanchor: "x",
    scaleratio: 1
  }
};


        var inverted = [trace, inverse, dottedLine]
        Plotly.newPlot('graphPlot', inverted, layout)
})
drawGraph();


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


//------------------Floor Function--------------------
let floorTrace = {
        x: [],
        y: [],
        type: 'scatter'
}
function drawFloor() {
    const exprString = document.getElementById('floorInput').value;
    
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

        floorTrace = {
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
        
        const graphTitle = document.getElementById("floorTitle")
        graphTitle.innerHTML = `Graph of \\(${exprString}\\)`
        MathJax.typesetPromise([graphTitle]).catch(()=>{})
        Plotly.newPlot('floorPlot', [floorTrace], layout);
        
    } catch (err) {
    }
}
document.getElementById("floorBtn").addEventListener("click", function(){
const traceY = floorTrace.y.map(value => value)
const traceX = floorTrace.x.map(value => value)
const newY = []
traceY.forEach(i => {
        let replace = Math.floor(i)
        newY.push(replace)

})
        var floorTraced = {
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
        let data = [floorTrace, floorTraced]
        Plotly.newPlot('floorPlot', data, layout)
})
drawFloor()

//--------------Final Question---------------
let currentQuestion = 0
const mcChoices = Array.from(document.querySelectorAll(".mc-choice"))
const mcContainer = document.getElementById("mc-container");
const questionChoices = document.getElementById("mc-container")
const topicQ = [
    {
        title: "Review Question",
        text: `Which function would produce a straight line?`,
        type: 'mc',
        choices: ['\\(A) y=x\\)', '\\(B) y=x^2\\)', '\\(C) y=\\textup{sin}(x)\\)', '\\(D) y=\\textup{log}(x)\\)', '\\(E) y=2^x\\)'],
        answer: '\\(A) y=x\\)',
        solution: `<b>\\(A) y=x\\)</b><p>This is the linear function. For every increase of \\(a\\) in \\(x\\), \\(y\\) also increases by \\(a\\)`,
    },
    {
        title: "Review Question",
        text: `Which function would produce a parabola?`,
        type: 'mc',
        choices: ['\\(A) y=x\\)', '\\(B) y=x^2\\)', '\\(C) y=\\textup{sin}(x)\\)', '\\(D) y=\\textup{log}(x)\\)', '\\(E) y=2^x\\)'],
        answer: '\\(B) y=x^2\\)',
        solution: `<b>\\(B) y=x^2\\)</b><p>This is a quadratic equation. It produces a U-shaped graph with rapidly increasing slopes (exponential growth) called a parabola`,
    },
    {
        title: "Review Question",
        text: `Which function would produce a wave?`,
        type: 'mc',
        choices: ['\\(A) y=x\\)', '\\(B) y=x^2\\)', '\\(C) y=\\textup{sin}(x)\\)', '\\(D) y=\\textup{log}(x)\\)', '\\(E) y=2^x\\)'],
        answer: '\\(C) y=\\textup{sin}(x)\\)',
        solution: `<b>\\(C) y=\\textup{sin}(x)\\)</b><p>Trigonometric functions cause oscillating movemenet because their values go around the unit circle. Both sine and cosine functions form waves.`,
    },
    {
        title: "Review Question",
        text: `Which function would produce a sideways-"half parabola" with a slope that starts fast but slows down?`,
        type: 'mc',
        choices: ['\\(A) y=x\\)', '\\(B) y=x^2\\)', '\\(C) y=\\textup{sin}(x)\\)', '\\(D) y=\\textup{log}(x)\\)', '\\(E) y=2^x\\)'],
        answer: `\\(D) y=\\textup{log}(x)\\)`,
        solution: `<b>\\(D) y=\\textup{log}(x)\\)</b><p>A logarithmic function isn't exactly a sideways parabola, it's a sideways exponential graph. It's slope decreases over time. It's the inverse of \\(10^x\\)</p>`,
    },
    {
        title: "Review Question",
        text: `Which function would produce an exponential grpah that's slope gets significantly larger over time?`,
        type: 'mc',
        choices: ['\\(A) y=x\\)', '\\(B) y=x^2\\)', '\\(C) y=\\textup{sin}(x)\\)', '\\(D) y=\\textup{log}(x)\\)', '\\(E) y=2^x\\)'],
        answer: '\\(E) y=2^x\\)',
        solution: `<b>\\(E) y=2^x\\)</b><p>This is an exponential graph. It models exponential and rapid, uncontrolled growth</p>`
    },
    {
        title: "Review Question",
        text: `Which of these is standard form for a quadratic function?`,
        type: 'mc',
        choices: ['\\(A) ax^2+bx+c\\)', '\\(B) (x-h)^2+k\\)', '\\(C) (x-z)(x-q)\\)', '\\(D) \\(\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)'],
        answer: '\\(A) ax^2+bx+c\\)',
        solution: `<b>\\(A) ax^2+bx+c\\)</b><p>This is the standard form. It allows us to easily see \\(a, b\\) and \\(c\\) to use the quadratic equation</p>`,
    },
    {
        title: "Review Question",
        text: `Which of these is vertex form for a quadratic function?`,
        type: 'mc',
        choices: ['\\(A) ax^2+bx+c\\)', '\\(B) (x-h)^2+k\\)', '\\(C) (x-z)(x-q)\\)', '\\(D) \\(\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)'],
        answer: '\\(B) (x-h)^2+k\\)',
        solution: `<b>\\(B) (x-h)^2+k\\)</b><p>This is the vertex form of a quadratic equation. It allows us to find the vertex, the minimum or maximum, by using the coordinates \\((h, k)\\) You can reach vertex form by completing the square`,
    },
    {
        title: "Review Question",
        text: `Which of these is factored form for a quadratic function?`,
        type: 'mc',
        choices: ['\\(A) f(x)=ax^2+bx+c\\)', '\\(B) (x-h)^2+k\\)', '\\(C) (x-z)(x-q)\\)', '\\(D) \\(\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)'],
        answer: '\\(C) (x-z)(x-q)\\)',
        solution: `<b>\\(C) (x-z)(x-q)\\)</b><p>This is factored form, which allows us to see the roots of a quadratic function. The roots are \\(z\\) and \\(q\\). You need to factor the standard form equation to reach this.`,
    },
    {
        title: "Review Question",
        text: "Which is the quadratic equation?",
        type: 'mc',
        choices: ['\\(A) f(x)=ax^2+bx+c\\)', '\\(B) (x-h)^2+k\\)', '\\(C) (x-z)(x-q)\\)', '\\(D) \\(\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)'],
        answer: '\\(D) \\(\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)',
        solution: `<b>\\(D) \\(\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\)</b><p>This is the quadratic equation. You can plug in variables from the standard form equation to solve for possible roots. This is particularly helpful for non-integer roots</p>`,
    },
    {
        title: "Review Question",
        text: `What are the roots of this function?
        $$
        x^2+7x-8
        $$`,
        type: 'mc',
        choices: ['\\(A) (-8, -7)\\)', '\\(B) (-8, 1)\\)', '\\(C) (-1,8)\\)', '\\(D) (1, 8)\\)', '\\(E) (7, 8)\\)'],
        answer: '\\(B) (-8, 1)\\)',
        solution: `<b>\\(B) (-8, 1)\\)</b><p>We are looking for values of \\(a\\) and \\(b\\) such that \\(a \\times b = -8\\) and \\(a+b=7\\). The factor pairs of \\(-8\\) are \\((-8,1), (-4,2), (-2,4), (-1,8)\\). The only one of these that sums to \\(7\\) is \\((-1, 8)\\). We thus
        have a factored form \\((x-1)(x+8)\\) for roots of \\(-8\\) and \\(1\\)`
    },
    {
      title: "Review Question",
      text: `What is the vertex of this function?
      $$
      x^2+8x+10
      $$`,
      type: 'mc',
      choices: ['\\(A) (-8, 10\\)', '\\(B) (-4, 10)\\)', '\\(C) (4, -6)\\)', '\\(D) (-6, 4)\\)', '\\(E) (-4, -6)\\)'],
      answer: '\\(E) (-4, -6)\\)',
      solution: `<b>\\(E) (-4, 6)\\)</b><p>We complete the square first by dividing \\(\\frac{8}{2}\\) and finding \\(x^2+8x+16=(x+4)(x+4)\\). However, since we add \\(16\\) to get \\((x+4)^2\\), we also must subtract it. This gives us \\((x+4)^2-6\\) for vertex \\((-4,-6)\\)`,
    },
    {
      title: "Review Question",
      text: `What is the vertex of this function?
      $$
      2x^2+8x+6
      $$`,
      type: 'mc',
      choices: ['\\(A) (-8,6)\\)', '\\(B) (-6,8\\)', '\\(C) (-2, -2)\\)', '\\(D) (-2, 2)\\)', '\\(E) (6, 8)\\)'],
      answer: '\\(C) (-2, -2)\\)',
      solution: `<b></b>
      $$
      2(x^2+4x)+6
      $$
      $$
      2((x+2)^2-4)+6
      $$
      $$
      (x+2)^2-2
      $$
      $$
      (-2,-2)
      $$`
    },
    {
      title: "Review Question",
      text: `What is the slope of this function?
      $$
      y=2x+4
      $$`,
      type: 'mc',
      choices: ['\\(A) 2\\)', '\\(B) 6\\)', '\\(C) 4\\)', '\\(D) 3\\)'],
      answer: `\\(A) 2\\)`,
      solution: `<b>\\(A) 2\\)</b><p>The coefficient of \\(x\\) is \\(2\\)`,
    },
    {
      title: 'Review Question',
      text: `What is the y-intercept of this function?
      $$
      y=2x+4
      $$`,
      type: 'mc',
      choices: ['\\(A) 2\\)', '\\(B) 6\\)', '\\(C) 4\\)', '\\(D) 3\\)'],
      answer: '\\(C) 4\\)',
      solution: `<b>\\(C) 4\\)</b><p>The constant term is \\(4\\)`,
    },
    {
      title: "Review Question",
      text: `What is the independent variable in this function?
      $$
      y=2x+4
      $$`,
      type: 'mc',
      choices: ['\\(A) x\\)', '\\(B) y\\)'],
      answer: '\\(A) x\\)',
      solution: `<b>\\(A) x\\)</b><p>Generally speaking, \\(x\\) is always the independent variable. Note also that \\(y\\) is isolated and computed with regards to \\(x\\)`
    },
    {
      title: "Review Question",
      text: `What transformation is being applied to the parent function of this graph?
      $$
      y=-x^2
      $$`,
      type: 'mc',
      choices: ['\\(A) \\textup{translation of -1 units horizontally}\\)', '\\(B) \\textup{translation of -1 units vertically}\\)', '\\(C) \\textup{Scaled by k=2}\\)', '\\(D) \\textup{Reflection over the x-axis}\\)', '\\(E) \\textup{Reflection over the y-axis}\\)'],
      answer: '\\(D) \\textup{Reflection over the x-axis}\\)',
      solution: `<b>\\(D) \\textup{Reflection over the x-axis}\\)</b><p>\\(x\\) is multiplied by a coefficient of \\(-1\\), which reflects it over the x-axis, because each y value has its sign switched</p>`,
    },
    {
      title: "Review Question",
      text: `What transformation is being applied to the parent function of this graph?
      $$
      y=\\textup{log}(x)+5
      $$`,
      type: 'mc',
      choices: ['\\(A) \\textup{translation of 5 units horizontally}\\)', '\\(B) \\textup{translation of 5 units vertically}\\)', '\\(C) \\textup{Scaled by k=5}\\)', '\\(D) \\textup{Reflection over the x-axis}\\)', '\\(E) \\textup{Reflection over the y-axis}\\)'],
      answer: '\\(B) \\textup{translation of 5 units vertically}\\)',
      solution: `<b>\\(B) \\textup{translation of 5 units vertically}\\)</b><p>We add \\(5\\) to any produced \\(y\\) value from the parent equation, shifting it \\(5\\) units upwards`,
    },
    {
      title: "Review Question",
      text: `What transformation is being applied to the parent function of this graph?
      $$
      y=2^{x-5}
      $$`,
      choices: ['\\(A) \\textup{translation of 5 units horizontally}\\)', '\\(B) \\textup{translation of 5 units vertically}\\)', '\\(C) \\textup{Scaled by k=5}\\)', '\\(D) \\textup{Reflection over the x-axis}\\)', '\\(E) \\textup{Reflection over the y-axis}\\)'],
      answer: '\\(A) \\textup{translation of 5 units horizontally}\\)',
      solution: `<b>\\(A) \\textup{translation of 5 units horizontally}\\)</b><p>\\(-5\\) is added to the input-area of the function. This means that \\(x\\) needs to be \\(5\\) greater to achieve the same output as the parent function, meaning there is a shift of \\(5\\) units to the right`,
    },
    {
      title: "Review Question",
      text: `What are the roots of this equation?
      $$
      f(x)=(3x-9)(2x+4)
      $$`,
      type: 'mc',
      choices: ['\\(A) x=-3, x=2\\)', '\\(B) x=-3, x=-2\\)', '\\(C) x=3, y=-2\\)', '\\(D) x=3, y=2\\)', '\\(E) x=9, x=4\\)'],
      answer: '\\(C) x=3, y=-2\\)',
      solution: `<b>\\(C) x=3 y=-2\\)</b>
      $$
      3x-9=0
      $$
      $$
      3x=9
      $$
      $$
      x=3
      $$
      $$
      2x+4=0
      $$
      $$
      2x=-4
      $$
      $$
      x=-2
      $$`
    },
    {
        title: "Review Question",
        text: `Oscar and George are in a race. George is a quarter of a lap ahead (\\(100\\) meters), but he is tired and only goes at a speed of \\(3 \\frac{m}{s}\\). Oscar has more energy and goes at a speed of \\(5 \\frac{m}{s}\\). Which equation models this correctly?`,
        type: 'mc',
        choices: ['\\(A) 3g+100=5o\\)', '\\(B) 3x-100=5x\\)', '\\(C) 3x+300=50x\\)', '\\(D) 3x=5x-100\\)', '\\(E) 3g=5o+100\\)'],
        answer: '\\(D) 3x=5x+100\\)',
        solution: `<b>\\(D) 3x=5x+100\\)</b><p>Since they race for the same time, the variable is the same. We'll call it \\(x\\). George's distance is \\(3x\\) and Oscar's is \\(5x\\) minus the \\(100\\) that George is ahead, so the relation is \\(3x=5x-100\\)`
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
        functionsLevel: 'transformations'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Go to the next lesson: <a href='transformations learning path.html'>Transformations</a>"
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