using System;

namespace InterviewQuestionsLib
{
    /// <summary>
    /// Kanade's Algorithm
    /// Write an eifficient program to find the sum of contiguous subarray
    /// within a one-dimensional array of numbers which has the largest sum.
    /// 
    /// Solution:
    ///     Declare maxSum, maxStart, and maxEnd (maxStart and maxEnd should be passed in as out parameters)
    ///     Set maxStart and maxEnd to -1
    ///     If the array is null throw an exception
    ///     If the array is a length of zero return maxSum
    ///     Declare start and set it to zero
    ///     Declare sum and set it to [start]
    ///     Declare maxSum and set it to sum
    ///     For i = start, loop through all of the integers in the array
    ///         // Skip all negatives
    ///         If sum + [i] < zero
    ///             start set to i
    ///             sum set to [i]
    ///         Else
    ///             sum += [i]
    ///         End If
    ///         
    ///         If sum > maxSum
    ///             maxSum set to sum
    ///             maxStart set to start
    ///             maxEnd set to i
    ///         End If
    ///     End For
    ///     
    /// </summary>
    public class Question_MaxContiguousSum
    {
        public static int GetMaxContiguousSum(int[] array, out int maxStart, out int maxEnd)
        {
            int max_so_far = int.MinValue, max_ending_here = 0,
       start = 0, end = 0, s = 0;

            for (int i = 0; i < array.Length; i++)
            {
                max_ending_here += array[i];

                if (max_so_far < max_ending_here)
                {
                    max_so_far = max_ending_here;
                    start = s;
                    end = i;
                }

                if (max_ending_here < 0)
                {
                    max_ending_here = 0;
                    s = i + 1;
                }

              
            }
            maxStart = start;
            maxEnd = end;
            return max_so_far;
            /*maxStart = -1;
            maxEnd = -1;

            if (array == null) throw new ArgumentNullException("An array is required to find the max contiguous sum.");
            if (array.Length == 0) return -1;

            int start = 0;
            int sum = 0;
            int maxSum = sum;
            maxStart = start;
            maxEnd = start;

            for (var i = start; i < array.Length; i++)
            {
                // NOTE: This commented out code works, however it can be simplified
                // It is always best to get rid of nested ifs when it makes sense
                // So how the same calculation is being done twice?
                /*if (sum + array[i] < 0)
                {
                    start = i;
                    sum = array[i];
                }
                else
                {
                    sum += array[i];
                }

                // I can just accumlate on the sum always because the following if statement will reset if there is a negative sum
                sum += array[i];
                if (sum < 0)
                {
                    start = i;
                    sum = array[i];
                }

                // Save the greatest sum so far
                if (sum > maxSum)
                {
                    maxSum = sum;
                    maxStart = start;
                    maxEnd = i;
                }
            }

            return maxSum;*/
        }
    }
}
