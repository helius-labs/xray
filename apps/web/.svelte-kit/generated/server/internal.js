
import root from '../root.svelte';
import { set_assets, set_building, set_private_env, set_public_env, set_version } from '../../../node_modules/@sveltejs/kit/src/runtime/shared.js';

set_version("1686973095116");

export const options = {
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	hooks: null, // added lazily, via `get_hooks`
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\r\n<html\r\n    lang=\"en\"\r\n    data-theme=\"helius\"\r\n>\r\n    <head>\r\n        <meta charset=\"utf-8\" />\r\n        <meta\r\n            property=\"og:title\"\r\n            content=\"XRAY Solana Explorer\"\r\n        />\r\n        <meta\r\n            property=\"og:url\"\r\n            content=\"https://xray.helius.xyz\"\r\n        />\r\n        <meta\r\n            property=\"og:image\"\r\n            content=\"https://xray.helius.xyz/media/linkpreview.jpg\"\r\n        />\r\n        <meta\r\n            property=\"og:image:width\"\r\n            content=\"400\"\r\n        />\r\n        <meta\r\n            property=\"og:image:type\"\r\n            content=\"image/png\"\r\n        />\r\n        <meta\r\n            name=\"twitter:card\"\r\n            content=\"summary_large_image\"\r\n        />\r\n        <meta\r\n            name=\"twitter:site\"\r\n            content=\"@solanaxray\"\r\n        />\r\n        <meta\r\n            name=\"twitter:title\"\r\n            content=\"XRAY Solana Explorer\"\r\n        />\r\n        <meta\r\n            name=\"twitter:description\"\r\n            content=\"A human readable Solana blockchain explorer.\"\r\n        />\r\n        <meta\r\n            name=\"twitter:url\"\r\n            content=\"https://xray.helius.xyz\"\r\n        />\r\n        <meta\r\n            name=\"twitter:image\"\r\n            content=\"https://xray.helius.xyz/media/linkpreview.jpg\"\r\n        />\r\n        <link\r\n            rel=\"icon\"\r\n            href=\"" + assets + "/favicon.png\"\r\n        />\r\n        <meta\r\n            name=\"viewport\"\r\n            content=\"width=device-width, initial-scale=1.0\"\r\n        />\r\n\r\n        <link\r\n            rel=\"preconnect\"\r\n            href=\"https://fonts.googleapis.com\"\r\n        />\r\n        <link\r\n            rel=\"preconnect\"\r\n            href=\"https://fonts.gstatic.com\"\r\n            crossorigin\r\n        />\r\n        <link\r\n            href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\"\r\n            rel=\"stylesheet\"\r\n        />\r\n\r\n        <title>XRAY</title>\r\n\r\n        " + head + "\r\n    </head>\r\n    <body data-sveltekit-preload-data=\"hover\">\r\n        <div style=\"display: contents\">" + body + "</div>\r\n\r\n        <!-- Google tag (gtag.js) -->\r\n        <script\r\n            async\r\n            src=\"https://www.googletagmanager.com/gtag/js?id=G-XGVFBFP3B4\"\r\n        ></script>\r\n        <script>\r\n            window.dataLayer = window.dataLayer || [];\r\n            function gtag() {\r\n                dataLayer.push(arguments);\r\n            }\r\n            gtag(\"js\", new Date());\r\n\r\n            gtag(\"config\", \"G-XGVFBFP3B4\");\r\n        </script>\r\n    </body>\r\n</html>\r\n",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid #ccc;\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	}
};

export function get_hooks() {
	return import("../../../src/hooks.server.ts");
}

export { set_assets, set_building, set_private_env, set_public_env };
