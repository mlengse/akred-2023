import hyphen from 'hyphen/id'

const { hyphenateHTML } = hyphen

export default defineNuxtPlugin( nuxtApp => {

  function getElementsWithNoChildren (target, document) {
    let candidates;

    if (target && typeof target.querySelectorAll === 'function') {
      candidates = target.querySelectorAll('*');
    }
    else if (target && typeof target.length === 'number') {
      candidates = target;
    }
    else {
      candidates = document.querySelectorAll('*');
    }

    return Array.from(candidates).filter((elem: HTMLElement) => {
      return elem.children.length === 0;
    });
  };

  const findEl = async (hash: string , x = 100, document ) => {
    let el = document.querySelector(hash)
    let searchTexts = hash.split('#').join('').split('-')
    let searchText = searchTexts[0]
    let elems = getElementsWithNoChildren(document.querySelector('article.page-body'), document)
    let matchingElementArr = Array.from(elems).filter((v:HTMLElement) => v.textContent.includes(searchText));
    if(matchingElementArr.length){
      return matchingElementArr[0]
    }
    if(!!el){
      return el
    }
    if (x > 50) {
      return ''
    }

    return setTimeout(() => { findEl(hash, ++x || 1, document) }, 10)
  }
  
  
  function wrapKeywordWithHTML(keyword: string){
    return `<mark style="bg-yellow-300">${keyword}</mark>`
  }

  nuxtApp.hook('page:finish', async () => {
    console.log('page finish')
    if(window.location.hash.length){
      console.log(window.location.pathname, window.location.hash)
      const hash = window.location.hash
      // console.log(to)
      // console.log(window.location.pathname)
      const searchTexts = [...new Set([...hash.replace(/[^\w\d]/g, ' ').split(' '), ...hash.replace(/[^\w\d]/g, ' ').toLowerCase().split(' ')])].filter( w => w.length)
      const els = [
        ...document.querySelectorAll('article.page-body p'),
        ...document.querySelectorAll('article.page-body h1'),
        ...document.querySelectorAll('article.page-body h2'),
        ...document.querySelectorAll('article.page-body ol'),
        ...document.querySelectorAll('article.page-body ul'),
      ]
      if(els.length) {
        console.log(els.length)
        for (let el of els) {
          for(const searchText of searchTexts){
            let a = new RegExp(`(?<=>[^>]*)(${searchText})(?=[^>]*<)`, 'gi')
            let b = el.innerHTML.match(a)
            if(!b){
              a = new RegExp(`${searchText}`, 'gi')
              b = el.innerHTML.match(a)
            }
            if(b?.length){
              el.innerHTML = el.innerHTML.replace(a, wrapKeywordWithHTML)
            }
          }
        }
      } 
    }

    const hypEls = [
      ...Array.from(document.querySelectorAll('article.page-body p')),
      ...Array.from(document.querySelectorAll('article.page-body h1')),
      ...Array.from(document.querySelectorAll('article.page-body h2')),
      ...Array.from(document.querySelectorAll('article.page-body ol')),
      ...Array.from(document.querySelectorAll('article.page-body ul')),
    ]
    // console.log(el.innerHTML)
    for(let hypEl of hypEls){
      hyphenateHTML(hypEl.innerHTML, { 
        // debug: true, 
        // hyphenChar: "%", 
        minWordLength: 3 
      }).then( result =>{
        hypEl.innerHTML = result
      })
    }

    if(window.location.hash.length){
      const elto = await findEl(window.location.hash, 100, document) as HTMLElement
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: elto.offsetTop, behavior: 'smooth' })
      } else {
        window.scrollTo(0, elto.offsetTop)
      }
    } else {
      window.scrollTo(0, 0)
    }
  })
})
