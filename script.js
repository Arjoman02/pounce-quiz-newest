const socket = io();

document.getElementById('join').onclick = () => {
  const team = document.getElementById('team').value;
  const name = document.getElementById('name').value;
  if(!team || !name) return alert("Fill both fields");
  
  const quizId = prompt("Enter Quiz ID");
  
  fetch('/joinTeam', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, team, name })
  }).then(res => res.json()).then(data => {
    if(data.ok) {
      socket.emit('joinRoom', { quizId, team, name });
      const answer = prompt("Type your answer");
      socket.emit('submitAnswer', { quizId, team, name, answer });
      alert("Answer submitted!");
    }
  });
};
