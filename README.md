# AUTONOVA

Статический сайт-подборщик роботов для дома и сада. Готовые файлы сайта находятся в `dist/`; сторонние JavaScript-зависимости и серверная часть не требуются.

## Локальный запуск

Требуется Node.js 20 или новее.

```bash
npm run build
npm run dev
```

После запуска сайт будет доступен по адресу `http://127.0.0.1:4173`.

## Vercel

Импортируйте репозиторий в Vercel без дополнительных настроек. Корневой `vercel.json` запускает проверку и публикует директорию `dist`.

## Netlify

Импортируйте репозиторий в Netlify. Настройки из `netlify.toml` автоматически используют `npm run build` и директорию публикации `dist`.

## Cloudflare Pages

Репозиторий содержит `wrangler.toml` с `pages_build_output_dir = "./dist"`. При настройке через dashboard можно также оставить build command пустой и вручную указать output directory `dist`.

## GitHub Pages

В настройках репозитория Pages нужно один раз выбрать источник **GitHub Actions**, затем вручную запустить workflow **Deploy to GitHub Pages**. Он проверит и опубликует содержимое `dist`. Workflow намеренно не запускается при обычном push, пока Pages не включён в настройках репозитория.

## Docker и другие платформы

```bash
docker build -t autonova .
docker run --rm -p 8080:80 autonova
```

Для любого статического хостинга публикуйте содержимое директории `dist/`.
