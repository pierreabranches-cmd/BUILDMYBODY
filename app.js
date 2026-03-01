1"}
const SUPABASE_URL = "https://mgqjotpbbifsivgovdnv.supabase.co";
const SUPABASE_KEY = "sb_publishable__1pYlvGapB_5ISr8_OKig_g-DsrtaV";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.addEventListener("DOMContentLoaded", () => {

  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const bmiBtn = document.getElementById("bmiBtn");

  signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signUp({ email, password });

    document.getElementById("authMsg").innerText =
      error ? error.message : "Signup successful!";
  });

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      document.getElementById("authMsg").innerText = error.message;
    } else {
      document.getElementById("auth").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");
    }
  });

  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    location.reload();
  });

  bmiBtn.addEventListener("click", () => {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value / 100;

    if (!weight || !height) return;

    const bmi = (weight / (height * height)).toFixed(2);
    document.getElementById("result").innerText = "BMI: " + bmi;
  });
