(function(){
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const script = document.createElement('SCRIPT')
      script.setAttribute('src', 'https://js.hcaptcha.com/1/api.js')
      document.querySelector('body').appendChild(script)
    }, 1000);
  })
})()