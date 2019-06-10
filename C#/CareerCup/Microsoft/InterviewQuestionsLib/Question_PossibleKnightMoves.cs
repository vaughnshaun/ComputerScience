using System;
using System.Collections.Generic;
using System.Text;

namespace InterviewQuestionsLib
{
    public class Question_PossibleKnightMoves
    {
        public struct Point
        {
            public int x;
            public int y;
        }

        public enum BlockType
        {
            EMPTY,
            ENEMY_CAPTURE,
            ENEMY,
            PLAYER
        }

        // Define the moves as a cartesian product of
        // (R1, L1) x (U2, D2)
        // (R2, L2) x (U1, D1)
        private readonly Point[] POSSIBLE_MOVES = new Point[]
        {
            new Point { x = 1, y = 2},
            new Point { x = 1, y = -2},
            new Point { x = -1, y = 2},
            new Point { x = -1, y = -2},
            new Point { x = 2, y = 1},
            new Point { x = 2, y = -1},
            new Point { x = -2, y = 1},
            new Point { x = -2, y = -1}
        };

        public BlockType[][] ConvertToBoard(int[][] board)
        {
            BlockType[][] newBoard = new BlockType[board.Length][];
            var rowCount = 0;
            foreach (var row in board)
            {
                newBoard[rowCount] = new BlockType[row.Length];
                var colCount = 0;
                foreach (var cell in row)
                {
                    try
                    {
                        newBoard[rowCount][colCount] = (BlockType)cell;
                    }
                    catch
                    {
                        newBoard[rowCount][colCount] = BlockType.EMPTY;
                    }
                    
                    colCount++;
                }
                rowCount++;
            }

            return newBoard;
        }

        public BlockType[][] GenerateBoard(int rows, int cols)
        {
            var rand = new Random();
            var grid = new BlockType[rows][];

            for (var i = 0; i < rows; i++)
            {
                grid[i] = new BlockType[cols];
                for (var j = 0; j < grid.Length; j++)
                {
                    grid[i][j] = (BlockType)rand.Next(0, 2);
                }
            }

            return grid;
        }

        public IEnumerable<Point> GetAllMoves(BlockType[][] board, int x, int y)
        {
            for (var i = 0; i < POSSIBLE_MOVES.Length; i++)
            {
                var moveX = POSSIBLE_MOVES[i].x;
                var moveY = POSSIBLE_MOVES[i].y;

                yield return new Point { x = x + moveX, y = y + moveY };
            }
        }

        public IEnumerable<Point> GetPossibleMoves(BlockType[][] board, int x, int y)
        {
            IEnumerable<Point> allMoves = GetAllMoves(board, x, y);
            
            foreach(var move in allMoves)
            {
                // Bound check the board first
                if (move.y < 0 || move.y >= board.Length || move.x < 0 || move.x >= board[move.y].Length)
                    continue;

                if (board[move.y][move.x] == BlockType.EMPTY || board[move.y][move.x] == BlockType.ENEMY_CAPTURE)
                    yield return move;
            }
        }
    }
}
