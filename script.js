function checkStrength() {
  const password = document.getElementById("password").value;
  const result = zxcvbn(password);
  const feedback = document.getElementById("feedback");
  const bar = document.getElementById("strengthBar");
  const nameSection = document.getElementById("nameSection");
  const certDiv = document.getElementById("certificate");
  const actions = document.getElementById("actions");

  const levels = [
    { color: "#dc3545", text: "Very Weak" },
    { color: "#fd7e14", text: "Weak" },
    { color: "#ffc107", text: "Fair" },
    { color: "#17a2b8", text: "Good" },
    { color: "#28a745", text: "Strong" }
  ];

  const level = levels[result.score];
  bar.style.background = level.color;
  feedback.textContent = `${level.text}: ${result.feedback.suggestions.join(" ") || "Looks good!"}`;

  if (result.score >= 4) {
    nameSection.style.display = "block";
  } else {
    nameSection.style.display = "none";
    certDiv.innerHTML = "";
    actions.style.display = "none";
  }
}

function generateCertificate() {
  const name = document.getElementById("name").value.trim();
  const certDiv = document.getElementById("certificate");
  const actions = document.getElementById("actions");

  if (name === "") {
    certDiv.innerHTML = "<p style='color:red;'>Please enter your name.</p>";
    actions.style.display = "none";
    return;
  }

  const date = new Date().toLocaleDateString();

  certDiv.innerHTML = `
    <div id="certificateContent" style="
      border: 4px solid #28a745;
      padding: 40px;
      border-radius: 15px;
      background: #ffffff;
      text-align: center;
      font-family: 'Playfair Display', serif;
    ">
      <img src="logo.png" alt="Logo" style="max-width: 80px; margin-bottom: 20px;" />

      <h2 style="font-size: 24px; color: #28a745;">Certificate of Strength</h2>
      <p style="font-size: 18px; margin: 15px 0;">
        This certifies that <strong>${name}</strong><br/>
        has successfully created a <strong>strong password</strong>.
      </p>
      <p style="font-size: 14px; color: #555;">Date: ${date}</p>
    </div>
  `;

  actions.style.display = "block";
}
