/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { ReactSVG } from "react-svg"
import {
  PeopleChoice,
  PeopleChoiceText,
  PeopleContainer,
  PrimarySignupButton,
  StepContainer,
  StepQuestion,
} from "./signup.styles"

import Person1 from "../../images/person-1.svg"
import Person2 from "../../images/person-2.svg"
import Person3 from "../../images/person-3.svg"
import Person4 from "../../images/person-4.svg"
import Person5 from "../../images/person-5.svg"
import { spacing } from "../../utils/spacing"

const Step2 = ({ setFormStepAnswer }) => {
  const [answer, setAnswer] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)

  const selectAnswer = (answerText, index) => {
    setAnswer(answerText)
    setSelectedOption(index)
  }

  const submitAnswer = () => {
    if (!answer) return

    const finalAnswer = {
      Employee_Range__c: answer,
    }

    if (selectedOption === 1) {
      window.location = "https://andela.app/"

      return
    }

    setFormStepAnswer(finalAnswer)
  }

  return (
    <>
      <StepContainer>
        <StepQuestion>How big is your company?</StepQuestion>
        <PeopleContainer>
          <PeopleChoice
            selected={selectedOption === 1}
            onClick={() => selectAnswer("Less than 50", 1)}
          >
            <ReactSVG src={Person1} width={35} height={35} />
            <PeopleChoiceText>Less than 50</PeopleChoiceText>
          </PeopleChoice>
          <PeopleChoice
            selected={selectedOption === 2}
            onClick={() => selectAnswer("51 to 200", 2)}
          >
            <ReactSVG src={Person2} width={67} height={53} />
            <PeopleChoiceText>51 to 200</PeopleChoiceText>
          </PeopleChoice>
          <PeopleChoice
            selected={selectedOption === 3}
            onClick={() => selectAnswer("201 to 500", 3)}
          >
            <ReactSVG src={Person3} width={67} height={55} />
            <PeopleChoiceText>201 to 500</PeopleChoiceText>
          </PeopleChoice>
          <PeopleChoice
            selected={selectedOption === 4}
            onClick={() => selectAnswer("501 to 1000", 4)}
          >
            <ReactSVG src={Person4} width={67} height={63} />
            <PeopleChoiceText>501 to 1000</PeopleChoiceText>
          </PeopleChoice>
          <PeopleChoice
            selected={selectedOption === 5}
            onClick={() => selectAnswer("1000+", 5)}
          >
            <ReactSVG src={Person5} width={84} height={48} />
            <PeopleChoiceText>1000+</PeopleChoiceText>
          </PeopleChoice>
        </PeopleContainer>
      </StepContainer>
      <PrimarySignupButton
        style={{ marginTop: spacing.customSpacing("64px") }}
        onClick={submitAnswer}
      >
        Next
      </PrimarySignupButton>
    </>
  )
}

export default Step2