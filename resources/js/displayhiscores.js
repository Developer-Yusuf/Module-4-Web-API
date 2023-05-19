const hiScoresList = document.getElementById("hiList");
const hiScores = JSON.parse(localStorage.getItem("hiScores")) || [];

hiScoresList.innerHTML = hiScores
  .map(score=> {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");