import styled from "styled-components"

import { spacing } from "../../utils/spacing"
import {
  white,
  lightestGrey,
  greyWhite,
  black,
  blackLight,
  kale,
  sunset,
  sand,
  emarald,
  deepRed,
} from "../../utils/colors"
import { ReactSVG } from "react-svg"

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (max-width: ${spacing.customSpacing("428px")}) {
    height: auto;
    display: block;
  }
`

export const SignupHero = styled.div`
  width: ${spacing.customSpacing("484px")};
  background-color: ${kale};
  height: 100%;
  padding-top: ${spacing.customSpacing("64px")};

  @media (max-width: ${spacing.customSpacing("428px")}) {
    display: none;
  }
`

export const HeroTitle = styled.div`
  font-family: sans-serif;
  font-weight: 500;
  font-size: 17px;
  color: ${({ color }) => color};
  text-align: center;
  margin-top: ${spacing.customSpacing("24px")};
  margin-bottom: ${spacing.BASE_SPACING};
  padding-left: ${spacing.HALF_BASE_SPACING};
  padding-right: ${spacing.HALF_BASE_SPACING};
`

export const HeroDescription = styled.div`
  text-align: center;
  color: ${white};
  font-weight: 400;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 28px;
  padding: ${spacing.DOUBLE_BASE_SPACING};
  padding-top: 0;
  padding-bottom: ${spacing.BASE_SPACING};
`

export const FocusDotContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${spacing.DOUBLE_BASE_SPACING};
`

export const FocusDot = styled.div`
  width: ${({ selected }) =>
    selected ? spacing.customSpacing("8px") : spacing.customSpacing("6px")};
  height: ${({ selected }) =>
    selected ? spacing.customSpacing("8px") : spacing.customSpacing("6px")};
  border-radius: ${spacing.customSpacing("6px")};
  background-color: ${({ selected }) => (selected ? sunset : sand)};
  margin-left: ${spacing.customSpacing("2px")};
  margin-right: ${spacing.customSpacing("2px")};

  ${({ selected }) =>
    selected && `margin-top: -${spacing.customSpacing("1px")}`}
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 100vh;
  overflow: auto;
  padding-bottom: ${spacing.BASE_SPACING};

  @media (max-width: ${spacing.customSpacing("428px")}) {
    padding: ${spacing.BASE_SPACING};
  }
`

export const StepProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: ${spacing.DOUBLE_BASE_SPACING};
  max-width: ${spacing.customSpacing("648px")};

  @media (max-width: ${spacing.customSpacing("428px")}) {
    margin-top: ${spacing.BASE_SPACING};
  }
`

export const StepProgress = styled.div`
  flex: 1;
  height: ${spacing.customSpacing("5px")};
  border-radius: ${spacing.customSpacing("6px")};
  background-color: ${({ selected }) => (selected ? emarald : lightestGrey)};
  margin-left: ${spacing.QUARTER_BASE_SPACING};
  margin-right: ${spacing.QUARTER_BASE_SPACING};
`

export const StepContainer = styled.div`
  width: 100%;
  margin-top: ${spacing.customSpacing("64px")};
`

export const StepQuestion = styled.div`
  text-align: center;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
`

export const ProblemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${spacing.customSpacing("536px")};
  margin: 0 auto;
  margin-top: ${spacing.DOUBLE_BASE_SPACING};
`

export const ProblemOption = styled.div`
  width: 100%;
  border: ${({ selected }) =>
    !selected ? `1px solid ${greyWhite}` : `1px solid ${kale}`};
  border-radius: ${spacing.QUARTER_BASE_SPACING};
  padding: ${spacing.customSpacing("12px")} ${spacing.BASE_SPACING};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-bottom: ${spacing.BASE_SPACING};
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border: 1px solid ${kale};
  }
`

export const ProblemAnswerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: ${spacing.BASE_SPACING};
`

export const ProblemSVG = styled(ReactSVG)`
  margin-top: ${spacing.customSpacing("12px")};
`

export const ProblemAnswerTitle = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  text-align: left;
  color: ${black};
`

export const ProblemAnswerDescription = styled.div`
  font-family: sans-serif;
  font-size: 12px;
  color: ${blackLight};
`

export const BaseButton = styled.button`
  width: fit-content;
  padding: ${spacing.HALF_BASE_SPACING} ${spacing.BASE_SPACING};
  background-color: ${black};
  color: ${white};
  border-radius: ${spacing.customSpacing("40px")};
  margin-left: ${spacing.HALF_BASE_SPACING};
  margin-right: ${spacing.HALF_BASE_SPACING};
  border: 1px solid rgba(255, 255, 255, 0);
  font-family: sans-serif;
  font-size: 16px;
  cursor: pointer;
  min-width: ${spacing.customSpacing("94px")};
`

export const PrimarySignupButton = styled(BaseButton)`
  background-color: ${emarald};
`

export const LoadingText = styled.div`
  font-size: 24px;
  text-align: center;
  width: 100%;
  color: ${greyWhite};
  font-family: sans-serif;
  margin-top: ${spacing.DOUBLE_BASE_SPACING};
`

export const PeopleContainer = styled(ProblemsContainer)`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: ${spacing.customSpacing("562px")};
`

export const PeopleChoice = styled.div`
  width: ${spacing.customSpacing("128px")};
  height: ${spacing.customSpacing("128px")};
  border: ${({ selected }) =>
    selected ? `1px solid ${kale}` : `1px solid ${greyWhite}`};
  border-radius: ${spacing.QUARTER_BASE_SPACING};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  margin-left: ${spacing.customSpacing("28px")};
  margin-right: ${spacing.customSpacing("28px")};
  margin-bottom: ${spacing.customSpacing("36px")};

  &:hover {
    border: 1px solid ${kale};
  }
`

export const PeopleChoiceText = styled.div`
  font-family: sans-serif;
  font-size: 11px;
  color: ${black};
  text-align: center;
`

export const SVGContainer = styled.div`
  text-align: center;
  margin-bottom: ${spacing.BASE_SPACING};
`

export const InputLabel = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  color: ${blackLight};
  text-align: left;
  margin-left: ${spacing.customSpacing("12px")};
`

export const InputContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ invalid }) => (!invalid ? greyWhite : deepRed)};
  border-radius: ${spacing.QUARTER_BASE_SPACING};
  display: flex;
  flex-direction: row;
  align-center: center;
  justify-content: flex-start;
  padding: ${spacing.customSpacing("12px")} ${spacing.BASE_SPACING};
  margin-top: ${spacing.customSpacing("12px")};
`

export const InputField = styled.input`
  width: 100%;
  margin-left: ${spacing.HALF_BASE_SPACING};
  border: 0;
  font-size: 16px;
  color: ${black};
  font-family: sans-serif;
  text-align: left;
  padding: 0;
  outline: 0;
`

export const DropdownField = styled.select`
  width: 100%;
  margin-left: ${spacing.HALF_BASE_SPACING};
  border: 0;
  font-size: 16px;
  color: ${black};
  font-family: sans-serif;
  text-align: left;
  padding: 0;
  outline: 0;
  appearance: none;
`

export const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: ${spacing.BASE_SPACING};
  justify-content: space-between;

  @media (max-width: ${spacing.customSpacing("428px")}) {
    flex-direction: column;
  }
`

export const InputWrapper = styled.div`
  width: 100%;

  @media (max-width: ${spacing.customSpacing("428px")}) {
    margin-right: 0 !important;
    margin-left: 0 !important;
    margin-bottom: ${spacing.BASE_SPACING};
  }
`

export const SkillContainer = styled.div`
  width: auto;
  height: auto;
  padding: ${spacing.QUARTER_BASE_SPACING} ${spacing.BASE_SPACING};
  border: ${({ selected }) =>
    selected ? `1px solid ${kale}` : `1px solid ${greyWhite}`};
  border-radius: ${spacing.QUARTER_BASE_SPACING};
  font-family: sans-serif;
  color: ${black};
  font-size: 16px;
  text-align: center;
  margin: ${spacing.HALF_BASE_SPACING};
  transition: all 0.2s ease;
  cursor: pointer;
`

export const SkillSearchTitle = styled.div`
  text-align: center;
  font-size: 17px;
  margin-top: ${spacing.customSpacing("36px")};
  font-family: sans-serif;
  color: ${black};
  margin-bottom: ${spacing.customSpacing("36px")};
`

export const SearchBar = styled(InputWrapper)`
  max-width: ${spacing.customSpacing("520px")};
  margin: 0 auto;
`

export const SearchResultsContainer = styled(PeopleContainer)`
  margin-top: ${spacing.HALF_BASE_SPACING};
`

export const SelectedSearchSkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const ButtonContainer = styled.div`
  margin-top: ${spacing.DOUBLE_BASE_SPACING};
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const SecondaryButton = styled(BaseButton)`
  background-color: rgba(255, 255, 255, 0);
  color: ${black};
  border: 1px solid ${black};
`

export const HeroLogo = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  width: 50%;
  cursor: pointer;
`

export const HeroLogoMobile = styled(HeroLogo)`
  display: none;

  @media (max-width: ${spacing.customSpacing("428px")}) {
    display: block;
    margin-top: ${spacing.BASE_SPACING};
  }
`

export const ConditionContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: ${spacing.BASE_SPACING};
  margin-bottom: ${spacing.BASE_SPACING};
  max-width: ${spacing.customSpacing("520px")};
`

export const ConditionText = styled(InputLabel)`
  font-size: 12px;
  text-align: left;
`

export const Link = styled.a`
  color: ${black};
`
