var gulp       = require('gulp');
var copy       = require("gulp-copy");


gulp.task('semanticui', function() {
  return gulp.src("bower_components/semantic-ui/dist/**")
    .pipe(copy("build/"));
});
