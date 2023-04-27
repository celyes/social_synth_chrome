// import ChatGPTIcon from "../components/ChatGPTIcon";
//
// import {CHATGPT_POST_BTN_ID, Domains, ERROR_MESSAGE} from "../utils/constants";
// import {getComment, delay, showAPIKeyError} from "../utils/shared";
// import getConfig from "../utils/config";
// import {notyf} from "../chrome/content_script";
//
// const commentsSectionInjector = () => {
//     document
//         .querySelectorAll(
//             ".comments-comment-texteditor > .display-flex > .display-flex"
//         )
//         .forEach((el) => {
//             if (el.getAttribute("hasChatGPT") === "true") return;
//             el.setAttribute("hasChatGPT", "true");
//
//             const chatGPTBtn = document.createElement("button");
//             chatGPTBtn.setAttribute("type", "button");
//             chatGPTBtn.setAttribute("id", CHATGPT_POST_BTN_ID);
//             chatGPTBtn.setAttribute(
//                 "class",
//                 "artdeco-button--tertiary artdeco-button artdeco-button--circle artdeco-button--muted"
//             );
//             chatGPTBtn.innerHTML = ChatGPTIcon(20, "#666666");
//             el.prepend(chatGPTBtn);
//         });
// }
//
// const postSectionInjector = () => {
//     const forms = document.forms
//     const postForm = forms[forms.length - 1]
//     postForm?.querySelectorAll(
//         "[aria-label=Emoji]:first-child"
//     )
//         .forEach((el) => {
//             if (el.getAttribute("hasChatGPT") === "true") return;
//             el.setAttribute("hasChatGPT", "true");
//             const chatGPTBtn = document.createElement("button");
//             chatGPTBtn.setAttribute("type", "button");
//             chatGPTBtn.setAttribute("id", CHATGPT_POST_BTN_ID);
//             chatGPTBtn.innerHTML = ChatGPTIcon(20, "#666666");
//             el?.before(chatGPTBtn);
//         })
// }
//
// const commentsHandler = () => {
//     document.body.addEventListener("click", async (e) => {
//         const target = e.target as Element;
//         const btn = target?.closest(`#${CHATGPT_POST_BTN_ID}`);
//         if (!btn) return;
//
//         const config = await getConfig();
//         if (!config["social-synth-api-key"])
//             return showAPIKeyError(Domains.LinkedIn);
//
//         notyf?.dismissAll();
//
//         const wrapper = target?.closest(".feed-shared-update-v2");
//         if (!wrapper) return;
//
//         const commentInputEl = wrapper.querySelector(".ql-editor")!;
//         commentInputEl.innerHTML = "";
//
//         commentInputEl.setAttribute("data-placeholder", "Yobi is thinking...");
//         btn.setAttribute("disabled", "true");
//         btn.setAttribute("loading", "true");
//
//         const content =
//             (
//                 wrapper.querySelector(
//                     '.feed-shared-inline-show-more-text span[dir="ltr"]'
//                 ) as HTMLElement
//             )?.innerText || "";
//
//         const comment = await getComment(config, Domains.LinkedIn, content);
//         if (comment.length) {
//             commentInputEl.innerHTML = comment;
//         } else {
//             commentInputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
//             await delay(3000);
//         }
//
//         commentInputEl.setAttribute("data-placeholder", "Add a comment..");
//         btn.removeAttribute("disabled");
//         btn.removeAttribute("loading");
//     });
// }
//
// const postHandler = () => {
//     document.body.addEventListener("click", async (e) => {
//         const target = e.target as Element;
//         const btn = target?.closest(`#${CHATGPT_POST_BTN_ID}`);
//         if (!btn) return;
//
//         const config = await getConfig();
//         if (!config["social-synth-api-key"])
//             return showAPIKeyError(Domains.Facebook);
//
//         notyf?.dismissAll();
//
//         const lastForm = document.forms[document.forms.length - 1]
//         const postInputEl = lastForm.querySelector('[contenteditable=true]')! as HTMLDivElement;
//         const content = postInputEl.innerText || "\n";
//         const next = postInputEl.nextElementSibling
//         next ? next.innerHTML =  "Yobi is thinking..." :  '';
//         btn.setAttribute("disabled", "true");
//         btn.setAttribute("loading", "true");
//         const span = document.createElement('span')
//         // TODO: change to get POST
//         const comment = await getComment(config, Domains.Facebook, content);
//         if (comment.length) {
//             const paragraph = postInputEl.querySelector('p')
//             const span = document.createElement('span')
//             span.innerText = comment
//             paragraph?.appendChild(span)
//             console.log(comment)
//         } else {
//             postInputEl.setAttribute("data-placeholder", ERROR_MESSAGE);
//             await delay(3000);
//         }
//         btn.removeAttribute("disabled");
//         btn.removeAttribute("loading");
//     });
// }
//
// export const injector = () => {
//     postSectionInjector()
//     commentsSectionInjector()
// };
//
//
// export const handler = async () => {
//     commentsHandler()
//     postHandler()
// };
