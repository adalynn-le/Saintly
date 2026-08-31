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

    if (profile && profile.length > 0) {
        let userProfile = profile[0]
        document.getElementById("username-display").innerHTML = userProfile.username
        document.getElementById("btn-dashboard").innerHTML = userProfile.username
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
    await loadUserStats(data.user.id);
    loginBtn.disabled = false;
})

const logoutBtn = document.getElementById('btn-logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        document.getElementById("login").style.display = "block"
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert("Error logging out: " + error.message);
            return;
        }
        alert("You have been logged out successfully!");
        window.location.reload();
    });
}

const deleteAccountBtn = document.getElementById('btn-delete-account');
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', async () => {
        const confirmed = confirm("Are you absolutely sure you want to delete your account? This will permanently erase your math rankings, diagnostic logs, and history. This action cannot be undone.");
        if (!confirmed) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const userId = session.user.id;
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

    if (password === passwordCheck){
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return alert(error.message);
        if (data.user) {
            await supabase.from('profiles').insert([
                { id: data.user.id, username: username }
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

supabase.auth.onAuthStateChange(async (event, session) => {
    const logoutBtn = document.getElementById('btn-logout');
    const login = document.getElementById('login');
    const usernameDisplay = document.getElementById("username-display");
    const createAccount = document.getElementById("no-account")
    const deleteAccount = document.getElementById("btn-delete-account")
    const usernameDisplayModal = document.getElementById("btn-dashboard")

    if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (login) login.style.display = "none";
        if (createAccount) createAccount.style.display = "none"
        if (deleteAccount) deleteAccount.style.display = "block"
        if (usernameDisplayModal) usernameDisplayModal.style.display = "block"
        
        // Fixed: Removed broken/dangling query line assignment assignment
        loadUserStats(session.user.id);
    } else  {
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
            alert("Error: " + error.message);
        } else {
            alert("Check your inbox! A secure password reset link has been sent.");
        }
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Themes setup
const toggleBrightness = document.getElementById("brightness")
let colorMode = 'light'
let colorModeTrue = localStorage.getItem("colorMode")
let color = 'rgb(239, 237, 247)'

if (colorModeTrue !== null){
    colorMode = colorModeTrue
    if (colorMode === 'dark'){
        document.documentElement.style.colorScheme = 'dark'; 
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        if(toggleBrightness) toggleBrightness.textContent = "sunny"
        color = '#48485a'
    } else {
        document.documentElement.style.colorScheme = 'light';
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        if(toggleBrightness) toggleBrightness.textContent = "bedtime"
        color = 'rgb(239, 237, 247)'
    }
} else {
    function toggleSystemTheme() {
        const root = document.documentElement;
        if (!root.style.colorScheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.style.colorScheme = prefersDark ? 'dark' : 'light';
        }
        colorMode = root.style.colorScheme;
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

if(toggleBrightness) {
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
}


let prereqOne = true
async function updateLesson() {
   console.log('updating lesson')
                        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return
  }
  if (prereqOne == true){
   console.log("updating")
  const userId = session.user.id;
    const { data, error } = await supabase
    .from('profiles')
    .update({
        seriesLessonCompleted: true
    })
    .eq('id', userId) 
    } 
}
updateLesson()