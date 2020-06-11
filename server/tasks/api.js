const rp = require('request-promise-native')

async function fetchMovie (item) {
  console.info(item, 'item')
  const url = `https://movie.douban.com/j/subject_abstract?subject_id=${item.doubanId}`
  const res = await rp(url)
  console.info(res, 'resssssssssss')
  return res
}

;(async() => {
  const movies = [
    {
      doubanId: 33412983,
      title: '离开',
      rate: 6.9,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2593990840.jpg'
    },
    {
      doubanId: 30353579,
      title: '品行不端',
      rate: 6.8,
      poster: 'https://img9.doubanio.com/view/photo/l_ratio_poster/public/p2577934795.jpg'
    },
    {
      doubanId: 30367643,
      title: '前哨基地',
      rate: 5.8,
      poster: 'https://img9.doubanio.com/view/photo/l_ratio_poster/public/p2571627286.jpg'
    }
  ]
  movies.forEach(async v => {
    const movieData = await fetchMovie(v)
    console.info(movieData)
  })
})()
