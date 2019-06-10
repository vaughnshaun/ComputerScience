using System;
using System.Collections.Generic;

namespace InterviewQuestionsLib
{
    /// <summary>
    /// Given a list of sorted lists each of size maximum size M, implement an iterator 
    /// (maintain the order of items as in the original list of lists).
    /// The interviewer wants constant space.
    /// 
    /// What is an iterator?
    /// 1. An iterator is an object that allows the programmer to traverse a container aka list
    /// 2. The iterator does not perform iteration. Iteration meaning an instruction to do a full loop through a list
    /// 3. The program does the iteration by continually calling iterator.moveNext or something similar.
    /// 4. C# has the IEnumerable interface. All objects that implement this interface must implement the
    ///     GetEnumerator() method. GetEnumerator() returns the IEnumerator, C#' iterator.
    ///     
    /// Solution:
    ///     Iterator object internals:
    ///         listIndex[] - The current index for the specified list
    ///         Current - The returned item
    ///     Visit each list until a list is found whose current index is less than the size
    ///     Visit the remain list and compare the smallest based on priority criteria
    ///     
    ///     if a list is found set iterator.Current to the item and update the list's current index
    ///     if no list is found MoveNext returns false
    /// </summary>
    public class Question_ListOfSortedLists
    {
        public void Run()
        {
            var numberOfLists = 4;
            var numberOfElements = 8;
            var list = GenerateSortedListOfList(numberOfLists, numberOfElements);
            var iterator = new SortedIterator<int>(list);

            var count = 0;
            while (iterator.MoveNext())
            {
                Console.WriteLine(iterator.Current);
                count++;
            }

            if (count == numberOfLists * numberOfElements)
            {
                Console.WriteLine("All " + count + " Elements");
            }
            else
            {
                Console.WriteLine("Element count is wrong");
            }
        }

        public IList<IList<int>> GenerateSortedListOfList(int numberOfList, int numberOfElements)
        {
            var list = new List<IList<int>>();
            Random rnd = new Random();

            for (var i = 0; i < numberOfList; i++)
            {
                list.Add(new List<int>());
                for (var j = 0; j < numberOfElements; j++)
                {
                    list[i].Add(rnd.Next(1, 40));
                }

                ((List<int>)list[i]).Sort();
            }

            return list;
        }

        /// <summary>
        /// This assumes the passed in list of list is sorted
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public class SortedIterator<T> where T : IComparable<T>
        {
            private IList<IList<T>> list;
            private int[] listIndex;
            public T Current { get; private set; }
            public SortedIterator(IList<IList<T>> list)
            {
                this.list = list;
                listIndex = new int[list.Count];
            }

            public Boolean MoveNext()
            {
                var selectedList = -1;

                for (var i = 0; i < list.Count; i++)
                {
                    if (selectedList == -1)
                    {
                        if (listIndex[i] < list[i].Count)
                        {
                            selectedList = i;
                        }
                    }
                    else if(listIndex[i] < list[i].Count && GetListCurrentElement(i).CompareTo(GetListCurrentElement(selectedList)) < 0)
                    {
                        selectedList = i;
                    }
                }

                if (selectedList > -1)
                {
                    Current = GetListCurrentElement(selectedList);
                    listIndex[selectedList]++;
                    return true;
                }

                // No more items
                return false;
            }

            private T GetListCurrentElement(int indexOfList)
            {
                return list[indexOfList][listIndex[indexOfList]];
            }
        }
    }
}
