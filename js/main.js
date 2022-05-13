// 영화 정보 불러오기
// 영화 정보 불러오기
import 'regenerator-runtime';
async function getMovie(name, page) {
  let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&s=${name}&page=${page}`);
  res = await res.json();
  return res;
}

let page = 1;
let totalResults = 0;
const searchInputEl = document.querySelector('input');
const searchBtnEl = document.querySelector('.btn');
const resultsEl = document.querySelector('.results');
const coverBoxEl = document.querySelector('.cover-box');
const posterBoxEl = document.querySelector('.poster-box');
const titleBoxEl = document.querySelector('.title-box');



// posterEl.innerHTML = 
// '<div><img src="" alt="" /><span></span></div>';



searchBtnEl.addEventListener('click', async () => {
  posterBoxEl.innerHTML = '';
  coverBoxEl.innerHTML = '';
  titleBoxEl.innerHTML = '';
  const movies = await getMovie(searchInputEl.value, page = 1);
  const { Search, totalResults } = movies;
  resultsEl.textContent = 'About' + ' ' + totalResults+ ' ' + 'results';
  Search.forEach(movie => {
  // 커버
    const coverEl = document.createElement('div'); 
    coverBoxEl.append(coverEl);
  // 포스터
    const img = document.createElement('img'); 
    img.src = movie.Poster;
    posterBoxEl.append(img);
  // 제목
    const pEl = document.createElement('p');
    titleBoxEl.append(pEl);
    const spanEl = document.createElement('span')
    pEl.append(spanEl)
    spanEl.textContent = movie.Title;


  })
  console.log(movies);
})

document.addEventListener('scroll', async (e) => {
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    page++;
    const movies = await getMovie(searchInputEl.value, page);
    const {Search} = movies;
    console.log(movies)
    Search.forEach(movie => {
    // 커버
      const coverEl = document.createElement('div'); 
      coverBoxEl.append(coverEl);
    // 포스터
      const img = document.createElement('img'); 
      img.src = movie.Poster;
      posterBoxEl.append(img);
    // 제목
      const pEl = document.createElement('p');
      titleBoxEl.append(pEl);
      const spanEl = document.createElement('span')
      pEl.append(spanEl)
      spanEl.textContent = movie.Title;
    })
  } 
});















searchInputEl.setAttribute('placeholder', '통합검색');