import React, { useState, useEffect } from "react"

import Seo from "../components/seo"
import { PageContainer } from "../utils/common.styles"
import PermalinkImage from "../images/andela-social-share-default.png"
import AndelaWhite from "../images/andela-logo-white.png"
import AndelaDark from "../images/andela-logo-dark.png"
import Guy1 from "../images/onboarding/talent-guy-1.png"
import Guy2 from "../images/onboarding/talent-guy-2.png"
import Lady3 from "../images/onboarding/talent-lady-3.png"
import Guy4 from "../images/onboarding/talent-guy-4.png"
import {
  FocusDot,
  FocusDotContainer,
  FormContainer,
  HeroLogo,
  HeroLogoMobile,
  LoadingText,
  MainContainer,
  SignupHero,
  StepProgress,
  StepProgressContainer,
} from "../components/signup/signup.styles"
import {
  HeroDescription,
  HeroTitle,
  HiddenForm,
} from "../components/talent-signup/talent-signup.styles"
import Step1 from "../components/talent-signup/step-1"
import Step2 from "../components/talent-signup/step-2"
import Step3 from "../components/talent-signup/step-3"
import Step4 from "../components/talent-signup/step-4"
import { getDataLayer, getMarketoForm } from "../utils/api"

import "./skills/style.css"

const TalentSignupPage = () => {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(null)
  const [parentForm, setParentForm] = useState(null)
  const dataLayer = getDataLayer()

  const getForm = () => {
    setLoading(true)
    const form = getMarketoForm()

    if (!form) {
      setTimeout(() => getForm(), 500)
      return
    }

    // form?.loadForm("//hire.andela.com", "449-UCH-555", 1055, finalForm => { <- enable this before going live

    form?.loadForm("//hire.andela.com", "449-UCH-555", 1880, finalForm => {
      setLoading(false)

      finalForm.onSuccess(() => {
        window.location = "https://andela.com/join-andela/success/"
        return false
      })

      setParentForm(finalForm)
    })
  }

  const confirmPageRefresh = () => {
    if (
      confirm(
        "Are you sure you want to continue? You will lose any unsaved selections."
      )
    ) {
      window.location.reload(true)
    }
  }

  const getStep = () => {
    switch (step) {
      default:
      case 1:
        return (
          <Step1
            setFormStepAnswer={setFormStepAnswer}
            savedValue={{
              firstName: formData?.FirstName,
              lastName: formData?.LastName,
              email: formData?.Email,
              country: formData?.Country,
            }}
          />
        )
      case 2:
        return (
          <Step2
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={{
              selectedSkill:
                formData?.tLMostProficientAndelaSupportedFramework ?? "",
              yearsOfExperience:
                formData?.tLYearsofExperienceontheFramework ?? null,
            }}
          />
        )
      case 3:
        return <Step3 setFormStepAnswer={setFormStepAnswer} goBack={goBack} />
      case 4:
        return <Step4 />
    }
  }

  const jumpToStep = index => {
    setStep(index)
  }

  const goBack = () => {
    jumpToStep(step - 1)
  }

  const setFormStepAnswer = answer => {
    setFormData({
      ...formData,
      ...answer,
    })

    // check if step3 complete and submit to marketo

    if (step < 3) {
      setStep(step + 1)
    }

    if (step >= 3) {
      submitAllData({
        ...formData,
        ...answer,
      })
    }
  }

  const submitAllData = formattedForm => {
    const finalisedFormData = {
      ...parentForm.vals(),
      ...formattedForm,
      tLTalentNetworkTerms: true,
    }

    parentForm.vals(finalisedFormData) // assigning the values to marketo here

    if (parentForm.validate()) {
      dataLayer?.push({
        event: "dataLayerEvent",
        event_category: "Sign Up Talent Wizard",
        event_action: "sign_up",
        event_label: "Step 3 - Submit",
      })

      parentForm.submit()
    } else {
      alert("Invalid/incomplete data provided. Please verify and re-try.")
    }
  }

  useEffect(() => {
    getForm()
  }, [])

  return (
    <PageContainer>
      <Seo
        title="Join Our Talent Network"
        description="Andela is a global talent network that connects companies with vetted, remote engineers in emerging markets. Hundreds of leading companies like Cloudflare and ViacomCBS leverage Andela to scale their engineering teams quickly and cost effectively."
        meta={[
          {
            property: "og:url",
            content: "https://andela.com/hire-talent/",
          },
          {
            property: "og:site_name",
            content: "Andela",
          },
          {
            property: "og:image",
            content: PermalinkImage,
          },
          {
            property: "og:image:secure_url",
            content: PermalinkImage,
          },
          {
            property: "og:image:width",
            content: "1200",
          },
          {
            property: "og:image:height",
            content: "630",
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:site",
            content: "@andela",
          },
          {
            name: "twitter:image",
            content: PermalinkImage,
          },
          {
            name: "twitter:creator",
            content: "@andela",
          },
        ]}
      />
      <FormContainer>
        <SignupHero>
          <HeroLogo onClick={confirmPageRefresh}>
            <img src={AndelaWhite} alt="Logo" />
          </HeroLogo>
          {step === 1 && (
            <div style={{ textAlign: "center" }}>
              <img src={Guy1} width="70%" style={{ margin: "0 auto" }} />
              <HeroTitle>Reliable jobs</HeroTitle>
              <HeroDescription>
                We only work with trusted, vetted companies. Our team works
                globally to eliminate fraud or illegal activity, ensuring the
                jobs you apply for are safe and secure.
              </HeroDescription>
            </div>
          )}
          {step === 2 && (
            <div style={{ textAlign: "center" }}>
              <img src={Guy2} width="70%" style={{ margin: "0 auto" }} />
              <HeroTitle>Work from anywhere</HeroTitle>
              <HeroDescription>
                Fully remote, forever. With remote roles across multiple time
                zones, you choose where and when you work, creating a healthy,
                flexible work-life balance.
              </HeroDescription>
            </div>
          )}
          {step === 3 && (
            <div style={{ textAlign: "center" }}>
              <img src={Lady3} width="70%" style={{ margin: "0 auto" }} />
              <HeroTitle>Fully supported</HeroTitle>
              <HeroDescription>
                Wherever you are and whatever issues you may face, we’re here to
                help solve any challenges, fast!
              </HeroDescription>
            </div>
          )}
          {step === 4 && (
            <div style={{ textAlign: "center" }}>
              <img src={Guy4} width="70%" style={{ margin: "0 auto" }} />
              <HeroTitle>Your future awaits</HeroTitle>
              <HeroDescription>
                {`You're`} one step closer to finding your next role, advancing
                your career, and connecting with other talented technologists!
              </HeroDescription>
            </div>
          )}
          <FocusDotContainer>
            <FocusDot selected={step === 1} />
            <FocusDot selected={step === 2} />
            <FocusDot selected={step === 3} />
            <FocusDot selected={step === 4} />
          </FocusDotContainer>
        </SignupHero>
        <MainContainer>
          <HeroLogoMobile>
            <img src={AndelaDark} />
          </HeroLogoMobile>
          <StepProgressContainer>
            <StepProgress selected={step >= 1} />
            <StepProgress selected={step >= 2} />
            <StepProgress selected={step >= 3} />
            <StepProgress selected={step >= 4} />
          </StepProgressContainer>
          {!loading ? getStep() : <LoadingText>Loading ...</LoadingText>}
          {/* <HiddenForm id="mktoForm_1055" name="mktoForm_1055" /> */}
          <HiddenForm id="mktoForm_1880" name="mktoForm_1880" />
        </MainContainer>
      </FormContainer>
    </PageContainer>
  )
}

export default TalentSignupPage
