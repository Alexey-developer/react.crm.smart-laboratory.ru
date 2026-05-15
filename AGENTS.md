# React CRM — инструкции для AI-ассистентов (адаптер для Codex/прочих)

Идентичен `CLAUDE.md`. Источник правды — `../../docs/ai/react/`.

## Порядок чтения

1. [`../../docs/ai/react/rules.md`](../../docs/ai/react/rules.md) — MUST / MUST NOT.
2. [`../../docs/ai/react/overview.md`](../../docs/ai/react/overview.md) — стек и архитектура.
3. [`../../docs/ai/react/golden-paths.md`](../../docs/ai/react/golden-paths.md) — частые сценарии.
4. [`../../docs/ai/react/entity-pages.md`](../../docs/ai/react/entity-pages.md) — добавление сущности на фронт.
5. [`../../docs/ai/react/layers/`](../../docs/ai/react/layers/) — слой за слоем.
6. [`../../docs/ai/react/recipes/`](../../docs/ai/react/recipes/) — пошаговые рецепты.

## MCP

`context7` (см. `../../.mcp.json`) — для запросов API React-стека. Визуализация — `mcp__Claude_Preview__*` / `mcp__Claude_in_Chrome__*` при запущенном dev-сервере (локально `npm run dev` → `localhost:5173`, либо в Docker → порт из `docker compose ps`). Не предполагать `5173` по умолчанию.

## Язык

Русский для пояснений, английский для имён классов/файлов/команд/кода.
