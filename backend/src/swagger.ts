export const swaggerDocument = JSON.parse(`{
  "swagger": "2.0",
  "info": {
    "title": "Adhoc Glavcontrol backend",
    "version": "1.0.0"
  },
  "paths": {
    "/api/telegram/telegram-user": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "telegram",
            "in": "header",
            "required": true,
            "description": "Заголовок сформированный внутри API Телеграм бота с помощью секретного ключа для безопасной проверки авторизации пользователя по Телеграм ID"
          }
        ],
        "description": "Запрос для проверки авторизации через Телеграм на сайте",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Пользователь не авторизован через Телеграм на сайте"
          },
          "200": {
            "description": "Пользователь авторизован на сайте через Телеграм",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "keycloakId": {
                  "type": "string"
                },
                "telegramId": {
                  "type": "number"
                },
                "firstName": {
                  "type": "string"
                },
                "authDate": {
                  "type": "string"
                },
                "hash": {
                  "type": "string"
                },
                "lastName": {
                  "type": "string"
                },
                "photoUrl": {
                  "type": "string"
                },
                "username": {
                  "type": "string"
                },
                "createdAt": {
                  "type": "string"
                },
                "updatedAt": {
                  "type": "string"
                }
              },
              "example": {
                "data": {
                  "id": 2,
                  "keycloakId": "671ebe16-486b-4d9c-8acf-612a35801733",
                  "telegramId": 1234,
                  "firstName": "Андрей",
                  "authDate": "1718488963",
                  "hash": "d1a405fc680c4ac15cb33f17b54385a6c4f557f295162863a2bb167ac8dc863c",
                  "lastName": "Русаков",
                  "photoUrl": "https://t.me/i/userpic/320/Bo8LUQVbePyoUSPVbrjs7HlsV-BCYQuv6EtDoWJdoW0.jpg",
                  "username": "designerRusakov",
                  "createdAt": "2024-06-15T22:02:43.737Z",
                  "updatedAt": "2024-06-15T22:02:43.737Z"
                }
              }
            }
          }
        }
      }
    },
    "/api/telegram/project/{id}": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "telegram",
            "in": "header",
            "required": true,
            "description": "Заголовок сформированный внутри API Телеграм бота с помощью секретного ключа для безопасной проверки авторизации пользователя по Телеграм ID"
          },
          {
            "type": "number",
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "description": "Запрос для получения экземпляра проекта",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Пользователь не авторизован через Телеграм на сайте"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Пользователь авторизован на сайте через Телеграм",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "title": {
                  "type": "string"
                },
                "createdAt": {
                  "type": "string"
                },
                "updatedAt": {
                  "type": "string"
                },
                "accountTurnovers": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "bill": {
                      "type": "number"
                    },
                    "year": {
                      "type": "number"
                    },
                    "quarter": {
                      "type": "number"
                    },
                    "type": {
                      "type": "string"
                    },
                    "filename": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    },
                    "projectId": {
                      "type": "number"
                    },
                    "createdAt": {
                      "type": "string"
                    },
                    "updatedAt": {
                      "type": "string"
                    }
                  }
                },
                "inventoryBalances": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "bill": {
                      "type": "number"
                    },
                    "date": {
                      "type": "string"
                    },
                    "filename": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    },
                    "projectId": {
                      "type": "number"
                    },
                    "createdAt": {
                      "type": "string"
                    }
                  }
                }
              },
              "example": {
                "data": {
                  "id": 1,
                  "title": "МБОУ СОШ №8",
                  "createdAt": "2024-06-16T01:47:34.523Z",
                  "updatedAt": "2024-06-16T16:07:35.408Z",
                  "accountTurnovers": [
                    {
                      "id": 2,
                      "bill": 105,
                      "year": 2022,
                      "quarter": 1,
                      "type": "turnover",
                      "filename": "Оборотная ведомость по сч. 105 за 1 кв. 2022г..xlsx",
                      "url": "e59647e3-e8d4-4d71-9dc4-16620266a6e6.xlsx",
                      "projectId": 1,
                      "createdAt": "2024-06-16T07:45:13.557Z",
                      "updatedAt": "2024-06-16T07:45:13.557Z"
                    }
                  ],
                  "inventoryBalances": [
                    {
                      "id": 1,
                      "bill": 105,
                      "date": "30.06.2024",
                      "filename": "Ведомость остатков на 30.06.2022 (сч. 105).xlsx",
                      "url": "85259e03-4c61-4fc9-8ead-b5d3d27dc8cb.xlsx",
                      "projectId": 1,
                      "createdAt": "2024-06-16T17:51:04.543Z",
                      "updatedAt": "2024-06-16T17:51:04.543Z"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/api/telegram/projects": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "telegram",
            "in": "header",
            "required": true,
            "description": "Заголовок сформированный внутри API Телеграм бота с помощью секретного ключа для безопасной проверки авторизации пользователя по Телеграм ID"
          },
          {
            "type": "string",
            "name": "type",
            "in": "query",
            "required": true
          }
        ],
        "description": "Запрос для получения всех проектов, к которым у пользователя есть доступ",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Пользователь не авторизован через Телеграм на сайте"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Пользователь авторизован на сайте через Телеграм",
            "schema": {
              "type": "object",
              "properties": {
                "data": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "title": {
                        "type": "string"
                      },
                      "createdAt": {
                        "type": "string"
                      },
                      "updatedAt": {
                        "type": "string"
                      },
                      "TelegramUserProject": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number"
                          },
                          "projectId": {
                            "type": "number"
                          },
                          "telegramUserId": {
                            "type": "number"
                          },
                          "createdAt": {
                            "type": "string"
                          },
                          "updatedAt": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "example": {
                "data": [
                  {
                    "id": 2,
                    "title": "Тест",
                    "createdAt": "2024-06-16T08:44:44.183Z",
                    "updatedAt": "2024-06-16T08:44:44.183Z",
                    "TelegramUserProject": {
                      "id": 4,
                      "projectId": 2,
                      "telegramUserId": 2,
                      "createdAt": "2024-06-16T16:02:53.444Z",
                      "updatedAt": "2024-06-16T16:02:53.444Z"
                    }
                  },
                  {
                    "id": 3,
                    "title": "Проект 2",
                    "createdAt": "2024-06-16T13:22:32.444Z",
                    "updatedAt": "2024-06-16T13:22:32.444Z",
                    "TelegramUserProject": {
                      "id": 3,
                      "projectId": 3,
                      "telegramUserId": 2,
                      "createdAt": "2024-06-16T13:22:32.455Z",
                      "updatedAt": "2024-06-16T13:22:32.455Z"
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/api/user/telegram-user": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для проверки авторизации через Телеграм на сайте",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Пользователь не авторизован через Телеграм на сайте"
          },
          "200": {
            "description": "Пользователь авторизован на сайте через Телеграм",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "keycloakId": {
                  "type": "string"
                },
                "telegramId": {
                  "type": "number"
                },
                "firstName": {
                  "type": "string"
                },
                "authDate": {
                  "type": "string"
                },
                "hash": {
                  "type": "string"
                },
                "lastName": {
                  "type": "string"
                },
                "photoUrl": {
                  "type": "string"
                },
                "username": {
                  "type": "string"
                },
                "createdAt": {
                  "type": "string"
                },
                "updatedAt": {
                  "type": "string"
                }
              },
              "example": {
                "data": {
                  "id": 2,
                  "keycloakId": "671ebe16-486b-4d9c-8acf-612a35801733",
                  "telegramId": 1234,
                  "firstName": "Андрей",
                  "authDate": "1718488963",
                  "hash": "d1a405fc680c4ac15cb33f17b54385a6c4f557f295162863a2bb167ac8dc863c",
                  "lastName": "Русаков",
                  "photoUrl": "https://t.me/i/userpic/320/Bo8LUQVbePyoUSPVbrjs7HlsV-BCYQuv6EtDoWJdoW0.jpg",
                  "username": "designerRusakov",
                  "createdAt": "2024-06-15T22:02:43.737Z",
                  "updatedAt": "2024-06-15T22:02:43.737Z"
                }
              }
            }
          }
        }
      },
      "post": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          },
          {
            "name": "telegramId",
            "type": "number",
            "in": "formData",
            "required": true
          },
          {
            "name": "firstName",
            "type": "number",
            "in": "formData",
            "required": true
          },
          {
            "name": "authDate",
            "type": "number",
            "in": "formData",
            "required": true
          },
          {
            "name": "hash",
            "type": "number",
            "in": "formData",
            "required": true
          },
          {
            "name": "lastName",
            "type": "number",
            "in": "formData"
          },
          {
            "name": "photoUrl",
            "type": "number",
            "in": "formData"
          },
          {
            "name": "username",
            "type": "number",
            "in": "formData"
          }
        ],
        "description": "Запрос авторизации через телеграм на сайте",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Авторизация прошла успешно",
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number"
                },
                "keycloakId": {
                  "type": "string"
                },
                "telegramId": {
                  "type": "number"
                },
                "firstName": {
                  "type": "string"
                },
                "authDate": {
                  "type": "string"
                },
                "hash": {
                  "type": "string"
                },
                "lastName": {
                  "type": "string"
                },
                "photoUrl": {
                  "type": "string"
                },
                "username": {
                  "type": "string"
                },
                "createdAt": {
                  "type": "string"
                },
                "updatedAt": {
                  "type": "string"
                }
              },
              "example": {
                "data": {
                  "id": 2,
                  "keycloakId": "671ebe16-486b-4d9c-8acf-612a35801733",
                  "telegramId": 1234,
                  "firstName": "Андрей",
                  "authDate": "1718488963",
                  "hash": "d1a405fc680c4ac15cb33f17b54385a6c4f557f295162863a2bb167ac8dc863c",
                  "lastName": "Русаков",
                  "photoUrl": "https://t.me/i/userpic/320/Bo8LUQVbePyoUSPVbrjs7HlsV-BCYQuv6EtDoWJdoW0.jpg",
                  "username": "designerRusakov",
                  "createdAt": "2024-06-15T22:02:43.737Z",
                  "updatedAt": "2024-06-15T22:02:43.737Z"
                }
              }
            }
          }
        }
      }
    },
    "/api/user/project": {
      "post": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          },
          {
            "name": "id",
            "type": "number",
            "in": "formData"
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "in": "formData"
          },
          {
            "name": "accountTurnovers",
            "type": "string",
            "in": "formData",
            "required": true,
            "description": "Строка сформированная с помощью JSON.stringify([{ id?: number, bill: number, year: number, quarter: number, type: string, filename: string}])"
          },
          {
            "name": "inventoryBalances",
            "type": "string",
            "in": "formData",
            "required": true,
            "description": "Строка сформированная с помощью JSON.stringify([{ id?: number, bill: number, date: string, filename: string}])"
          }
        ],
        "description": "Запрос для создания проекта",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Проект успешно создан",
            "schema": {
              "type": "object",
              "properties": {
                "data": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    },
                    "createdAt": {
                      "type": "string"
                    },
                    "updatedAt": {
                      "type": "string"
                    },
                    "TelegramUserProject": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "projectId": {
                          "type": "number"
                        },
                        "telegramUserId": {
                          "type": "number"
                        },
                        "createdAt": {
                          "type": "string"
                        },
                        "updatedAt": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/user/projects": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для получения проектов, к которым предоставлен доступ",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": ""
          }
        }
      }
    },
    "/api/user/project/{id}": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для создания проекта",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Пользователь имеет доступ к проектам"
          }
        }
      }
    },
    "/api/admin/add-access": {
      "post": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для предоставления доступа к проекту пользователю",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Доступ предоставлен"
          }
        }
      }
    },
    "/api/admin/remove-access": {
      "delete": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для удаления доступа к проекту у пользователя",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Доступ удалён"
          }
        }
      }
    },
    "/api/admin/user": {
      "post": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для создания пользователя Keycloak",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Пользователь создан"
          }
        }
      }
    },
    "/api/admin/users": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для получения пользователей Keycloak",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Пользователи получены"
          }
        }
      }
    },
    "/api/admin/projects": {
      "get": {
        "parameters": [
          {
            "type": "string",
            "name": "Authorization",
            "in": "header",
            "required": true,
            "description": "Bearer JsonWebToken полученный из Keycloak"
          }
        ],
        "description": "Запрос для получения всех проектов",
        "responses": {
          "500": {
            "description": "Внутренняя ошибка сервера"
          },
          "403": {
            "description": "Доструп запрещён"
          },
          "401": {
            "description": "Не авторизован"
          },
          "400": {
            "description": "Некорректный запрос"
          },
          "200": {
            "description": "Проекты получены"
          }
        }
      }
    }
  }
}`)
