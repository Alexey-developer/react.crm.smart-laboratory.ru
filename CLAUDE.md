# React CRM — инструкции для AI-ассистентов (адаптер)

Это **тонкий адаптер** для случая, когда Claude Code запущен из директории этого приложения. Источник правды — `../../docs/ai/react/` (то есть `smart-lab-crm/docs/ai/react/`).

## Порядок чтения

1. [`../../docs/ai/react/rules.md`](../../docs/ai/react/rules.md) — MUST / MUST NOT. **Читать первым перед любым изменением.**
2. [`../../docs/ai/react/overview.md`](../../docs/ai/react/overview.md) — стек, дерево, ключевые абстракции.
3. [`../../docs/ai/react/golden-paths.md`](../../docs/ai/react/golden-paths.md) — таблица сценарий → решение.
4. [`../../docs/ai/react/entity-pages.md`](../../docs/ai/react/entity-pages.md) — что создавать для новой сущности.
5. [`../../docs/ai/react/layers/`](../../docs/ai/react/layers/) — слой за слоем (api, components, pages, routing, redux, i18n, styles, skeleton, icons, utils, layout).
6. [`../../docs/ai/react/recipes/`](../../docs/ai/react/recipes/) — пошаговые сценарии для slash-команд.

## MCP

`context7` сконфигурирован в корне монорепо (`../../.mcp.json`). При сомнении в API библиотеки — спрашивать через `mcp__context7__resolve-library-id` / `get-library-docs`. Релевантные библиотеки: `react`, `typescript`, `@reduxjs/toolkit`, `react-redux`, `@tanstack/react-query`, `antd`, `i18next`, `react-i18next`, `react-router-dom`, `vite`, `ahooks`, `jodit-pro-react`, `react-content-loader`.

## Визуализация UI

`mcp__Claude_Preview__*` (preview_start/screenshot/click/fill/eval/console_logs/network) и `mcp__Claude_in_Chrome__*` (navigate/read_page/...) — для проверки реального UI.

Требуют запущенный dev-сервер. Узнать актуальный URL:
- Локально: `npm run dev` → обычно `http://localhost:5173`.
- В Docker: `docker compose ps` / `docker compose logs react` — порт зависит от маппинга в `docker-compose.yml`.

**Не предполагать `5173` по умолчанию** — сверять с фактическим запуском. Подробности — `../../docs/ai/react/overview.md` раздел «Визуализация UI».

## Slash-команды

В `.claude/commands/`:

- `/new-react-entity Name --type=CRUD|R` — создать API + страницы сущности.
- `/new-translation Key.Path "ru" "en"` — добавить ключ в оба словаря.
- `/new-redux-slice Name` — создать Redux slice.
- `/new-component Name` — создать переиспользуемый компонент.

## Язык

Документация — на русском. Имена классов/файлов/команд/код — на английском.
