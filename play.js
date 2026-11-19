// ============================================================
// DESDE EL SOFÁ - CONTROLADOR MÓVIL POR ROLES FAMILIARES
// ============================================================

const BROKERS = [
  { host: "broker.emqx.io", port: 8084, path: "/mqtt" },
  { host: "broker.hivemq.com", port: 8884, path: "/mqtt" }
];
let currentBrokerIndex = 0;

let myPlayerId = 'p_' + Math.random().toString(16).substring(2, 10);
let roomCode = '';
let myName = '';
let selectedRole = 'papa';
let selectedRoleTitle = 'Papá';
let selectedRoleIcon = '👨‍💼';
let myTotalScore = 0;
let mqttClient = null;

let topicTvToPhone = '';
let topicPhoneToTv = '';

// DOM Screens
const screens = {
  join: document.getElementById('screenJoin'),
  waiting: document.getElementById('screenWaiting'),
  spectating: document.getElementById('screenSpectating'),
  prepare: document.getElementById('screenPrepare'),
  gamepad: document.getElementById('screenGamepad'),
  submitted: document.getElementById('screenSubmitted'),
  result: document.getElementById('screenResult'),
  gameover: document.getElementById('screenGameOver')
};

// Form DOM
const joinForm = document.getElementById('joinForm');
const roomCodeInput = document.getElementById('roomCodeInput');
const playerNameInput = document.getElementById('playerNameInput');
const rolesPicker = document.getElementById('rolesPicker');
const joinErrorMessage = document.getElementById('joinErrorMessage');

// Waiting DOM
const myRoleIcon = document.getElementById('myRoleIcon');
const myDisplayName = document.getElementById('myDisplayName');

// Turn DOM
const preparePlayerName = document.getElementById('preparePlayerName');
const spectatingPlayerName = document.getElementById('spectatingPlayerName');
const myTurnProgress = document.getElementById('myTurnProgress');

// Gamepad DOM
const myScore = document.getElementById('myScore');
const mobileQuestionTitle = document.getElementById('mobileQuestionTitle');
const padBtns = document.querySelectorAll('.pad-btn');
const mOptTexts = [
  document.getElementById('mOptText0'),
  document.getElementById('mOptText1'),
  document.getElementById('mOptText2'),
  document.getElementById('mOptText3')
];

// Result DOM
const resultCard = document.getElementById('resultCard');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultPoints = document.getElementById('resultPoints');
const resultTotalScore = document.getElementById('resultTotalScore');
const finalScoreVal = document.getElementById('finalScoreVal');

// Auto-fill room from URL parameter
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const room = params.get('room');
  if (room) {
    roomCodeInput.value = room.trim().toUpperCase();
    playerNameInput.focus();
  }
});

// Roles selector
if (rolesPicker) {
  rolesPicker.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      rolesPicker.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedRole = btn.getAttribute('data-role') || 'papa';
      selectedRoleTitle = btn.getAttribute('data-title') || 'Papá';
      selectedRoleIcon = btn.getAttribute('data-icon') || '👨‍💼';
      vibrate(20);
    });
  });
}

function vibrate(pattern = 40) {
  if (navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) {}
  }
}

function showScreen(key) {
  Object.keys(screens).forEach(k => {
    if (screens[k]) {
      screens[k].classList.toggle('active', k === key);
    }
  });
}

// ------------------------------------------------------------
// FORM SUBMIT & MQTT CONNECTION
// ------------------------------------------------------------
joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  joinErrorMessage.textContent = '';

  roomCode = roomCodeInput.value.trim().toUpperCase();
  myName = playerNameInput.value.trim();

  if (!roomCode) {
    joinErrorMessage.textContent = 'Ingresa el código que ves en la TV.';
    return;
  }
  if (!myName) {
    joinErrorMessage.textContent = 'Ingresa tu nombre o apodo.';
    return;
  }

  topicTvToPhone = `desdeelsofa/rooms/${roomCode}/tv_to_phone`;
  topicPhoneToTv = `desdeelsofa/rooms/${roomCode}/phone_to_tv`;

  connectMqttAndJoin();
});

function connectMqttAndJoin() {
  const broker = BROKERS[currentBrokerIndex];
  joinErrorMessage.style.color = '#38bdf8';
  joinErrorMessage.textContent = 'Conectando al televisor...';
  const clientId = "Phone_" + myPlayerId;

  mqttClient = new Paho.MQTT.Client(broker.host, Number(broker.port), broker.path, clientId);

  mqttClient.onConnectionLost = function(responseObject) {
    console.warn("MQTT desconectado:", responseObject.errorMessage);
  };

  mqttClient.onMessageArrived = function(message) {
    try {
      const data = JSON.parse(message.payloadString);
      handleTvMessage(data);
    } catch (e) {
      console.error("Error leyendo mensaje de la TV:", e);
    }
  };

  mqttClient.connect({
    useSSL: true,
    timeout: 5,
    keepAliveInterval: 30,
    onSuccess: function() {
      console.log("¡Conectado al broker MQTT!");
      joinErrorMessage.textContent = '';
      mqttClient.subscribe(topicTvToPhone, { qos: 1 });

      // Enviar registro con datos de rol familiar y nombre para sentarse en el sofá
      publishToTv({
        type: 'JOIN',
        id: myPlayerId,
        name: myName,
        role: selectedRole,
        roleTitle: selectedRoleTitle,
        roleIcon: selectedRoleIcon
      });

      if (myDisplayName) myDisplayName.textContent = `${selectedRoleTitle}: ${myName}`;
      if (myRoleIcon) myRoleIcon.textContent = selectedRoleIcon;
      showScreen('waiting');
      vibrate(50);
    },
    onFailure: function(err) {
      console.warn("Fallo broker, rotando:", err);
      currentBrokerIndex = (currentBrokerIndex + 1) % BROKERS.length;
      setTimeout(connectMqttAndJoin, 1500);
    }
  });
}

function publishToTv(payload) {
  if (!mqttClient) return;
  try {
    const msg = new Paho.MQTT.Message(JSON.stringify(payload));
    msg.destinationName = topicPhoneToTv;
    msg.qos = 1;
    mqttClient.send(msg);
  } catch (e) {}
}

// ------------------------------------------------------------
// TV MESSAGE HANDLING (TURN BASED)
// ------------------------------------------------------------
function handleTvMessage(data) {
  // AVISO PREPÁRATE
  if (data.type === 'PREPARE_TURN') {
    const isMyTurn = (data.activePlayerId === myPlayerId || data.mode === 'ALL');

    if (isMyTurn) {
      if (preparePlayerName) {
        preparePlayerName.textContent = data.activePlayerName || `${selectedRoleTitle}: ${myName}`;
      }
      showScreen('prepare');
      vibrate([80, 50, 150]);
    } else {
      if (spectatingPlayerName) {
        spectatingPlayerName.textContent = data.activePlayerName || 'Familiar';
      }
      showScreen('spectating');
    }
  }

  // NUEVA PREGUNTA
  else if (data.type === 'NEW_QUESTION') {
    const isMyTurn = (data.activePlayerId === myPlayerId || data.mode === 'ALL');

    if (isMyTurn) {
      vibrate([40, 60, 40]);
      if (mobileQuestionTitle) mobileQuestionTitle.textContent = data.question;
      if (myScore) myScore.textContent = myTotalScore.toLocaleString();
      if (myTurnProgress) myTurnProgress.textContent = data.turnProgressText || '';

      data.options.forEach((opt, idx) => {
        if (mOptTexts[idx]) mOptTexts[idx].textContent = opt;
      });

      padBtns.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
      });

      showScreen('gamepad');
    } else {
      if (spectatingPlayerName) {
        spectatingPlayerName.textContent = data.activePlayerName || 'Familiar';
      }
      showScreen('spectating');
    }
  }

  // REVELACIÓN RÁPIDA DE RESPUESTA
  else if (data.type === 'REVEAL') {
    if (data.activePlayerId === myPlayerId || data.mode === 'ALL') {
      if (data.playerId && data.playerId !== myPlayerId) return;

      myTotalScore = data.totalScore !== undefined ? data.totalScore : myTotalScore;
      if (resultTotalScore) resultTotalScore.textContent = myTotalScore.toLocaleString();

      if (data.isCorrect) {
        vibrate([60, 60, 100]);
        if (resultCard) resultCard.className = 'result-card correct';
        if (resultIcon) resultIcon.textContent = '🎉';
        if (resultTitle) resultTitle.textContent = '¡Correcto!';
        if (resultPoints) resultPoints.textContent = `+${data.pointsEarned || 500} pts`;
      } else {
        vibrate(140);
        if (resultCard) resultCard.className = 'result-card wrong';
        if (resultIcon) resultIcon.textContent = '❌';
        if (resultTitle) resultTitle.textContent = '¡Fallaste!';
        if (resultPoints) resultPoints.textContent = '+0 pts';
      }

      showScreen('result');
    }
  }

  // FIN DE LA PARTIDA
  else if (data.type === 'GAME_OVER') {
    if (finalScoreVal) finalScoreVal.textContent = myTotalScore.toLocaleString();
    vibrate([100, 50, 100, 50, 200]);
    showScreen('gameover');
  }
}

// Botones de respuesta en pantalla táctil
padBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const answerIdx = parseInt(btn.getAttribute('data-idx'), 10);
    vibrate(40);

    padBtns.forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.5';
    });

    publishToTv({
      type: 'ANSWER',
      playerId: myPlayerId,
      answerIndex: answerIdx
    });

    showScreen('submitted');
  });
});
