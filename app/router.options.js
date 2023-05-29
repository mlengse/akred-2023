export default {
  async scrollBehavior (to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hook('page:finish', async () => {
        if (savedPosition) {
          return savedPosition
        }
    
        const getElementsWithNoChildren = (target) => {
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
          if(!!el){
            return el
          }
          console.log(hash)
          let searchText = hash.split('#').join('')
          let elems = getElementsWithNoChildren(document)
          let matchingElementArr = Array.from(elems).filter(v => v.textContent.includes(searchText));
          let matchingElement = false
          if(matchingElementArr.length){
            matchingElement = matchingElementArr[0]
            console.log(searchText, !!matchingElement)
            return matchingElement
          }
          if (x > 50) {
            return ''
          }

          return setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
        }
        function highlight(el, keyword){
          el.innerHTML = transformContent(el, keyword)
          // console.log('highlight')
        }
        
        function transformContent(el, keyword){
          let keywords = keyword.split('-')
          let temp = el.innerHTML
          console.log(keywords)
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
          let searchText = to.hash.split('#').join('')
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
            resolve(highlight(el, searchText))
          } else {
            window.scrollTo(0, el.offsetTop)
            resolve(highlight(el, searchText))
          }
        } else {
          resolve(window.scrollTo(0, 0))
    
        }

      })
    })

  }
};
