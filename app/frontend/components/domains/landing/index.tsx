import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  InputGroup,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import {
  ArrowSquareOut,
  CaretRight,
  CheckCircle,
  ClipboardText,
  FileArrowUp,
  Info,
  MapPin,
} from "@phosphor-icons/react"
import i18next from "i18next"
import { observer } from "mobx-react-lite"
import * as R from "ramda"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { IJurisdiction } from "../../../models/jurisdiction"
import { useMst } from "../../../setup/root"
//import { YellowLineSmall } from "../../shared/base/decorative/yellow-line-small"
import { SharedSpinner } from "../../shared/base/shared-spinner"
import { RouterLink } from "../../shared/navigation/router-link"
import { RouterLinkButton } from "../../shared/navigation/router-link-button"
import { AddressSelect } from "../../shared/select/selectors/address-select"
import { JurisdictionSelect } from "../../shared/select/selectors/jurisdiction-select"
import { GreenLineSmall } from "../../shared/base/decorative/green-line-small"

interface ILandingScreenProps {}

export const LandingScreen = observer(({}: ILandingScreenProps) => {
  const { t } = useTranslation()
  const mailto = "mailto:" + t("site.contactEmail")
  const iNeedRef = useRef<HTMLDivElement>(null)
  const { sessionStore, userStore, siteConfigurationStore } = useMst()
  const { smallScaleRequirementTemplateId } = siteConfigurationStore
  const { loggedIn } = sessionStore
  const { currentUser } = userStore

  const scrollToJurisdictionSearch = () => {
    iNeedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const whoFor = i18next.t("landing.whoFor", { returnObjects: true }) as string[]
  const applyNeeds = i18next.t("landing.applyNeeds", { returnObjects: true }) as string[]

  return (
    <Flex direction="column" w="full" bg="greys.white">
      <Flex
        align="center"
        h={{ base: "calc(100vh - 200px)", sm: "364px" }}
        bgImage="/images/header-background.jpeg"
        bgPosition="center 60%"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgColor="theme.blue"
      >
        <Flex direction="column" justify="center" bgColor="theme.blueShadedLight" w="full" height="full">
          <Container maxW="container.lg" px={8}>
            <Flex
              direction="column"
              p={8}
              maxW="550px"
              bg="theme.blueShadedDark"
              color="greys.white"
              borderRadius="sm"
              borderLeft="8px solid"
              borderColor="theme.yellow"
              gap={2}
            >
              <Text fontSize="2xl" fontWeight="bold">
                {t("landing.title")}
              </Text>
              <Text fontSize="lg" fontWeight="light">
                {t("landing.intro")}
              </Text>
            </Flex>
          </Container>
        </Flex>
      </Flex>
      <Container maxW="container.lg" py={16} px={8}>
        <Flex as="section" direction="column" gap={20}>
          <Flex gap={6} direction={{ base: "column", md: "row" }}>
            <IconBox icon={<ClipboardText size={32} />}>{t("landing.easilyUpload")}</IconBox>
            <IconBox icon={<CheckCircle size={32} />}>{t("landing.bestPractices")}</IconBox>
            <IconBox icon={<FileArrowUp size={32} />}>{t("landing.easyToFollow")}</IconBox>
          </Flex>

          <Flex gap={10} alignItems="stretch" direction={{ base: "column", md: "row" }}>
            <Flex
              as="section"
              direction="column"
              borderRadius="lg"
              bg="theme.blueAlt"
              p={8}
              gap={6}
              color="greys.white"
              flex={1}
              minW={{ base: "0", md: "50%" }}
            >
              <Heading as="h2">{t("landing.applyForRebates")}</Heading>
              <Text>{t("landing.accessExplanation")}</Text>
              <GreenLineSmall />
              <Flex gap={6} direction={{ base: "column", md: "row" }}>
                <RouterLinkButton
                  to={currentUser ? "/" : "/login"}
                  variant="primaryInverse"
                  icon={<CaretRight size={16} />}
                  iconPosition="right"
                >
                  {t("landing.goTo", {
                    location:
                      !currentUser || currentUser.isSubmitter ? t("landing.permitApp") : t("landing.adminPanel"),
                  })}
                </RouterLinkButton>
              </Flex>
              <Flex direction={{ base: "column", md: "row" }} gap="2">
                <Text>{t("landing.continuePrefix")} </Text>
                <Text>
                  <Button
                    as="span"
                    variant="link"
                    style={{ color: "white" }}
                    onClick={() => {
                      /* handle click */
                    }}
                  >
                    {t("landing.continueLogin")}
                  </Button>{" "}
                  {t("landing.continueSuffix")}
                </Text>
              </Flex>
            </Flex>
            <VStack as="section" align="flex-start" spacing={4}>
              <Heading as="h2" variant="greenline" color="theme.blueText">
                {t("landing.whoForTitle")}
              </Heading>

              <UnorderedList spacing={1} pl={4}>
                {whoFor.map((str) => (
                  <ListItem key={str}>{str}</ListItem>
                ))}
              </UnorderedList>
              <Wrap spacing={2} justify="flex-start">
                <Text>
                  {t("landing.iNeedPrefix")}
                  <Button
                    as="span"
                    variant="link"
                    gap="0.2rem"
                    onClick={() => {
                      /* handle click */
                    }}
                  >
                    {t("landing.iNeed")}
                    <ArrowSquareOut />
                  </Button>
                  {t("landing.iNeedSuffix")}
                </Text>
              </Wrap>
            </VStack>
          </Flex>
        </Flex>
      </Container>
      <Box bg="greys.grey03">
        <Container maxW="container.lg" py={10} px={8}>
          <Heading as="h2" color="theme.blueText">
            {t("landing.whatToApply")}
          </Heading>
          <Text py={2}>{t("landing.duringApplication")}</Text>
          <UnorderedList spacing={1} pl={4}>
            {applyNeeds.map((str) => (
              <ListItem key={str}>{str}</ListItem>
            ))}
          </UnorderedList>
          <Text py={2}>{t("landing.informationReady")}</Text>
        </Container>
      </Box>
      <Box bg="greys.white">
        <Container maxW="container.lg" py={16} px={8} gap="6">
          <Heading as="h2" fontSize="md" color="theme.blueText">
            {t("landing.otherWays")}
          </Heading>
          <Text>{t("landing.otherWaysDesc")}</Text>
          <Flex mt={8} gap={6} direction={{ base: "column", md: "row" }}>
            <BareBox n={"1"}>
              {t("landing.additionalContent.left")}
              <br />
              <RouterLinkButton variant={"primary"} mt={2} to={""}>
                {t("landing.additionalContent.viewTemplate")}
              </RouterLinkButton>
            </BareBox>

            <BareBox n={"2"}>
              {t("landing.additionalContent.mid")}
              <br />
              <RouterLinkButton mt={2} variant={"primary"} to={""}>
                {t("landing.additionalContent.midButton")}
              </RouterLinkButton>
            </BareBox>
            <BareBox n={"3"}>
              {t("landing.additionalContent.end")}
              <RouterLinkButton mt={2} variant={"primary"} to={""}>
                {t("landing.additionalContent.endButton")}
              </RouterLinkButton>
            </BareBox>
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
})

interface IJurisdictionSearchProps {}

const JurisdictionSearch = observer(({}: IJurisdictionSearchProps) => {
  const { t } = useTranslation()
  const { geocoderStore, jurisdictionStore } = useMst()
  const { fetchGeocodedJurisdiction, fetchingJurisdiction } = geocoderStore
  const { addJurisdiction } = jurisdictionStore
  const formMethods = useForm()
  const { control, watch, setValue } = formMethods
  const [jurisdiction, setJurisdiction] = useState<IJurisdiction>(null)
  const [manualMode, setManualMode] = useState<boolean>(false)

  const siteWatch = watch("site")

  useEffect(() => {
    // siteWatch.value may contain an empty string
    // If this is the case, let through this conditional
    // in order to let jurisdiction search fail and set manual mode
    // empty string does not count as isNil but undefined does
    if (R.isNil(siteWatch?.value)) return
    ;(async () => {
      const jurisdiction = await fetchGeocodedJurisdiction(siteWatch.value)
      if (jurisdiction) {
        setJurisdiction(jurisdiction)
      } else {
        setManualMode(true)
      }
    })()
  }, [siteWatch?.value])

  return (
    <Flex gap={6} direction={{ base: "column", md: "row" }} w="full">
      <Flex bg="white" p={6} gap={4} borderRadius="md" w="full">
        <FormProvider {...formMethods}>
          <form style={{ width: "100%" }}>
            <Flex direction="column" gap={6}>
              <Flex direction="column">
                <Heading as="h2" variant="yellowline" mb={2}>
                  {t("landing.where")}
                </Heading>
                <Text>{t("landing.findYourAuth")}</Text>
              </Flex>

              <Controller
                name="site"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return <AddressSelect onChange={onChange} value={value} />
                }}
              />

              {manualMode && (
                <FormControl w="full" zIndex={1}>
                  <FormLabel>{t("jurisdiction.index.title")}</FormLabel>
                  <InputGroup w="full">
                    <JurisdictionSelect
                      onChange={(value) => {
                        if (value) addJurisdiction(value)
                        setJurisdiction(value)
                      }}
                      onFetch={() => setValue("jurisdiction", null)}
                      selectedOption={{ label: jurisdiction?.reverseQualifiedName, value: jurisdiction }}
                      menuPortalTarget={document.body}
                    />
                  </InputGroup>
                </FormControl>
              )}
            </Flex>
          </form>
        </FormProvider>
      </Flex>
      <Center
        bg={jurisdiction ? "theme.blueAlt" : "greys.white"}
        minH={243}
        w="full"
        gap={4}
        borderRadius="md"
        color={jurisdiction ? "greys.white" : "theme.secondary"}
        _hover={{
          background: jurisdiction ? "theme.blue" : null,
          transition: "background 100ms ease-in",
        }}
      >
        {jurisdiction ? (
          <VStack
            gap={8}
            className="jumbo-buttons"
            w="full"
            height="full"
            p={6}
            alignItems="center"
            justifyContent="center"
          >
            <Text textTransform={"uppercase"} fontWeight="light" fontSize="sm">
              {jurisdiction.qualifier}
            </Text>
            <HStack gap={2}>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {jurisdiction?.name}
              </Text>
              <Box color="theme.yellow">
                <CheckCircle size={32} />
              </Box>
            </HStack>
            <RouterLinkButton
              variant="ghost"
              color="greys.white"
              to={`/jurisdictions/${jurisdiction.slug}`}
              icon={<CaretRight size={16} />}
              textDecoration={"underline"}
              _hover={{
                background: "none",
              }}
            >
              {t("landing.learnRequirements")}
            </RouterLinkButton>
          </VStack>
        ) : (
          <VStack gap={6} p={6}>
            <Center h={50}>{fetchingJurisdiction ? <SharedSpinner /> : <MapPin size={40} />}</Center>
            <Text fontStyle="italic" textAlign="center">
              {t("landing.reqsVary")}
            </Text>
          </VStack>
        )}
      </Center>
    </Flex>
  )
})

interface IIconBoxProps extends BoxProps {
  icon: ReactNode
  children: ReactNode
}

const IconBox = ({ icon, children, ...rest }: IIconBoxProps) => {
  return (
    <Box p={4} borderRadius="lg" bg="theme.blueLight" color="theme.blueText" flex={1} {...rest}>
      <Flex gap={4} align="center" h="full">
        <Box>{icon}</Box>
        <Text fontSize="md" fontWeight="bold">
          {children}
        </Text>
      </Flex>
    </Box>
  )
}

interface IBareBoxProps {
  n: string
  children: ReactNode
}

const BareBox: React.FC<IBareBoxProps> = ({ n, children }) => {
  return (
    <Box p={4} borderRadius="lg" bg="theme.blueLight" color="theme.blueAlt" flex={1}>
      <Flex gap={6} align="center" h="full">
        <Flex
          alignItems="center"
          justifyContent="center"
          bg="theme.blue"
          color="white"
          borderRadius="50%"
          minWidth="35px"
          height="35px"
          fontSize={20}
          fontWeight="bold"
        >
          {n}
        </Flex>
        <Text fontSize="md" fontWeight="bold" textAlign="left">
          {children}
        </Text>
      </Flex>
    </Box>
  )
}

const AvailableJurisdictionsMessageBox: React.FC = observer(() => {
  const { t } = useTranslation()
  const { jurisdictionStore } = useMst()

  const { tableJurisdictions, searchEnabledJurisdictions, totalPages } = jurisdictionStore

  useEffect(() => {
    searchEnabledJurisdictions(12)
  }, [])

  return (
    <Flex
      direction="column"
      gap={2}
      bg={"semantic.infoLight"}
      border="1px solid"
      borderRadius="lg"
      borderColor={"semantic.info"}
      p={4}
    >
      <Flex align="flex-start" gap={2}>
        <Box color={"semantic.info"}>
          <Info size={24} />
        </Box>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">
            {t("landing.enabledCommunitiesDescription")}{" "}
            {tableJurisdictions.map((jurisdiction) => (
              <Text as="span" fontWeight="normal" key={jurisdiction.id} mr={2}>
                <RouterLink color="black" to={`/jurisdictions/${jurisdiction.slug}`}>
                  {jurisdiction.qualifiedName}
                </RouterLink>
              </Text>
            ))}
            <br />
            {totalPages > 1 ? (
              <Text as="span" fontWeight="bold">
                {t("landing.andMore")}
              </Text>
            ) : (
              <Text as="span" fontWeight="normal">
                {t("landing.moreComingSoon")}
              </Text>
            )}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
})
