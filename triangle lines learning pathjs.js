const { createClient } = window.supabase;
const supabaseURL = 'https://joevkictcfaoofqhbhgw.supabase.co';
const supabaseKey = 'sb_publishable_8Iat4psKXuFn91uT8yuw7g_2n3Buc5w';
const supabase = createClient(supabaseURL, supabaseKey);
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
//---------------------------------Actual Functions Fr 
const canvas = document.getElementById('triangleCanvas');
const ctx = canvas.getContext('2d');

let vertices = [
  { x: 250, y: 60, label: 'A' },
  { x: 110, y: 320, label: 'B' },
  { x: 390, y: 320, label: 'C' }
];

let activeLineTypes = {
  medians: true,
  altitudes: false,
  bisectors: false,
  perpendiculars: false
};

let draggedVertex = null;

function getDistance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function projectPointOnLine(p, lineStart, lineEnd) {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return lineStart;
  const t = ((p.x - lineStart.x) * dx + (p.y - lineStart.y) * dy) / lenSq;
  return {
    x: lineStart.x + t * dx,
    y: lineStart.y + t * dy
  };
}

function lineIntersection(p1, p2, p3, p4) {
  const den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
  if (Math.abs(den) < 1e-6) return null;
  const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / den;
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y)
  };
}

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
  const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height)
  };
}

function drawVisualizer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dynamic parsing of colors based on Saintly style.css active light/dark state
  const computed = getComputedStyle(document.documentElement);
  const primaryColor = computed.getPropertyValue('--primary-color').trim() || '#88B0FF';
  const accentColor = computed.getPropertyValue('--accent-color').trim() || '#88b0ff';
  const textColor = computed.getPropertyValue('--text-color').trim() || '#625c6e';
  
  const [A, B, C] = vertices;
  
  // Triangle Perimeter Outline
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.closePath();
  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // 1. Medians (Centroid G)
  if (activeLineTypes.medians) {
    const mA = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
    const mB = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
    const mC = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#88b0ff';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(mA.x, mA.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(mB.x, mB.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C.x, C.y); ctx.lineTo(mC.x, mC.y); ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath(); ctx.arc(centroid.x, centroid.y, 5, 0, Math.PI * 2); ctx.fillStyle = '#88b0ff'; ctx.fill();
    ctx.fillStyle = textColor; ctx.font = '12px "National Park"'; ctx.fillText('G (Centroid)', centroid.x + 8, centroid.y - 4);
  }
  
  // 2. Altitudes (Orthocenter H)
  if (activeLineTypes.altitudes) {
    const hA = projectPointOnLine(A, B, C);
    const hB = projectPointOnLine(B, A, C);
    const hC = projectPointOnLine(C, A, B);
    const H = lineIntersection(A, hA, B, hB) || { x: 250, y: 200 };
    
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#88b0ff';
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(hA.x, hA.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(hB.x, hB.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C.x, C.y); ctx.lineTo(hC.x, hC.y); ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath(); ctx.arc(H.x, H.y, 5, 0, Math.PI * 2); ctx.fillStyle = '#88b0ff'; ctx.fill();
    ctx.fillStyle = textColor; ctx.font = '12px "National Park"'; ctx.fillText('H (Orthocenter)', H.x + 8, H.y - 4);
  }
  
  // 3. Angle Bisectors (Incenter I)
  if (activeLineTypes.bisectors) {
    const a = getDistance(B, C);
    const b = getDistance(A, C);
    const c = getDistance(A, B);
    const sum = a + b + c;
    const I = {
      x: (a * A.x + b * B.x + c * C.x) / sum,
      y: (a * A.y + b * B.y + c * C.y) / sum
    };
    const iA = lineIntersection(A, I, B, C) || I;
    const iB = lineIntersection(B, I, A, C) || I;
    const iC = lineIntersection(C, I, A, B) || I;
    
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#88b0ff';
    ctx.setLineDash([5, 3]);
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(iA.x, iA.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(iB.x, iB.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C.x, C.y); ctx.lineTo(iC.x, iC.y); ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath(); ctx.arc(I.x, I.y, 5, 0, Math.PI * 2); ctx.fillStyle = '#88b0ff'; ctx.fill();
    ctx.fillStyle = textColor; ctx.font = '12px "National Park"'; ctx.fillText('I (Incenter)', I.x + 8, I.y - 4);
  }
  
  // 4. Perpendicular Bisectors (Circumcenter O)
  if (activeLineTypes.perpendiculars) {
    const mA = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
    const mB = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
    const mC = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    
    const dA = { x: -(C.y - B.y), y: C.x - B.x };
    const dB = { x: -(C.y - A.y), y: C.x - A.x };
    const O = lineIntersection(mA, { x: mA.x + dA.x, y: mA.y + dA.y }, mB, { x: mB.x + dB.x, y: mB.y + dB.y }) || { x: 250, y: 220 };
    
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = accentColor;
    ctx.setLineDash([6, 4]);
    
    function extendBiLine(midPoint, circumPoint) {
      const dx = circumPoint.x - midPoint.x;
      const dy = circumPoint.y - midPoint.y;
      ctx.beginPath();
      ctx.moveTo(midPoint.x - dx * 2, midPoint.y - dy * 2);
      ctx.lineTo(midPoint.x + dx * 3, midPoint.y + dy * 3);
      ctx.stroke();
    }
    
    extendBiLine(mA, O);
    extendBiLine(mB, O);
    extendBiLine(mC, O);
    ctx.setLineDash([]);
    
    ctx.beginPath(); ctx.arc(O.x, O.y, 5, 0, Math.PI * 2); ctx.fillStyle = accentColor; ctx.fill();
    ctx.fillStyle = textColor; ctx.font = '12px "National Park"'; ctx.fillText('O (Circumcenter)', O.x + 8, O.y - 4);
  }
  
  // Interactive Vertices Handles
  vertices.forEach(v => {
    ctx.beginPath();
    ctx.arc(v.x, v.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor;
    ctx.fill();
    ctx.strokeStyle = '#88B0FF';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px "National Park"';
    ctx.fillText(v.label, v.label === 'A' ? v.x - 5 : (v.label === 'B' ? v.x - 18 : v.x + 14), v.label === 'A' ? v.y - 14 : v.y + 5);
  });
}

// Mouse Down Event Handler
canvas.addEventListener('mousedown', e => {
  const pos = getMousePos(canvas, e);
  vertices.forEach(v => {
    if (getDistance(pos, v) < 16) {
      draggedVertex = v;
      canvas.style.cursor = 'grabbing';
    }
  });
});

// Mouse Move Event Handler
canvas.addEventListener('mousemove', e => {
  const pos = getMousePos(canvas, e);
  if (draggedVertex) {
    draggedVertex.x = Math.max(15, Math.min(canvas.width - 15, pos.x));
    draggedVertex.y = Math.max(15, Math.min(canvas.height - 15, pos.y));
    drawVisualizer();
  } else {
    let isHovering = false;
    vertices.forEach(v => {
      if (getDistance(pos, v) < 16) isHovering = true;
    });
    canvas.style.cursor = isHovering ? 'pointer' : 'grab';
  }
});

// Global Window Clear Drag Handle
window.addEventListener('mouseup', () => {
  draggedVertex = null;
  if (canvas) canvas.style.cursor = 'grab';
});

// Mobile Optimization Touch Listeners
canvas.addEventListener('touchstart', e => {
  if(e.touches.length === 1) {
    const pos = getMousePos(canvas, e);
    vertices.forEach(v => {
      if (getDistance(pos, v) < 22) {
        draggedVertex = v;
        e.preventDefault();
      }
    });
  }
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  if (draggedVertex && e.touches.length === 1) {
    const pos = getMousePos(canvas, e);
    draggedVertex.x = Math.max(15, Math.min(canvas.width - 15, pos.x));
    draggedVertex.y = Math.max(15, Math.min(canvas.height - 15, pos.y));
    drawVisualizer();
    e.preventDefault();
  }
}, { passive: false });

canvas.addEventListener('touchend', () => {
  draggedVertex = null;
});

// Feature Activation UI Toggles
function hookToggle(elementId, typeKey) {
  const btn = document.getElementById(elementId);
  btn.addEventListener('click', () => {
    activeLineTypes[typeKey] = !activeLineTypes[typeKey];
    if (activeLineTypes[typeKey]) {
      btn.style.backgroundColor="#88b0ff"
      btn.style.color = '#ffffff'
    } else {
      btn.style.color = '#88b0ff';
      btn.style.backgroundColor = 'transparent';
    }
    drawVisualizer();
  });
}

hookToggle('btn-medians', 'medians');
hookToggle('btn-altitudes', 'altitudes');
hookToggle('btn-bisectors', 'bisectors');
hookToggle('btn-perpendiculars', 'perpendiculars');

// Execution init
drawVisualizer();

// Watch loop to capture dark/light mode switches via top navbar cleanly
setInterval(drawVisualizer, 400);

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
        text: `What ratio does a centroid devide medians into?`,
        choices: ['\\(A) 1:2\\)', '\\(B) 1:3\\)', '\\(C) 1:4\\)', '\\(D) 2:3\\)', '\\(E) 3:4\\)'],
        answer: '\\(A) 1:2\\)',
        solution: `<b>\\(A) 1:2\\)</b>A centroid (point of concurrency of medians) divides medians into \\(1:2\\) ratios, with the longest side being closer to the vertex`,
    },
    {
        title: "Review Question",
        text: `True or False? An angle bisector remains equidistant from either adjacent side of the triangle?`,
        choices: ['\\(A) \\textup{ True}\\)', '\\(B) \\textup{ False}\\)'],
        answer: '\\(A) \\textup{ True}\\)',
        solution: `<b>\\(A \\textup{ True}\\)</b><p>Because an angle bisector keeps the same angle between either of its adjacent sides, it also keeps the same distance to coresponding points`,
    },
    {
        title: "Review Question",
        text: `True or False? A perpendicular bisector is equidistant from non-opposite verticies of a triangle?`,
        choices: ['\\(A) \\textup{ True}\\)', '\\(B) \\textup{ False}\\)'],
        answer: '\\(A) \\textup{ True}\\)',
        solution: `<b>\\(A) \\textup{ True}\\)</b><p>Because a perpendicular bisector bisects one side, it lies equidistance from the endpoints, or vertices of that side`,
    },
    {
        title: "Review Question",
        text: `True or False? An angle bisector is equidistant from non-opposite verticies of a triangle?`,
        choices: ['\\(A) \\textup{ True}\\)', '\\(B) \\textup{ False}\\)'],
        answer: '\\(B) \\textup{ False}\\)',
        solution: `<b>\\(B) \\textup{ False}\\)</b><p>A <i>perpendicular bisector</i> is equidistant from non-opposite vertices. An angle bisector is equidistant from the sides`
    },
    {
        title: "Review Question",
        text: `True or False? A perpendicular bisector remains equidistant from non-opposite sides of a triangle?`,
        choices: ['\\(A) \\textup{ True}\\)', '\\(B) \\textup{ False}\\)'],
        answer: '\\(B) \\textup{ False}\\)',
        solution: `<b>\\(B) \\textup{ False}\\)</b><p>An <i>angle bisector</i> remains equidistant from the sides. A perpendicular bisector is equidistant from the vertices`
    },
    {
        title: "Review Question",
        text: `What is the point of concurrency of angle bisectors called?`,
        choices: ['\\(A) \\textup{ incenter}\\)', '\\(B) \\textup{ circumcenter}\\)', '\\(C) \\textup{ centroid}\\)', '\\(D) \\textup{ orthocenter}\\)', '\\(E) \\textup{ vertex}\\)'],
        answer: '\\(A) \\textup{ incenter}\\)',
        solution: `<b>\\(A) \\textup{ incenter}\\)`,
    },
    {
        title: "Review Question",
        text: `What is the point of concurrency of perpendicular bisectors called?`,
        choices: ['\\(A) \\textup{ incenter}\\)', '\\(B) \\textup{ circumcenter}\\)', '\\(C) \\textup{ centroid}\\)', '\\(D) \\textup{ orthocenter}\\)', '\\(E) \\textup{ vertex}\\)'],
        answer: '\\(B) \\textup{ circumcenter}\\)',
        solution: `<b>\\(B) \\textup{ circumcenter}\\)`,
    },
    {
        title: "Review Question",
        text: `What is the point of concurrency of medians called?`,
        choices: ['\\(A) \\textup{ incenter}\\)', '\\(B) \\textup{ circumcenter}\\)', '\\(C) \\textup{ centroid}\\)', '\\(D) \\textup{ orthocenter}\\)', '\\(E) \\textup{ vertex}\\)'],
        answer: '\\(C) \\textup{ centroid}\\)',
        solution: '<b>\\(C) \\textup{ centroid}\\)</b>',
    },
    {
        title: "Review Question",
        text: `What is the point of concurrency of altitudes called?`,
        choices: ['\\(A) \\textup{ incenter}\\)', '\\(B) \\textup{ circumcenter}\\)', '\\(C) \\textup{ centroid}\\)', '\\(D) \\textup{ orthocenter}\\)', '\\(E) \\textup{ vertex}\\)'],
        answer: '\\(D) \\textup{ orthocenter}\\)',
        solution: `<b>\\(D) \\textup{ orthocenter}\\)</b>`,
    },
    {
        title: "Review Question",
        text: `Where is the circumcircle centered?`,
        choices: ['\\(A) \\textup{ incenter}\\)', '\\(B) \\textup{ circumcenter}\\)', '\\(C) \\textup{ centroid}\\)', '\\(D) \\textup{ orthocenter}\\)', '\\(E) \\textup{ vertex}\\)'],
        answer: '\\(B) \\textup{ circumcenter}\\)',
        solution: `<b>\\(B) \\textup{ circumenceter}\\)</b><p>The circumcenter is the point of concurrency of perpendicular bisectors, meaning it is equidistant from opposite vertices. A circle centered at the circumcenter has the distance to each vertex as a radius`,
    },
    {
        title: "Review Question",
        text: `Where is the incircle centered?`,
        choices: ['\\(A) \\textup{ incenter}\\)', '\\(B) \\textup{ circumcenter}\\)', '\\(C) \\textup{ centroid}\\)', '\\(D) \\textup{ orthocenter}\\)', '\\(E) \\textup{ vertex}\\)'],
        answer: `\\(A) \\textup{ incenter}\\)`,
        solution: `<b>\\(A) \\textup{ incenter}\\)</b><p>Beceause the incenter is the point of concurrency of angle bisectors, which are equidistant from sides, the incenter has the closest distance to each side as a radius.`
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
        geometryLevel: 'trigonometry'
    })
    .eq('id', userId)

  if (error) {
    console.error("Failed to sync stats to cloud database:", error.message);
  }
  document.getElementById('question-title').innerHTML = "Leveled Up!"
  document.getElementById("question-text").innerHTML = "Go to the next lesson: <a href='trigonometry learning path.html'>Trigonometry</a>"
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