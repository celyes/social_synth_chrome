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
                {JSON.parse(tunings).map((tuning: string, key: number) => {
                    return (
                        <div key={key}>
                                <Styled.Body>
                                    <Styled.ListItem>
                                        <Styled.DangerButton onClick={() => {
                                            deleteTuning(key)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>

                                        </Styled.DangerButton>
                                        <Styled.TuningPhrase>
                                            {tuning}
                                        </Styled.TuningPhrase>
                                    </Styled.ListItem>
                                </Styled.Body>
                        </div>
                    )
                })}
            </Styled.TuningsContainer>
        </>
    );
};

export default Tunings;
