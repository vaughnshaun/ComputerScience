using System;
using Xunit;
using Xunit.Abstractions;

namespace InterviewQuestionsLib.Tests
{
    public class Question_ListOfSortedListsTest
    {
        private ITestOutputHelper Output { get; }

        public Question_ListOfSortedListsTest(ITestOutputHelper output)
        {
            this.Output = output;
        }

        [Fact]
        public void Should_IterateInorderUntilEnd()
        {
            var question = new Question_ListOfSortedLists();
            var numberOfLists = 4;
            var numberOfElements = 8;
            var listOfSortedLists = question.GenerateSortedListOfList(numberOfLists, numberOfElements);
            var iterator = new Question_ListOfSortedLists.SortedIterator<int>(listOfSortedLists);

            // Test for inorder and that algorithm loops to the end
            var count = 0;
            var isInOrder = true;
            int? prev = null;
            while (iterator.MoveNext() && isInOrder)
            {
                Output.WriteLine(iterator.Current.ToString());
                isInOrder = !prev.HasValue || prev <= iterator.Current;
                count++;
                prev = iterator.Current;
            }

            Assert.Equal(numberOfElements * numberOfLists, count);
            Assert.True(isInOrder);
        }
    }
}
