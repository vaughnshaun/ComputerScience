using System;
using Xunit;
using Xunit.Abstractions;
using System.Linq;
using System.Text;

namespace InterviewQuestionsLib.Tests
{
    public class Question_MaxContiguousSumTest
    {
        private ITestOutputHelper Output { get; }

        public Question_MaxContiguousSumTest(ITestOutputHelper output)
        {
            this.Output = output;
        }

        [Fact]
        public void ShouldFindMaximumSum_When_MaxAtStart()
        {
            int[] array = new int[] { 20, -7, -6, -2, -5, 8, 7, 0 };
            TestSum(array, 0, 0, 20);
        }

        [Fact]
        public void ShouldFindMaximumSum_When_MaxAtEnd()
        {
            int[] array = new int[] { -3, -7, 6, -2, -5, 8, 7, 0 };
            TestSum(array, 5, 6, 15);
        }

        [Fact]
        public void ShouldFindMaximumSum_When_MaxAtMiddle()
        {
            int[] array = new int[] { -3, -7, 6, -2, -3, 8, 7, -3 };
            TestSum(array, 2, 6, 16);
        }

        [Fact]
        public void ShouldFindMaximumSum_When_FullArray()
        {
            int[] array = new int[] { 1, 2, 3, 4, 5 };
            TestSum(array, 0, array.Length - 1, 15);
        }

        [Fact]
        public void ShouldFindMaximumSum_When_ArrayAllNegatives()
        {
            int[] array = new int[] { -5, -9, -1, -10 };
            TestSum(array, 2, 2, -1);
        }

        private void TestSum(int[] array, int expectedStart, int expectedEnd, int expectedSum)
        {
            var question = new Question_MaxContiguousSum(Question_MaxContiguousSum.AlgoType.MinesCorrect);
            int maxStart;
            int maxEnd;
            int maxSum = question.GetMaxContiguousSum(array, out maxStart, out maxEnd);

            int[] resultArray = new int[(maxEnd - maxStart) + 1];
            for (var i = maxStart; i <= maxEnd; i++)
            {
                resultArray[i - maxStart] = array[i];
            }
            Output.WriteLine(String.Join(',', resultArray));

            Assert.Equal(expectedStart, maxStart);
            Assert.Equal(expectedEnd, maxEnd);
            Assert.Equal(expectedSum, maxSum);
        }
    }
}
