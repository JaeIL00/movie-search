import 'regenerator-runtime';

// 초기화!
// 초기화!
let page = 1;
let typeMode = { type: null };
let firstRequest = true;
let loading = false;
let movies = [];
let totalResults = 0;
let timer;



const innerEl = document.querySelector('.inner');
const searchBoxEl = document.querySelector('.search-box');
const searchInputEl = document.querySelector('input');
const typeBtnEl = document.querySelector('.type-btn');
const typeStartEl = document.querySelector('.type-start');
const typeEl = document.querySelector('.type');
const liEl = document.querySelectorAll('.type-name');
const searchBtnEl = document.querySelector('.search-btn');
const resultsEl = document.querySelector('.results');
const moviesEl = document.querySelector('.movies');
const observerEl = document.querySelector('.observer');

// TYPE 목록!
// TYPE 목록!
const liOneEl = null;
const liTwoEl = liEl[1].textContent;
const liThrEl = liEl[2].textContent;
const liFoEl = liEl[3].textContent;

const divEl = document.createElement('div'); 
// innerEl.prepend(divEl);
// divEl.classList.add('main');
// const mainTitleEl = document.querySelector('.main');
// const spanEl = document.createElement('span');
// mainTitleEl.prepend(spanEl)
// spanEl.textContent = 'Moviesearch';
// searchInputEl.setAttribute('placeholder', '통합검색');


// 영화를 더 가져와야 하는지 관찰!
// 영화를 더 가져와야 하는지 관찰!
const io = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    // 관찰 대상이 viewport 안에 들어온 경우
    if (entry.isIntersecting) {
      moreMovies();
    }
  });
});
// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
io.observe(observerEl);




// Events!
// Events!
// window.addEventListener('wheel', () => {
//   console.log('wheel ok');
//   mainTitleEl.classList.add('bye');
//   searchBoxEl.classList.add('hello');
// })

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
// 타입 이벤트!
typeBtnEl.addEventListener('click', (event) => {
  event.stopPropagation();
  typeEl.classList.add('active');
});
window.addEventListener('click', (event) => {
  event.stopPropagation();
  typeEl.classList.remove('active');
});
liEl[0].addEventListener('click', () => {
  typeStartEl.textContent = liEl[0].textContent;
  return typeMode.type = liOneEl;
});
liEl[1].addEventListener('click', () => {
  typeStartEl.textContent = liEl[1].textContent;
  return typeMode.type = liTwoEl;
});
liEl[2].addEventListener('click', () => {
  typeStartEl.textContent = liEl[2].textContent;
  return typeMode.type = liThrEl;
});
liEl[3].addEventListener('click', () => {
  typeStartEl.textContent = liEl[3].textContent;
  return typeMode.type = liFoEl;
});
// 검색창 고정 및 투명도 이벤트!
window.addEventListener('scroll', function (e) {
  if (!timer) {
    timer = setTimeout(function() {
      timer = null;
      if(window.scrollY > 371) {
        searchBoxEl.classList.add('fix');
        searchInputEl.addEventListener('focus', () => {
          searchBoxEl.classList.add('on');
        });
        searchInputEl.addEventListener('blur', () => {
          searchBoxEl.classList.remove('on');
        });
      } else {
        searchBoxEl.classList.remove('fix');
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
    // 포스터
    const img = document.createElement('img'); 
    function posterImg() {
      if ('N/A' !== movie.Poster) {
        return movie.Poster;
      } else {
        return 'https://static.wikia.nocookie.net/just-because/images/0/0c/NoImage_Available.png/revision/latest/scale-to-width-down/280?cb=20170601005615';
      }
    }
    img.src = posterImg();
    // 제목
    const title = document.createElement('div');
    title.textContent = movie.Title;
    // 연도
    const year = document.createElement('div');
    year.textContent = movie.Year;
    // 영화 요소
    const movieEl = document.createElement('div');
    const googleEl = document.createElement('a');
    movieEl.classList.add('movie-box');
    title.classList.add('title');
    year.classList.add('year');
    googleEl.classList.add('google');
    googleEl.href = `https://www.google.com/search?q=${movie.Title}+movie&sxsrf=ALiCzsZKBUOygGlbwT-vvsUzyqKs8dnCTQ%3A1652558200388&ei=eAmAYomnF4-hoASaqZKoBA&ved=0ahUKEwiJw4SE49_3AhWPEIgKHZqUBEUQ4dUDCA8&uact=5&oq=%ED%95%B4%EB%A6%AC%ED%8F%AC%ED%84%B0&gs_lcp=Cgdnd3Mtd2l6EAMyCggAEIAEEIcCEBQyDgguEIAEELEDEIMBENQCMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCAgAEIAEELEDMg4ILhCABBCxAxCDARDUAjIOCC4QgAQQsQMQgwEQ1AIyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATIFCAAQgAQ6BwgAEEcQsAM6BwgjEOoCECc6EQguEIAEELEDEIMBEMcBENEDOgoILhDHARCvARADOgQILhADOgsILhCABBCxAxCDAToECAAQQzoNCC4QsQMQgwEQ1AIQQ0oECEEYAEoECEYYAFDtFFigImDxImgHcAF4A4ABmQGIAdEHkgEDMC43mAEAoAEBsAEKyAEKwAEB&sclient=gws-wiz`;
    googleEl.textContent = 'G'
    movieEl.append(img, title, year, googleEl);
    movieEls.push(movieEl);
    let titleLe = movie.Title
    if (titleLe.length > 17) {
      title.classList.add('size-down')
    }
  })
  moviesEl.append(...movieEls); // 한 번에 출력!
}
// 실제 영화 가져오기!
async function getMovie(name) {
  let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&s=${name}&page=${page}&type=${typeMode.type}`);
  res = await res.json();
  return res;
}
// 로딩 애니메이션(?) 동작!
function exeLoading(state) {
  loading = state
  if (loading) {
    observerEl.classList.add('loading');
  } else {
    observerEl.classList.remove('loading');
  }
}
// 영화 기본 검색!
async function firstMovies() {
  exeLoading(true);
  firstRequest = true; // 첫 요청 상태 만들기!
  moviesEl.innerHTML = ''; // 옵저버가 보이는 시점이 최대한 앞서 동작하도록, 목록 초기화부터!
  page = 1;
  let { Search, totalResults: tr } = await getMovie(searchInputEl.value);
  // tr이 언디파인드이면 숫자 0을 반환해라??
  resultsEl.textContent = `About ${tr} results`;
  movies = Search;
  console.log('hi'+tr);
  renderMovies(Search);
  exeLoading(false);
  firstRequest = false;
  console.log('영화 기본 검색!');
  
}
// 영화 추가 검색!
async function moreMovies() {
  if (firstRequest) return; // 첫 요청에선 동작하지 않음!
  if (movies.length >= totalResults) return; // 더 가져올 영화가 없으면 동작하지 않음!
  
  // exeLoading(true);
  page += 1;
  const { Search } = await getMovie(searchInputEl.value);
  movies.push(...Search);
  renderMovies(Search);
  exeLoading(false);

  console.log(movies.length, totalResults);
  console.log('영화 추가 검색!');
}