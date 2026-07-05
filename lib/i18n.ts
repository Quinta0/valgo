import { ActionType, AlgorithmKey, LanguageCode, Step } from "./types";

export type UIKey =
    | "brand"
    | "tagline"
    | "play"
    | "pause"
    | "resume"
    | "reset"
    | "shuffle"
    | "algorithm"
    | "language"
    | "arraySize"
    | "elements"
    | "speed"
    | "speedSlow"
    | "speedNormal"
    | "speedFast"
    | "speedTurbo"
    | "comparisons"
    | "writes"
    | "step"
    | "of"
    | "sorted"
    | "license"
    | "viewLicense"
    | "close"
    | "footerRights"
    | "growthTitle"
    | "growthCaption"
    | "narrationTitle"
    | "statsTitle"
    | "pickAlgorithm"
    | "done";

const UI: Record<LanguageCode, Record<UIKey, string>> = {
    en: {
        brand: "Valgo",
        tagline: "Watch how sorting actually works.",
        play: "Play", pause: "Pause", resume: "Resume", reset: "New shuffle",
        shuffle: "Shuffle", algorithm: "Algorithm", language: "Language",
        arraySize: "Array size", elements: "elements",
        speed: "Speed", speedSlow: "Slow", speedNormal: "Normal", speedFast: "Fast", speedTurbo: "Turbo",
        comparisons: "Comparisons", writes: "Writes", step: "Step", of: "of", sorted: "Sorted",
        license: "MIT License", viewLicense: "License", close: "Close",
        footerRights: "All rights reserved.",
        growthTitle: "How the work grows", growthCaption: "Same n, wildly different amounts of work.",
        narrationTitle: "What's happening", statsTitle: "Live stats",
        pickAlgorithm: "Choose an algorithm", done: "Sorted! Every value found its place.",
    },
    fr: {
        brand: "Valgo",
        tagline: "Regardez comment le tri fonctionne vraiment.",
        play: "Lecture", pause: "Pause", resume: "Reprendre", reset: "Nouveau mélange",
        shuffle: "Mélanger", algorithm: "Algorithme", language: "Langue",
        arraySize: "Taille du tableau", elements: "éléments",
        speed: "Vitesse", speedSlow: "Lent", speedNormal: "Normal", speedFast: "Rapide", speedTurbo: "Turbo",
        comparisons: "Comparaisons", writes: "Écritures", step: "Étape", of: "sur", sorted: "Triés",
        license: "Licence MIT", viewLicense: "Licence", close: "Fermer",
        footerRights: "Tous droits réservés.",
        growthTitle: "Comment le travail augmente", growthCaption: "Même n, quantités de travail très différentes.",
        narrationTitle: "Ce qui se passe", statsTitle: "Statistiques en direct",
        pickAlgorithm: "Choisir un algorithme", done: "Trié ! Chaque valeur a trouvé sa place.",
    },
    it: {
        brand: "Valgo",
        tagline: "Guarda come funziona davvero l'ordinamento.",
        play: "Avvia", pause: "Pausa", resume: "Riprendi", reset: "Nuovo mescolamento",
        shuffle: "Mescola", algorithm: "Algoritmo", language: "Lingua",
        arraySize: "Dimensione array", elements: "elementi",
        speed: "Velocità", speedSlow: "Lenta", speedNormal: "Normale", speedFast: "Veloce", speedTurbo: "Turbo",
        comparisons: "Confronti", writes: "Scritture", step: "Passo", of: "di", sorted: "Ordinati",
        license: "Licenza MIT", viewLicense: "Licenza", close: "Chiudi",
        footerRights: "Tutti i diritti riservati.",
        growthTitle: "Come cresce il lavoro", growthCaption: "Stesso n, quantità di lavoro molto diverse.",
        narrationTitle: "Cosa sta succedendo", statsTitle: "Statistiche live",
        pickAlgorithm: "Scegli un algoritmo", done: "Ordinato! Ogni valore ha trovato il suo posto.",
    },
    de: {
        brand: "Valgo",
        tagline: "Sieh dir an, wie Sortieren wirklich funktioniert.",
        play: "Abspielen", pause: "Pause", resume: "Fortsetzen", reset: "Neu mischen",
        shuffle: "Mischen", algorithm: "Algorithmus", language: "Sprache",
        arraySize: "Array-Größe", elements: "Elemente",
        speed: "Geschwindigkeit", speedSlow: "Langsam", speedNormal: "Normal", speedFast: "Schnell", speedTurbo: "Turbo",
        comparisons: "Vergleiche", writes: "Schreibvorgänge", step: "Schritt", of: "von", sorted: "Sortiert",
        license: "MIT-Lizenz", viewLicense: "Lizenz", close: "Schließen",
        footerRights: "Alle Rechte vorbehalten.",
        growthTitle: "Wie die Arbeit wächst", growthCaption: "Gleiches n, sehr unterschiedlicher Aufwand.",
        narrationTitle: "Was gerade passiert", statsTitle: "Live-Statistik",
        pickAlgorithm: "Algorithmus wählen", done: "Fertig sortiert! Jeder Wert hat seinen Platz gefunden.",
    },
    es: {
        brand: "Valgo",
        tagline: "Mira cómo funciona realmente el ordenamiento.",
        play: "Reproducir", pause: "Pausa", resume: "Reanudar", reset: "Nueva mezcla",
        shuffle: "Mezclar", algorithm: "Algoritmo", language: "Idioma",
        arraySize: "Tamaño del array", elements: "elementos",
        speed: "Velocidad", speedSlow: "Lenta", speedNormal: "Normal", speedFast: "Rápida", speedTurbo: "Turbo",
        comparisons: "Comparaciones", writes: "Escrituras", step: "Paso", of: "de", sorted: "Ordenados",
        license: "Licencia MIT", viewLicense: "Licencia", close: "Cerrar",
        footerRights: "Todos los derechos reservados.",
        growthTitle: "Cómo crece el trabajo", growthCaption: "Mismo n, cantidades de trabajo muy distintas.",
        narrationTitle: "Qué está pasando", statsTitle: "Estadísticas en vivo",
        pickAlgorithm: "Elige un algoritmo", done: "¡Ordenado! Cada valor encontró su lugar.",
    },
    ja: {
        brand: "Valgo",
        tagline: "ソートが実際にどう動くかを見てみましょう。",
        play: "再生", pause: "一時停止", resume: "再開", reset: "シャッフル",
        shuffle: "シャッフル", algorithm: "アルゴリズム", language: "言語",
        arraySize: "配列サイズ", elements: "要素",
        speed: "速度", speedSlow: "遅い", speedNormal: "普通", speedFast: "速い", speedTurbo: "高速",
        comparisons: "比較回数", writes: "書き込み回数", step: "ステップ", of: "/", sorted: "ソート済み",
        license: "MITライセンス", viewLicense: "ライセンス", close: "閉じる",
        footerRights: "全著作権所有。",
        growthTitle: "処理量の増え方", growthCaption: "同じ n でも、処理量は大きく異なります。",
        narrationTitle: "今起きていること", statsTitle: "リアルタイム統計",
        pickAlgorithm: "アルゴリズムを選択", done: "完了！すべての値が正しい位置に収まりました。",
    },
    no: {
        brand: "Valgo",
        tagline: "Se hvordan sortering faktisk fungerer.",
        play: "Spill av", pause: "Pause", resume: "Fortsett", reset: "Stokk på nytt",
        shuffle: "Stokk", algorithm: "Algoritme", language: "Språk",
        arraySize: "Matrisestørrelse", elements: "elementer",
        speed: "Hastighet", speedSlow: "Sakte", speedNormal: "Normal", speedFast: "Rask", speedTurbo: "Turbo",
        comparisons: "Sammenligninger", writes: "Skrivinger", step: "Steg", of: "av", sorted: "Sortert",
        license: "MIT-lisens", viewLicense: "Lisens", close: "Lukk",
        footerRights: "Alle rettigheter forbeholdt.",
        growthTitle: "Hvordan arbeidet vokser", growthCaption: "Samme n, svært ulik mengde arbeid.",
        narrationTitle: "Hva skjer nå", statsTitle: "Sanntidsstatistikk",
        pickAlgorithm: "Velg en algoritme", done: "Ferdig sortert! Hver verdi fant sin plass.",
    },
    sv: {
        brand: "Valgo",
        tagline: "Se hur sortering faktiskt fungerar.",
        play: "Spela", pause: "Pausa", resume: "Fortsätt", reset: "Blanda igen",
        shuffle: "Blanda", algorithm: "Algoritm", language: "Språk",
        arraySize: "Array-storlek", elements: "element",
        speed: "Hastighet", speedSlow: "Långsam", speedNormal: "Normal", speedFast: "Snabb", speedTurbo: "Turbo",
        comparisons: "Jämförelser", writes: "Skrivningar", step: "Steg", of: "av", sorted: "Sorterade",
        license: "MIT-licens", viewLicense: "Licens", close: "Stäng",
        footerRights: "Alla rättigheter förbehållna.",
        growthTitle: "Hur arbetet växer", growthCaption: "Samma n, väldigt olika mängd arbete.",
        narrationTitle: "Vad som händer", statsTitle: "Livestatistik",
        pickAlgorithm: "Välj en algoritm", done: "Klart! Varje värde hittade sin plats.",
    },
    ua: {
        brand: "Valgo",
        tagline: "Подивіться, як насправді працює сортування.",
        play: "Старт", pause: "Пауза", resume: "Продовжити", reset: "Перемішати",
        shuffle: "Перемішати", algorithm: "Алгоритм", language: "Мова",
        arraySize: "Розмір масиву", elements: "елементів",
        speed: "Швидкість", speedSlow: "Повільно", speedNormal: "Звичайно", speedFast: "Швидко", speedTurbo: "Турбо",
        comparisons: "Порівняння", writes: "Записи", step: "Крок", of: "з", sorted: "Відсортовано",
        license: "Ліцензія MIT", viewLicense: "Ліцензія", close: "Закрити",
        footerRights: "Усі права захищено.",
        growthTitle: "Як зростає обсяг роботи", growthCaption: "Те саме n, зовсім різний обсяг роботи.",
        narrationTitle: "Що відбувається", statsTitle: "Статистика наживо",
        pickAlgorithm: "Оберіть алгоритм", done: "Відсортовано! Кожне значення знайшло своє місце.",
    },
    ru: {
        brand: "Valgo",
        tagline: "Посмотрите, как на самом деле работает сортировка.",
        play: "Старт", pause: "Пауза", resume: "Продолжить", reset: "Перемешать",
        shuffle: "Перемешать", algorithm: "Алгоритм", language: "Язык",
        arraySize: "Размер массива", elements: "элементов",
        speed: "Скорость", speedSlow: "Медленно", speedNormal: "Обычно", speedFast: "Быстро", speedTurbo: "Турбо",
        comparisons: "Сравнения", writes: "Записи", step: "Шаг", of: "из", sorted: "Отсортировано",
        license: "Лицензия MIT", viewLicense: "Лицензия", close: "Закрыть",
        footerRights: "Все права защищены.",
        growthTitle: "Как растёт объём работы", growthCaption: "Одно и то же n, совершенно разный объём работы.",
        narrationTitle: "Что происходит", statsTitle: "Статистика в реальном времени",
        pickAlgorithm: "Выберите алгоритм", done: "Отсортировано! Каждое значение нашло своё место.",
    },
};

export function t(lang: LanguageCode, key: UIKey): string {
    return UI[lang]?.[key] ?? UI.en[key];
}

// ---- Step narration -------------------------------------------------
// One shared vocabulary of "moves" is narrated slightly differently
// depending on which algorithm is doing the moving, so the commentary
// always explains *why*, not just *what*.

type Vars = Record<string, string | number>;

function fmt(template: string, vars: Vars): string {
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

const TEMPLATES: Record<LanguageCode, Record<string, string>> = {
    en: {
        init: "A freshly shuffled array of {n} numbers. Watch {algo} bring order to it.",
        compare: "Comparing positions {a} and {b}: {va} vs {vb}.",
        swapYes: "{va} > {vb}, so they're out of order — swap positions {a} and {b}.",
        overwrite: "Writing {va} into position {a}.",
        shift: "Sliding {va} rightward to open a gap.",
        selectPivot: "Choosing {va} (position {a}) as the pivot.",
        partitionRange: "Partitioning the range [{low}, {high}] around the pivot.",
        pivotPlaced: "The pivot is home — {va} is now permanently in its sorted spot at {a}.",
        mergeRange: "Merging two sorted halves: [{low}..{mid}] and [{mid1}..{high}].",
        mergeWrite: "The smaller candidate, {va}, goes into position {a}.",
        markSorted: "Position {a} is locked in as sorted.",
        shellGap: "Shrinking the gap to {gap} — comparisons now leap across the array instead of crawling.",
        radixDigit: "Now sorting by the digit worth {digit}, least significant first.",
        bucketPlace: "{va} drops into bucket {bucket}, grouped by value range.",
        bucketSorted: "Sorting the contents of bucket {bucket} on its own.",
        countingTally: "Tallying how many times {va} appears.",
        done: "Sorted! Every element found its final place.",
    },
    fr: {
        init: "Un tableau de {n} nombres mélangés. Regardez {algo} y mettre de l'ordre.",
        compare: "Comparaison des positions {a} et {b} : {va} contre {vb}.",
        swapYes: "{va} > {vb}, donc c'est dans le mauvais ordre — échange des positions {a} et {b}.",
        overwrite: "Écriture de {va} en position {a}.",
        shift: "Décalage de {va} vers la droite pour laisser de la place.",
        selectPivot: "Choix de {va} (position {a}) comme pivot.",
        partitionRange: "Partition de la plage [{low}, {high}] autour du pivot.",
        pivotPlaced: "Le pivot est à sa place — {va} est désormais définitivement trié en position {a}.",
        mergeRange: "Fusion de deux moitiés déjà triées : [{low}..{mid}] et [{mid1}..{high}].",
        mergeWrite: "Le plus petit candidat, {va}, est placé en position {a}.",
        markSorted: "La position {a} est désormais fixée comme triée.",
        shellGap: "Réduction de l'écart à {gap} — les comparaisons sautent maintenant à travers le tableau.",
        radixDigit: "Tri maintenant selon le chiffre de rang {digit}, du moins significatif d'abord.",
        bucketPlace: "{va} est placé dans le compartiment {bucket}, selon sa valeur.",
        bucketSorted: "Tri du contenu du compartiment {bucket} indépendamment.",
        countingTally: "Comptage du nombre d'occurrences de {va}.",
        done: "Trié ! Chaque élément a trouvé sa place finale.",
    },
    it: {
        init: "Un array di {n} numeri appena mescolato. Guarda {algo} metterlo in ordine.",
        compare: "Confronto tra le posizioni {a} e {b}: {va} contro {vb}.",
        swapYes: "{va} > {vb}, quindi sono nell'ordine sbagliato — scambio le posizioni {a} e {b}.",
        overwrite: "Scrivo {va} nella posizione {a}.",
        shift: "Sposto {va} verso destra per fare spazio.",
        selectPivot: "Scelgo {va} (posizione {a}) come pivot.",
        partitionRange: "Partiziono l'intervallo [{low}, {high}] attorno al pivot.",
        pivotPlaced: "Il pivot è a casa — {va} è ora definitivamente ordinato in posizione {a}.",
        mergeRange: "Fondo due metà già ordinate: [{low}..{mid}] e [{mid1}..{high}].",
        mergeWrite: "Il candidato più piccolo, {va}, va in posizione {a}.",
        markSorted: "La posizione {a} è ora fissata come ordinata.",
        shellGap: "Riduco il gap a {gap} — i confronti ora saltano attraverso l'array invece di procedere passo passo.",
        radixDigit: "Ora ordino in base alla cifra di peso {digit}, a partire dalla meno significativa.",
        bucketPlace: "{va} finisce nel bucket {bucket}, in base al suo valore.",
        bucketSorted: "Ordino il contenuto del bucket {bucket} per conto suo.",
        countingTally: "Conto quante volte compare {va}.",
        done: "Ordinato! Ogni elemento ha trovato il suo posto finale.",
    },
    de: {
        init: "Ein frisch gemischtes Array aus {n} Zahlen. Sieh zu, wie {algo} Ordnung schafft.",
        compare: "Vergleiche Position {a} und {b}: {va} gegen {vb}.",
        swapYes: "{va} > {vb}, also falsche Reihenfolge — tausche Position {a} und {b}.",
        overwrite: "Schreibe {va} an Position {a}.",
        shift: "Verschiebe {va} nach rechts, um Platz zu schaffen.",
        selectPivot: "Wähle {va} (Position {a}) als Pivot.",
        partitionRange: "Partitioniere den Bereich [{low}, {high}] um den Pivot herum.",
        pivotPlaced: "Der Pivot ist angekommen — {va} steht jetzt endgültig sortiert an Position {a}.",
        mergeRange: "Verschmelze zwei bereits sortierte Hälften: [{low}..{mid}] und [{mid1}..{high}].",
        mergeWrite: "Der kleinere Kandidat, {va}, kommt an Position {a}.",
        markSorted: "Position {a} ist nun endgültig sortiert.",
        shellGap: "Verringere den Abstand auf {gap} — Vergleiche springen jetzt über das Array statt zu kriechen.",
        radixDigit: "Jetzt wird nach der Ziffernstelle {digit} sortiert, zuerst die niedrigstwertige.",
        bucketPlace: "{va} kommt in Eimer {bucket}, gruppiert nach Wertebereich.",
        bucketSorted: "Sortiere den Inhalt von Eimer {bucket} für sich.",
        countingTally: "Zähle, wie oft {va} vorkommt.",
        done: "Fertig sortiert! Jedes Element hat seinen endgültigen Platz gefunden.",
    },
    es: {
        init: "Un array recién mezclado de {n} números. Observa cómo {algo} le pone orden.",
        compare: "Comparando las posiciones {a} y {b}: {va} frente a {vb}.",
        swapYes: "{va} > {vb}, así que están desordenados — intercambio las posiciones {a} y {b}.",
        overwrite: "Escribiendo {va} en la posición {a}.",
        shift: "Deslizo {va} hacia la derecha para abrir hueco.",
        selectPivot: "Elijo {va} (posición {a}) como pivote.",
        partitionRange: "Particiono el rango [{low}, {high}] alrededor del pivote.",
        pivotPlaced: "El pivote llegó a casa — {va} ya está definitivamente ordenado en la posición {a}.",
        mergeRange: "Fusionando dos mitades ya ordenadas: [{low}..{mid}] y [{mid1}..{high}].",
        mergeWrite: "El candidato más pequeño, {va}, va a la posición {a}.",
        markSorted: "La posición {a} queda fijada como ordenada.",
        shellGap: "Reduzco el intervalo a {gap} — las comparaciones ahora saltan por el array en vez de arrastrarse.",
        radixDigit: "Ahora ordenando por el dígito de valor {digit}, empezando por el menos significativo.",
        bucketPlace: "{va} cae en el cubo {bucket}, agrupado por rango de valor.",
        bucketSorted: "Ordenando el contenido del cubo {bucket} por separado.",
        countingTally: "Contando cuántas veces aparece {va}.",
        done: "¡Ordenado! Cada elemento encontró su lugar final.",
    },
    ja: {
        init: "{n} 個の数をシャッフルした配列です。{algo} が整えていく様子を見てみましょう。",
        compare: "位置 {a} と {b} を比較: {va} と {vb}。",
        swapYes: "{va} > {vb} のため順序が逆です — 位置 {a} と {b} を交換します。",
        overwrite: "{va} を位置 {a} に書き込みます。",
        shift: "{va} を右にずらして隙間を作ります。",
        selectPivot: "{va}（位置 {a}）をピボットに選びます。",
        partitionRange: "ピボットを中心に範囲 [{low}, {high}] を分割します。",
        pivotPlaced: "ピボットが定位置に到着 — {va} は位置 {a} で確定的にソート済みです。",
        mergeRange: "すでにソート済みの2つの半分 [{low}..{mid}] と [{mid1}..{high}] を結合します。",
        mergeWrite: "小さい方の候補 {va} を位置 {a} に書き込みます。",
        markSorted: "位置 {a} はソート済みとして確定しました。",
        shellGap: "間隔を {gap} に縮めます — 比較が一歩ずつではなく配列を飛び越えて行われます。",
        radixDigit: "桁の重み {digit} で並べ替え中です（下位桁から順に）。",
        bucketPlace: "{va} は値の範囲に応じてバケット {bucket} に入ります。",
        bucketSorted: "バケット {bucket} の中身を個別にソートします。",
        countingTally: "{va} が何回出現するかを数えています。",
        done: "完了！すべての要素が最終的な位置に収まりました。",
    },
    no: {
        init: "En nyblandet matrise med {n} tall. Se hvordan {algo} skaper orden.",
        compare: "Sammenligner posisjon {a} og {b}: {va} mot {vb}.",
        swapYes: "{va} > {vb}, altså feil rekkefølge — bytter posisjon {a} og {b}.",
        overwrite: "Skriver {va} til posisjon {a}.",
        shift: "Flytter {va} mot høyre for å lage plass.",
        selectPivot: "Velger {va} (posisjon {a}) som pivot.",
        partitionRange: "Partisjonerer området [{low}, {high}] rundt pivoten.",
        pivotPlaced: "Pivoten er hjemme — {va} er nå permanent sortert på posisjon {a}.",
        mergeRange: "Slår sammen to sorterte halvdeler: [{low}..{mid}] og [{mid1}..{high}].",
        mergeWrite: "Den minste kandidaten, {va}, går til posisjon {a}.",
        markSorted: "Posisjon {a} er nå låst som sortert.",
        shellGap: "Krymper gapet til {gap} — sammenligninger hopper nå over matrisen i stedet for å krype.",
        radixDigit: "Sorterer nå etter sifferverdi {digit}, minst betydningsfulle først.",
        bucketPlace: "{va} havner i bøtte {bucket}, gruppert etter verdiområde.",
        bucketSorted: "Sorterer innholdet i bøtte {bucket} for seg selv.",
        countingTally: "Teller hvor mange ganger {va} forekommer.",
        done: "Ferdig sortert! Hvert element fant sin endelige plass.",
    },
    sv: {
        init: "En nyblandad array med {n} tal. Se hur {algo} skapar ordning.",
        compare: "Jämför position {a} och {b}: {va} mot {vb}.",
        swapYes: "{va} > {vb}, så de är i fel ordning — byter position {a} och {b}.",
        overwrite: "Skriver {va} till position {a}.",
        shift: "Flyttar {va} åt höger för att göra plats.",
        selectPivot: "Väljer {va} (position {a}) som pivot.",
        partitionRange: "Partitionerar intervallet [{low}, {high}] runt pivoten.",
        pivotPlaced: "Pivoten är hemma — {va} är nu permanent sorterad på position {a}.",
        mergeRange: "Slår ihop två sorterade halvor: [{low}..{mid}] och [{mid1}..{high}].",
        mergeWrite: "Den minsta kandidaten, {va}, hamnar på position {a}.",
        markSorted: "Position {a} är nu låst som sorterad.",
        shellGap: "Minskar gapet till {gap} — jämförelser hoppar nu över arrayen istället för att krypa.",
        radixDigit: "Sorterar nu efter siffervärdet {digit}, minst signifikant först.",
        bucketPlace: "{va} hamnar i hink {bucket}, grupperad efter värdeintervall.",
        bucketSorted: "Sorterar innehållet i hink {bucket} för sig.",
        countingTally: "Räknar hur många gånger {va} förekommer.",
        done: "Klart sorterat! Varje element hittade sin slutgiltiga plats.",
    },
    ua: {
        init: "Щойно перемішаний масив із {n} чисел. Подивіться, як {algo} наводить лад.",
        compare: "Порівнюємо позиції {a} і {b}: {va} проти {vb}.",
        swapYes: "{va} > {vb}, тож порядок неправильний — міняємо місцями позиції {a} і {b}.",
        overwrite: "Записуємо {va} у позицію {a}.",
        shift: "Зсуваємо {va} праворуч, щоб звільнити місце.",
        selectPivot: "Обираємо {va} (позиція {a}) як опорний елемент.",
        partitionRange: "Розбиваємо діапазон [{low}, {high}] навколо опорного елемента.",
        pivotPlaced: "Опорний елемент на місці — {va} тепер остаточно відсортовано на позиції {a}.",
        mergeRange: "Зливаємо дві вже відсортовані половини: [{low}..{mid}] і [{mid1}..{high}].",
        mergeWrite: "Менший кандидат, {va}, іде на позицію {a}.",
        markSorted: "Позиція {a} тепер зафіксована як відсортована.",
        shellGap: "Зменшуємо проміжок до {gap} — порівняння тепер перестрибують масив, а не повзуть.",
        radixDigit: "Тепер сортуємо за розрядом {digit}, спочатку наймолодшим.",
        bucketPlace: "{va} потрапляє в кошик {bucket} за діапазоном значення.",
        bucketSorted: "Сортуємо вміст кошика {bucket} окремо.",
        countingTally: "Рахуємо, скільки разів трапляється {va}.",
        done: "Відсортовано! Кожен елемент знайшов своє остаточне місце.",
    },
    ru: {
        init: "Только что перемешанный массив из {n} чисел. Смотрите, как {algo} наводит порядок.",
        compare: "Сравниваем позиции {a} и {b}: {va} против {vb}.",
        swapYes: "{va} > {vb}, значит порядок неверный — меняем местами позиции {a} и {b}.",
        overwrite: "Записываем {va} в позицию {a}.",
        shift: "Сдвигаем {va} вправо, чтобы освободить место.",
        selectPivot: "Выбираем {va} (позиция {a}) в качестве опорного элемента.",
        partitionRange: "Разбиваем диапазон [{low}, {high}] вокруг опорного элемента.",
        pivotPlaced: "Опорный элемент на месте — {va} теперь окончательно отсортирован на позиции {a}.",
        mergeRange: "Сливаем две уже отсортированные половины: [{low}..{mid}] и [{mid1}..{high}].",
        mergeWrite: "Меньший кандидат, {va}, идёт на позицию {a}.",
        markSorted: "Позиция {a} теперь зафиксирована как отсортированная.",
        shellGap: "Уменьшаем промежуток до {gap} — сравнения теперь перепрыгивают через массив, а не ползут.",
        radixDigit: "Теперь сортируем по разряду {digit}, начиная с младшего.",
        bucketPlace: "{va} попадает в корзину {bucket} по диапазону значения.",
        bucketSorted: "Сортируем содержимое корзины {bucket} отдельно.",
        countingTally: "Считаем, сколько раз встречается {va}.",
        done: "Отсортировано! Каждый элемент нашёл своё окончательное место.",
    },
};

const algoNameKey: Record<AlgorithmKey, UIKey | null> = {
    bubble: null, insertion: null, heap: null, quick: null, merge: null,
    radix: null, counting: null, bucket: null, shell: null,
};

export function narrate(step: Step, algo: AlgorithmKey, algoTitle: string, lang: LanguageCode): string {
    const templates = TEMPLATES[lang] ?? TEMPLATES.en;
    const arr = step.array;
    const [a, b] = step.indices;
    const va = a !== undefined ? arr[a] : undefined;
    const vb = b !== undefined ? arr[b] : undefined;
    const vars: Vars = {
        n: arr.length, algo: algoTitle,
        a, b, va: va ?? "", vb: vb ?? "",
        low: step.range?.[0] ?? "", high: step.range?.[1] ?? "",
        mid: step.meta?.mid ?? "", mid1: (step.meta?.mid ?? 0) + 1,
        gap: step.meta?.gap ?? "", digit: step.meta?.digit ?? "",
        bucket: step.meta?.bucket ?? "",
    };

    switch (step.action as ActionType) {
        case "init":
            return fmt(templates.init, vars);
        case "compare":
            return fmt(templates.compare, vars);
        case "swap":
            return fmt(templates.swapYes, vars);
        case "overwrite":
            return fmt(templates.overwrite, vars);
        case "shift":
            return fmt(templates.shift, vars);
        case "select-pivot":
            return fmt(templates.selectPivot, vars);
        case "partition-range":
            return fmt(templates.partitionRange, vars);
        case "pivot-placed":
            return fmt(templates.pivotPlaced, vars);
        case "merge-range":
            return fmt(templates.mergeRange, vars);
        case "merge-write":
            return fmt(templates.mergeWrite, vars);
        case "mark-sorted":
            return fmt(templates.markSorted, vars);
        case "gap-set":
            return algo === "radix" ? fmt(templates.radixDigit, vars) : fmt(templates.shellGap, vars);
        case "count":
            return fmt(templates.countingTally, vars);
        case "bucket-place":
            return fmt(templates.bucketPlace, vars);
        case "bucket-sorted":
            return fmt(templates.bucketSorted, vars);
        case "done":
            return templates.done;
        default:
            return "";
    }
}
