'use strict';
module.exports = function (grunt) {

	grunt.initConfig({

		distPath: 'dist',

		less: {
			dist: {
				files: {
					'<%=distPath%>/app.min.css': 'src/app/less/app.less'
				},
				options: {
					compress: true,
					yuicompress: true,
					sourceMap: true,
					sourceMapFilename: '<%=distPath%>/app.min.css.map',
					sourceMapRootpath: ''
				}
			}
		},

		autoprefixer: {
			dist: {
				src: '<%=distPath%>/app.min.css'
			},
			options: {
				browsers: ['last 3 version', 'ie 9'],
				map: {
					prev: '<%=distPath%>/',
					sourceContent: true
				}
			}
		},

		uglify: {
			client: {
				files: {
					'dist/app.min.js' : 'src/app/**/*.js'
				},
				options: {
					sourceMap: '<%=distPath%>/app.min.js.map',
					sourceMappingURL: 'app.min.js.map'
				}
			},
			angular: {
				files: {
					'dist/angular.min.js' : [
						'bower_components/angular/angular.js',
						'bower_components/angular-resource/angular-resource.js',
						'bower_components/angular-route/angular-route.js',
						//'bower_components/angular/angular.min.js',
						//'bower_components/angular/angular-resource.min.js',
						//'bower_components/angular/angular-route.min.js',
						//'js/lib/angular-gettext.min.js'
					]
				},
				options: {
					sourceMap: 'angular.min.js.map',
					sourceMappingURL: 'angular.min.js.map'
				}
			}
		},

		copy: {
			views: {
				expand: true,
				cwd: 'src/app/',
				src: '**/*.html',
				dest: '<%=distPath%>/'
			},
			server: {
				expand: true,
				cwd: 'src/',
				src: 'server/**/*.php',
				dest: '<%=distPath%>/'
			}
		},

		clean: [
			'<%=distPath%>/',
			//'index.html'
		],

		watch: {
			less: {
				files: [
					'src/app/**/*.less'
				],
				tasks: ['less', 'autoprefixer']
			},
			js_client: {
				files: 'src/app/**/*.js',
				tasks: ['uglify:client']
			},
			js_angular: {
				files: 'bower_components/angular/**/*.js',
				tasks: ['uglify:angular']
			},
			views: {
				files: 'src/app/**/*.html',
				tasks: ['copy:views']
			},
			server: {
				files: 'src/server/**/*.php',
				tasks: ['copy:server']
			},
			//nggettext: {
			//	files: 'views/*.html',
			//	tasks: ['nggettext_extract']
			//},
			//po: {
			//	files: 'lang/*.po',
			//	tasks: ['nggettext_compile']
			//},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'<%=distPath%>/**/*.css',
					'<%=distPath%>/**/*.js',
					'<%=distPath%>/**/*.html',
					'<%=distPath%>/**/*.php'
				]
			}
		},

		//nggettext_extract: {
		//	pot: {
		//		files: {
		//		'lang/plates-n-sheets.pot': ['views/*.html', 'js/client/*.js']
		//		}
		//	}
		//},
		//nggettext_compile: {
		//	all: {
		//		files: {
		//			'js/translations.js': ['lang/*.po']
		//		}
		//	},
		//},

	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-angular-gettext');

	// Register tasks
	grunt.registerTask('default', [
		'less',
		'autoprefixer',
		'uglify',
		'copy',
//		'nggettext_extract',
//		'nggettext_compile'
	]);

};
