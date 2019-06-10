using System;
using Xunit;
using Xunit.Abstractions;

namespace InterviewQuestionsLib.Tests
{
    public class Question_PossibleKnightMovesTest
    {
        private ITestOutputHelper Output { get; }

        public Question_PossibleKnightMovesTest(ITestOutputHelper output)
        {
            this.Output = output;
        }

        [Fact]
        public void Should_OutputPossibleMoves()
        {
            var question = new Question_PossibleKnightMoves();
            var board = question.GenerateBoard(8, 8);
            var moves = question.GetPossibleMoves(board, 0, 0);

            Output.WriteLine("Random Results: ");
            foreach (var curMove in moves)
            {
                Output.WriteLine(String.Format("({0}, {1})", curMove.x, curMove.y));
            }

            Output.WriteLine("\nStatic Results: ");
            var x = 3;
            var y = 3;
            board = question.ConvertToBoard(new int[][] 
            {
                new int[] { 0, 0, 0, 0, 0, 0, 0, 0},
                new int[] { 0, 0, 0, 0, 2, 0, 0, 0},
                new int[] { 0, 1, 0, 0, 0, 1, 0, 0},
                new int[] { 0, 0, 0, 3, 0, 0, 0, 0},
                new int[] { 0, 1, 0, 0, 0, 1, 0, 0},
                new int[] { 0, 0, 2, 0, 2, 0, 0, 0},
                new int[] { 0, 0, 0, 0, 0, 0, 0, 0},
                new int[] { 0, 0, 0, 0, 0, 0, 0, 0}
            });

            moves = question.GetPossibleMoves(board, x, y);
            var count = 0;
            foreach (var curMove in moves)
            {
                count++;
                Output.WriteLine(String.Format("({0}, {1})", curMove.x, curMove.y));
            }

            Assert.Equal(5, count);
        }
    }
}
