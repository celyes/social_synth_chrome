import ChatGPTIcon from "../components/ChatGPTIcon";

import {CHATGPT_COMMENT_BTN_ID, CHATGPT_POST_BTN_ID, Domains, ERROR_MESSAGE} from "../utils/constants";
import {getComment, showAPIKeyError, getPost} from "../utils/shared";
import getConfig, {Config, WritingStyle} from "../utils/config";

import {notyf} from "../chrome/content_script";

const replyPageInjector = () => {
    document
        .querySelectorAll(
            ".reBottomProperties .reRow"
        )
        .forEach((el) => {
            if (el.getAttribute("hasChatGPT") === "true") return;
            el.setAttribute("hasChatGPT", "true");


            const innerButtonContent = document.createElement('span')
            innerButtonContent.innerText = "Generate"

            const chatGPTBtn = document.createElement("button");
            chatGPTBtn.innerText = "Generate the reply"
            chatGPTBtn.setAttribute("id", CHATGPT_COMMENT_BTN_ID);
            chatGPTBtn.setAttribute("type", 'button');

            chatGPTBtn.setAttribute('style', "border: 1px solid #ccc;\n" +
                "    color: #333;\n" +
                "    background-color: #fff;\n" +
                "    width: 100px;\n" +
                "    line-height: 2.1em;\n" +
                "    border-radius: 0.28571429em;\n" +
                "    margin-right: 0.71428571em;")

            chatGPTBtn.innerHTML = ChatGPTIcon(20, "#666666");
            chatGPTBtn.appendChild(innerButtonContent)
            // listItem.appendChild(chatGPTBtn)
            // listContainer.appendChild(listItem)
            el.append(chatGPTBtn);
        });
}

const replyButtonHandler = () => {
    document.body.addEventListener("click", (e) => {
        const target = e.target as Element;
        const postReplyButton = target?.closest('.topicFooter .postActionButtons .postReply');
        if (!postReplyButton) return

        const postContainer = postReplyButton?.parentElement?.closest('.topicFooter')?.parentElement?.querySelector('.topicMessage .postMessage') as HTMLElement
        const originalPost = postContainer?.querySelector('blockquote')?.innerText ?? ''
        // @ts-ignore
        postContainer.removeChild(postContainer.firstElementChild as Node)
        const comment = postContainer.innerText

        console.log("post", originalPost)
        console.log("comment", comment)
        window?.localStorage.setItem("dental_town__post", originalPost)
        window?.localStorage.setItem("dental_town__reply", comment)
    })

}

// TODO: get back later
const reply = async (config: Config) => {
    const post = window?.localStorage.getItem('dental_town__post')
    const comment = window?.localStorage.getItem('dental_town__reply')
    if (post !== null && comment !== null) {
        const textArea = document.querySelector('.reContentAreaToggle')

        // @ts-ignore
        textArea?.innerText = "Yobi is thinking..."
        const craftedComment = await getComment(config, Domains.DentalTown, post, comment);
        console.log(craftedComment)
        // @ts-ignore
        textArea?.innerText = craftedComment
    }
}

const post = async (config: Config) => {

    // @ts-ignore
    const subject = document.querySelector('input[name="ctl00$ctl00$mb_site$mainBody$ctl02$txtSubject"]')?.value

    console.log(subject)
    const textArea = document.querySelector('.reContentAreaToggle')

    // @ts-ignore
    textArea?.innerText = "Yobi is thinking..."
    const craftedPost = await getPost(config, Domains.DentalTown, subject);
    console.log(craftedPost)
    // @ts-ignore
    textArea?.innerText = craftedPost

}
const replyHandler = () => {
    document.body.addEventListener("click", async (e) => {

        const target = e.target as Element;
        const btn = target?.closest(`#${CHATGPT_COMMENT_BTN_ID}`);
        if (!btn) return;

        const config = await getConfig();
        if (!config["social-synth-api-key"])
            return showAPIKeyError(Domains.LinkedIn);

        notyf?.dismissAll();

        // @ts-ignore
        const isPost = document.querySelector('#HeaderSecondary')?.firstElementChild?.innerText.toLowerCase() === "create new topic"
        if (isPost) {
            await post(config)
        } else {
            await reply(config)
        }
    })

}


export const injector = () => {
    replyPageInjector()
};


export const handler = async () => {
    replyButtonHandler()
    replyHandler()
};
