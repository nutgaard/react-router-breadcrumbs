module.exports = function (wallaby) {
    return {
        files: ['test/.setup.js', 'src/**/*.js'],
        tests: ['test/**/*-test.js'],

        env: {
            type: 'node'
        },
        setup: () => {
            require('babel-polyfill');
        },
        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babel: require('babel-core'),
                babelrc: true
            })
        }
    };
};

