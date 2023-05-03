import {notyf} from "../chrome/content_script";
import getConfig, {Config, WritingStyle} from "./config";
import {Domains, TOAST_CLASSNAME} from "./constants";
import {HashtagOptions, WRITING_STYLES_DEFAULT} from "./options";
import {WELCOME_PAGE} from "./constants";
import {generateErrorMessage} from "./generators";

export const getPost = async (
    config: Config,
    domain: Domains,
    content: string
): Promise<string> => {

    const tunings = await chrome.storage.local.get('tunings')
    const selectedWritingStyle = await chrome.storage.local.get('selected_writing_style')

    const body = {
        "channel": domain.split('.')[0],
        "topic": content,
        "target_audience": "everyone",
        "writing_guide_id": selectedWritingStyle['selected_writing_style'],
        "tunings": JSON.parse(tunings['tunings']).join(','),
        "creativity": 0.5
    };

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config["social-synth-api-key"]}`,
        },
        body: JSON.stringify(body),
    };
    const response = await fetch("https://social.yobi.app/api/generate/post", options);
    const socialSynthResponse = await response.json();
    console.log(socialSynthResponse)
    if (!response.ok) {
        const {title, message} = generateErrorMessage(response.status);
        notyf?.error({
            duration: 0,
            dismissible: true,
            message: `<div class="title">Oops! something went wrong</div><p>Please provide something to write about. if this error keeps showing, refresh the page and try again.</p>`,
            className: `${TOAST_CLASSNAME} ${domain.replace(/([.]\w+)$/, "")}`,
            ripple: false,
        });
        return "";
    }

    let post = (socialSynthResponse?.["results"]?.['posts'][0]['post_content'] || "")
        .replace(/^\s+|\s+$/g, "")
        .replace(/(^"|"$)/g, "");

    if (config["opt-hashtag-option"] === HashtagOptions.NO) {
        post = post.replace(/#\w+/g, "");
    }

    return post;
};

export const getComment = async (
    config: Config,
    domain: Domains,
    content: string,
    commentToReply: string | null,
    isItMyPost: boolean = false
): Promise<string> => {

    const selectedWritingStyle = await chrome.storage.local.get('selected_writing_style')

    let tunings = await chrome.storage['local'].get('tunings')
    tunings = JSON.parse(tunings['tunings']).join('\n-')
    const body = {
        channel: domain.split('.')[0],
        post_content: content,
        writing_guide_id: selectedWritingStyle['selected_writing_style'],
        creativity: 0.5,
        tunings: tunings,
        comment_to_reply: commentToReply,
        is_my_post: isItMyPost
    };
    // TODO: add comment to reply...
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config["social-synth-api-key"]}`,
        },
        body: JSON.stringify(body),
    };
    // TODO: change the endpoint here...
    const response = await fetch("https://social.yobi.app/api/generate/comment", options);
    const socialSynthResponse = await response.json();

    if (!response.ok) {
        const {title, message} = generateErrorMessage(response.status);
        notyf?.error({
            duration: 0,
            dismissible: true,
            message: `<div class="title">Oops! something went wrong</div><p>Cannot generate a comment for this post. Please try again later.</p>`,
            className: `${TOAST_CLASSNAME} ${domain.replace(/([.]\w+)$/, "")}`,
            ripple: false,
        });
        return "";
    }

    let comment = (socialSynthResponse?.["results"]?.['comment'] || "")
        .replace(/^\s+|\s+$/g, "")
        .replace(/(^"|"$)/g, "");

    if (config["opt-hashtag-option"] === HashtagOptions.NO) {
        comment = comment.replace(/#\w+/g, "");
    }

    return comment;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const closestSibling = (
    element: Element,
    query: string
): Element | null => {
    const parent = element.parentElement;
    if (parent === null) return null;
    const sibling = parent.querySelector(query);
    if (sibling !== null) return sibling;
    return closestSibling(parent, query);
};

export const setInnerHTML = (element: Element, html: string) => {
    try {
        element.innerHTML = html;
    } catch {
    }
};

export const imitateKeyInput = (el: HTMLTextAreaElement, keyChar: string) => {
    const keyboardEventInit = {
        bubbles: false,
        cancelable: false,
        composed: false,
        key: "",
        code: "",
        location: 0,
    };
    el.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit));
    el.value = keyChar;
    el.dispatchEvent(new KeyboardEvent("keyup", keyboardEventInit));
    el.dispatchEvent(new Event("change", {bubbles: true}));
};

export const showAPIKeyError = (domain: Domains) => {
    notyf?.error({
        duration: 3000,
        dismissible: true,
        message: `<div class="title">API key is not set</div><p>Please set OpenAI API key in the popup.</p><p class="small">See <a href="${WELCOME_PAGE}" target="_blank">onboarding</a> for more info.</p>`,
        className: `${TOAST_CLASSNAME} ${domain.replace(/([.]\w+)$/, "")}`,
        ripple: false,
    });
};

export const setDefaultWritingStyle = async (writingStyles: WritingStyle[], defaultWritingStyle: number) => {
    console.log('setting default writing styles...')
    const isWritingStyleValid = writingStyles.map((w: any) => w.id)
    if (isWritingStyleValid) {
        console.log(writingStyles[0].id)
        await chrome.storage.local.set({'selected_writing_style': writingStyles[0].id})
    }
}
export const fetchWritingStyles = async () => {
    const config = await getConfig()
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config["social-synth-api-key"]}`,
        }
    };
    const selectedWritingStyle = Number(
        (await chrome.storage.local.get('selected_writing_style'))['selected_writing_style']
    ) || -1
    try {
        const response = await fetch("https://social.yobi.app/api/writing-styles", options);
        const socialSynthResponse = await response.json();
        const writing_styles = JSON.stringify(socialSynthResponse.results.data)
        await chrome.storage.local.set({'writing_styles': writing_styles})
        await setDefaultWritingStyle(
            socialSynthResponse.results.data,
            selectedWritingStyle
        )
    } catch (e) {
        console.log('Invalid API key')
    }
}
