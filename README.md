# Airlines Search Widget

### Установка виджета

Для работы виджета необходимо любым удобным способом подключить на страницу файлы из папки `dist`:
* файл стилизации виджета: `airlines.search.widget.min.css`
* файл с JavaScript-кодом виджета: `airlines.search.widget.min.js`
* в той же папке, где будет расположен файл стилизации, следует разместить папку `images`, необходимую для корректного отображения изображений

### Инициализация виджета на странице

При подключении файла `airlines.search.widget.min.js`, на странице становится доступен JavaScript-объект `AirlinesSearchWidget` с единственным методом `init`, запускающим инициализацию виджета.

Пример инициализации виджета: 

```html
<div id="root"></div>
<link rel="stylesheet" href="airlines.search.widget.min.css">
<script src="airlines.search.widget.min.js"></script>
<script>
    AirlinesSearchWidget.init({
        API_URL: 'http://widget.mlsd.ru/api',
        rootElement: document.getElementById('root'),
        showAirportIATA: true,
        enableInfantsWithSeats: true,
        locale: 'ru'
    });
</script>
```

Также, пример инициализации виджета приведен в файле `/dist/index.html`

### Конфигурация

В метод `init` передается объект конфигурации виджета. Возможные параметры конфигурации:

| Название параметра | Обязательный параметр | Типа значения | Значение по умолчанию | Описание |
|:------------- |:------------- |:----- | :----- | :----- |
| API_URL      | да | `string` | - | Адрес для API запросов |

### Команды для разработки

* `npm run build` — генерирует минифицированные CSS и JavaScript пакеты в папку `/dist/`
* `npm run build-dev` — генерирует полноразмерные CSS и JavaScript пакеты, и Webpack начинает отслеживать изменения в файлах (`watch: true`)
* `npm run server` — запускает Express-сервер в корне проекта и сразу же открывает браузер на `http://localhost:5555`
* `npm run dev` — **использовать для разработки**: запускает Express-сервер, открывает браузер и запускает Webpack в `dev` режиме (аналогично `npm run server && npm run build-dev`)
