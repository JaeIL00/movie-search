import '../scss/main.scss'

// 초기화!
// 초기화!
let page = 1;
let typeMode = { type: null };
let firstRequest = true;
let loading = false;
let movies = [];
let totalResults = 0;
let timer;
const bodyEl = document.querySelector('body');
const mainEl = document.querySelector('.main');
const searchBoxEl = document.querySelector('.search-box');
const inputEl = document.querySelector('.input');
const searchInputEl = document.querySelector('input');
const typeBtnEl = document.querySelector('.type-btn');
const typeStartEl = document.querySelector('.type-start');
const typeEl = document.querySelector('.type');
const liEl = document.querySelectorAll('.type-name');
const searchBtnEl = document.querySelector('.search-btn');
const resultsEl = document.querySelector('.results');
const moviesEl = document.querySelector('.movies');
const observerEl = document.querySelector('.observer');
// 클래스명 객체
const CLASS = {
  HELLO: 'hello',
  BYE: 'bye',
  INPUTOFF: 'input-off',
  CURSOR: 'cursor',
  NORMAL: 'normal-search',
  ACTIVE: 'active',
  FIX: 'fix',
  SEARCHON: 'search-on',
  MOVIEBOX: 'movie-box',
  TITLE: 'title',
  YEAR: 'year',
  GOOGLE: 'google',
  SIZEDOWN: 'size-down',
  LOAD: 'loading'
}
// TYPE 목록!
const liOneEl = null;
const liTwoEl = liEl[1].textContent;
const liThrEl = liEl[2].textContent;
const liFoEl = liEl[3].textContent;

searchInputEl.setAttribute('placeholder', 'Select Type');


// 영화를 더 가져와야 하는지 관찰!
// 영화를 더 가져와야 하는지 관찰!
const io = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      moreMovies();
    }
  });
});
io.observe(observerEl);


// Events!
// Events!
// 메인 타이틀 이벤트!
window.addEventListener('wheel', () => {
  mainEl.classList.add(CLASS.BYE);
  searchBoxEl.classList.add(CLASS.HELLO);
  inputEl.classList.remove(CLASS.INPUTOFF);
  bodyEl.classList.remove(CLASS.CURSOR);
}, {
  once: true
})
searchInputEl.addEventListener('focus', () => {
  searchBoxEl.classList.add(CLASS.NORMAL);
  searchBoxEl.classList.remove(CLASS.HELLO);
})
// 검색 이벤트!
searchInputEl.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    firstMovies();
    window.scrollTo(0, 0);
    searchInputEl.blur();
  }
});
searchBtnEl.addEventListener('click', () => {
  searchInputEl.blur();
  firstMovies();
});
// 검색타입 이벤트!
typeBtnEl.addEventListener('click', (event) => {
  event.stopPropagation();
  typeEl.classList.add(CLASS.ACTIVE);
});
window.addEventListener('click', (event) => {
  event.stopPropagation();
  typeEl.classList.remove(CLASS.ACTIVE);
});
liEl[0].addEventListener('click', () => {
  typeStartEl.textContent = liEl[0].textContent;
  searchInputEl.setAttribute('placeholder', 'All Trees');
  return typeMode.type = liOneEl;
});
liEl[1].addEventListener('click', () => {
  typeStartEl.textContent = liEl[1].textContent;
  searchInputEl.setAttribute('placeholder', 'Movie Trees');
  return typeMode.type = liTwoEl;
});
liEl[2].addEventListener('click', () => {
  typeStartEl.textContent = liEl[2].textContent;
  searchInputEl.setAttribute('placeholder', 'Series Trees');
  return typeMode.type = liThrEl;
});
liEl[3].addEventListener('click', () => {
  typeStartEl.textContent = liEl[3].textContent;
  searchInputEl.setAttribute('placeholder', 'Episode Trees');
  return typeMode.type = liFoEl;
});
// 검색창 고정 및 투명도 이벤트!
window.addEventListener('scroll', function (e) {
  if (!timer) {
    timer = setTimeout(function() {
      timer = null;
      if(window.scrollY > 371) {
        searchBoxEl.classList.add(CLASS.FIX);
        searchInputEl.addEventListener('focus', () => {
          searchBoxEl.classList.add(CLASS.SEARCHON);
        });
        searchInputEl.addEventListener('blur', () => {
          searchBoxEl.classList.remove(CLASS.SEARCHON);
        });
      } else {
        searchBoxEl.classList.remove(CLASS.FIX);
      }
    }, 100);
  }
});


// Functions!
// Functions!
// 화면에 출력하기!
function renderMovies(Search = []) {
  const movieEls = [];
  Search.forEach(movie => {
    // 영화 포스터
    const img = document.createElement('img'); 
    function posterImg() {
      if ('N/A' !== movie.Poster) {
        return movie.Poster;
      } else {
        return 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';
      }
    }
    img.src = posterImg();
    // 영화 제목
    const title = document.createElement('div');
    title.textContent = movie.Title;
    // 영화 연도
    const yearEl = document.createElement('div');
    yearEl.textContent = movie.Year;
    // 영화 구글 검색
    const movieEl = document.createElement('div');
    const googleEl = document.createElement('a');
    movieEl.classList.add(CLASS.MOVIEBOX);
    title.classList.add(CLASS.TITLE);
    yearEl.classList.add(CLASS.YEAR);
    googleEl.classList.add(CLASS.GOOGLE);
    googleEl.href = `https://www.google.com/search?q=${movie.Year}+${movie.Title}+${typeMode.type}`;
    googleEl.target = '_blank';
    googleEl.textContent = 'G';
    // 영화 요소 넣기
    movieEl.append(img, title, yearEl, googleEl);
    movieEls.push(movieEl);
    let titleLe = movie.Title;
    if (titleLe.length > 17) {
      title.classList.add(CLASS.SIZEDOWN);
    }
  });
  moviesEl.append(...movieEls);
}
// 실제 영화 가져오기!
async function getMovie(name) {
  let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&s=${name}&page=${page}&type=${typeMode.type}`);
  res = await res.json();
  return res;
}
// 로딩 애니메이션!
function exeLoading(state) {
  loading = state;
  if (loading) {
    observerEl.classList.add(CLASS.LOAD);
  } else {
    observerEl.classList.remove(CLASS.LOAD);
  }
}
// 영화 기본 검색!
async function firstMovies() {
  exeLoading(true);
  firstRequest = true;
  moviesEl.innerHTML = '';
  page = 1;
  let { Search, totalResults: tr } = await getMovie(searchInputEl.value);
  totalResults = Number(tr)
  tr = tr || 0;
  resultsEl.textContent = `About ${tr} results`;
  movies = Search;
  renderMovies(Search);
  exeLoading(false);
  firstRequest = false;
}
// 영화 추가 검색!
async function moreMovies() {
  if (firstRequest) return;
  if (movies.length >= totalResults) return;
  exeLoading(true);
  page += 1;
  const { Search } = await getMovie(searchInputEl.value);
  movies.push(...Search);
  renderMovies(Search);
  exeLoading(false);
}
