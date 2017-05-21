#!/usr/bin/env node

'use strict';

// Load modules

const Fs = require('fs');
const Path = require('path');
const Toc = require('markdown-toc');

// Declare internals

const internals = {
    basePath: process.cwd(),
    defineFile: function (filename) {

        const path = Path.join(internals.basePath, filename);
        return {
            filename: filename,
            path: path,
            contents: Fs.readFileSync(path, 'utf8')
        };
    }
};

internals.readme = internals.defineFile('README.md');

internals.generateToc = function () {

    const tocOptions = {
        bullets: '-',
        slugify: function (text) {

            return text.toLowerCase()
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/\s/g, '-')
                .replace(/[^\w-]/g, '');
        }
    };

    const api = Toc.insert(internals.readme.contents, tocOptions);

    Fs.writeFileSync(internals.readme.path, api);
};

internals.generateToc();