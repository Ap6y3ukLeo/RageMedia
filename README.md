<div align="center">
<img width="1200" height="475" alt="RageMedia Banner" src="public/images/rage_logo_uploaded.webp" />
</div>

# RageMedia

Современный веб-сайт для медиа-проекта RageMedia, созданный с использованием React, TypeScript и Vite.

## Описание

RageMedia - это динамичный веб-ресурс с современным дизайном, включающий:
- Адаптивный интерфейс с анимациями
- Компоненты для отображения контента
- Интеграцию с внешними сервисами
- Оптимизированную производительность

## Технологии

- **React 19** - библиотека для построения пользовательского интерфейса
- **TypeScript** - типизированный JavaScript
- **Vite** - быстрый сборщик и dev-сервер
- **Tailwind CSS** - утилитарный CSS-фреймворк
- **Motion** - библиотека для анимаций

## Запуск проекта

**Требования:** Node.js

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Сборка для продакшена
```bash
npm run build
```

## Отправка заявок с сайта

Форма отправляет заявки через `public/send-message.php`: сначала в Telegram,
а если сервер не может до него достучаться — письмом на email из конфига.
Токен бота, chat id и адрес почты в репозитории не хранятся.

1. Скопируйте `public/config.example.php` в `public/config.php`.
2. Укажите реальные значения `$telegramBotToken`, `$telegramChatId` и `$contactEmailAddress`.
3. Загрузите `config.php` на хостинг вместе с остальными файлами (файл в git не попадает).

Если хостинг не может подключиться к `api.telegram.org`, укажите в `$telegramProxy`
HTTP/SOCKS-прокси — тогда заявки снова пойдут в Telegram.

Альтернативно можно задать переменные окружения `TELEGRAM_BOT_TOKEN`,
`TELEGRAM_CHAT_ID`, `CONTACT_EMAIL` и `TELEGRAM_PROXY` на сервере.

## Структура проекта

```
RageMedia/
├── src/
│   ├── components/     # React компоненты
│   ├── assets/         # Статические ресурсы
│   ├── App.tsx         # Главный компонент
│   └── main.tsx        # Точка входа
├── public/             # Публичные файлы
├── package.json
└── vite.config.ts
```

## Лицензия

MIT
