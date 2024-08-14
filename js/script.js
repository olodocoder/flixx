const global = { currentPage: window.location.pathname };

async function displayPopularMovies() {
  const { results } = await getAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}.jpg"
        class="card-img-top"
        alt=${movie.title}
      />`
        : `      <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt=${movie.title}
    />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
`;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function displayPopularShows() {
  const { results } = await getAPIData('tv/popular');
  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${tv.id}">
      ${
        tv.poster_path
          ? `      <img
          src="https://image.tmdb.org/t/p/w500${tv.poster_path}.jpg"
          class="card-img-top"
          alt=${tv.name}
        />`
          : `      <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt=${tv.name}
      />`
      }
      </a>
      <div class="card-body">
        <h5 class="card-title">${tv.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${tv.first_air_date}</small>
        </p>
      </div>
  `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await getAPIData(`movie/${movieId}`);
  displayBackgroundImage('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `      <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}.jpg"
      class="card-img-top"
      alt=${movie.title}
    />`
      : `      <img
    src="images/no-image.jpg"
    class="card-img-top"
    alt=${movie.title}
  />`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
     ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href=$${
      movie.homepage
    } target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommas(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommas(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } Minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((com) => `<span>${com.name}</span>`)
    .join(', ')}</div>
</div>
  `;
  document.querySelector('#movie-details ').appendChild(div);
}

async function displayTvDetails() {
  const tvId = window.location.search.split('=')[1];

  const tv = await getAPIData(`tv/${tvId}`);
  console.log(tv);
  displayBackgroundImage('tv', tv.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      tv.poster_path
        ? `      <img
        src="https://image.tmdb.org/t/p/w500${tv.poster_path}.jpg"
        class="card-img-top"
        alt=${tv.name}
      />`
        : `      <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt=${tv.name}
    />`
    }
    </div>
    <div>
      <h2>${tv.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${tv.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${tv.first_air_date}</p>
      <p>
       ${tv.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${tv.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href=$${
        tv.homepage
      } target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>TV Show Info</h2>
    <ul>
      <li><span class="text-secondary">No of Episodes:</span> ${
        tv.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode to Air:</span> ${
        tv.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Runtime:</span> ${
        tv.episode_run_time
      } Minutes</li>
      <li><span class="text-secondary">Status:</span> ${tv.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${tv.production_companies
      .map((com) => `<span>${com.name}</span>`)
      .join(', ')}</div>
  </div>
    `;
  document.querySelector('#show-details ').appendChild(div);
}

function displayBackgroundImage(type, bgPath) {
  const ovDiv = document.createElement('div');
  ovDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;

  ovDiv.style.backgroundSize = 'cover';
  ovDiv.style.backgroundPosition = 'center';
  ovDiv.style.backgroundRepeat = 'no-repeat';
  ovDiv.style.height = '100vh';
  ovDiv.style.width = '100vw';
  ovDiv.style.position = 'absolute';
  ovDiv.style.top = '0';
  ovDiv.style.left = '0';
  ovDiv.style.zIndex = '-1';
  ovDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(ovDiv);
  } else {
    document.querySelector('#show-details').appendChild(ovDiv);
  }
}

async function getAPIData(endpoint) {
  const API_KEY = '6450d8bf156b774b3de8abf4a3964a59';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner();
  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.thml':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayTvDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
