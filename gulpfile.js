"use strict"

const gulp = require("gulp"),
      htmlmin = require("gulp-htmlmin"),
      csso = require("gulp-csso"),
      imagemin = require("gulp-imagemin"),
      plumber = require("gulp-plumber"),
      del = require("del"),
      babel = require("gulp-babel"),
      server = require("browser-sync").create(),
      reload = server.reload,
      postcss = require("gulp-postcss"),
      posthtml = require("gulp-posthtml"),
      rename = require("gulp-rename"),
      sass = require("gulp-sass"),
      sourcemaps = require("gulp-sourcemaps"),
      autoprefixer = require("autoprefixer"),
      webp = require("gulp-webp"),
      uglify = require('gulp-uglify-es').default;


  gulp.task("refresh", (done) => {
    server.reload();
    done();
  });

//css
gulp.task("css", () => {
  return gulp.src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(reload({stream: true}))
});

//html
gulp.task("html", () => {
  return gulp.src("source/*.html")
        .pipe(htmlmin({collapseWhitespace: true }))
        .pipe(gulp.dest("build"))
});

//js
gulp.task("js", () => {
  return gulp.src("source/js/**/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("build/js"))
        .pipe(reload({stream: true}))
});

//image
gulp.task("images", () => {
  return  gulp.src("source/img/**/*.{png,jpg,svg}")
          .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
            ]))
          .pipe(gulp.dest("source/img"))
});

//webp
gulp.task("webp", () => {
  return gulp.src("source/img/**/*.{png,jpeg,jpg}")
        .pipe(webp({quality: 50}))
        .pipe(gulp.dest("source/img/"))
});

//copy
gulp.task("copy", () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
    ],

    {base: "source"},
    )
    .pipe(gulp.dest("build"))
});

//clean
gulp.task("clean", () => {
  return del("build")
});

//server
gulp.task("server", () => {
  server.init({
    server: "build",
    open: true,
    notify: false,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css","refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("js","refresh"));
  gulp.watch("source/*.html", gulp.series("html","refresh"));
});

//build
gulp.task("build", gulp.series("clean","copy","css","html","js"));
//start
gulp.task("start", gulp.series("build","server"));
