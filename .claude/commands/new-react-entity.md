---
description: Создать новую сущность на фронте (API-группа + страницы) согласно эталону Project
argument-hint: Name --type=CRUD|R
---

# /new-react-entity — создать сущность на фронте

Аргументы: `$ARGUMENTS` — формат `Name --type=CRUD|R` (например, `Invoice --type=CRUD` или `PaymentMethod --type=R`).

## Что делать

1. **Распарси аргументы.** Извлеки `Name` (PascalCase) и `--type` (CRUD или R). Если `--type` не указан/некорректен — попроси пользователя уточнить и остановись.

2. **Убедись, что соответствующая сущность создана на бэке.** Спроси пользователя или проверь:
   - Для CRUD: есть ли `app/Models/Api/V1/{Name}.php` в Laravel-приложении?
   - Для R: есть ли модель с `USE_PAGINATION=false`?
   - Если нет — сначала создать на бэке через `/new-entity` (см. Laravel-онтологию).

3. **Прочитай рецепт.** В зависимости от `--type`:
   - CRUD → `../../../../docs/ai/react/recipes/add-react-entity.md`
   - R → `../../../../docs/ai/react/recipes/add-react-r-entity.md`

4. **Открой эталон.** Для CRUD — `src/api/models/project/` + `src/pages/entities/projects/`. Для R — `src/api/models/projectStatus/`.

5. **Создай файлы** по чек-листу из соответствующего recipe'а:

### Для CRUD (`--type=CRUD`)

- `src/api/models/{entity}/queryGroup/index.ts` — group-класс implements `ICRUDModel`.
- `src/api/models/{entity}/params/T{Entity}Params.ts`.
- `src/api/models/{entity}/responseModels/T{Entity}Response.ts`.
- `src/api/models/{entity}/type/T{Entity}.ts` — типы полей сущности (сверять с Laravel Resource).
- `src/api/models/{entity}/type/T{Entity}Filter.ts`.
- `src/utils/constants/routes.ts` → добавить `export const {ENTITY_PLURAL_UPPER} = '{kebab-plural}'`.
- `src/utils/getIcon.ts` → добавить case в `IconEnum`, если иконки нет.
- `src/pages/entities/{entity-plural}/helpers/index.tsx` — `getFormItems`, `getIconType`.
- `src/pages/entities/{entity-plural}/create/index.tsx`.
- `src/pages/entities/{entity-plural}/edit/{index.tsx, formSkeleton.tsx}`.
- `src/pages/entities/{entity-plural}/index/{index.tsx, FormContent.tsx}`.
- `src/pages/entities/{entity-plural}/show/{index.tsx, formSkeleton.tsx}`.
- `src/utils/formLeftMenuItems.ts` → добавить пункт меню (опц.).

### Для R (`--type=R`)

- `src/api/models/{entity}/queryGroup/index.ts` — implements `IBaseModel`.
- `src/api/models/{entity}/responseModels/T{Entity}Response.ts`.
- `src/api/models/{entity}/type/T{Entity}.ts`.
- (Опц.) `src/utils/getCheckboxFilterType.ts` или `getSelectFilterType.ts` → добавить case.

### Общее для обоих типов

- **`src/api/common/types/TGroups.ts`** — обязательно добавить `{Entity}Group` в **оба** union'а (`GroupClass`, `GroupMethod`). Без этого TS не выведет тип.
- **`src/App.tsx`** (только для CRUD) — добавить lazy-импорты 4 page-компонентов + запись в массив `routes`.
- **`src/translations/ru/global.json` И `src/translations/en/global.json`** — синхронно добавить:
  - `MenuItems.{entityPlural}` (если есть пункт меню)
  - `Form.EntitiesFields.{each_field}` для каждого поля формы (CRUD)
  - `Statuses.{Entity}.*`, `Types.{Entity}.*` если R-справочники приходят с бэка с этими ключами.

6. **Не предполагай поля.** Если не знаешь, какие поля у сущности — спроси пользователя или прочитай Laravel-Resource и миграцию соответствующей таблицы.

7. **В конце**:
   - Покажи список созданных/изменённых файлов.
   - Предложи запустить `npm run dev` и проверить через `mcp__Claude_Preview__*` или `mcp__Claude_in_Chrome__*`.

## Важно

- **Не использовать** `useQuery`/`useMutation` напрямую — только `useAPIQuery`/`useAPIMutation`.
- **Не использовать** `axios`/`fetch` напрямую — только через group-класс.
- **Ключи переводов** — в **оба** словаря синхронно.
- **Иконки** — только через `getIcon('KEY')`, никаких прямых `'fa-solid fa-...'`.
- **URI** — только через константы `@utils/constants/routes`.
- **Импорты** — только через `@aliases`.

## Язык

Объяснения пользователю — на русском; имена классов/файлов/команд — на английском.
