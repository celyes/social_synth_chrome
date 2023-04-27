import * as React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Container from "../components/Container";
import IcSettings from "../components/ICSettings";
import ICWritingStyles from "../components/ICWritingStyles";
// import IcInstagram from "../components/IcInstagram";
// import IcLinkedIn from "../components/IcLinkedIn";
// import ICTwitter from "../components/IcTwitter";
import Logo from "../components/Logo";
import Section, {Props as SectionProps} from "../components/Section";
import Tab, {TabItem} from "../components/Tab";
import CommentStyleOptions from "./containers/CommentStyleOptions";
import HashtagOptions from "./containers/HashtagOptions";
import ExcludedWords from "./containers/ExcludedWords";
import Prompts from "./containers/Prompts";
import {Domains} from "../utils/constants";

import "./common.css";
import WritingStyleOptions from "./containers/WritingStyleOptions";
const SECTIONS: (SectionProps & { comp: JSX.Element })[] = [
    {
        title: "Comment style",
        desc: "Whether generated comments will be professional, informal, etc.",
        comp: <CommentStyleOptions/>,
    },
    {
        title: "Allow hashtags",
        desc: "Would you like to allow hashtags in generated comments?",
        comp: <HashtagOptions/>,
    },
    {
        title: "Words to avoid",
        desc: "Words that will not be mentioned often in generated comments. It's not 100% guaranteed these words won't be mentioned.",
        comp: <ExcludedWords/>,
    },
];

const TABS: TabItem[] = [
    {
        title: "Settings",
        comp: (
            <>
                {SECTIONS.map((section, i) => {
                    const {comp, ...rest} = section;
                    return (
                        <Section key={section.title + i} {...rest}>
                            {comp}
                        </Section>
                    );
                })}
            </>
        ),
        icon: <IcSettings/>,
    },
    {
        title: "Posts",
        comp: <WritingStyleOptions />,
        icon: <ICWritingStyles/>,
    }
    // {
    //   title: "Instagram Prompts",
    //   comp: <Prompts type={Domains.Instagram} />,
    //   icon: <IcInstagram />,
    // },
    // {
    //   title: "LinkedIn Prompts",
    //   comp: <Prompts type={Domains.LinkedIn} />,
    //   icon: <IcLinkedIn />,
    // },
    // {
    //   title: "Twitter Prompts",
    //   comp: <Prompts type={Domains.Twitter} />,
    //   icon: <ICTwitter />,
    // },
];

export const Main = styled.div`
  margin: 24px 0;
`;

const Options = () => {
    return (
        <Container>
            <Logo/>

            {/* Tabs */}
            <Main>
                <Tab tabs={TABS}/>
            </Main>

            {/* Copyright */}
            {/*<p>*/}
            {/*    <a href="https://yobi.app/" target="_blank">*/}
            {/*        Yobi.app*/}
            {/*    </a>{" "}*/}
            {/*    &copy; 2023*/}
            {/*</p>*/}

            {/* Credits */}
            <p>
                Made with ❤️ by{" "}
                <a href="https://yobi.app/" target="_blank">
                    Yobi
                </a>
            </p>
        </Container>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Options/>
    </React.StrictMode>,
    document.getElementById("root")
);
