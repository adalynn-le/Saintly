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

//--------------Question Bank---------------
const topicQ = [
    {
        title: "Review Question",
        text: `What is the sum of an arithmetic series with common difference \\(2\\) and principal term \\(3\\) if it has \\(10\\) items?`,
        choices: ['\\(A) 23\\)', '\\(B) 26\\)', '\\(C) 46\\)', '\\(D) 120\\)', '\\(E) 132\\)'],
        answer: '\\(D) 120\\)',
        solution: `<b>\\(D) 115\\)</b><p>We use the equation \\(\\frac{n(a_{1}+a_{n})}}2\\). We have \\(10\\) terms with \\(a_{1}=3\\). We know \\(a_{10}=3+2(10-1)=21\\), so \\(\\frac{10(3+21)}{2}=10 \\times 12=120\\)`,
    },
    {
        title: "Review Question",
        text: `What is the sum of an arithmetic series with common difference \\(2\\), and principal term \\(6\\) if it has \\(5\\) items?`,
        choices: ['\\(A) 16\\)', '\\(B) 24\\)', '\\(C) 26\\)', '\\(D) 36\\)', '\\(E) 40\\)'],
        answer: '\\(D) 40\\)',
        solution: `<b>\\(D) 36\\)</b><p>We use the equation \\(\\frac{n(a_{1}+a_{n})}{2}\\). We have \\(n=4\\), \\(a_{1}=6\\), and \\(a_{4}=2(4-1)+6=12\\). Thus, we use \\(\\frac{4(12+6)}{2}=36\\)`
    },
    {
        title: "Review Question",
        text: `What is the sum of a geometric series with common ratio \\(3\\), principal value \\(2\\), and \\(6\\) terms?`,
        choices: ['\\(A) 36\\)', '\\(B) 714\\)', '\\(C) 728\\)', '\\(D) 736\\)', '\\(E) 802\\)'],
        answer: '\\(C) 728\\)',
        solution: `<b>\\(C) 728\\)</b><p>We use the formula for sum of a geometric series \\(\\frac{a(1-r^{n})}{1-r}}\\) with \\(a=2\\), \\(r=3\\), and \\(n=6\\). Solving gives \\(728\\)`,
    },
    {
        title: "Review Question",
        text: "What is the sum of a geometric series with common ratio \\(8\\), principal value \\(7\\) and \\(8\\) terms?",
        choices: ['\\(A) 448\\)', '\\(B) 16777215\\)', '\\(C) 167315\\)', '\\(D) 167676\\)', '\\(E) 176767\\)'],
        answer: '\\(B) 16777215\\)',
        solution: `<b>\\(B) 16777215\\)</b><p>We use the formula for sum of a geometric series \\(\\frac{a(1-r^{n})}{1-r}}\\) for \\(a=7, r=8, n=8\\). Solving gives \\(16777215\\)`,
    },
    {
        title: "Review Question",
        text: `What is the sum of a geometric series with common ratio \\(\\frac{1}{5}\\) and principal value \\(28\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) 5 \\frac{3}{5}\\)', '\\(C) 20\\)', '\\(D) 28\\)', '\\(E) 35\\)'],
        answer: `\\(E) 35\\)`,
        solution: `<b>\\(E) 35\\)</b><p>Use the formula \\(\\frac{a}{1-r}\\) for infinite geometric series with \\(r < 1\\). We have \\(\\frac{28}{1-\\frac{1}{5}}=\\frac{28}{\\frac{4}{5}}=\\frac{28 \\times 4}{5}=35\\)`,
    },
    {
        title: "Review Question",
        text: `What is the sum of a geometric series with a common ratio \\(\\frac{2}{3}\\) and principal value of \\(5\\)?`,
        choices: ['\\(A) 0\\)', '\\(B) \\frac{1}{3}\\)', '\\(C) \\frac{2}{3}\\)', '\\(D) 5\\)', '\\(E) 15\\)'],
        answer: '\\(E) 15\\)',
        solution: `<b>\\(E) 15\\)</b><p>Use the formula \\(\\frac{a}{1-r}\\) for infinite geometric series with \\(a=5\\) and \\(r=\\frac{2}{3}\\). We have \\(\\frac{5}{1-\\frac{2}{3}}=\\frac{5}{\\frac{1}{3}}=15\\)`,
    },
    {
        title: "Review Question",
        text: `<p>What kind of sequence is this?</p>$$1,2,4,8,16,32$$`,
        type: 'mc',
        choices: ['\\(A) \\textup{arithmetic}\\)', '\\(B) \\textup{geometric}\\)', '\\(C) \\textup{algebraic}\\)', '\\(D) \\textup{doubling}\\)', '\\(E) \\textup{series}\\)'],
        answer: '\\(B) \\textup{geometric}\\)',
        solution: `<b>\\(B) \\textup{geometric}\\)</b><p>A geometric sequence is one where each item is related to the prior through a common ratio. In this example, each number is double the last. The common ratio is \\(2\\)</p>`,
    },
    {
        title: "Review Question",
        text: `<p>What kind of sequence is this?</p>$$1,4,7,10,13,16$$`,
        type: 'mc',
        choices: ['\\(A) \\textup{arithmetic}\\)', '\\(B) \\textup{geometric}\\)', '\\(C) \\textup{series}\\)', '\\(D) \\textup{mathematical}\\', '\\(E) \\textup{ascending}\\)'],
        answer: `\\(A) \\textup{arithmetic}\\)`,
        solution: `<b>\\(A) \\textup{arithmetic}\\)</b><p>The numbers in the sequence increase by a common difference of \\(3\\). This is characteristic of an arithmetic sequence</p>`,
    },
    {
        title: "Review Question",
        text: `Does this infinite geometric series have a finite sum?$$8, 4, 2, 1$$`,
        choices: ['\\(A) \\textup{ Yes}\\)', '\\(B) \\textup{ No}\\)'],
        answer: '\\(A) \\textup{ Yes}\\)',
        solution: `<b>\\(A) \\textup{ Yes}\\)</b><p>The common ratio is \\(\\frac{1}{2}\\), which is less than \\(1\\) and thus means the series has a finite sum.`,
    },
    {
        title: "Review Question",
        text: `Does this infinite geometric series havea finite sum?$$1, 2, 4, 8$$`,
        choices: ['\\(A) \\textup{ Yes}\\)', '\\(B) \\textup{ No}\\)'],
        answer: '\\(B) \\textup{ No}\\)',
        solution: `<b>\\(B) \\textup{ No}\\)</b><p>The common ratio is \\(2\\) which is greater than \\(1\\), meaning the sum continuously gets better and is not finite.`
    }
]

topicQ.forEach(i => { i.type = 'mc' })
let currentQuestion = 0
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
    document.getElementById("answer-input").value = choice;
    document.getElementById("check-btn").click();
    mcChoices.forEach(btn => btn.disabled = true);
}

document.getElementById("next-btn").addEventListener("click", async function() {
    if (currentQuestion === 4){
        if (correctCount > 3){
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session) return;

            const userId = session.user.id;
            const { data, error } = await supabase
                .from('profiles')
                .update({ alternateSkillsLevel: 'completed' })
                .eq('id', userId)

            if (error) {
                console.error("Failed to sync stats to cloud database:", error.message);
            }
            document.getElementById('question-title').innerHTML = "Leveled Up!"
            document.getElementById("question-text").innerHTML = "Completed this pathway!"
            mcChoices.forEach(i => { i.style.display = "none" })
            document.getElementById('solution').style.display = "none";
        } else {
            document.getElementById("question-title").innerHTML = "Oops! Looks Like Your Accuracy Wasn't Great. Wanna Try Again?"
            document.getElementById("question-text").innerHTML = "Get at least four questions right in order to progress to the next level."
            document.getElementById("answer-input").style.display = "none"
            document.getElementById("check-btn").innerHTML = "Start Mastery Check"
            mcChoices.forEach(i => { i.style.display = "none" })
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
    document.querySelectorAll(".mc-choice").forEach(i => { i.style.display = "block" })
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
    if(document.querySelectorAll(".accuracyCircle")[0]) {
        document.querySelectorAll(".accuracyCircle")[0].style.backgroundColor = color;
    }   
}