using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Xunit.Abstractions;

namespace InterviewQuestionsLib.Tests
{
    public class Question_ModifiedBubbleSortTest
    {
        private ITestOutputHelper Output { get; }

        public Question_ModifiedBubbleSortTest(ITestOutputHelper output)
        {
            this.Output = output;
        }

        [Theory]
        [InlineData(new int[]{1, 2, 3, 4, 5}, new int[] { 5, 4, 3, 2, 1 })]
        [InlineData(new int[] { 1 }, new int[] { 5 })]
        [InlineData(new int[] { 6, 7, 8, 9 }, new int[] { 9, 8, 7, 6 })]
        public void Should_NotSortArray_When_IsSortedAlready(int[] asc, int[] desc)
        {
            var question = new Question_ModifiedBubbleSort();
            DoTest(question, asc, desc);
            Assert.Equal(0, question.LastSwapCount);
        }

        [Theory]
        [InlineData(new int[] { 1, 2, 3, 4, 5, 4 }, new int[] { 5, 4, 3, 2, 1, 2 })]
        [InlineData(new int[] { 1, 2, 3, 4, 6, 4 }, new int[] { 5, 4, 3, 3, 2, 3 })]
        public void Should_SortArray_When_OnlyOneSwapIsRequired(int[] asc, int[] desc)
        {
            var question = new Question_ModifiedBubbleSort();
            DoTest(question, asc, desc);
            Assert.Equal(1, question.LastSwapCount);
        }

        [Theory]
        [InlineData(new int[] { 9, 2, 5, 4, 5, 4 }, new int[] { 1, 4, 3, 2, 1, 2 })]
        [InlineData(new int[] { 10, 8, 9, 7, 6, 5 }, new int[] { 1, 2, 3, 4, 5, 6 })]
        [InlineData(new int[] { 1, 2, 9, 3, 5, 3 }, new int[] { 1, 2, 3, 4, 5, 6 })]
        public void Should_Sort_When_ElementsAreOutOfOrder(int[] asc, int[] desc)
        {
            var question = new Question_ModifiedBubbleSort();
            DoTest(question, asc, desc);
        }

        private bool IsSorted<T>(T[] array, bool isDesc = false) where T : IComparable
        {
            // Ascending checker
            Func<int, bool> isInOrder = index => array[index].CompareTo(array[index + 1]) <= 0;

            if(isDesc)
                isInOrder = index => array[index].CompareTo(array[index + 1]) >= 0;

            for (var i = 0; i < array.Length - 1; i++)
            {
                if (!isInOrder(i))
                    return false;
            }

            return true;
        }

        private void DoTest<T>(Question_ModifiedBubbleSort question, T[] ascArray, T[] descArray) where T : IComparable
        {
            Output.WriteLine("Ascending Before: " + String.Join(", ", ascArray));
            Output.WriteLine("Descending Before: " + String.Join(", ", descArray));

            question.BubbleSort(ascArray, false);
            question.BubbleSort(descArray, true);

            Output.WriteLine("Ascending After: " + String.Join(", ", ascArray));
            Output.WriteLine("Descending After: " + String.Join(", ", descArray));

            Assert.True(IsSorted(ascArray));
            Assert.True(IsSorted(descArray, true));
        }
    }
}
