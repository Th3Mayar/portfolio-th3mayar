import { ref } from "vue";
import { userType, setUserType } from "@/stores/userType";

// Modal state
let show = ref(false),

    showButtonOne = ref(false),
    showButtonTwo = ref(false),
    btn = ref(null),

    // Typewriter state
    fullText = "",
    typedText = ref(""),
    typing = ref(true),
    showOr = ref(false);

function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

function setFullText(textParam: string) {
    return fullText = textParam;
}

async function runTypewriter() {
    typing.value = true;
    typedText.value = "";

    for (let i = 0; i < fullText.length; i++) {
        typedText.value += fullText[i];
        const base = 35;
        const variance = Math.random() * 40;
        await sleep(base + variance);
    }

    await sleep(300);
    typing.value = false;
}

function select(type) {
    setUserType(type);
    show.value = false;
}

export function useTypeModalUser() {
    return {
        show,
        showButtonOne,
        showButtonTwo,
        btn,
        typedText,
        typing,
        setFullText,
        runTypewriter,
        select,
        userType,
        showOr,
    };
}