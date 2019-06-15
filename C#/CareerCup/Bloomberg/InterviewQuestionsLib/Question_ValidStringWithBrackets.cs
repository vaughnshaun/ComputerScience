using System;
using System.Collections.Generic;
using System.Text;

namespace InterviewQuestionsLib
{
    /// <summary>
    /// 1. Check if string s is valid based on brackets
    ///     (({{}})) is a valid s 
    ///     {[]} is a valid s
    ///     [{[}]] is not valid
    /// 2. What kind of test would you conduct to minimize bugs
    /// 3. What happens if developers wanted to add new brackets like
    ///     "<>"
    /// Solution:
    ///     Create a BracketValidator class
    ///         IsOpened(open) - Determines if a character is a opening bracket
    ///         IsMatchingPair(open, closed) - Determines if a opened and closed bracket match
    ///         Add(open, closed) - throw if open already added
    ///                             throw if closed already added
    ///                             
    ///     Add brackets to the bracket validator
    ///     Loop through the whole string
    ///         If not valid bracket Return false (not needed closing will take care of this)
    ///         If open add to stack
    ///         Else If Not IsMatchingPair(stack.pop(), curString) Return false
    ///     End Loop
    ///     Return true when there are no more open brackets
    ///     
    ///     
    /// Type of test: 
    ///     1. Will always return false for invalid brackets
    ///     2. Return false if the open and closed don't match
    ///     3. Test Nested
    ///     4. Test Sibling
    ///     5. Test sibling and nested
    ///     6. Test odd number of strings
    ///     7. 1 bracket is false and zero is true
    ///     8. Prevent duplicates
    /// </summary>
    public class Question_ValidStringWithBrackets
    {
        public bool IsValidBracketString(String s, BracketValidator validator = null)
        {
            if (s == null)
                throw new ArgumentNullException("A string is required");

            if (validator == null)
                validator = BracketValidator.CreateDefaultValidator();

            Stack<char> openStack = new Stack<char>();

            foreach (var curBracket in s)
            {
                if (validator.IsOpen(curBracket))
                {
                    openStack.Push(curBracket);
                }
                else if (openStack.Count == 0 || validator.IsMatchingPair(openStack.Pop(), curBracket))
                {
                    return false;
                }
            }
            return openStack.Count == 0;
        }

        public class BracketValidator
        {
            private HashSet<char> openBrackets = new HashSet<char>();
            private Dictionary<char, char> closedOpenedPair = new Dictionary<char, char>();

            public void AddPair(char open, char close)
            {
                if (char.IsWhiteSpace(open) || char.IsWhiteSpace(close))
                    throw new ArgumentException("A bracket must be specified. An empty character is not allowed.");

                if (openBrackets.Contains(open) || openBrackets.Contains(close))
                    throw new ArgumentException("Brackets exist already.");

                if (closedOpenedPair.ContainsKey(open) || closedOpenedPair.ContainsKey(close))
                    throw new ArgumentException("Brackets exist already.");

                openBrackets.Add(open);
                closedOpenedPair.Add(close, open);
            }

            public Boolean IsOpen(char open)
            {
                return openBrackets.Contains(open);
            }

            public bool IsMatchingPair(char open, char close)
            {
                return closedOpenedPair.TryGetValue(open, out char actualClose) && actualClose == close;
            }

            public static BracketValidator CreateDefaultValidator()
            {
                var validator = new BracketValidator();
                validator.AddPair('{', '}');
                validator.AddPair('[', ']');
                validator.AddPair('(', ')');

                return validator;
            }
        }
    }
}
