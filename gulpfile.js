const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
//拷贝
gulp.task("copy", done => {
        gulp.src("index.html")
            .pipe(gulp.dest("dist"))
            .pipe(connect.reload());
        gulp.src("html/**")
            .pipe(gulp.dest("dist/html"))
            .pipe(connect.reload());

        gulp.src("file/**")
            .pipe(gulp.dest("dist/file"))
            .pipe(connect.reload());
        gulp.src("images/**")
            .pipe(gulp.dest("dist/images"))
            .pipe(connect.reload());
        gulp.src("js/**")
            .pipe(gulp.dest("dist/js"))
            .pipe(connect.reload());
        gulp.src("css/**")
            .pipe(gulp.dest("dist/css"))
            .pipe(connect.reload());
        done();
    })
    // 执行sass转css
gulp.task("sass", done => {

    gulp.src("sass/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"
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