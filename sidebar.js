
const sidebarPlaceholder = document.getElementById('sidebarPlaceholder');
const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
sidebarPlaceholder.innerHTML = `
<nav id="sidebar" class = "close">
  <ul>
    <li>
    <div id="sidebar-header" class='sidebar-header'>
      <button onclick=toggleSidebar() id="side-bar-toggle">
       <img src="smallLogo.png" alt="Logo" class="logo">
      </button>
    </div>
    </li>
    <li>
      <a href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="iconsvg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
        <span class="dropdownText">Home</span>
      </a>

    </li>
    <li>
      <a href="amc10.html">
        <svg xmlns="http://www.w3.org/2000/svg" class="iconsvg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v8₀Zm0-16₀h4₀₀v-8₀H₂₈₀v8₀Zm₂₀₀-19₀q13 ₀ 21.5-8.5T51₀-8₂₀q₀-13-8.5-21.5T48₀-85₀q-13 ₀-21.5 8.5T45₀-8₂₀q₀ 13 8.5 21.5T48₀-79₀ZM2００-２００v-５６０ ５６０Z"/></svg>
        <span class="dropdownText">AMC 10</span>
      </a>
    </li>
<li>
  <button class="dropdown-btn" onclick="toggleSubMenu(this)">
    <span class="dropdownText">Subjects</span>
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
    <span class="dropdownText">Advanced Prep</span>
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
      if (width > 768) {
        main.style.marginLeft = '50px';
        main.style.width = 'calc(100% - 50px)';
      } else {
        main.style.marginLeft='30px';
        main.style.width = 'calc(100% - 30px)';
      }
        console.log("closed")
    } else {
      if (width > 768) {
        main.style.marginLeft = '175px';
        main.style.width = 'calc(100% - 175px)';
      } else {
        main.style.marginLeft='80px';
        main.style.width = 'calc(100% - 80px)';
      }
    }
}

function updateTopBar(){
  const topBar = document.getElementById('top-bar');
    if (sidebar.classList.contains('close')) {
      if (width > 768) {
        topBar.style.marginLeft = '50px';
        topBar.style.width = 'calc(100% - 50px)';
      } else {
        topBar.style.marginLeft='25px';
        topBar.style.width = 'calc(100% - 25px)';
      }
        console.log("closed")
    } else {
      if (width > 768) {
        topBar.style.marginLeft = '175px';
        topBar.style.width = 'calc(100% - 175px)';
      } else {
        topBar.style.marginLeft='80px';
        topBar.style.width = 'calc(100% - 80px)';
      }
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