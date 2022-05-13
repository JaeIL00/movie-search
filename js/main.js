// 영화 정보 불러오기
// 영화 정보 불러오기
import 'regenerator-runtime';
async function getMovie(name, page) {
  let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&s=${name}&page=${page}`);
  res = await res.json();
  return res;
}

let page = 1;
let done = false;
let totalResults = 0;
const innerEl = document.querySelector('.inner');
const searchBoxEl = document.querySelector('.search-box');
const searchInputEl = document.querySelector('input');
const searchBtnEl = document.querySelector('.btn');
const resultsEl = document.querySelector('.results');
const coverBoxEl = document.querySelector('.cover-box');
const posterBoxEl = document.querySelector('.poster-box');
const titleBoxEl = document.querySelector('.title-box');



const moviesEl = document.querySelector('.movies');
const observerEl = document.querySelector('.observer');


const divEl = document.createElement('div'); 
innerEl.prepend(divEl);
divEl.classList.add('main');
const mainTitleEl = document.querySelector('.main');
const spanEl = document.createElement('span');
mainTitleEl.prepend(spanEl)
spanEl.textContent = 'MoviesearcH';


window.addEventListener('wheel', () => {
  console.log('ok');
  mainTitleEl.classList.add('bye');
  searchBoxEl.classList.add('hello');
})

function seeMovie(Search) {
  Search.forEach(movie => {
    // 커버
      // divEl.classList.add('cover')
      // const coverEl = document.querySelector('cover')
      // coverBoxEl.append(coverEl);
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
      // 영화 요소
      const movieEl = document.createElement('div');
      movieEl.append(img,title)
      moviesEl.append(movieEl);

      
    // 제목
      // const pEl = document.createElement('p');
      // titleBoxEl.append(pEl);
      // const spanEl = document.createElement('span')
      // pEl.append(spanEl)
      // spanEl.textContent = movie.Title;
    })
    observerEl.classList.add('show')
}

function io() {
  const callback = function (entries) {
    entries.forEach(entry => {
      // 관찰 대상이 viewport 안에 들어온 경우 
      if (entry.isIntersecting) {
        console.log('end!!')
        console.timeEnd('123')
        moreMovies()
      }
    })
  }

  const io = new IntersectionObserver(callback)

  // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
  console.log(observerEl)
  io.observe(observerEl);
}
io()

searchBtnEl.addEventListener('click', async () => {
  done = false;
  const movies = await getMovie(searchInputEl.value, page = 1);
  console.time('123')
  const { Search, totalResults } = movies;
  resultsEl.textContent = 'About' + ' ' + totalResults+ ' ' + 'results';
  moviesEl.innerHTML = ''
  seeMovie(Search)
  setTimeout(() => {
    done = true;
  })
  console.log('first',movies);
})

// document.addEventListener('scroll', async (e) => {
//   const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
//   if (clientHeight + scrollTop >= scrollHeight) {
//     page++;
//     const movies = await getMovie(searchInputEl.value, page);
//     const { Search } = movies;
//     seeMovie(Search)
//     console.log(movies)
//   } 
// });

    
async function moreMovies() {
  if(!done) {
    return;
  }
  page++;
  const movies = await getMovie(searchInputEl.value, page);
  const { Search } = movies;
  seeMovie(Search)
  console.log('moreMovies',movies)
}


// const ioCallback = (entries, io) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       console.log('plz')
//     }
//   });
// };


// const io = new IntersectionObserver(ioCallback);

// io.observe(posterBoxEl.lastChild)





const poster = document.querySelector('img')

// const callback = function (entries) {
//     entries.forEach(entry => {
//       // 관찰 대상이 viewport 안에 들어온 경우 
//       if (entry.isIntersecting) {
//         console.log('end!!')
//       }
//     })
//   }

//   const io = new IntersectionObserver(callback)

//   // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
//   io.observe(posterBoxEl.lastChild);

















searchInputEl.setAttribute('placeholder', '통합검색');