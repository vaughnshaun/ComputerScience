using System;
using System.Collections.Generic;

namespace InterviewQuestionsLib
{
    /// <summary>
    /// CORRECTIONS HERE: https://codereview.stackexchange.com/questions/222378/careercup-bloomberg-check-if-string-is-valid-based-on-brackets
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
        public bool IsValidBracketString(String input, BracketValidator validator = null)
        {
            // Message not needed since error is for the developer and not the end user
            /*if (s == null)
                throw new ArgumentNullException("A string is required");*/
            /*if (input == null)
                throw new ArgumentNullException(nameof(input));*/
            // Use the tenary operator for readability
            input = input ?? throw new ArgumentNullException(nameof(input));

            /*if (validator == null)
                validator = BracketValidator.CreateDefaultValidator();*/
            validator = validator ?? BracketValidator.CreateDefaultValidator();

            // Prevent redunant type declarations
            //Stack<char> openStack = new Stack<char>();
            var openStack = new Stack<char>();

            foreach (var curBracket in input)
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
                // Guarding whitespace is not in the spec
                /*if (char.IsWhiteSpace(open) || char.IsWhiteSpace(close))
                    throw new ArgumentException("A bracket must be specified. An empty character is not allowed.");*/

                // Could ignore instead of throwing an error
                if (openBrackets.Contains(open) || openBrackets.Contains(close))
                    throw new ArgumentException("Brackets exist already.");

                if (closedOpenedPair.ContainsKey(open) || closedOpenedPair.ContainsKey(close))
                    throw new ArgumentException("Brackets exist already.");

                // Forget to guard against open and closed being the same
                if (open == close)
                    throw new ArgumentException("Open and close cannot be the same.");

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
