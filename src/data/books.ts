export interface Book {
    id: number;
    title: string;
    originalTitle: string;
    year: number;
    description: string;
    characters: string[];
    coverUrl: string;
    coAuthor?: string;
}

export const books: Book[] = [
    {
        id: 1,
        title: "Этаж смерти",
        originalTitle: "Killing Floor",
        year: 1997,
        description: "Джек Ричер сходит с автобуса в Маргрейве, штат Джорджия, и сразу же попадает под арест по подозрению в убийстве. Ему предстоит доказать свою невиновность и раскрыть масштабный заговор фальшивомонетчиков.",
        characters: ["Джек Ричер", "Роско", "Финли", "Хаббл"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780515153651-L.jpg"
    },
    {
        id: 2,
        title: "Цена её жизни",
        originalTitle: "Die Trying",
        year: 1998,
        description: "Ричера похищают средь бела дня в Чикаго вместе с незнакомой женщиной, которая оказывается агентом ФБР. Они попадают в лагерь радикальной группировки, планирующей отделиться от США.",
        characters: ["Джек Ричер", "Холли Джонсон", "Боркен"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780515142242-L.jpg"
    },
    {
        id: 3,
        title: "Ловушка",
        originalTitle: "Tripwire",
        year: 1999,
        description: "Ричер работает копателем бассейнов во Флориде, когда его находит частный детектив, которого вскоре убивают. След ведет к таинственному человеку по прозвищу Крюк, скрывающему страшную тайну времен Вьетнама.",
        characters: ["Джек Ричер", "Джоди Джейкоб", "Крюк (Хоби)"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780515143072-L.jpg"
    },
    {
        id: 4,
        title: "Гость",
        originalTitle: "Running Blind",
        year: 2000,
        description: "Серийный убийца оставляет своих жертв в ваннах с краской, не оставляя следов насилия. ФБР подозревает Ричера, и он вынужден найти настоящего убийцу, чтобы очистить свое имя.",
        characters: ["Джек Ричер", "Лиза Харпер", "Джулия Ламарр"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780515143508-L.jpg"
    },
    {
        id: 5,
        title: "Кровавое эхо",
        originalTitle: "Echo Burning",
        year: 2001,
        description: "Путешествуя автостопом по Техасу, Ричер подсаживается к Кармен Грир. Она просит его убить её мужа-тирана, но Ричер решает разобраться в ситуации иначе, попадая в запутанную историю лжи и убийств.",
        characters: ["Джек Ричер", "Кармен Грир", "Слоп", "Хэк Уокер"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780515143829-L.jpg"
    },
    {
        id: 6,
        title: "Без права на ошибку",
        originalTitle: "Without Fail",
        year: 2002,
        description: "Секретная служба просит Ричера проверить их систему безопасности, пытаясь 'убить' вице-президента. Но игра превращается в реальную охоту на убийц.",
        characters: ["Джек Ричер", "М.Э. Фролич", "Джо Ричер (воспоминания)"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780515144314-L.jpg"
    },
    {
        id: 7,
        title: "Средство убеждения",
        originalTitle: "Persuader",
        year: 2003,
        description: "Ричер видит на улице человека, которого считал мертвым уже десять лет. Чтобы добраться до него, Ричер внедряется в криминальную организацию, занимающуюся контрабандой.",
        characters: ["Джек Ричер", "Куинн", "Бек", "Поли"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440245988-L.jpg"
    },
    {
        id: 8,
        title: "Враг",
        originalTitle: "The Enemy",
        year: 2004,
        description: "Приквел. 1990 год. Генерал умирает в дешевом мотеле. Ричер, еще служащий в военной полиции, начинает расследование, которое вскрывает коррупцию в высших эшелонах армии.",
        characters: ["Джек Ричер", "Гарбер", "Саммер", "Джо Ричер"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440245995-L.jpg"
    },
    {
        id: 9,
        title: "Выстрел",
        originalTitle: "One Shot",
        year: 2005,
        description: "Снайпер убивает пять человек. Все улики указывают на Джеймса Барра. Но тот просит только об одном: 'Найдите Джека Ричера'. Ричер приезжает, чтобы убедиться, что Барр виновен, но находит доказательства обратного.",
        characters: ["Джек Ричер", "Джеймс Барр", "Хелен Родин", "Зек"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246077-L.jpg"
    },
    {
        id: 10,
        title: "Похититель",
        originalTitle: "The Hard Way",
        year: 2006,
        description: "В Нью-Йорке Ричер становится свидетелем передачи выкупа. Его нанимает Эдвард Лейн, чью жену и дочь похитили. Но Лейн — не просто бизнесмен, и его прошлое полно крови.",
        characters: ["Джек Ричер", "Эдвард Лейн", "Лорен Полинг"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246008-L.jpg"
    },
    {
        id: 11,
        title: "Сплошные проблемы и неприятности",
        originalTitle: "Bad Luck and Trouble",
        year: 2007,
        description: "Кто-то убивает бывших сослуживцев Ричера из 110-го подразделения спецрасследований. Ричер собирает старую команду, чтобы отомстить за друзей.",
        characters: ["Джек Ричер", "Фрэнсис Нигли", "Дэвид О'Доннелл", "Карла Диксон"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246015-L.jpg"
    },
    {
        id: 12,
        title: "Нечего терять",
        originalTitle: "Nothing to Lose",
        year: 2008,
        description: "Ричер оказывается между двумя городками в Колорадо: процветающим Хоупом и мрачным Деспейром. Его выгоняют из Деспейра, что только разжигает его любопытство.",
        characters: ["Джек Ричер", "Воган", "Турман"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440243670-L.jpg"
    },
    {
        id: 13,
        title: "Я уйду завтра",
        originalTitle: "Gone Tomorrow",
        year: 2009,
        description: "В ночном метро Нью-Йорка Ричер замечает женщину, ведущую себя как террористка-смертница. Он пытается вмешаться, но она совершает самоубийство, втягивая его в международный заговор.",
        characters: ["Джек Ричер", "Сьюзан Марк", "Тереза Ли"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440243687-L.jpg"
    },
    {
        id: 14,
        title: "61 час",
        originalTitle: "61 Hours",
        year: 2010,
        description: "Автобус с туристами разбивается в Южной Дакоте во время снежной бури. Ричер остается в городе, чтобы помочь полиции защитить свидетельницу от байкеров-наркоторговцев.",
        characters: ["Джек Ричер", "Джанет Солтер", "Питерсон"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440243694-L.jpg"
    },
    {
        id: 15,
        title: "Это стоит смерти",
        originalTitle: "Worth Dying For",
        year: 2010,
        description: "Продолжение '61 часа'. Ричер попадает в глушь Небраски, где правит клан Дунканов. Он вмешивается в дело о пропавшей девочке, наживая себе могущественных врагов.",
        characters: ["Джек Ричер", "Клан Дунканов", "Дороти Коу"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246299-L.jpg"
    },
    {
        id: 16,
        title: "Дело",
        originalTitle: "The Affair",
        year: 2011,
        description: "Приквел. 1997 год. Последнее дело Ричера в армии. В Миссисипи убита женщина, и следы ведут на военную базу. Ричер работает под прикрытием, чтобы раскрыть правду.",
        characters: ["Джек Ричер", "Элизабет Деверо", "Шериф Деверо"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246305-L.jpg"
    },
    {
        id: 17,
        title: "В розыске",
        originalTitle: "A Wanted Man",
        year: 2012,
        description: "Ричер ловит попутку в Небраске. В машине трое странных людей. Вскоре выясняется, что они связаны с похищением и убийством, и Ричер оказывается в заложниках ситуации.",
        characters: ["Джек Ричер", "Джулия Соренсон", "Виктор Гудман"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246312-L.jpg"
    },
    {
        id: 18,
        title: "Никогда не возвращайся",
        originalTitle: "Never Go Back",
        year: 2013,
        description: "Ричер наконец добирается до штаба 110-го подразделения в Вирджинии, чтобы встретиться с майором Сьюзан Тернер. Но её арестовали, а самого Ричера обвиняют в убийстве 16-летней давности.",
        characters: ["Джек Ричер", "Сьюзан Тернер", "Саманта Дейтон"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780440246329-L.jpg"
    },
    {
        id: 19,
        title: "Личный интерес",
        originalTitle: "Personal",
        year: 2014,
        description: "Кто-то стрелял в президента Франции. Пуля американская. Снайпер — старый знакомый Ричера, которого он уже однажды посадил. Ричеру приходится снова охотиться на него.",
        characters: ["Джек Ричер", "Кейси Найс", "Джон Котт"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780804178754-L.jpg"
    },
    {
        id: 20,
        title: "Заставь меня",
        originalTitle: "Make Me",
        year: 2015,
        description: "Ричер сходит с поезда в городке 'Материнский Приют' просто из-за названия. Но за тихим фасадом скрывается ужасная тайна, связанная с даркнетом.",
        characters: ["Джек Ричер", "Мишель Чанг", "Вествуд"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780804178792-L.jpg"
    },
    {
        id: 21,
        title: "Вечерняя школа",
        originalTitle: "Night School",
        year: 2016,
        description: "Приквел. 1996 год. Ричера отправляют на секретные курсы, которые оказываются прикрытием для операции по поиску предателя, продающего ядерные секреты.",
        characters: ["Джек Ричер", "Фрэнсис Нигли", "Мариан Синклер"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780804178822-L.jpg"
    },
    {
        id: 22,
        title: "Граница полуночи",
        originalTitle: "The Midnight Line",
        year: 2017,
        description: "Ричер находит в ломбарде кольцо выпускника Вест-Пойнта. Он решает найти владельца, что приводит его к расследованию опиоидной эпидемии в глубинке.",
        characters: ["Джек Ричер", "Глория Накамура", "Серина Роуз"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780399593505-L.jpg"
    },
    {
        id: 23,
        title: "Прошедшее время",
        originalTitle: "Past Tense",
        year: 2018,
        description: "Ричер решает посетить город, где родился его отец. Параллельно молодая пара попадает в ловушку в изолированном мотеле. Их пути неизбежно пересекутся.",
        characters: ["Джек Ричер", "Пэтти Санден", "Шорти"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780399593536-L.jpg"
    },
    {
        id: 24,
        title: "Синяя луна",
        originalTitle: "Blue Moon",
        year: 2019,
        description: "Ричер помогает старику в автобусе, которого пытаются ограбить. Это втягивает его в войну между украинской и албанской мафией в безымянном городе.",
        characters: ["Джек Ричер", "Эбби", "Грегори"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780399593567-L.jpg"
    },
    {
        id: 25,
        title: "Часовой",
        originalTitle: "The Sentinel",
        year: 2020,
        coAuthor: "Andrew Child",
        description: "Ричер в Теннесси помогает IT-менеджеру, которого пытаются похитить. Оказывается, тот владеет информацией, способной обрушить кибербезопасность города.",
        characters: ["Джек Ричер", "Расти Разерфорд", "Правило"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781984818485-L.jpg"
    },
    {
        id: 26,
        title: "Лучше умереть",
        originalTitle: "Better Off Dead",
        year: 2021,
        coAuthor: "Andrew Child",
        description: "Ричер находит в пустыне джип с женщиной, ищущей своего брата. Вместе они противостоят опасному террористу, который считался мертвым.",
        characters: ["Джек Ричер", "Микаэла Фентон", "Дендрок"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781984818539-L.jpg"
    },
    {
        id: 27,
        title: "Без плана Б",
        originalTitle: "No Plan B",
        year: 2022,
        coAuthor: "Andrew Child",
        description: "Ричер становится свидетелем того, как женщину толкают под автобус. Убийца забирает её сумку. Ричер идет по следу, раскрывая заговор в частной тюремной системе.",
        characters: ["Джек Ричер", "Ханна", "Джед Стармер"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781984818577-L.jpg"
    },
    {
        id: 28,
        title: "Секрет",
        originalTitle: "The Secret",
        year: 2023,
        coAuthor: "Andrew Child",
        description: "1992 год. Ричер расследует серию убийств ученых, работавших над секретным проектом. Ему приходится работать с межведомственной группой, где никому нельзя доверять.",
        characters: ["Джек Ричер", "Оливия", "Стрикленд"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781984818614-L.jpg"
    },
    {
        id: 29,
        title: "Слишком глубоко",
        originalTitle: "In Too Deep",
        year: 2024,
        coAuthor: "Andrew Child",
        description: "Ричер просыпается в подвале, прикованный к трубе, не помня, как он туда попал. Ему нужно сбежать и выяснить, кто и почему его похитил.",
        characters: ["Джек Ричер", "Неизвестные похитители"],
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780593725832-L.jpg"
    },
    {
        id: 30,
        title: "Стратегия выхода",
        originalTitle: "Exit Strategy",
        year: 2025,
        coAuthor: "Andrew Child",
        description: "Новейшее приключение Джека Ричера. Подробности сюжета пока держатся в секрете, но Ричеру снова предстоит столкнуться с опасным противником.",
        characters: ["Джек Ричер"],
        coverUrl: "https://covers.openlibrary.org/b/id/placeholder-L.jpg"
    }
];
