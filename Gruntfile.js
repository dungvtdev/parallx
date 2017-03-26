module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-include-source');

    grunt.initConfig({
        includeSource:{
            options:{
                basePath: "parallx",
                baseUrl: "parallx/",
            },
            myTarget: {
                files:{
                    './index.html': './index.tpl.html'
                }
            }
        }
    });

    grunt.registerTask('build', [
        'includeSource',
    ])
}
