import {readable} from "svelte/store"

export const BASE_URL_LOCAL = readable("http://localhost:8080")

export const imageHeight = readable(5000)
export const imageWidth = readable(5000)
