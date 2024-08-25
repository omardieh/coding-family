"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (str) => {
    return str
        .normalize('NFD') // Normalize to decompose combined characters (e.g., é -> e + ´)
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '') // Remove all non-word characters except hyphens
        .replace(/--+/g, '-'); // Replace multiple hyphens with a single one
};
exports.slugify = slugify;
