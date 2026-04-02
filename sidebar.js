
console.log("sidebar loaded")
const sidebarPlaceholder = document.getElementById('sidebarPlaceholder');
sidebarPlaceholder.innerHTML = `
<nav id="sidebar" class = "close">
  <ul>
    <li>
      <span class="logo">Saintly Math</span>
      <button onclick=toggleSidebar() id="side-bar-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
      </button>
    </li>
    <li>
      <a href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
        <span>Home</span>
      </a>

    </li>
    <li>
      <a href="amc10.html">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>
        <span>AMC 10</span>
      </a>
    </li>
<li>
  <button class="dropdown-btn" onclick="toggleSubMenu(this)">
    <span>Subjects</span>
    <svg class =  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
      <path d="M480-360 280-560h400L480-360Z"/>
    </svg>
  </button>

  <ul class="sub-menu">
    <li><a href="amc10algebra.html">Algebra</a></li>
    <li><a href="amc10geometry.html">Geometry</a></li>
    <li><a href="amc10numbertheory.html">Number Theory</a></li>
    <li><a href="amc10combinatorics.html">Probability</a></li>
  </ul>
</li>
<li>
  <button class="dropdown-btn" onclick="toggleSubMenu(this)">
    <span>Advanced Prep</span>
    <svg class =  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
      <path d="M480-360 280-560h400L480-360Z"/>
    </svg>
  </button>

  <ul class="sub-menu">
    <li><a href="amc10adaptivepractice.html">Adaptive Practice</a></li>
    <li><a href="amc10practicetest.html">Practice Test</a></li>
  </ul>
</li>
<p></p>
</nav>
`;

// All sidebar functions live here now — delete them from your HTML files
const sidebar = document.getElementById('sidebar');
function toggleSidebar() {
  sidebar.classList.toggle('close');
  updateMainMargin();
  updateTopBar();
}

function toggleSubMenu(button) {
  const subMenu = button.nextElementSibling;
  if (subMenu) subMenu.classList.toggle('show');
  button.classList.toggle('rotate');
}

function updateMainMargin() {
  const main = document.querySelector('main');
  if (sidebar.classList.contains('close')) {
    console.log("sidebar closed main")
    main.style.marginLeft = '75px';   // collapsed width
  } else {
    main.style.marginLeft = '225px';  // expanded width
  }
}

function updateTopBar(){
  const topBar = document.getElementById('top-bar');
    if (sidebar.classList.contains('close')) {
        topBar.style.marginLeft = '50px';
        topBar.style.width = 'calc(100% - 50px)';
        console.log("closed")
    } else {
        topBar.style.marginLeft = '200px';
        topBar.style.width = 'calc(100% - 200px)';
        console.log("open")
    }
}
// Before
document.addEventListener('DOMContentLoaded', updateMainMargin);

// After
document.addEventListener('DOMContentLoaded', () => {
  updateMainMargin();
  updateTopBar();
});
// Set correct margin on load (sidebar starts closed)
document.addEventListener('DOMContentLoaded', updateMainMargin);