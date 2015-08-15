module.exports = function (grunt) {
    grunt.initConfig({

        meta: {
            // general
            appName:            'YourProjectName',
            appNameMin:         '<%= meta.appName %>.min',
            framework:          'bootstrap',
            tempDir:            'temp',

            //fonts
            fontSrc:           'fonts/',
            fontDist:          '<%= meta.Dist %><%= meta.fontSrc %>',

            // css
            cssName:            '.css',
            cssDist:            'dist/css/',
            appCssDist:         '<%= meta.appName %><%= meta.cssName %>',

            // preprocessor
            preprocessorName:   '.less',
            cssSrc:             'less/',
            appCssSrc:          '<%= meta.appName %><%= meta.preprocessorName %>',

            // js
            jsName:             '.js',
            jsDist:             'dist/js/',
            jsSrc:              'js/',
            appJsDist:          '<%= meta.appName %><%= meta.jsName %>',
            appJsSrc:           '<%= meta.appName %><%= meta.jsMinName %>',

            // images
            imgDir:             'img/tomin/',
            imgDirDist:         'dist/img/',

            // deploy
            Dist:               'dist/',
            productionDist:     '/wp-content/themes/YOURDIRECTORY/dist/',
            host:               'reclamar.ftp.ukraine.com.ua'
        },

        less: {

            dev: {

                options: {
                    compress: false,
                    cleancss: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: '<%= meta.cssDist %><%= meta.appCssDist %>.map',
                    sourceMapURL: '<%= meta.appCssDist %>.map'
                },
                files: [{
                    src: '<%= meta.cssSrc %><%= meta.appCssSrc %>',
                    dest: '<%= meta.cssDist %><%= meta.appCssDist %>'
                }]

            },

            production: {

                options: {
                    compress: true,
                    cleancss: true,
                    sourceMap: false
                },
                files: [{
                    src: '<%= meta.cssSrc %><%= meta.appCssSrc %>',
                    dest: '<%= meta.cssDist %><%= meta.appCssDist %>'
                }]
            }
        },

        postcss: {
            options: {
                map: true,

                processors: [
                    require('autoprefixer-core')({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'ios 7', 'android 4']}),
                ]

            },
            dist: {
                src: '<%= meta.cssDist %>*<%= meta.cssName %>'
            }
        },

        concat: {
            js:{
                src:  '<%= meta.jsSrc %>**/*<%= meta.jsName %>',
                dest: '<%= meta.jsDist %><%= meta.appName%>.tmp<%= meta.jsName %>'
            }
        },

        uglify: {
            js: {
                files: [{
                    dest: '<%= meta.jsDist %><%= meta.appNameMin %><%= meta.jsName %>',
                    src:  '<%= meta.jsDist %><%= meta.appName%>.tmp<%= meta.jsName %>'
                }]
            }
        },

        "ftp-deploy": {
            dev: {
                auth: {
                    host: '<%= meta.host %>',
                    port: 21,
                    authKey: 'key'
                },
                src: '<%= meta.Dist %>',
                dest: '<%= meta.Dist %>',
                exclusions: ['<%= mete.fontDist %>**/*']
            },
            production: {
                auth: {
                    host: '<%= meta.host %>',
                    port: 21,
                    authKey: 'keyProd'
                },
                src: '<%= meta.Dist %>',
                dest: '<%= meta.productionDist %>',
                exclusions: ['<%= mete.fontDist %>**/*']
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.imgDir %>',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= meta.imgDirDist %>'
                    }
                ]
            }
        },

        mkdir: {
            all: {
                options: {
                    create: ['fonts', 'js', 'images', 'img/tomin', 'dist/js', 'dist/css', 'dist/img' ]
                }
            }
        },

        copy: {
            jsFile: {
                expand: true,
                cwd: 'temp',
                src: 'scripts<%= meta.jsName %>',
                dest: '<%= meta.jsSrc %>',
                filter: 'isFile'
            },
            sourceFile: {
                expand: true,
                cwd: 'temp',
                src: 'styles<%= meta.preprocessorName %>',
                dest: '<%= meta.cssSrc %>',
                filter: 'isFile'
            },

            bootstrap: {
                expand: true,
				cwd: 'bower_components/bootstrap/less/',
                src: '**',
                dest: '<%= meta.cssSrc %>bootstrap/',
                filter: 'isFile'
            },
            fontAwesomeSource: {
                expand: true,
                cwd: 'bower_components/font-awesome/less/',
                src: '**',
                dest: '<%= meta.cssSrc %>font-awesome',
                filter: 'isFile'
            },
            fontAwesomeFonts:{
                files:[
                    { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: 'fontawesome-webfont.woff2', dest: '<%= meta.fontSrc %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: 'fontawesome-webfont.woff', dest: '<%= meta.fontSrc %>', filter: 'isFile' }
                ]
            },
            fonts:{
                expand: true,
                cwd: '<%= meta.fontSrc %>',
                src: '**',
                dest: '<%= meta.fontDist %>',
                filter: 'isFile'
            },
            tempFiles:{
                files:[
                    { expand: true, cwd: 'temp', src: 'dev-extend<%= meta.preprocessorName %>',    	dest: '<%= meta.cssSrc %><%= meta.framework %>/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: 'dev-variables<%= meta.preprocessorName %>', 	dest: '<%= meta.cssSrc %><%= meta.framework %>/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: 'fonts<%= meta.preprocessorName %>',         	dest: '<%= meta.cssSrc %><%= meta.framework %>/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: 'media-rules<%= meta.preprocessorName %>',   	dest: '<%= meta.cssSrc %><%= meta.framework %>/mixins/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: 'dev-mixins<%= meta.preprocessorName %>',    	dest: '<%= meta.cssSrc %><%= meta.framework %>/mixins/', filter: 'isFile'},
					{ expand: true, cwd: 'temp', src: 'magnific-popup<%= meta.preprocessorName %>', dest: '<%= meta.cssSrc %>magnific-popup/', filter: 'isFile'},
					{ expand: true, cwd: 'temp', src: 'owl-carousel<%= meta.preprocessorName %>',   dest: '<%= meta.cssSrc %>owl-carousel/', filter: 'isFile'},
                ]
            },

            owlCarousel: {
				files:[
					{ expand: true, cwd: 'bower_components/owl-carousel/owl-carousel', src: 'owl.carousel<%= meta.cssName %>',  dest: '<%= meta.cssSrc %>owl-carousel/', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/owl-carousel/owl-carousel', src: 'owl.theme<%= meta.cssName %>', 	dest: '<%= meta.cssSrc %>owl-carousel/', filter: 'isFile' },
				]
            },
			
            magnificPopUp: { expand: true, cwd: 'bower_components/magnific-popup/dist', src: 'magnific-popup<%= meta.cssName %>', dest: '<%= meta.cssSrc %>magnific-popup', filter: 'isFile' }
        },
        rename: {
            sourceFile:{
                src: '<%= meta.cssSrc %>styles<%= meta.preprocessorName %>',
                dest: '<%= meta.cssSrc %><%= meta.appName %><%= meta.preprocessorName %>'
            },
            sourceJs:{
                src: '<%= meta.jsSrc %>scripts<%= meta.jsName %>',
                dest: '<%= meta.jsSrc %><%= meta.appName %><%= meta.jsName %>'
            }
        },

        clean: {
            css: 	[ '<%= meta.cssDist %>' ],
            start: 	['<%= meta.cssDist %>**/*', '<%= meta.jsDist %>**/*'],
            tmp: 	[ '<%= meta.jsDist %><%= meta.appName%>.tmp<%= meta.jsName %>' ],
            lessSrc: ['bower_components/bootstrap/less/'],
			fa: ['bower_components/font-awesome/less'],
			files: [
                '<%= meta.tempDir %>',
                '<%= meta.cssSrc %>font-awesome/path.less'
            ],
            img: [ '<%= meta.imgDir %>' ]
        },

        watch: {
            dev:{
                files: [ '<%= meta.cssSrc %>', '<%= meta.cssSrc %>{,*/,*/*/}*{<%= meta.preprocessorName %>,<%= meta.cssName %>}', '<%= meta.jsSrc %>**/*<%= meta.jsName %>' ],
                tasks: [ 'clean:css', 'less:dev', 'postcss' /* , 'ftp-deploy:dev'*/ ]
            },
            //production:{
            //    files: [ '<%= meta.cssSrc %>', '<%= meta.cssSrc %>{,*/,*/*/}*{<%= meta.preprocessorName %>}', 'js/**/*.js' ],
            //    tasks: [ 'clean:css', 'less:production', 'postcss', 'concat:js', 'uglify:js', 'clean:tmp' 'ftp-deploy:production']
            //}
        }

    });


    require('load-grunt-tasks')(grunt);
    require('grunt-register-tasks')(grunt, {

        default: [
            'clean:css', 'less:dev', 'postcss' /* , 'ftp-deploy:dev'*/
        ],

        production: [
            'clean:start', 'less:production', 'postcss', 'concat:js', 'uglify:js', 'clean:tmp' /* , 'ftp-deploy:production'*/
        ],

        init: [
            'mkdir',
            'copy:jsFile',
            'copy:sourceFile',
            'rename:sourceFile',
            'rename:sourceJs',
			'copy:bootstrap',
			'copy:fontAwesomeSource',
            'copy:fontAwesomeFonts',
            'copy:owlCarousel',
            'copy:magnificPopUp',
			'copy:tempFiles',
			'clean:lessSrc',
			'clean:files'
        ],
        copyfont: 		'copy:fonts',
		deleteRepeat: 	[ 'clean:lessSrc', 'clean:fa' ],
		image: 			[ 'imagemin:png', 'clean:img' ]

    });

};