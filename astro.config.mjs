import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import webVitals from "@astrojs/web-vitals";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import houston from "./houston.theme.json";

/* https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables */
import sentry from "@sentry/astro";
const VERCEL_PREVIEW_SITE =
	process.env.VERCEL_ENV !== "production" &&
	process.env.VERCEL_URL &&
	`https://${process.env.VERCEL_URL}`;

// https://astro.build/config
export default defineConfig({
	site: VERCEL_PREVIEW_SITE || "https://astro.build",
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		solid(),
		sentry({
			dsn: "https://a4ffeb87abb2a5edbbaa8fc523bc0ab5@o4506044970565632.ingest.us.sentry.io/4507312696918016",
			sourceMapsUploadOptions: {
				project: "astro-build",
				authToken: process.env.SENTRY_AUTH_TOKEN,
			},
		}),
		astroExpressiveCode({
			themes: [houston],
			frames: false,
		}),
		mdx(),
		sitemap(),
		db(),
		webVitals(),
	],
	image: {
		domains: ["v1.screenshot.11ty.dev", "storage.googleapis.com"],
	},
	vite: {
		ssr: {
			noExternal: ["smartypants"],
		},
	},
	output: "hybrid",
	adapter: vercel({
		imageService: true,
		functionPerRoute: false,
	}),
});
