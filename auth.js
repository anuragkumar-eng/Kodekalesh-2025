/* auth.js - lightweight demo auth for hackathon use
   - stores hashed password in localStorage (demo only)
   - exported functions: registerUser, loginUser, getAuth, logout, showToast
*/

function buf2hex(buffer){
  return Array.from(new Uint8Array(buffer)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function sha256(str){
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return buf2hex(hash);
}

/* storage helpers */
function loadUsers(){
  try { return JSON.parse(localStorage.getItem('aurora_users')||'{}'); } catch(e){ return {}; }
}
function saveUsers(users){ localStorage.setItem('aurora_users', JSON.stringify(users)); }

/* toast */
function showToast(msg, isError=false){
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.display = 'block';
  t.style.background = isError ? 'linear-gradient(90deg,#ef4444,#f97316)' : 'linear-gradient(90deg,#06b6d4,#7c3aed)';
  t.style.color = '#fff';
  setTimeout(()=> t.style.display = 'none', 2400);
}

/* API */
async function registerUser({name, email, password}){
  if(!name || !email || !password) throw new Error('Please fill all fields');
  const users = loadUsers();
  if(users[email]) throw new Error('User already exists');
  const hash = await sha256(password + '::' + email);
  users[email] = { name, email, hash, created: Date.now() };
  saveUsers(users);
  // set session
  const token = await sha256(email + Date.now());
  localStorage.setItem('aurora_auth', JSON.stringify({email, name, token}));
  return true;
}

async function loginUser({email, password}){
  if(!email || !password) throw new Error('Please fill all fields');
  const users = loadUsers();
  const rec = users[email];
  if(!rec) throw new Error('No account found for that email');
  const hash = await sha256(password + '::' + email);
  if(hash !== rec.hash) throw new Error('Incorrect password');
  const token = await sha256(email + Date.now());
  localStorage.setItem('aurora_auth', JSON.stringify({email, name: rec.name, token}));
  return true;
}

function getAuth(){
  try { return JSON.parse(localStorage.getItem('aurora_auth')||'null'); } catch(e){ return null; }
}
function logout(){
  localStorage.removeItem('aurora_auth');
}

/* make available globally */
window.registerUser = registerUser;
window.loginUser = loginUser;
window.getAuth = getAuth;
window.logout = logout;
window.showToast = showToast;
