// 设置项目属性
fis.set('project.name', 'fis3-conf');
fis.set('project.static', '/static');
fis.set('project.ignore', ['node_modules/**','static/vendor/**','output/**','static/less/**', '.git/**', 'fis-conf.js', 'output.zip']); // set 为覆盖不是叠加


/*******************         内置语法    ******************************/
// FIS 中前端模板推荐预编译为 js，所以应该使用 js 的内置语法
fis.match('*.tmpl,*.tpl', {
    isJsLike: true
});

fis.match('*.{sass,less}', {
    isCssLike: true
});

fis.match('*.xxhtml', {
    isHtmlLike: true
});

/*******************         预处理    ******************************/
fis.match('*.less', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('less'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
});

fis.match('*.es6', {
    parser: fis.plugin('translate-es6', {
        presets: ['es2015']
    }),
    rExt: '.js' // .es6 最终修改其后缀为 .js
});





/*  文件指纹 useHash */
fis.media('prod').match('*.{html,js,css,png,gif}', {
    useHash: true // 开启 md5 戳
});


/* 资源压缩 */

// 启用 fis-spriter-csssprites 插件
fis.media('prod').match('::package', {
    spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.media('prod').match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});

fis.media('prod').match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
});

fis.media('prod').match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
});

fis.media('prod').match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});


/* ---------------------------- 资源合并文件 ---------------------------- */

// 手工定义打包map
fis.match('::package', {
    packager: fis.plugin('map', {
        '/static/js/plugins.js': [
            '/static/vendor/wow/dist/wow.min.js',
            '/static/vendor/jquery-mousewheel/jquery.mousewheel.min.js',
            '/static/vendor/jquery-easing/jquery.easing.min.js',
            '/static/vendor/classie/classie.js',
            '/static/vendor/jquery_lazyload/jquery.lazyload.js',
            '/static/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
            '/static/vendor/hogan.js/web/builds/3.0.1/hogan-3.0.1.js',
            '/static/vendor/lodash/dist/lodash.min.js',
            '/static/vendor/jquery.cookie/jquery.cookie.js'
        ]
    })
});

// release 目录设置
fis.match('*', {
    deploy:[
        fis.plugin('local-deliver', {
            to: 'output'
        })
    ]
});

fis.media('prod').match('*', {
    deploy:[
        fis.plugin('zip', {
            filename: 'output.zip', //用来配置打包的文件名(默认为 all.zip )
            keep: true, //是否保留零碎文件(默认为 false)
        }),

        fis.plugin('local-deliver', {
            to: 'output'
        })
    ]
});