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
          // console.log(hash)
          let searchText = hash.split('#').join('')
          let elems = getElementsWithNoChildren(document)
          let matchingElementArr = Array.from(elems).filter(v => v.textContent.includes(searchText));
          let matchingElement = false
          if(matchingElementArr.length){
            matchingElement = matchingElementArr[0]
            // console.log(searchText, !!matchingElement)
            return matchingElement
          }
          return new Promise((resolve, reject) => {
              if (x > 50) {
                return resolve('')
              }
              setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
            })
        }
        function highlight(keyword){
          document.querySelector('article.page-body').innerHTML = transformContent(keyword)
          // console.log('highlight')
        }
        
        function transformContent(keyword){
          let temp = document.querySelector('article.page-body').innerHTML.replace(new RegExp(keyword, 'ig'), wrapKeywordWithHTML(keyword))
        
          return temp
        }
        
        function wrapKeywordWithHTML(keyword){
          return `<mark style="bg-yellow-300">  ${keyword}  </mark>`
        }
    
    
        if (to.hash) {
      
          let el = await findEl(to.hash) 
          let searchText = to.hash.split('#').join('')
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
            resolve(highlight(searchText))
          } else {
            window.scrollTo(0, el.offsetTop)
            resolve(highlight(searchText))
          }
        } else {
          resolve(window.scrollTo(0, 0))
    
        }

      })
    })

  }
};