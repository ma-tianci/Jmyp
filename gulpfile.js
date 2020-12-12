const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const htmlmin = require("gulp-htmlmin");
const minifycss = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

//拷贝
gulp.task("copy", done => {
        gulp.src("index.html")
        .pipe(htmlmin({ 
            removeComments: true,       // 清除HTML注释
            collapseWhitespace: true,   // 压缩HTML
            minifyJS: true,             // 压缩页面JS
            minifyCSS: true             // 压缩页面CSS
        }))
            .pipe(gulp.dest("dist"))
            .pipe(connect.reload());
        gulp.src("html/**")
        .pipe(htmlmin({ 
            removeComments: true,       // 清除HTML注释
            collapseWhitespace: true,   // 压缩HTML
            minifyJS: true,             // 压缩页面JS
            minifyCSS: true             // 压缩页面CSS
        }))
            .pipe(gulp.dest("dist/html"))
            .pipe(connect.reload());

        gulp.src("file/**")
        .pipe(minifycss())//压缩css
            .pipe(gulp.dest("dist/file"))
            .pipe(connect.reload());
        gulp.src("images/**")
        
            .pipe(gulp.dest("dist/images"))
            .pipe(connect.reload());
        gulp.src("js/**")
        .pipe(babel())
        .pipe(uglify())
            .pipe(gulp.dest("dist/js")).pipe(uglify())
            .pipe(connect.reload());
        gulp.src("css/**")
        .pipe(minifycss())//压缩css
            .pipe(gulp.dest("dist/css"))
            .pipe(connect.reload());
        done();
    })
    // 执行sass转css
gulp.task("sass", done => {

    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());

    done();
});
//开服务器
gulp.task("server", done => {

    connect.server({
        root: "dist",
        livereload: true
    })

    done();

});
// 监听
gulp.task("watch", done => {
    gulp.watch("index.html", gulp.series("copy"));
    gulp.watch("html/**", gulp.series("copy"));
    gulp.watch("file/**", gulp.series("copy"));
    gulp.watch("images/**", gulp.series("copy"));
    gulp.watch("js/**", gulp.series("copy"));
    gulp.watch("css/**", gulp.series("copy"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    done();
});

gulp.task("build", gulp.parallel("copy", "sass"));

gulp.task("default", gulp.series("build", "server", "watch"));