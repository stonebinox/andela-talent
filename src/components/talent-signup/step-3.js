/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import styled from "styled-components"

import {
  ButtonContainer,
  DropdownField,
  InputContainer,
  InputField,
  PrimarySignupButton,
  ProblemsContainer,
  SecondaryButton,
  StepContainer,
} from "../signup/signup.styles"
import { InputLabel, LabelSubtext, StepQuestion } from "./talent-signup.styles"
import Code from "../../images/code.svg"
import People from "../../images/people.svg"
import PersonGear from "../../images/person-gear.svg"
import Envelope from "../../images/envelope.svg"
import Person1 from "../../images/person-1.svg"
import { getDataLayer, getSendSafely } from "../../utils/api"
import { greenBlack, greyWhite } from "../../utils/colors"
import { spacing } from "../../utils/spacing"

const PersonSVG = styled(ReactSVG)`
  width: ${spacing.customSpacing("20px")};
  height: ${spacing.customSpacing("20px")};
  margin-top: -${spacing.customSpacing("6px")};
  margin-left: -${spacing.customSpacing("10px")};
  margin-right: ${spacing.QUARTER_BASE_SPACING};
`

const options = [
  "Native",
  "Advanced C1/C2",
  "Intermediate B1/B2",
  "Beginner A1/A2",
]

const yearsOptions = [
  {
    value: "Associate (0-3 yrs professional experience)",
    label: "0-3 yrs professional experience",
  },
  {
    value: "Mid Level (3-8 yrs professional experience)",
    label: "3-8 yrs professional experience",
  },
  {
    value: "Senior (8-12 yrs professional experience)",
    label: "8-12 yrs professional experience",
  },
  {
    value: "Principal (12+ yrs professional experience)",
    label: "12+ yrs professional experience",
  },
]

const referralOptions = [
  "Job Posts",
  "Social Media",
  "Search Engine",
  "Advertising",
  "News",
  "Email",
  "In-Person Event",
  "Word of mouth",
  "Referral by Andelan",
  "Referral Other",
  "Other",
]

const Step3 = ({ goBack, setFormStepAnswer }) => {
  const [englishLevel, setEnglishLevel] = useState("Select...")
  const [invalidEnglishLevel, setInvalidEnglishLevel] = useState(false)

  const [referrer, setReferrer] = useState("Select...")
  const [referrerValue, setReferrerValue] = useState("")
  const [displayReferrerEmail, setDisplayReferrerEmail] = useState(false)
  const [displayReferrerField, setDisplayReferrerField] = useState(false)
  const [displayReferrerFieldError, setDisplayReferrerFieldError] =
    useState(false)

  const [totalExperience, setTotalExperience] = useState("Select...")
  const [invalidExperience, setInvalidExperience] = useState(false)
  const [sendSafelyWidget, setSendSafelyWidget] = useState(null)
  const [resumeUrl, setResumeUrl] = useState("")
  const [disableButton, setDisableButton] = useState(false)

  const dataLayer = getDataLayer()

  const isFileAttached = () =>
    sendSafelyWidget?.nbrOfFilesAttached > 0 && resumeUrl !== ""

  const finalizeUpload = () => {
    if (disableButton) return

    if (!validateFields()) return

    sendSafelyWidget?.finalizePackage(url => {
      setResumeUrl(url)
    })
  }

  const handleGoBack = () => {
    if (
      confirm(
        "You will lose information selected on this screen if you go back. Do you wish to proceed?"
      )
    ) {
      goBack()
    }
  }

  const validateFields = () => {
    setInvalidEnglishLevel(false)
    setInvalidExperience(false)
    setDisplayReferrerFieldError(false)

    if (englishLevel === "Select...") {
      alert("Please select your English proficiency level.")
      setInvalidEnglishLevel(true)
      return false
    }

    if (totalExperience === "Select...") {
      alert("Please select your total work experience.")
      setInvalidExperience(true)
      return false
    }

    if (
      referrer === "Referral by Andelan" &&
      (referrerValue?.trim() === "" ||
        !/[+\w0-9._-]+@[\w0-9._-]+\.[\w0-9_-]+/.test(referrerValue) ||
        referrerValue.indexOf("@andela.") === -1)
    ) {
      setDisplayReferrerFieldError(true)
      alert("Please enter a valid Andelan email address.")
      return false
    }

    if (
      (referrer === "Referral Other" || referrer === "Other") &&
      referrerValue?.trim() === ""
    ) {
      setDisplayReferrerFieldError(true)
      alert("Please enter some text for referral source.")
      return false
    }

    if (sendSafelyWidget?.nbrOfFilesAttached <= 0) {
      alert("Please attach your resume before submitting.")
      return false
    }

    if (sendSafelyWidget?.nbrOfFilesAttached > 1) {
      alert("Please attach only one file to submit.")
      return false
    }

    return true
  }

  const submitAnswer = () => {
    dataLayer?.push(
      {
        event: "dataLayerEvent",
        event_category: "Sign Up Talent Wizard",
        event_action: "sign_up",
        event_label: `Step 3 - Eng ${englishLevel}`,
      },
      {
        event: "dataLayerEvent",
        event_category: "Sign Up Talent Wizard",
        event_action: "sign_up",
        event_label: `Step 3 - Exp ${totalExperience}`,
      }
    )

    setDisableButton(true)

    setFormStepAnswer({
      englishProficiency: englishLevel,
      tLReferredBy: referrerValue,
      howdidyouHearAboutUs: referrer,
      tLSeniorityLevel: totalExperience,
      tLDropzoneLink: resumeUrl,
    })
  }

  const loadUploader = () => {
    const sendSafely = getSendSafely()

    if (!sendSafely) {
      setTimeout(() => loadUploader(), 500)
      return
    }

    const widget = new sendSafely(
      "Bk7y8vV8NhXyfKkvEfjClo9dqC4ABHjKTKVaztGXf8k",
      window?.jQuery("#dropzone")
    )

    widget.disableAutoSubmit = true
    widget.DROP_TEXT_COLOR = greenBlack
    widget.logoPath =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    widget.DROPZONE_STYLE = `
      border: 1px solid ${greyWhite};
      border-radius: ${spacing.QUARTER_BASE_SPACING};
      margin-top: ${spacing.customSpacing("12px")};
      font-family: sans-serif;
      font-size: 16px;`
    widget.DROPZONE_TEXT = "Click to add file"

    widget.initialize()

    setSendSafelyWidget(widget)
  }

  useEffect(() => {
    if (isFileAttached()) {
      submitAnswer()
    }
  }, [resumeUrl])

  useEffect(() => {
    if (referrer === "Referral by Andelan") {
      setDisplayReferrerEmail(true)
      setDisplayReferrerField(false)
    } else if (referrer === "Referral Other" || referrer === "Other") {
      setDisplayReferrerEmail(false)
      setDisplayReferrerField(true)
    } else {
      setDisplayReferrerEmail(false)
      setDisplayReferrerField(false)
    }
  }, [referrer])

  useEffect(() => {
    loadUploader()
  }, [])

  return (
    <>
      <StepContainer>
        <StepQuestion>More about you</StepQuestion>
        <ProblemsContainer>
          <InputLabel>English proficiency</InputLabel>
          <InputContainer invalid={invalidEnglishLevel}>
            <ReactSVG src={Code} />
            <DropdownField
              name="english"
              onChange={e => setEnglishLevel(e.currentTarget.value)}
              value={englishLevel}
            >
              <option value="Select...">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </DropdownField>
          </InputContainer>
          <InputLabel>Total years of work experience</InputLabel>
          <InputContainer invalid={invalidExperience}>
            <ReactSVG src={PersonGear} />
            <DropdownField
              name="totalExperience"
              onChange={e => setTotalExperience(e.currentTarget.value)}
              value={totalExperience}
            >
              <option value="Select...">Select...</option>
              {yearsOptions.map(({ value, label }) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </DropdownField>
          </InputContainer>
          <InputLabel>How did you hear about us? (optional)</InputLabel>
          <InputContainer>
            <ReactSVG src={People} />
            <DropdownField
              name="referralBy"
              value={referrer}
              onChange={e => setReferrer(e.currentTarget.value)}
            >
              <option value="Select...">Select...</option>
              {referralOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </DropdownField>
          </InputContainer>
          {displayReferrerEmail && (
            <>
              <InputLabel>Email address</InputLabel>
              <InputContainer invalid={displayReferrerFieldError}>
                <ReactSVG src={Envelope} />
                <InputField
                  type="email"
                  name="email"
                  label="email"
                  value={referrerValue}
                  onChange={e => setReferrerValue(e.currentTarget.value)}
                  placeholder="Enter a valid Andelan email address"
                />
              </InputContainer>
            </>
          )}
          {displayReferrerField && (
            <>
              <InputLabel>Name or email</InputLabel>
              <InputContainer invalid={displayReferrerFieldError}>
                <PersonSVG src={Person1} />
                <InputField
                  type="text"
                  name="referrerValue"
                  label="Name or email"
                  value={referrerValue}
                  onChange={e => setReferrerValue(e.currentTarget.value)}
                  placeholder="Please specify"
                />
              </InputContainer>
            </>
          )}
          <InputLabel>Upload your resume</InputLabel>
          <LabelSubtext>Only PDF files are accepted</LabelSubtext>
          <div id="dropzone" />
        </ProblemsContainer>
      </StepContainer>
      <ButtonContainer>
        <SecondaryButton onClick={handleGoBack}>Back</SecondaryButton>
        <PrimarySignupButton onClick={finalizeUpload}>
          Submit
        </PrimarySignupButton>
      </ButtonContainer>
    </>
  )
}

export default Step3
