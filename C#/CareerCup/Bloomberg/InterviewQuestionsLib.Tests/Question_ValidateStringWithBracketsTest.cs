using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Xunit.Abstractions;

namespace InterviewQuestionsLib.Tests
{
    public class Question_ValidateStringWithBracketsTest
    {
        private ITestOutputHelper Output { get; }
        private Question_ValidStringWithBrackets question;

        public Question_ValidateStringWithBracketsTest(ITestOutputHelper output)
        {
            this.Output = output;
            question = new Question_ValidStringWithBrackets();
        }

        [Theory]
        [InlineData("(({{}}))")]
        [InlineData("(({{{}{}(())}}))")]
        [InlineData("(())(({{}}))({{[]}})")]
        public void Should_ReturnTrue_When_StringContainsNested(String input)
        {
            Assert.True(question.IsValidBracketString(input));
        }

        [Theory]
        [InlineData("(({{}})")]
        [InlineData("{}(){}[")]
        [InlineData("{}(){}]")]
        [InlineData("{")]
        public void Should_ReturnFalse_When_StringIsOddNummbered(String input)
        {
            Assert.False(question.IsValidBracketString(input));
        }

        [Theory]
        [InlineData("<><>")]
        [InlineData("<<>>")]
        public void Should_ReturnFalse_When_StringHasInvalidBrackets(String input)
        {
            Assert.False(question.IsValidBracketString(input));
        }
    }
}
