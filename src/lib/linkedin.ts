import ChatGPTIcon from "../components/ChatGPTIcon";

import {CHATGPT_BTN_ID, Domains, ERROR_MESSAGE} from "../utils/constants";
import {getComment, delay, showAPIKeyError} from "../utils/shared";
import getConfig from "../utils/config";
import {notyf} from "../chrome/content_script";

const commentsSectionInjector = () => {
    document
        .querySelectorAll(
            ".comments-comment-texteditor > .display-flex > .display-flex"
        )
        .forEach((el) => {
            if (el.getAttribute("hasChatGPT") === "true") return;
            el.setAttribute("hasChatGPT", "true");

            const chatGPTBtn = document.createElement("button");
            chatGPTBtn.setAttribute("type", "button");
            chatGPTBtn.setAttribute("id", CHATGPT_BTN_ID);
            chatGPTBtn.setAttribute(
                "class",
                "artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"
            );
            chatGPTBtn.innerHTML = ChatGPTIcon(20, "#666666");
            el.prepend(chatGPTBtn);
        });
}

const postSectionInjector = () => {
    document.querySelectorAll(
        ".share-creation-state__additional-toolbar > div:first-child"
    )
    .forEach((el) => {
        if (el.getAttribute("hasChatGPT") === "true") return;
        el.setAttribute("hasChatGPT", "true");
        const chatGPTBtnContainer = document.createElement('div')
        const chatGPTBtn = document.createElement("button");
        chatGPTBtn.setAttribute("type", "button");
        chatGPTBtn.setAttribute("id", CHATGPT_BTN_ID);
        chatGPTBtn.setAttribute(
            "class",
            "artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"
        );
        chatGPTBtn.innerHTML = ChatGPTIcon(20, "#666666");
        chatGPTBtnContainer.appendChild(chatGPTBtn)
        el?.after(chatGPTBtnContainer);
    })
}

const commentsHandler = () => {
    document.body.addEventListener("click", async (e) => {
        const target = e.target as Element;
        const btn = target?.closest(`#${CHATGPT_BTN_ID}`);
        if (!btn) return;

        const config = await getConfig();
        if (!config["social-comments-openapi-key"])
            return showAPIKeyError(Domains.LinkedIn);

        notyf?.dismissAll();

        const wrapper = target?.closest(".feed-shared-update-v2");
        if (!wrapper) return;

        const commentInputEl = wrapper.querySelector(".ql-editor")!;
        commentInputEl.innerHTML = "";

        commentInputEl.setAttribute("data-placeholder", "Yobi is thinking...");
        btn.setAttribute("disabled", "true");
        btn.setAttribute("loading", "true");

        const content =
            (
                wrapper.querySelector(
                    '.feed-shared-inline-show-more-text span[dir="ltr"]'
                ) as HTMLElement
            )?.innerText || "";

        const comment = await getComment(config, Domains.LinkedIn, content);
        if (comment.length) {
            commentInputEl.innerHTML = comment;
        } else {
            commentInputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
            await delay(3000);
        }

        commentInputEl.setAttribute("data-placeholder", "Add a comment..");
        btn.removeAttribute("disabled");
        btn.removeAttribute("loading");
    });
}

const postHandler = () => {
    document.body.addEventListener("click", async (e) => {
        const target = e.target as Element;
        const btn = target?.closest(`#${CHATGPT_BTN_ID}`);
        if (!btn) return;

        const config = await getConfig();
        if (!config["social-comments-openapi-key"])
            return showAPIKeyError(Domains.LinkedIn);

        notyf?.dismissAll();

        const postInputEl = document.querySelector(".editor-content > .ql-editor")!;
        const content =
            (
                postInputEl?.querySelector('p') as HTMLElement
            )?.innerText || "nothing";
        console.log(content)
        postInputEl.innerHTML = "";

        postInputEl.setAttribute("data-placeholder", "Yobi is thinking...");
        btn.setAttribute("disabled", "true");
        btn.setAttribute("loading", "true");

        // TODO: change to GET POST
        const comment = await getComment(config, Domains.LinkedIn, content);
        if (comment.length) {
            postInputEl.innerHTML = comment;
        } else {
            postInputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
            await delay(3000);
        }

        postInputEl.setAttribute("data-placeholder", "Say \"Write a post about X\" and generate the magic!");
        btn.removeAttribute("disabled");
        btn.removeAttribute("loading");
    });
}

export const injector = () => {
    postSectionInjector()
    commentsSectionInjector()
};



export const handler = async () => {
    commentsHandler()
    postHandler()
};
