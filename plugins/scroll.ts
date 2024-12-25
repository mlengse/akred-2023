function getTextNodes(node) {
  let textNodes = [];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  } else {
    for (let child of node.childNodes) {
      textNodes = textNodes.concat(getTextNodes(child));
    }
  }
  return textNodes
}

function listAllTextElements() {
  const textNodes = getTextNodes(document.body);
  const textContents = textNodes.filter( textNode => textNode.textContent.length > 0);
  return textContents;
}

async function findEl (hash: string, x = 100, document) {
  const el = document.querySelector(hash)

  if (!!el) {
    return el
  }

  const searchTexts = hash.split('#').join('').split('-')
  const searchText = searchTexts[0]
  const elems = listAllTextElements()
  const matchingElementArr = elems.filter(textNodes => {
    return textNodes.textContent.split(/\u00AD/g).join('').includes(searchText)
  });
  if (matchingElementArr.length) {
    return matchingElementArr[0].parentElement
  }
  if (x > 50) {
    return ''
  }
  return setTimeout(() => { findEl(hash, ++x || 1, document) }, 100)
}


function wrapKeywordWithHTML(keyword: string) {
  return `<mark style="bg-yellow-300">${keyword}</mark>`
}


export default defineNuxtPlugin(nuxtApp => {


  nuxtApp.hook('page:finish', async () => {
    if (window.location.hash.length) {
      const hash = window.location.hash
      const searchTexts = [...new Set([...hash.replace(/[^\w\d]/g, ' ').split(' '), ...hash.replace(/[^\w\d]/g, ' ').toLowerCase().split(' ')])].filter(w => w.length)
      for (const searchText of searchTexts) {
        const els = listAllTextElements().filter( textNode => textNode.textContent.split(/\u00AD/g).join('').includes(searchText))
        for(const el of els){
          el.parentElement.innerHTML = el.parentElement.innerHTML.split(/\u00AD/g).join('').split(searchText).join(wrapKeywordWithHTML(searchText))
      }
        
      }

    }

    if (window.location.hash.length) {
      const elto = await findEl(window.location.hash, 100, document) as HTMLElement
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: elto.offsetTop - 20, behavior: 'smooth' })
      } else {
        window.scrollTo(0, elto.offsetTop)
      }
    } else {
      window.scrollTo(0, 0)
    }
  })
})
