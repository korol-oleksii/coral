//Основные модули
import gulp from "gulp";
//Импорт путей
import { path } from "./gulp/config/path.js";
//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),//режим Production (прод)
	isDev: !process.argv.includes('--build'),//режим Разработчика (development)
	path: path,
	gulp: gulp,
	plugins: plugins
}

//Импортируем задачи
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { css } from "./gulp/tasks/css.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { copyJs } from "./gulp/tasks/copyJs.js";
import { images } from "./gulp/tasks/images.js";
import { copyFonts } from "./gulp/tasks/copyFonts.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";

//Наблюдатель за изменения в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.css, css);
	gulp.watch(path.watch.css, copyJs);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

//Экспортируем как отдельная задача. Вызов: npm run svgSprive или для DEV режима:
// npm run dev
export { svgSprive }

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, css, scss, js, copyJs, images, copyFonts));

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

//Экспорт сценариев разработчика и продакшна
export { dev }   // npm run dev
export { build } // npm run build

//Выполнение сценария по умолчания: gulp
gulp.task("default", dev);