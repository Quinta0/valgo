"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

export default function Component() {
  const [array, setArray] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubble")
  const [arraySize, setArraySize] = useState(20)

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
    switch (currentAlgorithm) {
      case "bubble":
        bubbleSort()
        break
      case "insertion":
        insertionSort()
        break
      case "merge":
        mergeSort(array, 0, array.length - 1)
        break
      default:
        break
    }
  }

  const pauseAnimation = () => {
    setIsRunning(false)
  }

  const resetAnimation = () => {
    setIsRunning(false)
    generateRandomArray(arraySize)
  }

  const bubbleSort = async () => {
    const newArray = [...array]
    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          ;[newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]]
          setArray([...newArray])
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }
    setIsRunning(false)
  }

  const insertionSort = async () => {
    const newArray = [...array]
    for (let i = 1; i < newArray.length; i++) {
      const key = newArray[i]
      let j = i - 1
      while (j >= 0 && newArray[j] > key) {
        newArray[j + 1] = newArray[j]
        j = j - 1
        setArray([...newArray])
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
      newArray[j + 1] = key
      setArray([...newArray])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    setIsRunning(false)
  }

  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await mergeSort(arr, left, mid)
      await mergeSort(arr, mid + 1, right)
      await merge(arr, left, mid, right)
    }
  }

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1
    const n2 = right - mid
    const leftArr = new Array(n1)
    const rightArr = new Array(n2)

    for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i]
    for (let j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j]

    let i = 0, j = 0, k = left

    while (i < n1 && j < n2) {
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
      arr[k] = leftArr[i]
      i++
      k++
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    while (j < n2) {
      arr[k] = rightArr[j]
      j++
      k++
      setArray([...arr])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  return (
      <div className="flex flex-col items-center h-screen">
        <header className="bg-primary text-primary-foreground py-4 px-6  w-full">
          <h1 className="text-2xl font-bold text-center">Algorithm Visualizer</h1>
        </header>
        <div className="flex items-end justify-center min-w-max h-64 mt-10 shadow-2xl p-4">
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
          <Button onClick={pauseAnimation} variant="outline" a>Pause</Button>
          <Button onClick={resetAnimation}>Reset</Button>
          <Button onClick={shuffleArray}>Shuffle</Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {currentAlgorithm.charAt(0).toUpperCase() + currentAlgorithm.slice(1)} Sort
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                  value={currentAlgorithm}
                  onValueChange={setCurrentAlgorithm}
              >
                <DropdownMenuRadioItem value="bubble">Bubble Sort</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="insertion">Insertion Sort</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="merge">Merge Sort</DropdownMenuRadioItem>
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
      </div>
  )
}

function ArrowUpDownIcon(props) {
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
  )
}
