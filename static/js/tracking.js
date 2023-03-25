const url = document
  .querySelector('script[data-id="matomo"]')
  .getAttribute('data-matomo-url');
const id = document
  .querySelector('script[data-id="matomo"]')
  .getAttribute('data-matomo-id');

var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

(function() {
	_paq.push(['setTrackerUrl', url+'/matomo.php']);
	_paq.push(['setSiteId', id]);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();
