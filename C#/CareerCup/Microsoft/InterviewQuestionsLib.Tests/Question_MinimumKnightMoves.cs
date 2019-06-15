using System;
using System.Collections.Generic;
using System.Text;

namespace InterviewQuestionsLib.Tests
{
    /// <summary>
    /// Return the minimum amount of moves for a knight
    /// to get from (x1, y1) to (x2, y2).
    /// 
    /// Solution:
    ///     NOTE: This is a modified BFS shortest path problem.
    ///     In the shortest path, each node must link to the previous node.
    ///     For this solution it is sufficient to just have a depth data memeber for each node
    ///     Get all the moves for a knight
    ///         (R1, L1) x (U2, D2)
    ///         (R2, L2) x (U1, D1)
    ///     Build a board to represent the block type or just go with a single boolean
    ///     return 0 if the knight is already at the destination
    ///     Add the start node to the queue
    ///     Loop while queue is not empty
    ///         Dequeue a node
    ///         loop through all the possible final locations from the dequeued node
    ///             if current move equals destination
    ///                 return current.depth + 1
    ///             if move valid
    ///                 add a new node to the queue. Make its depth current.depth + 1
    ///                 
    ///         
    /// </summary>
    class Question_MinimumKnightMoves
    {
        public struct Point
        {
            public Point(int x, int y)
            {
                this.x = x;
                this.y = y;
            }
            public readonly int x;
            public readonly int y;
        }

        private struct Node
        {
            public Point position;
            public int depth;
        }

        private readonly Point[] POSSIBLE_MOVES = new Point[]
        {
            new Point (1, 2),
            new Point (1, -2),
            new Point (-1, 2),
            new Point (-1, -2),
            new Point (2, 1),
            new Point (2, -1),
            new Point (-2, 1),
            new Point (-2, -1)
        };

        public int GetMinimumMoves(bool[][] board, Point start, Point dest)
        {
            if (board == null) throw new ArgumentNullException("A board is required");

            // return zero moves if already at the destination
            if (start.x == dest.x && start.y == dest.y) return 0;

            // Check for invalid
            if (!isPositionInBoard(board, start) || isPositionInBoard(board, dest)) return -1;

            var startNode = new Node
            {
                depth = 0,
                position = dest
            };

            Queue<Node> myQueue = new Queue<Node>();

            while (myQueue.Count > 0)
            {
                var currentNode = myQueue.Dequeue();

                // Check all of the possible moves
                foreach (var curMove in POSSIBLE_MOVES)
                {
                    Point newLocation = new Point(currentNode.position.x + curMove.x, currentNode.position.y + curMove.y);
                    if (newLocation.x == start.x && newLocation.y == start.y)
                        return currentNode.depth + 1;

                    if (isPositionInBoard(board, newLocation) && board[newLocation.x][newLocation.y])
                        myQueue.Enqueue(new Node
                        {
                            depth = currentNode.depth + 1,
                            position = newLocation
                        });
                }
            }

            // Not found
            return -1;
        }

        private bool isPositionInBoard(bool[][] board, Point pos)
        {
            if (pos.y < 0 || pos.x < 0 || pos.y >= board.Length || pos.x >= board[pos.y].Length) return false;

            return true;
        }
    }
}
