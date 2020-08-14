// Variables

const listaTweets = document.getElementById('lista-tweets');
const formulario = document.querySelector('#formulario');

// Event Listeners

eventListeners();

function eventListeners() {
  formulario.addEventListener('submit', agregarTweet);

  listaTweets.addEventListener('click', eliminarTweet);

  document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

function agregarTweet(event) {
  event.preventDefault();
  const tweet = document.getElementById('tweet').value;
  const listItem = document.createElement('li');
  const btnEliminar = document.createElement('a');

  btnEliminar.classList = 'borrar-tweet';
  btnEliminar.innerText = 'X';

  listItem.innerText = tweet;
  listItem.appendChild(btnEliminar);

  listaTweets.appendChild(listItem);
  agregarTweetLocalStorage(tweet);
}

function eliminarTweet(event) {
  event.preventDefault();
  if (event.target.className === 'borrar-tweet') {
    event.target.parentElement.remove();
    eliminarTweetLocalStorage(event.target.parentElement.innerText);
  }
}

function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet) {
    const btnEliminar = document.createElement('a');
    const listItem = document.createElement('li');

    btnEliminar.classList = 'borrar-tweet';
    btnEliminar.innerText = 'X';

    listItem.innerText = tweet;
    listItem.appendChild(btnEliminar);

    listaTweets.appendChild(listItem);
  });
}

function agregarTweetLocalStorage(newTweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.push(newTweet);
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function obtenerTweetsLocalStorage() {
  let tweets;
  if (localStorage.getItem('tweets') == null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function eliminarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
      /* 
      Este método elimina más de un tweet cuando hay mas
      de un tweet con el mismo nombre del tweet a
      eliminar.
      Una solucion podria ser con un modelo de dataos
      en JSON en el cual cada tweet tenga un id unico
      (casi unico; generado al concatenar la fecha en
      milisegundos mas un nmero aleatorio) y hacer la
      eliminacipon de tweets en base a dicho id en
      lugar de hacerlo en base al texto del tweet.
      */
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
