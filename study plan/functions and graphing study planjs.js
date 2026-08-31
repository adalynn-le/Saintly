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
                checkPrereqDropzones()
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
let prereqTwo = false
const inverse = document.getElementById('inverseBtn')
inverse.addEventListener("click", function(){
      prereqTwo = true
      updateLesson()
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
let prereqThree = false
document.getElementById("floorBtn").addEventListener("click", function(){
   prereqThree = true
   updateLesson()
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

let prereqOne = false
function checkPrereqDropzones() {
  prereqOne = true;
  updateLesson()
  const dropzones = document.querySelectorAll(".dropzone");

  for (const zone of dropzones) {
    if (zone.children.length === 0) {
      prereqOne = false;
      break;
    }
  }

  console.log("Are all dropzones filled?", prereqOne);
  updateLesson()

}

async function updateLesson() {
                        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return
  }

  const userId = session.user.id;
  console.log(prereqOne, prereqTwo, prereqThree)
        if ((prereqOne == true) && (prereqTwo == true) && (prereqThree == true)){
    const { data, error } = await supabase
    .from('profiles')
    .update({
        functionsAndGraphingLessonCompleted: true
    })
    .eq('id', userId)  
    }  
}