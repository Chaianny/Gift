// Personagens e informações
var Chrono = {
  name: "Chrono",
  image: "https://imgur.com/xlXE6od.png",
  age: 17,
  weapons: "Katana",
  element: "Light",
};
var Jayle = {
  name: "Jayle",
  image: "https://imgur.com/joribLs.png",
  age: 17,
  weapons: ["Sword", "Shiel"],
  element: "Fire",
};
var Marle = {
  name: "Marle",
  image: "https://imgur.com/bn824gM.png",
  age: 17,
  weapons: "CrossBow",
  elemeent: "Ice",
};
var Lucca = {
  name: "Lucca",
  image: "https://imgur.com/DjIPRtC.png",
  age: 17,
  weapons: ["Gun", "Hammer"],
  element: "Fire",
};
var Frog = {
  name: "Frog",
  image: "https://imgur.com/k8ui7v2.png",
  age: 17,
  weapons: "Sword",
  element: "Water",
};
var Robo = {
  name: "Robo",
  image: "https://imgur.com/HxpU23N.png",
  age: 17,
  weapons: "Mechanical Arm",
  element: "",
};
var Ayla = {
  name: "Ayla",
  image: "https://imgur.com/gnBUBdu.png",
  age: 17,
  weapons: "Fists",
  element: "",
};
var Magus = {
  name: "Magus",
  image: "https://imgur.com/i0GtStE.png",
  age: 17,
  weapons: "Scythe",
  element: "Shadow",
};

var chars = [Chrono, Jayle, Marle, Lucca, Frog, Robo, Ayla, Magus];
var nomeAventureiro;
var championSelected;

window.onload = function() {
  var audio = document.getElementById('meuAudio');
  audio.volume = 0.1; // Define o volume para 10% do volume máximo

  // Tentar iniciar a reprodução após um breve atraso
  setTimeout(function() {
      audio.play().catch(function(error) {
          console.log('Erro ao tentar reproduzir o áudio:', error);
      });
  }, 3000); // Ajuste o atraso se necessário
};

function jogar() {

  nomeAventureiro = document.getElementById("nameTag").value;
  if (nomeAventureiro == "" || nomeAventureiro == null) {
    var warning = document.getElementById("warning");
    warning.style.animation = "1s warning infinite";
  } else {
    var login = document.getElementById("loginJogador");
    var talkPlay = (document.getElementById("talkWihtPlayer").innerHTML =
      "<h1 id='escolha'>Escolha seu personagem, " + nomeAventureiro + "</h1>");
    login.style.transition = "1s";
    login.style.opacity = "0";
    login.style.marginTop = "-35%";
    setTimeout(function () {
      login.style.display = "none";
    }, 1000);
  }

  return nomeAventureiro;
}

function setCaracter(chars) {
  var imgCaracter = document.getElementById("boxCaracter");
  imgCaracter.style.backgroundImage = "url(" + chars.image + ")";
  championSelected = chars;
}

function next() {
  if (championSelected == undefined) {
    var escolha = document.getElementById("escolha");
    escolha.style.animation = "1s warning infinite";
  } else {
    //     Efeitos e outras informações
    var audio = document.getElementById('meuAudio');
    var audioSource = document.getElementById('audioSource');
    
    // Função para tocar a próxima música
    function tocarProximaMusica() {
        // Parar a música atual
        audio.pause();
        audio.currentTime = 0; // Reseta o tempo de reprodução
    
        // Atualizar o source da música
        audioSource.src = './assets/battle.mp3';
        audio.load(); // Carrega o novo áudio
    
        // Iniciar a reprodução da nova música
        audio.play().catch(function(error) {
            console.log('Erro ao tentar reproduzir o áudio:', error);
        });
    }

    tocarProximaMusica()

    var champ = document.getElementById("boxCaracter");
    champ.backgroundPosition = "34% 0%";
    var p = document.getElementById("AventuraBegin");
    p.style.fontSize = "28px";
    p.innerHTML = "OK, você escolheu " + championSelected.name + " ! Boa sorte";
    var transition = document.getElementById("transition");
    transition.style.display = "flex";
    transition.style.animation = "5s scaleTransition";

    setTimeout(function () {
      hideAll();
    }, 5000);
    setTimeout(function () {
      dialog();
    }, 3000);
  }
}

function hideAll() {
  var transition = document.getElementById("transition");
  var loginJogad = document.getElementById("loginJogador");
  var selectChamp = document.getElementById("selectChamp");

  transition.style.display = "none";
  loginJogad.style.display = "none";
  selectChamp.style.display = "none";
}

function dialog() {
  var dialog = document.getElementById("textDialog");
  dialog.innerHTML =
    "Rápido, " +
    nomeAventureiro +
    " estamos com problemas no jardim do castelo, detenha os monstros";
  var containerFight = document.getElementById("fight");
  containerFight.style.display = "flex";
  var heroCase = document.getElementById("heroCaseImg");
  heroCase.style.backgroundImage = "url(" + championSelected.image + ")";
}

var enemyLife = 80;
var heroLife = 80;

function startFight() {
  var dialog = document.getElementById("textDialog");
  dialog.innerHTML = "Rápido, " + nomeAventureiro + " o que faremos?";

  var actions = document.getElementById("actions");
  actions.innerHTML =
    "<button onclick='attack()'>Atacar</button> <button onclick='heal()'>Curar</button";

  var enemyHP = document.getElementById("hpInimigo");
  enemyHP.innerHTML = "C4T-SING " + enemyLife + "/80";

  var heroHP = document.getElementById("hpAliado");
  heroHP.innerHTML = "" + championSelected.name + " " + heroLife + "/80";
}

function attack() {
  var caracter = document.getElementById("heroCaseImg");
  caracter.style.animation = "0.5s heroDash ";

  var enemy = document.getElementById("enemyImg");
  enemy.style.animation = "0.5s enemyDamage";

  setTimeout(function () {
    caracter.style.animation = null;
  }, 1000);
  setTimeout(function () {
    enemy.style.animation = null;
  }, 1000);

  /* dano */
  var damage = parseInt(Math.random() * 10);

  enemyLife -= damage;

  var enemyHP = document.getElementById("hpInimigo");
  enemyHP.innerHTML = "C4T-SING " + enemyLife + "/80";

  if (enemyLife <= 0) {
    let enemy = document.getElementById('enemyImg')
    enemy.classList.replace('enemy-cat', 'enemy-cat-defeat')
    changeClassAfterDisplay()
    console.log("Fim da luta");
  }

  var contTextDialog = document.getElementById("contTextDialog");
  contTextDialog.style.display = "none";

  if (enemyLife > 0) {
    setTimeout(function () {
      enemyAttack();
    }, 3000);
    setTimeout(function () {
      contTextDialog.style.display = "block";
    }, 3100);
  } else {
    console.log("fim de luta");
  }

  function changeClassAfterDisplay() {
    setTimeout(() => {
      enemy.classList.replace('enemy-cat-defeat', 'cake')
    }, 1300); 
  }
}

function enemyAttack() {
  var damage = parseInt(Math.random() * 10);

  var caracter = document.getElementById("heroCaseImg");
  caracter.style.animation = "0.5s heroDamage ";

  var enemy = document.getElementById("enemyImg");
  enemy.style.animation = "0.5s enemyDash";

  setTimeout(function () {
    caracter.style.animation = null;
  }, 1000);
  setTimeout(function () {
    enemy.style.animation = null;
  }, 1000);

  heroLife -= damage;

  var heroHP = document.getElementById("hpAliado");
  heroHP.innerHTML = "" + championSelected.name + " " + heroLife + "/80";
}

function heal() {
  var heal = parseInt(Math.random() * 15);

  if (heroLife + heal > 80) {
    console.log("Não pode mais curar");
  } else {
    heroLife += heal;
    var heroHP = document.getElementById("hpAliado");
    heroHP.innerHTML = "" + championSelected.name + " " + heroLife + "/80";
  }

  enemyAttack();
}

function winner() {
  hideAll();
}


/* transição final */ 
document.addEventListener('DOMContentLoaded', function() {
    const endImage = document.querySelector('.dialog-image');
    const endImageContainer = document.getElementById('contTextDialog');
  
    endImage.addEventListener('click', function(event) {
      event.preventDefault();
      
      if (endImageContainer.classList.contains('active')) {
        closeDialog();
      } else {
        openDialog();
      }
    });
  
    function openDialog() {
        endImageContainer.classList.add('active');
      setTimeout(() => {
        endImageContainer.style.opacity = '1';
        endImageContainer.style.transform = 'scale(1)';
      }, 50);
    }
  
    function closeDialog() {
        endImageContainer.style.opacity = '0';
        endImageContainer.style.transform = 'scale(0.9)';
      setTimeout(() => {
        endImageContainer.classList.remove('active');
      }, 300);
    }
  });