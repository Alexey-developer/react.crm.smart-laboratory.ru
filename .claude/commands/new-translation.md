---
description: Добавить ключ перевода во все словари синхронно
argument-hint: Key.Path "ru" "en" "az" …
---

# /new-translation — добавить ключ перевода

Аргументы: `$ARGUMENTS` — путь ключа (dot-notation) и фразы для локалей из `LANG_OPTIONS`. Минимум спроси недостающие переводы. Пример: `Statuses.Invoice.draft "Черновик" "Draft" …`.

## Что делать

1. **Распарси аргументы.** Извлеки путь ключа и фразы. Список локалей — `src/redux/Language/languages.ts` (`LANG_OPTIONS`). Если фраз не хватает — спроси или переведи сам и покажи на ревью.

2. **Прочитай рецепт**: `../../../../docs/ai/react/recipes/add-translation.md`.

3. **Проверь, нет ли уже ключа** в `src/translations/ru/global.json`. Если есть — спроси пользователя:
   - Перезаписать значение?
   - Использовать существующий?
   - Использовать другой ключ?

4. **Прочитай все** `src/translations/*/global.json`.

5. **Добавь ключ во все файлы одновременно.** Структура JSON nested. Если родительская группа есть — добавить в неё. Если нет — создать с сохранением валидной JSON-структуры (запятые на месте).

6. **Покажи** добавленные фрагменты пользователю.

7. **Опционально** предложи: если ключ используется в нескольких местах — `grep -r 'Old.Key' src/` и заменить (или оставить как есть).

## Правила формирования ключа

- Формат: `Group.SubGroup.snake_case_key`.
- `self` — общее название группы (`MenuItems.WorkingWithCustomers.self`).
- Стандартные группы: `Common`, `Prepositions`, `Time`, `Items`, `MenuItems`, `AuthPage`, `Form.BtnTexts`, `Form.Errors`, `Form.EntitiesFields`, `Statuses.{Entity}`, `Types.{Entity}`, `Filters`, `Search`, `Actions`, `Statistics`, `HeaderProfile`, `Messages.{Info|Warnings|Errors}`.

## Если ключ для R-справочника (значение приходит с бэка)

Проверить, что значение PHP-enum'а на бэке (`app/Enums/Api/V1/{Entity}sEnum.php` в Laravel) точно совпадает с ключом. Эталоны: `ProjectStatusesEnum::IN_PROGRESS = 'Statuses.Project.in_progress'`.

## Чек-лист

- [ ] Ключ имеет смысловую группу.
- [ ] Добавлен во **все** `src/translations/*/global.json`.
- [ ] JSON синтаксически валиден (нет «висящих» запятых).
- [ ] Если приходит с бэка — совпадает с PHP-enum.

## Язык

Объяснения — русский, код — английский.
