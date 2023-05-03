import * as React from "react";

import * as Styled from "./Tunings.styled";
import Loading from "../Loading";
import useChromeStorage from "../../hooks/useChromeStorage";
import {
    TUNINGS_DEFAULT,
} from "../../utils/options";
import {useState} from "react";

const Tunings = () => {
    const [tunings, setTunings, {loading}] = useChromeStorage<string>(
        "tunings",
        TUNINGS_DEFAULT
    );
    const [newTuning, setNewTuning] = useState('')
    const handleChange = (event: any) => {
        const value = event.target.value
        setNewTuning(value)
    }
    const handleAdd = () => {
        const localTunings = JSON.parse(tunings)
        const newTuningsList = [...localTunings, newTuning]
        setTunings(JSON.stringify(newTuningsList))
        setNewTuning('')
    }
    const deleteTuning = (tuning_key: number) => {
        const localTunings = JSON.parse(tunings)
        localTunings.splice(tuning_key, 1)
        setTunings(JSON.stringify(localTunings))
    }

    if (loading) return <Loading/>;

    return (
        <>
            <div>
                <p>Tune your posts and comments</p>
                <Styled.TuningInput type="text" onChange={handleChange} value={newTuning} placeholder="e.g: Don't use hastags"/>
                <Styled.PrimaryButton type="button" onClick={handleAdd}>
                    Add
                </Styled.PrimaryButton>
            </div>
            <br/>
            <Styled.TuningsContainer>
                <span>Previous tunings:</span>
                {JSON.parse(tunings).map((t: string, i: number) => {
                    return (
                        <>
                                <Styled.Body>
                                    <Styled.ListItem key={i}>
                                        <Styled.TuningPhrase>
                                            {t}
                                        </Styled.TuningPhrase>
                                        &nbsp;
                                        &nbsp;
                                        <Styled.PrimaryButton onClick={() => {
                                            deleteTuning(i)
                                        }}>
                                            delete
                                        </Styled.PrimaryButton>
                                    </Styled.ListItem>
                                </Styled.Body>
                        </>
                    )
                })}
            </Styled.TuningsContainer>
        </>
    );
};

export default Tunings;
