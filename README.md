### Инициализация (Node.js)

    $ npm run init

Для запуска проета понадобиться две базы PostgresQL: для `keycloak`, `backend`

#### Генерация Клиента keycloak

1. После создания пустой базы данных для `keycloak` - нужно внести данные в файл `keycloak/conf/keycloak.conf` по примеру из соседнего файла `keycloak.conf.example`.

2. Далее запустить `keycloak` из папки `web` командой: `npm run dev:keycloak`

3. Перейти в браузере на запущенный сервер (Если локально - то `http://127.0.0.1:8080` с портом по умолчанию)

4. Создать пользователя, например username - `admin`, password - `admin`

5. Заполнить файл `.env` в папке `keycloak` по примеру из `.env.example`

6. Запустить из папки `keycloak` команду `npm run generate` - должно выполиться без ошибок. (Сервер, запущенный на 2 шаге - дожен быть запущен)

Нужно создать три `.env` файла в папках `keycloak`, `frontend`, `backend` - в них должны присутствовать параметры, указанные в `.env.example`


### Запуск в режиме разработки (Node.js)

    $ npm run dev

### Сборка и запуск в режиме production (Node.js)

Для сборки `keycloak`, `frontend`, `backend`:

    $ npm run build 

Для запуска `keycloak`:

    $ npm run start:keycloak 

Для запуска `frontend`:

    $ npm run start:frontend 

Для запуска `backend`:

    $ npm run start:backend 
