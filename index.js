// Predefined Candidates
const candidates = [
  { name: "Bola Ahmed Tinubu", lga: "Ikeja" },
  { name: "Peter Obi", lga: "Onitsha" },
  { name: "Atiku Abubakar", lga: "Yola" },
  { name: "Rabiu Kwankwaso", lga: "Kano Municipal" },
];

let voters = [];
let votes = {};

// Initialize Candidates
document.addEventListener("DOMContentLoaded", function () {
  displayCandidates();
  populateCandidateOptions();
});

function displayCandidates() {
  const candidatesList = document.getElementById("candidatesList");
  candidatesList.innerHTML = candidates
    .map((c) => `<p>${c.name} (${c.lga})</p>`)
    .join("");
}

function populateCandidateOptions() {
  const candidateChoice = document.getElementById("candidateChoice");
  candidateChoice.innerHTML = candidates
    .map((c) => `<option value="${c.name}">${c.name}</option>`)
    .join("");
}

// Register Voter
document.getElementById("voterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("voterName").value.trim();
  const lga = document.getElementById("voterLGA").value.trim();
  const age = parseInt(document.getElementById("voterAge").value.trim());

  if (!name || !lga || isNaN(age)) {
    alert("Please complete all fields.");
    return;
  }

  const voter = { name, lga, age };
  voters.push(voter);
  displayVoterInfo(voter);
  document.getElementById("voterForm").reset();
});

function displayVoterInfo(voter) {
  const voterInfo = document.getElementById("voterInfo");
  voterInfo.innerHTML = `<strong>Name:</strong> ${voter.name}, <strong>LGA:</strong> ${voter.lga}, <strong>Age:</strong> ${voter.age}`;
}

// Vote
document.getElementById("voteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const candidate = document.getElementById("candidateChoice").value;
  const voter = voters[voters.length - 1]; // Latest voter

  if (!candidate) {
    alert("Please select a candidate.");
    return;
  }

  const matchedCandidate = candidates.find((c) => c.name === candidate);
  if (voter.lga !== matchedCandidate.lga) {
    alert("You can only vote for candidates in your LGA.");
    return;
  }

  votes[candidate] = (votes[candidate] || 0) + 1;
  alert(`Your vote for ${candidate} has been submitted!`);
  displayResults();
});

function displayResults() {
  const voteResults = document.getElementById("voteResults");
  voteResults.innerHTML = Object.entries(votes)
    .map(([name, count]) => `<p>${name}: ${count} votes</p>`)
    .join("");
}

// Validate Voters
document
  .getElementById("validateVoters")
  .addEventListener("click", function () {
    const ineligible = voters.filter((v) => v.age < 18 || !v.name || !v.lga);
    const eligible = voters.filter((v) => v.age >= 18 && v.name && v.lga);

    const voterStatus = document.getElementById("voterStatus");
    voterStatus.innerHTML = `
    <p><strong>Eligible Voters:</strong> ${eligible
      .map((v) => v.name)
      .join(", ")}</p>
    <p><strong>Ineligible Voters:</strong> ${ineligible
      .map((v) => v.name || "Unknown")
      .join(", ")}</p>
  `;
  });
