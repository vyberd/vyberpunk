var remark_config = {
	host: 'https://comments.varigergo.hu',
	site_id: 'blog.varigergo.hu',
	components: ['embed'],
	no_footer: true,
	theme: 'dark',
	locale: 'en'
}
!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);
