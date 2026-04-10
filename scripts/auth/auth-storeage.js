const ROLE_ADMIN = "admin";
const ROLE_TEACHER = "teacher";

const KEYS = {
  users: "eduflow_users",
  currentUser: "eduflow_current_user",
  role: "role",
};

function isValidRole(role) {
  return role === ROLE_ADMIN || role === ROLE_TEACHER;
}

function normalizeLogin(value) {
  return String(value || "").trim().toLowerCase();
}

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `u_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

function readUsersRaw() {
  try {
    const raw = localStorage.getItem(KEYS.users);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsersRaw(users) {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

function stripPassword(user) {
  if (!user) return null;

  const {password: _omit, ...rest} = user;

  return rest;
}

function findUserByUsername(username) {
  const key = normalizeLogin(username);

  return (
    readUsersRaw().find((user) => normalizeLogin(user.username) === key) || null
  );
}

function findUserByEmail(email) {
  const key = normalizeLogin(email);

  return readUsersRaw().find((user) => normalizeLogin(user.email) === key) || null;
}

function findUserByLogin(login) {
  const key = normalizeLogin(login);
  const list = readUsersRaw();

  return (
    list.find((user) => normalizeLogin(user.username) === key) ||
    list.find((user) => normalizeLogin(user.email) === key) ||
    null
  );
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function registerUser(payload) {
  const fullName = String(payload.fullName || "").trim();
  const username = String(payload.username || "").trim();
  const email = String(payload.email || "").trim();
  const phone = String(payload.phone || "").trim();
  const password = payload.password;
  const confirmPassword = payload.confirmPassword;
  const role = payload.role;
  const gender = String(payload.gender || "").trim();

  if (!isValidRole(role)) {
    return {ok: false, error: "Role must be admin or teacher."};
  }
  if (!fullName || !username || !email) {
    return {ok: false, error: "Full name, username, and email are required."};
  }
  if (password == null || password === "") {
    return {ok: false, error: "Password is required."};
  }
  if (password !== confirmPassword) {
    return {ok: false, error: "Passwords do not match."};
  }
  if (findUserByUsername(username)) {
    return {ok: false, error: "Username is already taken."};
  }
  if (findUserByEmail(email)) {
    return {ok: false, error: "Email is already registered."};
  }

  const hashedPassword = await hashPassword(password)

  const user = {
    id: newId(),
    fullName,
    username,
    email,
    phone,
    hashedPassword,
    role,
    gender,
    createdAt: Date.now(),
  };

  const users = readUsersRaw();
  users.push(user);
  writeUsersRaw(users);

  return {ok: true, user: stripPassword(user)};
}

function setCurrentUser(user) {
  if (!user) {
    logout();
    return;
  }
  localStorage.setItem(KEYS.currentUser, JSON.stringify(stripPassword(user)));
  localStorage.setItem(KEYS.role, user.role);
}

async function loginUser({login, password}) {
  const user = findUserByLogin(login);
  if (!user) {
    return {ok: false, error: "Error: User not found."};
  }

  const inputHash = await hashPassword(password);

  if (user.password !== inputHash) {
    return {ok: false, error: "Invalid password."};
  }

  if (!isValidRole(user.role)) {
    return {ok: false, error: "Account role is invalid."};
  }

  setCurrentUser(user);
  return {ok: true, user: stripPassword(user)};
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(KEYS.currentUser);

    if (!raw) return null;

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem(KEYS.currentUser);
  localStorage.removeItem(KEYS.role);
}

function isLoggedIn() {
  const u = getCurrentUser();
  const role = localStorage.getItem(KEYS.role);
  return !!(u && isValidRole(role));
}

function getRegisteredUsers() {
  return readUsersRaw().map((u) => stripPassword(u));
}

export const AuthStorage = {
  ROLE_ADMIN,
  ROLE_TEACHER,
  KEYS,
  isValidRole,
  registerUser,
  findUserByUsername,
  findUserByEmail,
  findUserByLogin,
  loginUser,
  setCurrentUser,
  getCurrentUser,
  logout,
  isLoggedIn,
  getRegisteredUsers,
};
