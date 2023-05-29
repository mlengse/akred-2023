export default {
  async scrollBehavior (to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hook('page:finish', async () => {
        console.log('page finish')
        if(to.hash.length){
          let hash = to.hash
          let searchTexts = [...new Set([...hash.split('#').join('').split('-'), ...hash.split('#').join('').toLowerCase().split('-')])]
          let elems = document.querySelector('article.page-body').querySelectorAll('*')
          for(let searchText of searchTexts){
            for(let v of elems) if(v.textContent.includes(searchText)){
              console.log(searchText)
              highlight([v], searchText)
            }
          }
        }
        // if (savedPosition) {
        //   return savedPosition
        // }
    
        function getElementsWithNoChildren (target) {
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
      
          return Array.from(candidates).filter((elem) => {
            return elem.children.length === 0;
          });
        };
    
        const findEl = async (hash , x ) => {
          let el = document.querySelector(hash)
          let searchTexts = hash.split('#').join('').split('-')
          let searchText = searchTexts[0]
          let elems = getElementsWithNoChildren(document.querySelector('article.page-body'))
          let matchingElementArr = Array.from(elems).filter(v => v.textContent.includes(searchText));
          let matchingElement = false
          if(matchingElementArr.length){
            matchingElement = matchingElementArr[0]
            return matchingElement
          }
          if(!!el){
            return el
          }
          if (x > 50) {
            return ''
          }

          return setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
        }
        function highlight(els, keyword){
          els.map( el => el.innerHTML = transformContent(el, keyword))
          
        }
        
        function transformContent(el, keyword){
          let keywords = keyword.split('-')
          let temp = el.innerHTML
          // console.log(keywords)
          keywords.forEach(keyword => {
            temp = temp.replace(new RegExp(keyword, 'ig'), wrapKeywordWithHTML(keyword ))
          })
        
          return temp
        }
        
        function wrapKeywordWithHTML(keyword){
          return `<mark style="bg-yellow-300">${keyword}</mark>`
        }
    
    
        if (to.hash) {
          let el = await findEl(to.hash) 
          if ('scrollBehavior' in document.documentElement.style) {
            resolve(window.scrollTo({ top: el.offsetTop, behavior: 'smooth' }))
          } else {
            resolve(window.scrollTo(0, el.offsetTop))
          }
        } else {
          resolve(window.scrollTo(0, 0))
    
        }

      })
    })

  }
};
