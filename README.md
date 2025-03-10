## Описание флоу
1) Вливание новых изменений в мастер
    - Разработчик отводит от мастера, в которую вносит изменения;
    - Cоздает ПР для слияния новых изменений в мастер;
    - Прогоняются тесты (Если упали - влить нельзя).
2) Новый релиз
    - Чтобы выпустить новый релиз, нужно на коммит повесить тег в формате v<число>(например,  v12);
    - Автоматически будет отведена ветка release/v<число>, запущен прогон тестов, создан issue RELEASE с информацией о релизе (Если workflow будет перезапускаться несколько раз, то информация об этом будет добавляться в существующий issue в комментарии);
    - Если релиз признан протестированным, то необходимо написать сообщение в issue "Start deploy";
    - Приложение развернется, сообщение об этом добавится в issue, issue закроется.

Пример релизного issue: https://github.com/Spolete/shri-ci/issues/28

В этом репозитории находится пример приложения с тестами:

- [e2e тесты](e2e/example.spec.ts)
- [unit тесты](src/example.test.tsx)

Для запуска примеров необходимо установить [NodeJS](https://nodejs.org/en/download/) 16 или выше.

Как запустить:

```sh
# установить зависимости
npm ci

# запустить приложение
npm start
```

Как запустить e2e тесты:

```sh
# скачать браузеры
npx playwright install

# запустить тесты
npm run e2e
```

Как запустить модульные тесты:

```sh
npm test
```
