module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		assets: {
			js: 	'app/assets/js',
			css: 	'app/assets/css',
			img: 	'app/assets/img',
			vendor: 'app/assets/vendor'
		},

		src: {
			styl: 	'app/src/styl',
			img: 	'app/src/img',
			js: 	'app/src/js',
			vendor: 'app/src/vendor'
		},

		stylus: {
			dev: {
				options: {
					compress: true,
					urlfunc: 'embedurl'
				},
				files: {
					'<%= assets.css %>/style.css': '<%= src.styl %>/style.styl'
				}
			}
		},

		concat: {
			js: {
				files: {
					'<%= assets.js %>/all.combined.js': [
						'<%= src.vendor %>/jquery.min.js',
						'<%= src.vendor %>/jquery.easing.js',
						'<%= src.js %>/plugins.js',
						'<%= src.js %>/main.js'
					]
				}
			},
            css: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> - by Rodrigo Felipe */\n'
                },
                files: {
                    '<%= assets.css %>/style.css': [
                        '<%= assets.css %>/style.css'
                    ]
                }
            }
		},


		uglify: {
			js: {
                options: {
                    mangle: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> - by Rodrigo Felipe */\n'
                },
				files: {
					'<%= assets.js %>/all.combined.js' : ['<%= assets.js %>/all.combined.js']
				}
			}
		},

		sprite: {
			all: {
				src: '<%= src.img %>/sprite/*.png',
				dest: '<%= assets.img %>/sprite.png',
				destCss: '<%= src.styl %>/utils/sprite.styl',
				imgPath: '../img/sprite.png',
				cssFormat: 'stylus',
				algorithm: 'binary-tree',
				padding: 2
			}
		},

		watch: {
			styl: {
				files: '<%= src.styl %>/{,*/}*.styl',
				tasks: 'dev-deploy',
				options: {
					livereload: true
				}
			},
			js: {
				files: '<%= src.js %>/{,*/}*.js',
				tasks: 'dev-deploy',
				options: {
					livereload: false
				}
			},
			sprite: {
				files: '<%= src.img %>/sprite/*',
				tasks: 'dev-deploy-sprite'
			}
		},

		htmlmin: {
		    dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
	                cwd: 'app/',
	                src: ['**/*.php'],
	                dest: 'dist/'
				}],
		    }
	  	}, // htmlmin

	  	imagemin: {
			dist: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					cwd: "app/images/",
	                src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.ico'],
	                dest: 'dist/images/'
				}],
			}
		}, //imagemin

        copy: {
            dist: {
                expand: true,
                cwd: "app/assets/",
                src: "**",
                dest: 'dist/assets/',
            }
        }

	});

	// Plugins do Grunt
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
  	grunt.loadNpmTasks('grunt-contrib-imagemin');
  	grunt.loadNpmTasks('grunt-contrib-copy');

	// grunt developement
	grunt.registerTask('dev', [
		'watch'
	]);

	grunt.registerTask('dev-deploy-sprite', ['sprite']);
	grunt.registerTask('dev-deploy', ['stylus:dev', 'concat:css', 'concat:js']);

	// grunt build
	grunt.registerTask('deploy', [
		'sprite',
		'stylus:dev',
		'concat:css',
		'concat:js',
		'uglify',
        'htmlmin',
        'imagemin',
        'copy:dist'
	]);

};
