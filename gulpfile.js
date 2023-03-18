var gulp = require('gulp');
var through = require('through2');
var rename = require("gulp-rename");

function defaultTask(cb) {
    javascript(cb);
}

function javascript(cb) {

    gulp.src('./src/a.js')
        .pipe(through.obj(function (file, encode, cb) {
            // 显示当前的文本内容
            console.log(file.contents.toString())
            // 文本内容转为字符串
            var result = file.contents.toString()
            // 添加了一点东西
            result += ' => I add some words here!'
            // 再次转为Buffer对象，并赋值给文件内容
            file.contents = new Buffer.from(result)
            // 以下是例行公事
            this.push(file)
            cb()
        }))
        .pipe(through.obj(function (file, encode, cb) {
            // 显示当前的文本内容（这次显示的是修改后的）
            console.log(file.contents.toString())
            this.push(file)
            cb()
        }))
        // 重命名a.js文件为b.js
        .pipe(rename("b.js"))
        // 把文件写到一个新的文件夹里（不影响原有的），目录是modified-files
        .pipe(gulp.dest('gulp-output-files'));

    cb();
}

function watchJavascriptTask() {
    gulp.watch('./src/**/*.js', javascript);
}

exports.watchJavascriptTask = watchJavascriptTask;
exports.default = defaultTask;
