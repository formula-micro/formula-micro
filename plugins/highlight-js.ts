import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import kotlin from "highlight.js/lib/languages/kotlin";
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("kotlin", kotlin);

export default defineNuxtPlugin((nuxtApp) =>
{
    nuxtApp.vueApp.use(hljsVuePlugin);
});