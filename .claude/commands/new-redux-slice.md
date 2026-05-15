---
description: Создать новый Redux slice (slice.ts + selectors.ts + types.ts) и зарегистрировать в store
argument-hint: Name
---

# /new-redux-slice — создать Redux slice

Аргументы: `$ARGUMENTS` — `Name` (PascalCase, например, `Notifications`).

## Что делать

1. **Распарси аргументы.** Извлеки `Name`. Если не указано — спроси пользователя.

2. **Прочитай рецепт**: `../../../../docs/ai/react/recipes/add-redux-slice.md` и `../../../../docs/ai/react/layers/redux.md`.

3. **Уточни у пользователя**:
   - Какие поля хранить (`field1: string`, `field2: boolean`, и т.д.)?
   - Какие reducer'ы (set/toggle/clear)?
   - Нужен ли persist в `localStorage`?
   - Нужны ли сложная сериализация (Map/Set)?

4. **Открой эталон**:
   - Простой: `src/redux/Theme/` (slice + selectors + types).
   - Сложный с сериализацией: `src/redux/Filters/` (+ `helpers.ts` с Map↔string).

5. **Создай файлы** `src/redux/{Name}/`:
   - `types.ts` — `I{Name}SliceState` интерфейс + вспомогательные типы.
   - `slice.ts` — `createSlice` с initialState (опц. гидратация из localStorage), reducer'ами (опц. persist), экспорт actions и reducer.
   - `selectors.ts` — один селектор на поле.
   - (Опц.) `helpers.ts` — для сложной сериализации.

6. **Зарегистрируй в `src/redux/store.ts`**:
   - Импорт: `import {Name} from './{Name}/slice'`
   - В `reducer: { ..., {Name} }`.

7. **Покажи пользователю** созданные файлы и пример использования в компоненте:

```tsx
import { useDispatch, useSelector } from 'react-redux'
import { selectField } from '@redux/{Name}/selectors'
import { setField } from '@redux/{Name}/slice'

const field = useSelector(selectField)
dispatch(setField(value))
```

## Важно

- **`PayloadAction<T>`** в reducer'ах для типизации actions.
- **`localStorage`-persist** — в reducer'е сразу после `state.x = action.payload`, не в компоненте.
- **`useState`** для глобального state — запрещено; всегда через RTK.
- **Server-state (списки сущностей с API)** — НЕ хранить в Redux, использовать React Query.

## Язык

Объяснения — русский, код — английский.
