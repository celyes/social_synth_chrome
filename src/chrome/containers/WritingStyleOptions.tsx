import * as React from "react";

import Selection from "../../components/Selection";
import Loading from "../../components/Loading";
import useChromeStorage from "../../hooks/useChromeStorage";
import {HASHTAG_OPTS, HASHTAG_OPT_DEFAULT, WRITING_STYLES_DEFAULT} from "../../utils/options";
import {WritingStylesStructure} from "../../components/Selection/Selection";
import Section from "../../components/Section";
import {useEffect} from "react";

const WritingStyleOptions = () => {
    const [writingStyles, setWritingStyle, {loading}] = useChromeStorage<string | object>(
        "writing_styles",
        WRITING_STYLES_DEFAULT
    );

    const [selectedWritingStyle, setSelectedWritingStyle] = useChromeStorage<string>(
        "selected_writing_style",
        '0'
    );

    if (loading) return <Loading/>;
    return (
        <>
            <Section title="Writing style">
                Choose how your posts will sound to your audience
            </Section>
            <Selection
                inline={true}
                styles={JSON.parse(writingStyles as string)}
                selectedStyle={selectedWritingStyle}
                onChange={(value: string) => {
                    setSelectedWritingStyle(value)
                }}
            />
        </>
    );
};

export default WritingStyleOptions;
