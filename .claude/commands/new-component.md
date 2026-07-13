---
description: Создать новый переиспользуемый компонент в src/components/
argument-hint: Name
---

# /new-component — создать переиспользуемый компонент

Аргументы: `$ARGUMENTS` — `Name` (PascalCase, например, `InfoBadge`).

## Что делать

1. **Распарси аргументы.** Извлеки `Name`. Если не указано — спроси пользователя.

2. **Прочитай рецепт**: `../../../../docs/ai/react/recipes/add-component.md` и `../../../../docs/ai/react/layers/components.md`.

3. **Проверь, нет ли уже подходящего компонента** в `src/components/`. Если есть похожий — спроси пользователя:
   - Расширить существующий пропсом?
   - Создать новый вариант?
   - Создать с нуля?

4. **Уточни у пользователя**:
   - Какие props (имена + типы)?
   - Что внутри (форма / карточка / таблица / inline-элемент / др.)?
   - Нужен ли свой SCSS-module?
   - Нужны ли API/Redux обращения?
   - Нужны ли подкомпоненты?

5. **Создай папку** `src/components/{Name}/` и файлы:
   - `index.tsx` — named export, типизированные props, использование `getIcon`/`translated_phrase`/`useAPIQuery` где нужно.
   - (Опц.) `index.module.scss` — стили + `@import '@utils/scss/variables.scss'`.
   - (Опц.) Под-компоненты в той же папке.
   - **`{Name}.stories.tsx`** — если компонент UI-примитив (не app-chrome): минимум `Default` + варианты состояний. См. `docs/ai/react/layers/storybook.md`.

6. **Соблюдай правила**:
   - **Named export** (`export const {Name}: React.FC<...> = ...`).
   - Все строки через `translated_phrase('Key')`.
   - Все иконки через `getIcon('KEY')`.
   - Все API — `useAPIQuery`/`useAPIMutation` (через group-классы из `@api/models/...`).
   - Все Redux — `useSelector` с селекторами из `@redux/.../selectors`.
   - Все цвета/радиусы в SCSS — переменные из `@utils/scss/variables.scss`.
   - Поддержка обеих тем (`[data-theme='dark']` в SCSS).
   - Импорты — через `@aliases`.

7. **Покажи пример использования**:

```tsx
import { {Name} } from '@components/{Name}'

<{Name} prop1='...' prop2={...} />
```

## Чек-лист

- [ ] Папка `src/components/{Name}/` создана.
- [ ] `index.tsx` с named-export, типизированные props.
- [ ] (Опц.) `index.module.scss` с импортом variables.
- [ ] Используются helpers (`getIcon`, `translated_phrase`, `useAPIQuery`).
- [ ] Темизация (если есть стили цветов/фонов).
- [ ] Импорты только через `@aliases`.
- [ ] (Примитив) `{Name}.stories.tsx` создан, `npm run storybook` без ошибок.

## Язык

Объяснения — русский, код — английский.
