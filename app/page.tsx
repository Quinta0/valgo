"use client"

import { useState, useEffect, useRef } from "react"
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
    <>
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

function GitHubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function GmailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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

function LinkedInIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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