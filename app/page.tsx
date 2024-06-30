"use client";

import { useState, useEffect, useRef } from "react";
import React from 'react';
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../components/ui/dropdown-menu"
import { Slider } from "../components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const languages = ['en', 'fr', 'it', 'de', 'es', 'ja', 'no', 'sv', 'uk', 'ru'];

const translations = {
  bubble: {
    en: {
      title: "Bubble Sort",
      timeComplexity: "Time: O(n^2)",
      spaceComplexity: "Space: O(1)",
      description: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted."
    },
    fr: {
      title: "Bubble Sort",
      timeComplexity: "Temps : O(n^2)",
      spaceComplexity: "Espace : O(1)",
      description: "Le tri à bulles est un algorithme de tri simple qui parcourt à plusieurs reprises la liste, compare les éléments adjacents et les échange s'ils sont dans le mauvais ordre. Le passage à travers la liste est répété jusqu'à ce que la liste soit triée."
    },
    it: {
      title: "Bubble Sort",
      timeComplexity: "Tempo: O(n^2)",
      spaceComplexity: "Spazio: O(1)",
      description: "Il bubble sort è un algoritmo di ordinamento semplice che scorre ripetutamente la lista, confronta gli elementi adiacenti e li scambia se sono nell'ordine sbagliato. Il passaggio attraverso la lista viene ripetuto fino a quando la lista non è ordinata."
    },
    de: {
      title: "Bubble Sort",
      timeComplexity: "Zeit: O(n^2)",
      spaceComplexity: "Platz: O(1)",
      description: "Bubble Sort ist ein einfacher Sortieralgorithmus, der wiederholt durch die Liste geht, benachbarte Elemente vergleicht und sie vertauscht, wenn sie in der falschen Reihenfolge sind. Der Durchgang durch die Liste wird wiederholt, bis die Liste sortiert ist."
    },
    es: {
      title: "Bubble Sort",
      timeComplexity: "Tiempo: O(n^2)",
      spaceComplexity: "Espacio: O(1)",
      description: "El ordenamiento de burbuja es un algoritmo de ordenamiento simple que recorre repetidamente la lista, compara los elementos adyacentes y los intercambia si están en el orden incorrecto. El recorrido a través de la lista se repite hasta que la lista está ordenada."
    },
    ja: {
      title: "Bubble Sort",
      timeComplexity: "時間: O(n^2)",
      spaceComplexity: "空間: O(1)",
      description: "バブルソートは、リストを繰り返しステップして、隣接する要素を比較し、それらが間違った順序にある場合に入れ替える単純なソートアルゴリズムです。リストを通過する操作はリストがソートされるまで繰り返されます。"
    },
    no: {
      title: "Bubble Sort",
      timeComplexity: "Tid: O(n^2)",
      spaceComplexity: "Plass: O(1)",
      description: "Bubble sort er en enkel sorteringsalgoritme som gjentatte ganger går gjennom listen, sammenligner tilstøtende elementer og bytter dem hvis de er i feil rekkefølge. Gjennomgangen av listen gjentas til listen er sortert."
    },
    sv: {
      title: "Bubble Sort",
      timeComplexity: "Tid: O(n^2)",
      spaceComplexity: "Utrymme: O(1)",
      description: "Bubble sort är en enkel sorteringsalgoritm som upprepade gånger går igenom listan, jämför intilliggande element och byter dem om de är i fel ordning. Genomgången av listan upprepas tills listan är sorterad."
    },
    uk: {
      title: "Bubble Sort",
      timeComplexity: "Час: O(n^2)",
      spaceComplexity: "Місце: O(1)",
      description: "Сортування бульбашкою - це простий алгоритм сортування, який повторно проходить по списку, порівнює суміжні елементи та змінює їх місцями, якщо вони знаходяться в неправильному порядку. Прохід по списку повторюється до тих пір, поки список не буде відсортований."
    },
    ru: {
      title: "Bubble Sort",
      timeComplexity: "Время: O(n^2)",
      spaceComplexity: "Место: O(1)",
      description: "Сортировка пузырьком - это простой алгоритм сортировки, который многократно проходит по списку, сравнивает смежные элементы и меняет их местами, если они находятся в неправильном порядке. Проход по списку повторяется до тех пор, пока список не будет отсортирован."
    }
  },
  insertion: {
    en: {
      title: "Insertion Sort",
      timeComplexity: "Time: O(n^2)",
      spaceComplexity: "Space: O(1)",
      description: "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort."
    },
    fr: {
      title: "Insertion Sort",
      timeComplexity: "Temps : O(n^2)",
      spaceComplexity: "Espace : O(1)",
      description: "Le tri par insertion est un algorithme de tri simple qui construit le tableau trié final un élément à la fois. Il est beaucoup moins efficace sur les grandes listes que des algorithmes plus avancés comme le tri rapide, le tri par tas ou le tri fusion."
    },
    it: {
      title: "Insertion Sort",
      timeComplexity: "Tempo: O(n^2)",
      spaceComplexity: "Spazio: O(1)",
      description: "L'insertion sort è un algoritmo di ordinamento semplice che costruisce l'array ordinato finale un elemento alla volta. È molto meno efficiente su grandi liste rispetto ad algoritmi più avanzati come il quicksort, l'heapsort o il merge sort."
    },
    de: {
      title: "Insertion Sort",
      timeComplexity: "Zeit: O(n^2)",
      spaceComplexity: "Platz: O(1)",
      description: "Insertion Sort ist ein einfacher Sortieralgorithmus, der das endgültig sortierte Array ein Element nach dem anderen aufbaut. Es ist viel weniger effizient bei großen Listen als fortschrittlichere Algorithmen wie Quicksort, Heapsort oder Mergesort."
    },
    es: {
      title: "Insertion Sort",
      timeComplexity: "Tiempo: O(n^2)",
      spaceComplexity: "Espacio: O(1)",
      description: "El ordenamiento por inserción es un algoritmo de ordenamiento simple que construye la matriz ordenada final un elemento a la vez. Es mucho menos eficiente en listas grandes que algoritmos más avanzados como el quicksort, el heapsort o el mergesort."
    },
    ja: {
      title: "Insertion Sort",
      timeComplexity: "時間: O(n^2)",
      spaceComplexity: "空間: O(1)",
      description: "挿入ソートは、最終的にソートされた配列を一度に1つの項目ずつ構築する単純なソートアルゴリズムです。クイックソート、ヒープソート、マージソートなどの高度なアルゴリズムよりも大きなリストでは効率が大幅に低下します。"
    },
    no: {
      title: "Insertion Sort",
      timeComplexity: "Tid: O(n^2)",
      spaceComplexity: "Plass: O(1)",
      description: "Insertion sort er en enkel sorteringsalgoritme som bygger den endelige sorterte matrisen ett element om gangen. Det er mye mindre effektivt på store lister enn mer avanserte algoritmer som quicksort, heapsort eller mergesort."
    },
    sv: {
      title: "Insertion Sort",
      timeComplexity: "Tid: O(n^2)",
      spaceComplexity: "Utrymme: O(1)",
      description: "Insertion sort är en enkel sorteringsalgoritm som bygger den slutgiltiga sorterade matrisen ett element i taget. Det är mycket mindre effektivt på stora listor än mer avancerade algoritmer som quicksort, heapsort eller mergesort."
    },
    uk: {
      title: "Insertion Sort",
      timeComplexity: "Час: O(n^2)",
      spaceComplexity: "Місце: O(1)",
      description: "Сортування вставкою - це простий алгоритм сортування, який будує остаточно відсортований масив по одному елементу за раз. Він набагато менш ефективний на великих списках, ніж більш просунуті алгоритми, такі як швидке сортування, сортування купою або сортування злиттям."
    },
    ru: {
      title: "Insertion Sort",
      timeComplexity: "Время: O(n^2)",
      spaceComplexity: "Место: O(1)",
      description: "Сортировка вставками - это простой алгоритм сортировки, который строит окончательно отсортированный массив по одному элементу за раз. Он гораздо менее эффективен на больших списках, чем более продвинутые алгоритмы, такие как быстрая сортировка, сортировка кучей или сортировка слиянием."
    }
  },
  merge: {
    en: {
      title: "Merge Sort",
      timeComplexity: "Time: O(n log n)",
      spaceComplexity: "Space: O(n)",
      description: "Merge sort is an efficient, stable, and comparison-based sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output. It works by recursively splitting the list into two halves, sorting each half, and then merging the sorted halves back together."
    },
    fr: {
      title: "Merge Sort",
      timeComplexity: "Temps : O(n log n)",
      spaceComplexity: "Espace : O(n)",
      description: "Le tri fusion est un algorithme de tri efficace, stable et basé sur la comparaison. La plupart des implémentations produisent un tri stable, ce qui signifie que l'ordre des éléments égaux est le même dans l'entrée et la sortie. Il fonctionne en divisant récursivement la liste en deux moitiés, en triant chaque moitié, puis en fusionnant les moitiés triées."
    },
    it: {
      title: "Merge Sort",
      timeComplexity: "Tempo: O(n log n)",
      spaceComplexity: "Spazio: O(n)",
      description: "Il merge sort è un algoritmo di ordinamento efficiente, stabile e basato sul confronto. La maggior parte delle implementazioni produce un ordinamento stabile, il che significa che l'ordine degli elementi uguali è lo stesso nell'input e nell'output. Funziona dividendo ricorsivamente la lista in due metà, ordinando ciascuna metà e poi unendo le metà ordinate."
    },
    de: {
      title: "Merge Sort",
      timeComplexity: "Zeit: O(n log n)",
      spaceComplexity: "Platz: O(n)",
      description: "Mergesort ist ein effizienter, stabiler und vergleichsbasierter Sortieralgorithmus. Die meisten Implementierungen produzieren eine stabile Sortierung, was bedeutet, dass die Reihenfolge der gleichen Elemente im Eingabedaten und Ausgabedaten gleich ist. Es funktioniert, indem die Liste rekursiv in zwei Hälften geteilt wird, jede Hälfte sortiert und dann die sortierten Hälften wieder zusammengeführt werden."
    },
    es: {
      title: "Merge Sort",
      timeComplexity: "Tiempo: O(n log n)",
      spaceComplexity: "Espacio: O(n)",
      description: "El mergesort es un algoritmo de ordenamiento eficiente, estable y basado en comparaciones. La mayoría de las implementaciones producen un ordenamiento estable, lo que significa que el orden de los elementos iguales es el mismo en la entrada y en la salida. Funciona dividiendo recursivamente la lista en dos mitades, ordenando cada mitad y luego fusionando las mitades ordenadas."
    },
    ja: {
      title: "Merge Sort",
      timeComplexity: "時間: O(n log n)",
      spaceComplexity: "空間: O(n)",
      description: "マージソートは、効率的で安定した比較ベースのソートアルゴリズムです。ほとんどの実装は安定したソートを生成し、入力と出力で同じ要素の順序が同じになります。リストを再帰的に2つの半分に分割し、それぞれをソートしてからソートされた半分を再度マージすることで動作します。"
    },
    no: {
      title: "Merge Sort",
      timeComplexity: "Tid: O(n log n)",
      spaceComplexity: "Plass: O(n)",
      description: "Merge sort er en effektiv, stabil og sammenligningsbasert sorteringsalgoritme. De fleste implementeringer produserer en stabil sortering, noe som betyr at rekkefølgen av like elementer er den samme i inn- og utdata. Den fungerer ved å rekursivt dele listen i to halvdeler, sortere hver halv og deretter slå de sorterte halvdelene sammen igjen."
    },
    sv: {
      title: "Merge Sort",
      timeComplexity: "Tid: O(n log n)",
      spaceComplexity: "Utrymme: O(n)",
      description: "Merge sort är en effektiv, stabil och jämförelsebaserad sorteringsalgoritm. De flesta implementationer producerar en stabil sortering, vilket betyder att ordningen på lika element är densamma i input och output. Det fungerar genom att rekursivt dela upp listan i två halvor, sortera varje halv och sedan slå ihop de sorterade halvorna."
    },
    uk: {
      title: "Merge Sort",
      timeComplexity: "Час: O(n log n)",
      spaceComplexity: "Місце: O(n)",
      description: "Сортування злиттям - це ефективний, стабільний алгоритм сортування на основі порівнянь. Більшість реалізацій забезпечують стабільне сортування, що означає, що порядок однакових елементів однаковий на вході та на виході. Він працює, рекурсивно розділяючи список на дві половини, сортує кожну половину, а потім зливає відсортовані половини разом."
    },
    ru: {
      title: "Merge Sort",
      timeComplexity: "Время: O(n log n)",
      spaceComplexity: "Место: O(n)",
      description: "Сортировка слиянием - это эффективный, стабильный и основанный на сравнениях алгоритм сортировки. Большинство реализаций обеспечивают стабильную сортировку, что означает, что порядок одинаковых элементов на входе и на выходе одинаков. Он работает, рекурсивно разделяя список на две половины, сортируя каждую половину, а затем объединяя отсортированные половины вместе."
    }
  },
  heap: {
    en: {
      title: "Heap Sort",
      timeComplexity: "Time: O(n log n)",
      spaceComplexity: "Space: O(1)",
      description: "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving it to the sorted region."
    },
    fr: {
      title: "Heap Sort",
      timeComplexity: "Temps : O(n log n)",
      spaceComplexity: "Espace : O(1)",
      description: "Le tri par tas est un algorithme de tri basé sur la comparaison qui utilise une structure de données de tas binaire. Il divise son entrée en une région triée et une région non triée, et il réduit de manière itérative la région non triée en extrayant le plus grand élément et en le déplaçant vers la région triée."
    },
    it: {
      title: "Heap Sort",
      timeComplexity: "Tempo: O(n log n)",
      spaceComplexity: "Spazio: O(1)",
      description: "L'heapsort è un algoritmo di ordinamento basato sul confronto che utilizza una struttura dati heap binaria. Divide il suo input in una regione ordinata e una non ordinata e riduce iterativamente la regione non ordinata estraendo l'elemento più grande e spostandolo nella regione ordinata."
    },
    de: {
      title: "Heap Sort",
      timeComplexity: "Zeit: O(n log n)",
      spaceComplexity: "Platz: O(1)",
      description: "Heapsort ist ein vergleichsbasierter Sortieralgorithmus, der eine binäre Heap-Datenstruktur verwendet. Es teilt seine Eingabe in einen sortierten und einen unsortierten Bereich und verkleinert den unsortierten Bereich iterativ, indem das größte Element extrahiert und in den sortierten Bereich verschoben wird."
    },
    es: {
      title: "Heap Sort",
      timeComplexity: "Tiempo: O(n log n)",
      spaceComplexity: "Espacio: O(1)",
      description: "El heapsort es un algoritmo de ordenamiento basado en comparaciones que utiliza una estructura de datos de montón binario. Divide su entrada en una región ordenada y una no ordenada, y reduce iterativamente la región no ordenada extrayendo el elemento más grande y moviéndolo a la región ordenada."
    },
    ja: {
      title: "Heap Sort",
      timeComplexity: "時間: O(n log n)",
      spaceComplexity: "空間: O(1)",
      description: "ヒープソートは、バイナリヒープデータ構造を使用する比較ベースのソートアルゴリズムです。入力をソート済みと未ソートの領域に分割し、最も大きな要素を抽出してソート済み領域に移動することで未ソート領域を反復的に縮小します。"
    },
    no: {
      title: "Heap Sort",
      timeComplexity: "Tid: O(n log n)",
      spaceComplexity: "Plass: O(1)",
      description: "Heap sort er en sammenligningsbasert sorteringsalgoritme som bruker en binær heap-datastruktur. Den deler inn dataene i et sortert og et usortert område, og krymper det usorterte området iterativt ved å trekke ut det største elementet og flytte det til det sorterte området."
    },
    sv: {
      title: "Heap Sort",
      timeComplexity: "Tid: O(n log n)",
      spaceComplexity: "Utrymme: O(1)",
      description: "Heap sort är en jämförelsebaserad sorteringsalgoritm som använder en binär heap-datastruktur. Den delar upp sin input i en sorterad och en osorterad region, och krymper iterativt den osorterade regionen genom att extrahera det största elementet och flytta det till den sorterade regionen."
    },
    uk: {
      title: "Heap Sort",
      timeComplexity: "Час: O(n log n)",
      spaceComplexity: "Місце: O(1)",
      description: "Сортування купою - це алгоритм сортування на основі порівнянь, який використовує структуру даних бінарної купи. Він ділить свій вхід на відсортовану та невідсортовану область і ітеративно зменшує невідсортовану область, витягуючи найбільший елемент і переміщуючи його до відсортованої області."
    },
    ru: {
      title: "Heap Sort",
      timeComplexity: "Время: O(n log n)",
      spaceComplexity: "Место: O(1)",
      description: "Сортировка кучей - это алгоритм сортировки на основе сравнений, который использует структуру данных бинарной кучи. Он делит свой вход на отсортированную и неотсортированную область и итеративно сокращает неотсортированную область, извлекая наибольший элемент и перемещая его в отсортированную область."
    }
  },
  quick: {
    en: {
      title: "Quick Sort",
      timeComplexity: "Time: O(n log n) on average, O(n^2) in the worst case",
      spaceComplexity: "Space: O(log n)",
      description: "Quick sort is an efficient sorting algorithm that uses a divide-and-conquer approach to sort elements. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively."
    },
    fr: {
      title: "Quick Sort",
      timeComplexity: "Temps : O(n log n) en moyenne, O(n^2) dans le pire des cas",
      spaceComplexity: "Espace : O(log n)",
      description: "Le tri rapide est un algorithme de tri efficace qui utilise une approche de diviser pour mieux régner pour trier les éléments. Il fonctionne en sélectionnant un élément 'pivot' dans le tableau et en partitionnant les autres éléments en deux sous-tableaux selon qu'ils sont inférieurs ou supérieurs au pivot. Les sous-tableaux sont ensuite triés de manière récursive."
    },
    it: {
      title: "Quick Sort",
      timeComplexity: "Tempo: O(n log n) in media, O(n^2) nel peggiore dei casi",
      spaceComplexity: "Spazio: O(log n)",
      description: "Il quick sort è un algoritmo di ordinamento efficiente che utilizza un approccio divide et impera per ordinare gli elementi. Funziona selezionando un elemento 'pivot' dall'array e partizionando gli altri elementi in due sotto-array a seconda che siano inferiori o superiori al pivot. I sotto-array vengono poi ordinati ricorsivamente."
    },
    de: {
      title: "Quick Sort",
      timeComplexity: "Zeit: O(n log n) im Durchschnitt, O(n^2) im schlimmsten Fall",
      spaceComplexity: "Platz: O(log n)",
      description: "Quicksort ist ein effizienter Sortieralgorithmus, der einen Divide-and-Conquer-Ansatz verwendet, um Elemente zu sortieren. Es funktioniert, indem ein 'Pivot'-Element aus dem Array ausgewählt und die anderen Elemente in zwei Unterarrays partitioniert werden, je nachdem, ob sie kleiner oder größer als das Pivot sind. Die Unterarrays werden dann rekursiv sortiert."
    },
    es: {
      title: "Quick Sort",
      timeComplexity: "Tiempo: O(n log n) en promedio, O(n^2) en el peor de los casos",
      spaceComplexity: "Espacio: O(log n)",
      description: "El quicksort es un algoritmo de ordenamiento eficiente que utiliza un enfoque de divide y vencerás para ordenar los elementos. Funciona seleccionando un elemento 'pivote' del array y particionando los otros elementos en dos sub-arrays según si son menores o mayores que el pivote. Los sub-arrays se ordenan luego recursivamente."
    },
    ja: {
      title: "Quick Sort",
      timeComplexity: "時間: 平均O(n log n)、最悪O(n^2)",
      spaceComplexity: "空間: O(log n)",
      description: "クイックソートは、要素をソートするために分割統治法を使用する効率的なソートアルゴリズムです。配列から「ピボット」要素を選択し、他の要素をピボットより小さいか大きいかによって2つのサブ配列に分割することで機能します。サブ配列は再帰的にソートされます。"
    },
    no: {
      title: "Quick Sort",
      timeComplexity: "Tid: O(n log n) i gjennomsnitt, O(n^2) i verste fall",
      spaceComplexity: "Plass: O(log n)",
      description: "Quick sort er en effektiv sorteringsalgoritme som bruker en del og hersk-tilnærming for å sortere elementer. Den fungerer ved å velge et 'pivot'-element fra matrisen og partisjonere de andre elementene i to underarrayer i henhold til om de er mindre enn eller større enn pivot. Underarrayene sorteres deretter rekursivt."
    },
    sv: {
      title: "Quick Sort",
      timeComplexity: "Tid: O(n log n) i genomsnitt, O(n^2) i värsta fall",
      spaceComplexity: "Utrymme: O(log n)",
      description: "Quick sort är en effektiv sorteringsalgoritm som använder en dela-och-härska-metod för att sortera element. Det fungerar genom att välja ett 'pivot'-element från matrisen och partitionera de andra elementen i två underarrayer beroende på om de är mindre än eller större än pivot. Underarrayerna sorteras sedan rekursivt."
    },
    uk: {
      title: "Quick Sort",
      timeComplexity: "Час: O(n log n) в середньому, O(n^2) в гіршому випадку",
      spaceComplexity: "Місце: O(log n)",
      description: "Швидке сортування - це ефективний алгоритм сортування, який використовує підхід поділу і завоювання для сортування елементів. Він працює, вибираючи 'опорний' елемент з масиву і розділяючи інші елементи на два підмасиви відповідно до того, чи менші вони або більші за опорний. Підмасиви потім сортуються рекурсивно."
    },
    ru: {
      title: "Quick Sort",
      timeComplexity: "Время: O(n log n) в среднем, O(n^2) в худшем случае",
      spaceComplexity: "Место: O(log n)",
      description: "Быстрая сортировка - это эффективный алгоритм сортировки, который использует подход разделяй и властвуй для сортировки элементов. Он работает, выбирая 'опорный' элемент из массива и разделяя другие элементы на два подмассива в зависимости от того, меньше они или больше опорного. Подмассивы затем сортируются рекурсивно."
    }
  }
};



export default function Component() {
  const [array, setArray] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubble")
  const [arraySize, setArraySize] = useState(20)
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const pauseRef = useRef(false)
  const stopRef = useRef(false)

  useEffect(() => {
    generateRandomArray(arraySize)
  }, [arraySize])

  const generateRandomArray = (size: number) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100))
    setArray(newArray)
  }

  const shuffleArray = () => {
    const shuffledArray = [...array].sort(() => Math.random() - 0.5)
    setArray(shuffledArray)
  }

  const startAnimation = () => {
    setIsRunning(true)
    pauseRef.current = false
    stopRef.current = false
    switch (currentAlgorithm) {
      case "bubble":
        bubbleSort()
        break
      case "insertion":
        insertionSort()
        break
      case "merge":
        mergeSort([...array], 0, array.length - 1)
        break
      case "heap":
        heapSort()
        break
      case "quick":
        quickSort([...array], 0, array.length - 1)
        break
      default:
        break
    }
  }

  const pauseAnimation = () => {
    pauseRef.current = true
  }

  const resumeAnimation = () => {
    pauseRef.current = false
  }

  const resetAnimation = () => {
    setIsRunning(false)
    pauseRef.current = false
    stopRef.current = true
    generateRandomArray(arraySize)
  }

  const checkPauseAndStop = async () => {
    if (pauseRef.current) {
      await new Promise(resolve => {
        const check = () => {
          if (pauseRef.current && !stopRef.current) {
            setTimeout(check, 50)
          } else {
            resolve(null)
          }
        }
        check()
      })
    }
    return stopRef.current
  }

  const bubbleSort = async () => {
    const newArray = [...array]
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (await checkPauseAndStop()) return
        if (newArray[j] > newArray[j + 1]) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]
          setArray([...newArray])
          await new Promise((resolve) => setTimeout(resolve, 50))
        }
      }
    }
    if (!stopRef.current) setIsRunning(false)
  }

  const insertionSort = async () => {
    const newArray = [...array]
    for (let i = 1; i < newArray.length; i++) {
      if (await checkPauseAndStop()) return
      const key = newArray[i]
      let j = i - 1
      while (j >= 0 && newArray[j] > key) {
        if (await checkPauseAndStop()) return
        newArray[j + 1] = newArray[j]
        j = j - 1
        setArray([...newArray])
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      newArray[j + 1] = key
      setArray([...newArray])
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    if (!stopRef.current) setIsRunning(false)
  }

  async function heapify(newArray: number[], n: number, i: number) {
    if (await checkPauseAndStop()) return
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && newArray[left] > newArray[largest]) largest = left
    if (right < n && newArray[right] > newArray[largest]) largest = right

    if (largest !== i) {
      [newArray[i], newArray[largest]] = [newArray[largest], newArray[i]]
      setArray([...newArray])
      await new Promise((resolve) => setTimeout(resolve, 50))
      await heapify(newArray, n, largest)
    }
  }

  const heapSort = async () => {
    const newArray = [...array]
    const n = newArray.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (await checkPauseAndStop()) return
      await heapify(newArray, n, i)
    }
    for (let i = n - 1; i > 0; i--) {
      if (await checkPauseAndStop()) return
      [newArray[0], newArray[i]] = [newArray[i], newArray[0]]
      setArray([...newArray])
      await new Promise((resolve) => setTimeout(resolve, 50))
      await heapify(newArray, i, 0)
    }
    if (!stopRef.current) setIsRunning(false)
  }

  async function partition(arr: number[], low: number, high: number) {
    if (await checkPauseAndStop()) return low
    const pivot = arr[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      if (await checkPauseAndStop()) return i + 1
      if (arr[j] < pivot) {
        i++
        [arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    await new Promise((resolve) => setTimeout(resolve, 50))
    return i + 1
  }

  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      if (await checkPauseAndStop()) return
      const pi = await partition(arr, low, high)
      await quickSort(arr, low, pi - 1)
      await quickSort(arr, pi + 1, high)
    }
  }

  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (await checkPauseAndStop()) return
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await mergeSort(arr, left, mid)
      await mergeSort(arr, mid + 1, right)
      await merge(arr, left, mid, right)
    }
  }

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    if (await checkPauseAndStop()) return
    const n1 = mid - left + 1
    const n2 = right - mid
    const leftArr = new Array(n1)
    const rightArr = new Array(n2)

    for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i]
    for (let j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j]

    let i = 0, j = 0, k = left

    while (i < n1 && j < n2) {
      if (await checkPauseAndStop()) return
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 50))
      k++
    }

    while (i < n1) {
      if (await checkPauseAndStop()) return
      arr[k] = leftArr[i]
      i++
      k++
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    while (j < n2) {
      if (await checkPauseAndStop()) return
      arr[k] = rightArr[j]
      j++
      k++
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }

  const getAlgorithmExplanation = () => {
    return translations[currentAlgorithm][selectedLanguage] || translations[currentAlgorithm]['en'];
  }

  const { title, timeComplexity, spaceComplexity, description } = getAlgorithmExplanation()

  return (
      <>
        <div className="flex flex-col items-center h-screen">
          <header className="bg-primary text-primary-foreground py-4 px-6 w-full ">
            <h1 className="text-4xl font-bold text-center">Algorithm Visualizer</h1>
          </header>
          <h1 className="text-3xl font-bold mt-8 capitalize">{currentAlgorithm} sort</h1>
          <div className="flex items-end justify-center h-64 mt-10 shadow-2xl p-4 max-w-full">
            {array.map((value, index) => (
                <div
                    key={index}
                    className={`mx-0.5 ${isRunning ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{height: `${value * 2}px`, width: '20px'}}
                ></div>
            ))}
          </div>
          <div className="flex mt-10 space-x-4">
            <Button onClick={startAnimation}>Start</Button>
            <Button onClick={pauseAnimation} variant="outline">Pause</Button>
            <Button onClick={resumeAnimation} variant="outline">Resume</Button>
            <Button onClick={resetAnimation}>Reset</Button>
            <Button onClick={shuffleArray}>Shuffle</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{currentAlgorithm.charAt(0).toUpperCase() + currentAlgorithm.slice(1)} Sort</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                    value={currentAlgorithm}
                    onValueChange={setCurrentAlgorithm}
                >
                  <DropdownMenuRadioItem value="bubble">Bubble Sort</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="insertion">Insertion Sort</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="merge">Merge Sort</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="heap">Heap Sort</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="quick">Quick Sort</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col items-center mt-10 space-y-4">
            <label className="text-xl">Array Size: {arraySize}</label>
            <Slider
                value={[arraySize]}
                onValueChange={(value) => setArraySize(value[0])}
                min={5}
                max={100}
            />
          </div>
          <div className="mt-16 w-full max-w-xl">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="underline mb-2">{title}</CardTitle>
                <CardDescription>
                  <div>{timeComplexity}</div>
                  <div>{spaceComplexity}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-justify">{description}</p>
              </CardContent>
            </Card>
          </div>

        </div>
        <footer className="bg-muted text-muted-foreground py-6">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <p className="text-sm">&copy; 2024 Quintavalle Pietro. All rights reserved.</p>
            <nav className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{selectedLanguage.toUpperCase()}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                      value={selectedLanguage}
                      onValueChange={(value) => setSelectedLanguage(value)}
                  >
                    {languages.map((lang) => (
                        <DropdownMenuRadioItem key={lang} value={lang}>
                          {lang.toUpperCase()}
                        </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger>Licence</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>MIT License</DialogTitle>
                    <DialogDescription>
                      <p className="font-bold">Copyright (c) 2024 Quintavalle Pietro</p>
                      <p className="mt-2">
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the &quot;Software&quot;), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                      </p>
                      <p>
                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.
                      </p>
                      <p className="mt-2">
                        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <a href="https://github.com/Quinta0" target="_blank" rel="noopener noreferrer"
                 className="hover:underline">
                <GitHubIcon className="w-6 h-6"/>
              </a>
              <a href="mailto:0pietroquintavalle0@gmail.com" className="hover:underline">
                <GmailIcon className="w-6 h-6"/>
              </a>
              <a href="https://www.linkedin.com/in/pietro-quintavalle-996b96267/" target="_blank"
                 rel="noopener noreferrer" className="hover:underline">
                <LinkedInIcon className="w-6 h-6"/>
              </a>
            </nav>
          </div>
        </footer>
      </>
  )
}

function ArrowUpDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="m21 16-4 4-4-4"/>
        <path d="M17 20V4"/>
        <path d="m3 8 4-4 4 4"/>
        <path d="M7 4v16"/>
      </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
      >
        <path d="M12 .5C5.48.5.5 5.48.5 12c0 5.08 3.29 9.35 7.85 10.86.58.1.79-.24.79-.54 0-.27-.01-.99-.01-1.94-3.19.69-3.86-1.54-3.86-1.54-.53-1.36-1.29-1.72-1.29-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.69 1.26 3.34.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.45.12-3.02 0 0 .97-.31 3.17 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.57.24 2.73.12 3.02.75.81 1.2 1.84 1.2 3.1 0 4.46-2.69 5.43-5.25 5.71.41.35.78 1.03.78 2.08 0 1.5-.01 2.72-.01 3.08 0 .3.21.65.8.54C20.71 21.35 24 17.08 24 12c0-6.52-4.98-11.5-12-11.5z"/>
      </svg>
  )
}

function GmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
      >
        <path d="M12 12.713l11.985-8.677a.868.868 0 0 0-.491-.148H.506c-.177 0-.344.055-.491.148L12 12.713zm0 1.431L.035 5.596A.875.875 0 0 0 0 6.125v11.75c0 .478.387.875.875.875h22.25c.478 0 .875-.387.875-.875V6.125a.875.875 0 0 0-.035-.529L12 14.144z"/>
      </svg>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.5h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-11h3v1.474c.809-1.161 2.201-1.974 3.5-1.974 2.481 0 4.5 2.019 4.5 4.5v7z"/>
      </svg>
  )
}
