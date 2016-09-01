module.exports = {
    app: {
        scripts: {
            src: {
                globs: [
                    'app/**/*.js'
                ],
                options: {
                    base: 'app'
                },
            },
            order: {
                globs: [
                    'app.module.js',
                    '**/*.module.js',
                    '**/*.js'
                ]
            },
            sourcemaps: {
                path: '.',
                options: {
                    includeContent: false,
                    sourceRoot: '../app'
                }
            },
            templates: {
                globs: [
                    'app/**/*.html'
                ],
                file: 'templates.js',
                options: {
                    root: 'app',
                    module: 'app'
                }
            },
            output: {
                dev: 'app.js',
                prod: 'app.min.js'
            }
        },
        styles: {
            src: {
                globs: [
                    'styles/**/*.scss'
                ],
                options: {
                    base: 'css'
                },
            },
            sass: {
                sourceMap: true,
                sourceMapContents: false,
                sourceMapRoot: '../css'
            },
            sourcemaps: {
                path: '.',
                options: {
                    includeContent: false,
                    sourceRoot: '../css'
                }
            },
            output: 'app.min.css'
        }
    },
    vendor: {
        scripts: {
            src: {
                globs: [
                    'node_modules/angular/angular.js',
                    'node_modules/angular-aria/angular-aria.js',
                    'node_modules/angular-animate/angular-animate.js',
                    'node_modules/angular-material/angular-material.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.js'
                ],
                options: {
                    base: 'js'
                }
            },
            sourcemaps: {
                path: '.',
                options: {
                    includeContent: false,
                    sourceRoot: '../node_modules'
                }
            },
            output: {
                dev: 'vendor.js',
                prod: 'vendor.min.js'
            }
        },
        styles: {
            src: {
                globs: [
                    'node_modules/angular-material/angular-material.css'
                ],
                options: {
                    base: 'css'
                },
            },
            sourcemaps: {
                path: '.',
                options: {
                    includeContent: false,
                    sourceRoot: '../css'
                }
            },
            output: 'vendor.min.css'
        }
    },
    paths: {
        output: 'dist',
    }
};