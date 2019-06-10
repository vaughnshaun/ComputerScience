using InterviewQuestionsLib;
using System;

namespace Microsoft
{
    class Program
    {
        static void Main(string[] args)
        {
            var listOfSortedLists = new Question_ListOfSortedLists();
            listOfSortedLists.Run();
            Console.WriteLine("\nDone press any key to exit.");
            Console.ReadKey();
        }
    }
}
