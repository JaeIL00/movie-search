import { list } from 'postcss';
import 'regenerator-runtime';


// 초기화!
let page = 1;
let firstRequest = true;
let loading = false;
let movies = [];
let totalResults = 0;
const innerEl = document.querySelector('.inner');
const searchBoxEl = document.querySelector('.search-box');
const searchInputEl = document.querySelector('input');
const typeBtnEl = document.querySelector('.type-btn')
const typeEl = document.querySelector('.type')
const searchBtnEl = document.querySelector('.btn');
const resultsEl = document.querySelector('.results');
const moviesEl = document.querySelector('.movies');
const observerEl = document.querySelector('.observer');

const divEl = document.createElement('div'); 
// innerEl.prepend(divEl);
// divEl.classList.add('main');
// const mainTitleEl = document.querySelector('.main');
// const spanEl = document.createElement('span');
// mainTitleEl.prepend(spanEl)
// spanEl.textContent = 'Moviesearch';
// searchInputEl.setAttribute('placeholder', '통합검색');





// 영화를 더 가져와야 하는지 관찰!
const io = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    // 관찰 대상이 viewport 안에 들어온 경우
    if (entry.isIntersecting) {
      // console.log('end!!');
      moreMovies();
    }
  });
});
// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
io.observe(observerEl);





// Events!
// window.addEventListener('wheel', () => {
//   console.log('wheel ok');
//   mainTitleEl.classList.add('bye');
//   searchBoxEl.classList.add('hello');
// })
searchInputEl.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    firstMovies()
  }
})
searchBtnEl.addEventListener('click', firstMovies)
// const liEl = document.querySelector('.type-name')
typeBtnEl.addEventListener('click', (event) => {
  event.stopPropagation()
  typeEl.classList.add('active')
})
window.addEventListener('click', () => {
  typeEl.classList.remove('active')
})
// liEl.addEventListener('click', () => {
//   console.log('hi')
// })





// Functions!
// 화면에 출력하기!
function renderMovies(Search = []) {
  const movieEls = []
  Search.forEach(movie => {
    // 포스터
    const img = document.createElement('img'); 
    function posterImg() {
      if (movie.Poster) {
        return movie.Poster;
      } else {
        // 안될시 이미지
      }
    }
    img.src = posterImg();
    // 제목
    const title = document.createElement('div');
    title.textContent = movie.Title;
    // 연도
    const year = document.createElement('div');
    year.textContent = movie.Year
    // 영화 요소
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-box')
    movieEl.append(img, title,year);
    movieEls.push(movieEl);
  })
  moviesEl.append(...movieEls); // 한 번에 출력!
}
// 실제 영화 가져오기!
async function getMovie(name) {
  let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&s=${name}&page=${page}&type=`);
  res = await res.json();
  return res;
}
// 로딩 애니메이션(?) 동작!
function exeLoading(state) {
  loading = state
  if (loading) {
    observerEl.classList.add('loading')
  } else {
    observerEl.classList.remove('loading')
  }
}
// 영화 기본 검색!
async function firstMovies() {
  exeLoading(true);
  firstRequest = true; // 첫 요청 상태 만들기!
  moviesEl.innerHTML = '' // 옵저버가 보이는 시점이 최대한 앞서 동작하도록, 목록 초기화부터!
  page = 1;
  const { Search, totalResults: tr } = await getMovie(searchInputEl.value);
  resultsEl.textContent = `About ${tr} results`;
  movies = Search
  totalResults = Number(tr)
  renderMovies(Search)
  exeLoading(false);
  firstRequest = false;
  
  console.log('영화 기본 검색!')
  console.log(Search)
}
// 영화 추가 검색!
async function moreMovies() {
  if (firstRequest) return; // 첫 요청에선 동작하지 않음!
  if (movies.length >= totalResults) return; // 더 가져올 영화가 없으면 동작하지 않음!
  
  // exeLoading(true);
  page += 1;
  const { Search } = await getMovie(searchInputEl.value);
  movies.push(...Search)
  renderMovies(Search)
  exeLoading(false);

  console.log(movies.length, totalResults);
  console.log('영화 추가 검색!')
  const posi = observerEl.getBoundingClientRect()
  console.log(posi.y)
}