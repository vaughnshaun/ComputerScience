using System;
using System.Collections.Generic;
using System.Text;

namespace InterviewQuestionsLib
{
    /// <summary>
    /// DESIGNING AT THIS LEVEL IS OUT OF SCOPE OF AN INTERVIEW
    /// Given a grid where the top left is (0,0) and a coordinate (x, y),
    /// Find all the possible moves (final location?) for a knight.
    /// It is possible to have different color chess pieces.
    /// You must be aware of occupied places on the grid.
    /// 
    /// Design:
    /// The chess piece doesn't need a position. The board always stores the chess piece
    /// What is unique to a chess piece? color and type (knight, king, etc)
    /// A user doesn't simply move a piece. They move a piece relative to the board.
    /// For example, move piece at location (x, y) to dest (x, y)
    /// </summary>
    public class Question_PossibleKnightMoves_Obsolete
    {
        public abstract class ChessPiece
        {
            public enum ColorType
            {
                White,
                Black
            }

            public struct Point
            {
                public int x;
                public int y;
            }

            // Technically color should belong to player
            protected ColorType color;

            public ChessPiece(ColorType color)
            {
                this.color = color;
            }

            /// <summary>
            /// Struct is safe from outside modification because it is a value type
            /// </summary>
            /// <returns></returns>
            /*public Point GetPosition()
            {
                return currentPos;
            }*/

            public abstract IEnumerable<Point> GetPossibleMoves(int x, int y);
        }

        public class Knight : ChessPiece
        {
            /// <summary>
            /// Define the moves as a cartesian product of
            /// (R1, L1) x (U2, D2)
            /// (R2, L2) x (U1, D1)
            /// </summary>
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

            public Knight(ColorType color) : base(color)
            {
                
            }

            /// <summary>
            /// Keep as an instance method because inheritance is being used.
            /// However, this can technically be a static method
            /// </summary>
            /// <returns></returns>
            public override IEnumerable<Point> GetPossibleMoves(int x, int y)
            {
                foreach(var currentMove in POSSIBLE_MOVES)
                {
                    yield return new Point { x = currentMove.x + x, y = currentMove.y + y };
                }
            }
        }
    }
}
