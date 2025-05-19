// не стал подключать сервис для генерации uuid, да, id такого рода неправильны

export const quizzesFromServer = [
  {
    id: 'quiz-1',
    name: 'Основы JavaScript',
    description: 'Переменные, типы данных и функции в JavaScript.',
    questions: [
      {
        id: 'q-1-1',
        text: 'Что вернёт выражение `typeof null` в JavaScript?',
        choices: ['"null"', '"object"', '"undefined"', '"boolean"']
      },
      {
        id: 'q-1-2',
        text: 'Какое ключевое слово используется для объявления константы?',
        choices: ['var', 'let', 'const', 'static']
      },
      {
        id: 'q-1-3',
        text: 'Что означает значение NaN?',
        choices: [
          'Не число',
          'Новая переменная',
          'Неизвестное значение',
          'Ничего'
        ]
      }
    ]
  },
  {
    id: 'quiz-2',
    name: 'HTML и семантика',
    description: 'Понимание структуры HTML и семантических тегов.',
    questions: [
      {
        id: 'q-2-1',
        text: 'Какой тег используется для самого важного заголовка?',
        choices: ['<heading>', '<h6>', '<h1>', '<head>']
      },
      {
        id: 'q-2-2',
        text: 'Что обозначает тег <section> в HTML5?',
        choices: [
          'Блок изображения',
          'Смысловую группу контента',
          'Контейнер подвалов',
          'Поле формы'
        ]
      },
      {
        id: 'q-2-3',
        text: 'Какой тег используется для создания гиперссылки?',
        choices: ['<a>', '<link>', '<href>', '<url>']
      }
    ]
  },
  {
    id: 'quiz-3',
    name: 'Основы CSS',
    description: 'Базовые селекторы, свойства и работа с макетом в CSS.',
    questions: [
      {
        id: 'q-3-1',
        text: 'Какое свойство отвечает за размер текста?',
        choices: ['font-style', 'font-size', 'text-align', 'text-size']
      },
      {
        id: 'q-3-2',
        text: 'Как выбрать элемент с id "main"?',
        choices: ['#main', '.main', 'main', '*main']
      },
      {
        id: 'q-3-3',
        text: 'Какое свойство изменяет цвет фона?',
        choices: ['color', 'background-color', 'bg-color', 'background-style']
      }
    ]
  }
];
