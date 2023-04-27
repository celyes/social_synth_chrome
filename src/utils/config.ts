import {
    COMMENTS_STYLE_OPT_DEFAULT,
    HASHTAG_OPT_DEFAULT,
    MODEL_OPT_DEFAULT,
    WRITING_STYLES_DEFAULT,
} from "./options";
import {
    INSTAGRAM_PROMPTS,
    LINKED_IN_PROMPTS,
    FACEBOOK_PROMPTS,
    TWITTER_PROMPTS,
} from "./prompts";

const OPTIONS = [
    "social-synth-api-key",
    "opt-model-type",
    "opt-comment-style",
    "opt-hashtag-option",
    "opt-excluded-words",
    "opt-insta-prompts",
    "opt-linkedin-prompts",
    // "opt-facebook-prompts",
    "opt-twitter-prompts",
    "writing_styles",
    "selected_writing_style"
] as const;

export type StorageKeys = (typeof OPTIONS)[number];

export type Config = Record<StorageKeys, any>;

export const DEFAULT_CONFIG: Config = {
    "social-synth-api-key": "",
    "opt-comment-style": COMMENTS_STYLE_OPT_DEFAULT,
    "opt-excluded-words": [],
    "opt-insta-prompts": INSTAGRAM_PROMPTS,
    "opt-linkedin-prompts": LINKED_IN_PROMPTS,
    // "opt-facebook-prompts": FACEBOOK_PROMPTS,
    "opt-twitter-prompts": TWITTER_PROMPTS,
    "opt-model-type": MODEL_OPT_DEFAULT,
    "opt-hashtag-option": HASHTAG_OPT_DEFAULT,
    "writing_styles": WRITING_STYLES_DEFAULT,
    "selected_writing_style": 0
};

export default (): Promise<Config> =>
    new Promise((resolve, reject) =>
        chrome?.storage?.local?.get(OPTIONS, (result) => {
            const config = Object.keys(DEFAULT_CONFIG).reduce((a, c) => {
                return {
                    ...a,
                    // @ts-ignore
                    [c]: result?.[c] || DEFAULT_CONFIG[c],
                };
            }, {});

            resolve(config as Config);
        })
    );
