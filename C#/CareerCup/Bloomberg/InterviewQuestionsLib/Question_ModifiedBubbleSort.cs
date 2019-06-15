using System;
using System.Collections.Generic;
using System.Text;

namespace InterviewQuestionsLib
{
    /// <summary>
    /// Code a bubble sort. If the array is already sorted,
    /// the function should retun immediately. Also if there is only
    /// one swap, the loop should break without going through O(n^2)
    /// 
    /// Bubble Sort basics:
    ///     A bubble sort gets its name by the way the out of order elements
    ///     bubble up/down. This is dependent on the implementation, but the time complexity
    ///     is still the same. Essentially it is a double loop. The inner loop compares it value
    ///     to the neighboring element. This element is constantly compared until it can't bubble further.
    ///     
    /// Solution:
    ///     For i = 0 loop through the array
    ///         For j = array length - 1 loop while j > i
    ///             If array[j] < array[j-1] (ascending) or array[j] > array[j+1] (descending)
    ///                 swap array[j] and array[j+1]
    ///         End For
    ///         If swapCount <= MAX_SWAP_COUNT break
    ///     End For
    ///           
    /// Lessons: 
    ///     1. Use examples to see how the code works. Write out a few example arrays.
    ///     2. Assume sorted when swaps less than equal 1. No need to have a separate check for already sorted.
    ///     This is simplified logic even though the question makes it seem like two separate checks. Read between the lines.
    ///     3. Inner loop should never break early. This acts as a checker.
    /// </summary>
    public class Question_ModifiedBubbleSort
    {
        public int LastSwapCount { get; private set; }
        public const int MAX_SWAP_COUNT = 1;

        public void BubbleSort<T>(T[] array, bool isDesc = false) where T : IComparable
        {
            if(array == null)
                throw new ArgumentNullException("An array is required to do a sort operation.");

            LastSwapCount = 0;

            // Ascending
            Func<int, bool> shouldSwap = index => array[index].CompareTo(array[index - 1]) < 0;

            if (isDesc)
                shouldSwap = index => array[index].CompareTo(array[index - 1]) > 0;

            for (var i = 0; i < array.Length; i++)
            {
                for (var j = array.Length - 1; j > i; j--)
                {
                    if (shouldSwap(j))
                    {
                        var temp = array[j];
                        array[j] = array[j - 1];
                        array[j - 1] = temp;
                        LastSwapCount++;
                    }
                }

                if (LastSwapCount <= MAX_SWAP_COUNT)
                    break;
            }
        }
    }
}
