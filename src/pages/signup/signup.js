import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import Seo from "../../components/seo"
import { getMarketoForm } from "../../utils/api"

import { PageContainer } from "../../utils/common.styles"
import {
  FocusDot,
  FocusDotContainer,
  FormContainer,
  HeroDescription,
  HeroTitle,
  MainContainer,
  SignupHero,
  StepProgress,
  StepProgressContainer,
  LoadingText,
  SVGContainer,
} from "../../components/signup/signup.styles"
import Lady1 from "../../images/onboarding/lady-1.svg"
import Guy2 from "../../images/onboarding/guy-2.svg"
import Guy3 from "../../images/onboarding/guy-3.svg"
import Lady4 from "../../images/onboarding/lady-4.svg"
import Github5 from "../../images/onboarding/github-5.svg"
import {
  aqua,
  deepBlue,
  lightAqua,
  lime,
  magenta,
  mainOrange,
} from "../../utils/colors"
import Step1 from "../../components/signup/step-1"
import Step2 from "../../components/signup/step-2"
import Step3 from "../../components/signup/step-3"
import Step4 from "../../components/signup/step-4"
import "../skills/style.css"
import Step3_2 from "../../components/signup/step-3-2"

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(null)
  const [step, setStep] = useState(1)
  const [parentForm, setParentForm] = useState(null)

  const getForm = () => {
    setLoading(true)
    const form = getMarketoForm()

    if (!form) {
      setTimeout(() => getForm(), 500)
    }

    form?.loadForm("//hire.andela.com", "449-UCH-555", 1699, finalForm => {
      setLoading(false)
      console.log(finalForm.vals())
      setParentForm(finalForm)
    })
  }

  const getStep = () => {
    switch (step) {
      default:
      case 1:
        return <Step1 setFormStepAnswer={setFormStepAnswer} />
      case 2:
        return <Step2 setFormStepAnswer={setFormStepAnswer} />
      case 3:
        return <Step3 setFormStepAnswer={setFormStepAnswer} />
      case 4:
        return <Step4 setFormStepAnswer={setFormStepAnswer} />
      case 5:
        return <Step3_2 setFormStepAnswer={setFormStepAnswer} />
    }
  }

  const setFormStepAnswer = answer => {
    setFormData({
      ...formData,
      ...answer,
    })

    if (step === 2 && answer.Employee_Range__c === "1000+") {
      setStep(5)
      return
    }

    if (step < 5) {
      setStep(step + 1)
    }

    if (step === 6) {
      submitAllData()
    }
  }

  const submitAllData = () => {
    parentForm.vals(formData)
    parentForm.submit()
  }

  const jumpToStep = index => {
    if (step >= index) {
      setStep(index)
    }
  }

  useEffect(() => {
    getForm()
  }, [])

  console.log(formData)

  return (
    <PageContainer>
      <Seo title="Andela Signup" />
      <FormContainer>
        <SignupHero>
          {step === 1 && (
            <div>
              <ReactSVG src={Lady1} width="100%" fill={deepBlue} />
              <HeroTitle color={mainOrange}>
                &gt; 40% faster time to hire than internal recruiting
              </HeroTitle>
              <HeroDescription>
                You have product release commitments, customers, and never
                enough time or resources to meet your objectives.
              </HeroDescription>
              <HeroDescription>
                Andela helps you rapidly scale your team by offering vetted
                remote-ready talent.
              </HeroDescription>
            </div>
          )}
          {step === 2 && (
            <div>
              <ReactSVG src={Guy2} width="100%" fill={deepBlue} />
              <HeroTitle color={aqua}>
                18-month average client relationship
              </HeroTitle>
              <HeroDescription>
                Roadmaps, goals, and plans often change, and many times,
                full-time hiring, outsourcing don’t offer the flexibility to
                shift teams around. Andela builds embedded teams to support
                projects, new initiatives, or ongoing non-core functions
              </HeroDescription>
            </div>
          )}
          {step === 3 && (
            <div>
              <ReactSVG src={Guy3} width="100%" fill={deepBlue} />
              <HeroTitle color={lime}>
                Andela is the premier Talent Marketplace to connect companies to
                vetted, remote-ready technologists from around the world.
              </HeroTitle>
              <HeroDescription>
                Add talent to an existing, stable team to develop features
                faster.
              </HeroDescription>
            </div>
          )}
          {step === 4 && (
            <div>
              <ReactSVG src={Lady4} width="100%" fill={deepBlue} />
              <HeroTitle color={magenta}>95% match rate success</HeroTitle>
              <HeroDescription>
                Every stack is different, and every digital organization
                operates uniquely, making finding the right fit for your
                organization hard. We recruit niche expertise from digital
                markets and virtual communities around the world.
              </HeroDescription>
            </div>
          )}
          {step === 5 && (
            <div>
              <SVGContainer>
                <ReactSVG src={Github5} width="100%" fill={deepBlue} />
              </SVGContainer>
              <HeroDescription>
                “Andela is tapping into an emerging market that other people
                have not paid attention to. The data is out there that there
                will be 100 million developers globally by 2025, and we know
                that they’re coming from Sub Saharan Africa, Southeast Asia, and
                Latin America.”
              </HeroDescription>
              <HeroTitle color={lightAqua}>Dana Lawson</HeroTitle>
            </div>
          )}
          <FocusDotContainer>
            <FocusDot selected={step === 1} />
            <FocusDot selected={step === 2} />
            <FocusDot selected={step === 3} />
            <FocusDot selected={step === 4} />
            <FocusDot selected={step === 5} />
          </FocusDotContainer>
        </SignupHero>
        <MainContainer>
          <StepProgressContainer>
            <StepProgress selected={step >= 1} onClick={() => jumpToStep(1)} />
            <StepProgress selected={step >= 2} onClick={() => jumpToStep(2)} />
            <StepProgress selected={step >= 3} onClick={() => jumpToStep(3)} />
            <StepProgress selected={step >= 4} onClick={() => jumpToStep(4)} />
            <StepProgress selected={step >= 5} onClick={() => jumpToStep(5)} />
          </StepProgressContainer>
          {!loading ? getStep() : <LoadingText>Loading ...</LoadingText>}
          {/* <form
            id="mktoForm_1699"
            data-last-conversion-value="Hire Talent"
          ></form> */}
        </MainContainer>
      </FormContainer>
    </PageContainer>
  )
}

export default SignupPage