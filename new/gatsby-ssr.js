const React = require('react')

exports.onPreRenderHTML = function ({ getPreBodyComponents, replacePreBodyComponents }) {
  const preBodyComponents = getPreBodyComponents();

  replacePreBodyComponents([
    React.createElement('script', {
      key: 'prefers-color-scheme',
      dangerouslySetInnerHTML: {
        __html: `
(function() {
  function setMode(mode) {
    try {
      localStorage.setItem('theme-ui-color-mode', mode)
    } catch (err) {}
  }
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  darkQuery.addListener(function(e) {
    setMode(e.matches ? 'dark' : 'light')
  })
  setMode(darkQuery.matches ? 'dark' : 'light')
})()
        `,
      },
    }),
    ...preBodyComponents,
  ]);
};
