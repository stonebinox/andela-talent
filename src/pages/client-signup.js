import React, { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import FullStory from "react-fullstory"

import Seo from "../components/seo"
import {
  getChiliPiper,
  getDataLayer,
  getGA,
  getMarketoForm,
} from "../utils/api"
import { PageContainer } from "../utils/common.styles"
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
  HeroLogo,
  HeroLogoMobile,
} from "../components/signup/signup.styles"
import Lady1 from "../images/onboarding/lady-1.png"
import Guy2 from "../images/onboarding/guy-2.png"
import Guy3 from "../images/onboarding/guy-3.png"
import Lady4 from "../images/onboarding/lady-4.png"
import Github5 from "../images/onboarding/github-5.svg"
import PermalinkImage from "../images/andela-social-share-default.png"
import AndelaWhite from "../images/andela-logo-white.png"
import AndelaDark from "../images/andela-logo-dark.png"
import { opal } from "../utils/colors"
import Step1 from "../components/signup/step-1"
import Step2 from "../components/signup/step-2"
import Step3 from "../components/signup/step-3"
import Step4 from "../components/signup/step-4"
import Step5 from "../components/signup/step-5"

import "./skills/style.css"

const tests = [0, 1]
const selectedTest = tests[Math.floor(Math.random() * tests.length)]
const eventVariant = selectedTest === 0 ? "A" : "B"

const SignupPage = () => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(null)
  const [step, setStep] = useState(1)
  const [parentForm, setParentForm] = useState(null)
  const [savedSkills, setSavedSkills] = useState([])

  const getForm = () => {
    setLoading(true)
    const form = getMarketoForm()

    if (!form) {
      setTimeout(() => getForm(), 500)
      return
    }

    form?.loadForm("//hire.andela.com", "449-UCH-555", 1699, finalForm => {
      setLoading(false)

      finalForm.onSuccess(values => {
        const dataLayer = getDataLayer()
        dataLayer?.push({
          event: "dataLayerEvent",
          event_category: "Sign Up Wizard",
          event_action: "sign_up",
          event_label: `${eventVariant}: Success`,
        })

        if (
          values.Employee_Range__c === "0 - 50" ||
          values.Employee_Range__c === "51 - 499" ||
          values.Employee_Range__c === "500 - 999"
        ) {
          const ga = getGA()
          const linkerParam = ga?.getAll?.()[0]?.get("linkerParam") ?? ""
          window.location = `https://andela.app/?_ga=${linkerParam}`

          return false
        }

        const cpData = {
          map: true,
          lead: values,
        }

        cpData.lead.employee_range__c = values.Employee_Range__c

        delete cpData.lead.Employee_Range__c

        const ChiliPiper = getChiliPiper()
        ChiliPiper?.submit("andela", "inbound_router_gatsby", cpData)

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
        return selectedTest === 0 ? (
          <Step1
            setFormStepAnswer={setFormStepAnswer}
            selectedTest={selectedTest}
            eventVariant={eventVariant}
            goBack={goBack}
            savedValue={formData?.useCase}
          />
        ) : (
          <Step5
            setFormStepAnswer={setFormStepAnswer}
            selectedTest={selectedTest}
            eventVariant={eventVariant}
            goBack={goBack}
            savedValue={{
              company: formData?.Company,
              email: formData?.Email,
              phone: formData?.Phone,
              country: formData?.Country,
              firstName: formData?.FirstName,
              lastName: formData?.LastName,
              title: formData?.Title,
              companyURL: formData?.Company_Website__c,
            }}
          />
        )
      case 2:
        return selectedTest === 0 ? (
          <Step2
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={formData?.Employee_Range__c}
            eventVariant={eventVariant}
          />
        ) : (
          <Step1
            setFormStepAnswer={setFormStepAnswer}
            selectedTest={selectedTest}
            goBack={goBack}
            savedValue={formData?.useCase}
            eventVariant={eventVariant}
          />
        )
      case 3:
        return selectedTest === 0 ? (
          <Step3
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={formData?.interestedJobRoles}
            eventVariant={eventVariant}
          />
        ) : (
          <Step2
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={formData?.Employee_Range__c}
            eventVariant={eventVariant}
          />
        )
      case 4:
        return selectedTest === 0 ? (
          <Step4
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={savedSkills}
            setSavedSkills={setSavedSkills}
            eventVariant={eventVariant}
            selectedTest={selectedTest}
          />
        ) : (
          <Step3
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={formData?.interestedJobRoles}
            eventVariant={eventVariant}
          />
        )
      case 5:
        return selectedTest === 0 ? (
          <Step5
            setFormStepAnswer={setFormStepAnswer}
            selectedTest={selectedTest}
            eventVariant={eventVariant}
            goBack={goBack}
            savedValue={{
              company: formData?.Company,
              email: formData?.Email,
              phone: formData?.Phone,
              country: formData?.Country,
              firstName: formData?.FirstName,
              lastName: formData?.LastName,
              title: formData?.Title,
              companyURL: formData?.Company_Website__c,
            }}
          />
        ) : (
          <Step4
            setFormStepAnswer={setFormStepAnswer}
            goBack={goBack}
            savedValue={savedSkills}
            setSavedSkills={setSavedSkills}
            eventVariant={eventVariant}
            selectedTest={selectedTest}
          />
        )
    }
  }

  const setFormStepAnswer = (answer, callback = () => null) => {
    setFormData({
      ...formData,
      ...answer,
    })

    if (
      answer.Employee_Range__c === "5,000+" ||
      answer.Employee_Range__c === "0 - 50" ||
      answer.Employee_Range__c === "1000 - 4999"
    ) {
      if (selectedTest === 0 && step === 2) {
        setStep(5)
        return
      }

      if (selectedTest === 1 && step === 3) {
        submitAllData({
          ...formData,
          ...answer,
        })
        return
      }
    }

    if (step < 5) {
      setStep(step + 1)
    }

    if (step >= 5) {
      submitAllData({
        ...formData,
        ...answer,
      })
    }

    callback()
  }

  const submitAllData = formattedForm => {
    const finalForm = {
      ...formattedForm,
      Role_Details__c: "Other",
      UTM_Campaign__c: document.mktoForm_1053?.UTM_Campaign__c?.value ?? "",
      UTM_Content__c: document.mktoForm_1053?.UTM_Content__c?.value ?? "",
      UTM_Medium__c: document.mktoForm_1053?.UTM_Medium__c?.value ?? "",
      UTM_Source__c: document.mktoForm_1053?.UTM_Source__c?.value ?? "",
      UTM_Campaign_Most_Recent__c:
        document.mktoForm_1053?.UTM_Campaign_Most_Recent__c?.value ?? "",
      UTM_Content_Most_Recent__c:
        document.mktoForm_1053?.UTM_Content_Most_Recent__c?.value ?? "",
      UTM_Medium_Most_Recent__c:
        document.mktoForm_1053?.UTM_Medium_Most_Recent__c?.value ?? "",
      UTM_Source_Most_Recent__c:
        document.mktoForm_1053?.UTM_Source_Most_Recent__c?.value ?? "",
      UTM_Term__c: document.mktoForm_1053?.UTM_Term__c?.value ?? "",
      UTM_Term_Most_Recent__c:
        document.mktoForm_1053?.UTM_Term_Most_Recent__c?.value ?? "",
      client_id: document.mktoForm_1053?.client_id?.value ?? "",
      fbclid: document.mktoForm_1053?.fbclid?.value ?? "",
      gclid: document.mktoForm_1053?.gclid?.value ?? "",
      fbp: document.mktoForm_1053?.fbp?.value ?? "",
      user_agent: document.mktoForm_1053?.user_agent?.value ?? "",
    }

    parentForm.vals(finalForm)

    if (parentForm.validate()) {
      parentForm.submit()
    } else {
      alert("Invalid/incomplete data provided. Please verify and retry.")
    }
  }

  const jumpToStep = index => {
    if (step >= index) {
      setStep(index)
    }
  }

  const goBack = () => {
    if (selectedTest === 0) {
      if (
        step == 5 &&
        (formData.Employee_Range__c === "5,000+" ||
          formData.Employee_Range__c === "0 - 50" ||
          formData.Employee_Range__c === "1000 - 4999")
      ) {
        jumpToStep(2)
        return
      }
    }

    jumpToStep(step - 1)
  }

  useEffect(() => {
    getForm()
  }, [])

  return (
    <PageContainer>
      <Seo
        title="Hire Global Talent"
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
      <FullStory
        org="o-19G5ER-na1"
        namespace="FS"
        debug={false}
        host="fullstory.com"
      />
      <FormContainer>
        <SignupHero>
          <HeroLogo onClick={confirmPageRefresh}>
            <img src={AndelaWhite} />
          </HeroLogo>
          {step === 1 && (
            <div style={{ textAlign: "center" }}>
              <img src={Lady1} width="70%" style={{ margin: "0 auto" }} />
              <HeroTitle color={opal}>
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
              <img src={Guy2} width="100%" />
              <HeroTitle color={opal}>
                18-month average client relationship
              </HeroTitle>
              <HeroDescription>
                Roadmaps, goals, and plans often change, and many times,
                full-time hiring, outsourcing {"don't"} offer the flexibility to
                shift teams around. Andela builds embedded teams to support
                projects, new initiatives, or ongoing non-core functions
              </HeroDescription>
            </div>
          )}
          {step === 3 && (
            <div>
              <img src={Guy3} width="100%" />
              <HeroTitle color={opal}>
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
              <img src={Lady4} width="100%" />
              <HeroTitle color={opal}>95% match rate success</HeroTitle>
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
                <ReactSVG src={Github5} width="100%" />
              </SVGContainer>
              <HeroDescription>
                {`"Andela is tapping into an emerging market that other people
                have not paid attention to. The data is out there that there
                will be 100 million developers globally by 2025, and we know
                that they're coming from Sub Saharan Africa, Southeast Asia, and
                Latin America."`}
              </HeroDescription>
              <HeroTitle color={opal}>Dana Lawson</HeroTitle>
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
          <HeroLogoMobile onClick={confirmPageRefresh}>
            <img src={AndelaDark} />
          </HeroLogoMobile>
          <StepProgressContainer>
            <StepProgress selected={step >= 1} />
            <StepProgress selected={step >= 2} />
            <StepProgress selected={step >= 3} />
            <StepProgress selected={step >= 4} />
            <StepProgress selected={step >= 5} />
          </StepProgressContainer>
          {!loading ? getStep() : <LoadingText>Loading ...</LoadingText>}
          <form id="mktoForm_1053" name="mktoForm_1053">
            <input type="hidden" name="UTM_Campaign__c" value="" />
            <input type="hidden" name="UTM_Content__c" value="" />
            <input type="hidden" name="UTM_Medium__c" value="" />
            <input type="hidden" name="UTM_Source__c" value="" />
            <input type="hidden" name="UTM_Campaign_Most_Recent__c" value="" />
            <input type="hidden" name="UTM_Content_Most_Recent__c" value="" />
            <input type="hidden" name="UTM_Medium_Most_Recent__c" value="" />
            <input type="hidden" name="UTM_Source_Most_Recent__c" value="" />
            <input type="hidden" name="UTM_Term__c" value="" />
            <input type="hidden" name="UTM_Term_Most_Recent__c" value="" />
            <input type="hidden" name="client_id" value="" />
            <input type="hidden" name="fbclid" value="" />
            <input type="hidden" name="gclid" value="" />
            <input type="hidden" name="fbp" value="" />
            <input type="hidden" name="user_agent" value="" />
          </form>
        </MainContainer>
      </FormContainer>
    </PageContainer>
  )
}

export default SignupPage
