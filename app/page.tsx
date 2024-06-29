"use client"

import { useState, useEffect, useRef } from "react"
import React from 'react';
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../components/ui/dropdown-menu"
import { Slider } from "../components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"

export default function Component() {
  const [array, setArray] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubble")
  const [arraySize, setArraySize] = useState(20)
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
            setTimeout(check, 100)
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
          await new Promise((resolve) => setTimeout(resolve, 100))
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
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      newArray[j + 1] = key
      setArray([...newArray])
      await new Promise((resolve) => setTimeout(resolve, 100))
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
      await new Promise((resolve) => setTimeout(resolve, 100))
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
      await new Promise((resolve) => setTimeout(resolve, 100))
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
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    await new Promise((resolve) => setTimeout(resolve, 100))
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
      await new Promise((resolve) => setTimeout(resolve, 100))
      k++
    }

    while (i < n1) {
      if (await checkPauseAndStop()) return
      arr[k] = leftArr[i]
      i++
      k++
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    while (j < n2) {
      if (await checkPauseAndStop()) return
      arr[k] = rightArr[j]
      j++
      k++
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  const getAlgorithmExplanation = () => {
    switch (currentAlgorithm) {
      case "bubble":
        return {
          title: "Bubble Sort",
          timeComplexity: "Time: O(n^2)",
          spaceComplexity: "Space: O(1)",
          description: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted."
        }
      case "insertion":
        return {
          title: "Insertion Sort",
          timeComplexity: "Time: O(n^2)",
          spaceComplexity: "Space: O(1)",
          description: "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort."
        }
      case "merge":
        return {
          title: "Merge Sort",
          timeComplexity: "Time: O(n log n)",
          spaceComplexity: "Space: O(n)",
          description: "Merge sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. Most implementations produce a stable sort, meaning that the implementation preserves the input order of equal elements in the sorted output."
        }
      case "heap":
        return {
          title: "Heap Sort",
          timeComplexity: "Time: O(n log n)",
          spaceComplexity: "Space: O(1)",
          description: "Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining element."
        }
      case "quick":
        return {
          title: "Quick Sort",
          timeComplexity: "Time: O(n log n)",
          spaceComplexity: "Space: O(log n)",
          description: "Quick sort is an efficient sorting algorithm that, on average, makes O(n log n) comparisons to sort n items. It is an in-place sort (i.e., it doesn't require any extra storage)."
        }
      default:
        return { title: "", timeComplexity: "", spaceComplexity: "", description: "" }
    }
  }

  const { title, timeComplexity, spaceComplexity, description } = getAlgorithmExplanation()

  return (
      <div className="flex flex-col items-center h-screen">
        <header className="bg-primary text-primary-foreground py-4 px-6 w-full">
          <h1 className="text-4xl font-bold text-center">Algorithm Visualizer</h1>
        </header>
        <h1 className="text-3xl font-bold mt-8 capitalize">{currentAlgorithm} sort</h1>
        <div className="flex items-end justify-center h-64 mt-10 shadow-2xl p-4">
          {array.map((value, index) => (
              <div
                  key={index}
                  className={`mx-0.5 ${isRunning ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ height: `${value * 2}px`, width: '20px' }}
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
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </svg>
  );
}

