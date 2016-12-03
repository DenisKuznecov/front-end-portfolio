const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

//this is for compile sass to css with sourcemap and expanded css
gulp.task('styles', () => {
	gulp.src('src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest('bundle/css'));
});

gulp.task('js', () => {
	gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('bundle/js'));
});

gulp.task('watch', () => {
	gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('default', ['js', 'styles', 'watch']);

//this is prod task without sourcemap and with minified css
gulp.task('prod', () => {
	gulp.src('sass/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest('bundle/css'));
});

