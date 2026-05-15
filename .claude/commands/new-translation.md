---
description: Добавить ключ перевода в оба словаря (ru и en) синхронно
argument-hint: Key.Path "ru-фраза" "en-phrase"
---

# /new-translation — добавить ключ перевода

Аргументы: `$ARGUMENTS` — формат `Key.Path "ru-phrase" "en-phrase"`. Пример: `Statuses.Invoice.draft "Черновик" "Draft"`.

## Что делать

1. **Распарси аргументы.** Извлеки путь ключа (dot-notation), русскую фразу, английскую фразу. Если что-то не указано — спроси пользователя.

2. **Прочитай рецепт**: `../../../../docs/ai/react/recipes/add-translation.md`.

3. **Проверь, нет ли уже ключа** в `src/translations/ru/global.json`. Если есть — спроси пользователя:
   - Перезаписать значение?
   - Использовать существующий?
   - Использовать другой ключ?

4. **Прочитай оба файла** целиком:
   - `src/translations/ru/global.json`
   - `src/translations/en/global.json`

5. **Добавь ключ в оба файла одновременно.** Структура JSON nested. Если родительская группа есть — добавить в неё. Если нет — создать с сохранением валидной JSON-структуры (запятые на месте).

6. **Покажи** оба добавленных фрагмента пользователю.

7. **Опционально** предложи: если ключ используется в нескольких местах — `grep -r 'Old.Key' src/` и заменить (или оставить как есть).

## Правила формирования ключа

- Формат: `Group.SubGroup.snake_case_key`.
- `self` — общее название группы (`MenuItems.WorkingWithCustomers.self`).
- Стандартные группы: `Common`, `Prepositions`, `Time`, `Items`, `MenuItems`, `AuthPage`, `Form.BtnTexts`, `Form.Errors`, `Form.EntitiesFields`, `Statuses.{Entity}`, `Types.{Entity}`, `Filters`, `Search`, `Actions`, `Statistics`, `HeaderProfile`, `Messages.{Info|Warnings|Errors}`.

## Если ключ для R-справочника (значение приходит с бэка)

Проверить, что значение PHP-enum'а на бэке (`app/Enums/Api/V1/{Entity}sEnum.php` в Laravel) точно совпадает с ключом. Эталоны: `ProjectStatusesEnum::IN_PROGRESS = 'Statuses.Project.in_progress'`.

## Чек-лист

- [ ] Ключ имеет смысловую группу.
- [ ] Добавлен в **оба** файла `ru/global.json` и `en/global.json`.
- [ ] JSON синтаксически валиден (нет «висящих» запятых).
- [ ] Если приходит с бэка — совпадает с PHP-enum.

## Язык

Объяснения — русский, код — английский.
