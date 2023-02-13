module.exports = {
    env : {
        browser : true,
        es2021  : true,
    },
    parser        : "@typescript-eslint/parser",
    parserOptions : {
        ecmaVersion : "latest",
        sourceType  : "module",
    },
    globals : {
        import  : "readable",
        require : "readable",
        process : "readable",
        module  : "readable",
    },

    extends : [
        "plugin:svelte/recommended",
    ],

    plugins : [
        "@typescript-eslint/eslint-plugin",
    ],

    overrides : [
        {
            files  : [ "*.svelte" ],
            parser : "svelte-eslint-parser",
            rules  : {
                "svelte/indent" : "error",
                indent          : "off",
            },
            parserOptions : {
                parser : "@typescript-eslint/parser",
            },
        },
    ],

    settings : {
        "import/core-modules" : [ "svelte" ],
    },

    rules : {
        "svelte/no-at-html-tag"         : "off",
        "svelte/prefer-class-directive" : "error",
        "svelte/prefer-style-directive" : "error",
        "svelte/valid-compile"          : [
            "error",
            {
                ignoreWarnings : false,
            },
        ],
        "svelte/html-closing-bracket-spacing" : [
            "error",
            {
                startTag       : "never", // or "always" or "ignore"
                endTag         : "never", // or "always" or "ignore"
                selfClosingTag : "always", // or "never" or "ignore"
            },
        ],
        "svelte/max-attributes-per-line" : [
            "error",
            {
                multiline  : 1,
                singleline : 1,
            },
        ],
        "svelte/indent" : [
            "error",
            {
                indent                    : 4,
                ignoredNodes              : [],
                switchCase                : 1,
                alignAttributesVertically : false,
            },
        ],
        "svelte/first-attribute-linebreak" : [
            "error",
            {
                multiline  : "below", // or "beside"
                singleline : "beside", // "below"
            },
        ],
        "svelte/html-quotes" : [
            "error",
            {
                prefer  : "double", // or "single"
                dynamic : {
                    quoted                     : false,
                    avoidInvalidUnquotedInHTML : false,
                },
            },
        ],
        "svelte/sort-attributes" : [
            "error",
            {
                order : [
                // `this` property.
                    "this",
                    // `bind:this` directive.
                    "bind:this",
                    // `id` attribute.
                    "id",
                    // `name` attribute.
                    "name",
                    // `slot` attribute.
                    "slot",
                    // `--style-props` (Alphabetical order within the same group.)
                    { match : "/^--/u", sort : "alphabetical" },
                    // `style` attribute, and `style:` directives.
                    [ "style", "/^style:/u" ],
                    // `class` attribute.
                    "class",
                    // `class:` directives. (Alphabetical order within the same group.)
                    { match : "/^class:/u", sort : "alphabetical" },
                    // other attributes. (Alphabetical order within the same group.)
                    {
                        match : [ "!/:/u", "!/^(?:this|id|name|style|class)$/u", "!/^--/u" ],
                        sort  : "alphabetical",
                    },
                    // `bind:` directives (other then `bind:this`), and `on:` directives.
                    [ "/^bind:/u", "!bind:this", "/^on:/u" ],
                    // `use:` directives. (Alphabetical order within the same group.)
                    { match : "/^use:/u", sort : "alphabetical" },
                    // `transition:` directive.
                    { match : "/^transition:/u", sort : "alphabetical" },
                    // `in:` directive.
                    { match : "/^in:/u", sort : "alphabetical" },
                    // `out:` directive.
                    { match : "/^out:/u", sort : "alphabetical" },
                    // `animate:` directive.
                    { match : "/^animate:/u", sort : "alphabetical" },
                    // `let:` directives. (Alphabetical order within the same group.)
                    { match : "/^let:/u", sort : "alphabetical" },
                ],
            },
        ],

        "accessor-pairs"        : "off",
        "array-bracket-spacing" : [ "warn",
            "always",
            {
                arraysInArrays  : false,
                singleValue     : true,
                objectsInArrays : false,
            },
        ],
        "array-callback-return" : "warn",
        "arrow-body-style"      : [ "warn", "as-needed" ],
        "arrow-parens"          : [ "error", "always" ],
        "arrow-spacing"         : "error",
        "block-scoped-var"      : "warn",
        "block-spacing"         : [ "warn", "always" ],
        "brace-style"           : "error",
        "callback-return"       : [ "error", [ "callback", "cb", "next", "done" ]],
        camelcase               : [ "warn", { properties : "never" }],
        "comma-dangle"          : [ "warn", {
            arrays    : "always-multiline",
            exports   : "always-multiline",
            functions : "ignore",
            imports   : "only-multiline",
            objects   : "always-multiline",
        }],
        "comma-spacing"             : "warn",
        "comma-style"               : [ "warn", "last" ],
        complexity                  : [ "warn", 15 ],
        "computed-property-spacing" : "off",
        "consistent-return"         : "warn",
        "consistent-this"           : [ "warn", "self" ],
        "constructor-super"         : "error",
        curly                       : "error",
        "default-case"              : "warn",
        "dot-location"              : [ "error", "property" ],
        "dot-notation"              : "warn",
        "eol-last"                  : "error",
        eqeqeq                      : "warn",
        "for-direction"             : "warn",
        "func-names"                : "off",
        "func-style"                : "off",
        "generator-star-spacing"    : "error",
        "getter-return"             : "error",
        "global-require"            : "off",
        "guard-for-in"              : "off",
        "handle-callback-err"       : "off",
        "id-blacklist"              : "off",
        "id-length"                 : "off",
        "id-match"                  : "off",
        "init-declarations"         : "off",
        "jsx-quotes"                : "off",
        "key-spacing"               : [ "warn", {
            mode        : "minimum",
            beforeColon : true,
            afterColon  : true,
            align       : {
                beforeColon : true,
                afterColon  : true,
                on          : "colon",
            },
        }],
        "keyword-spacing" : [ "warn", {
            before    : true,
            after     : false,
            overrides : {
                case    : { after : true },
                const   : { after : true },
                default : { after : true },
                do      : { after : true },
                else    : { after : true },
                export  : { after : true },
                from    : { after : true },
                import  : { after : true },
                let     : { after : true },
                return  : { after : true },
                try     : { after : true },
                var     : { after : true },
            },
        }],
        "line-comment-position" : [ "warn", { position : "above" }],
        "lines-around-comment"  : [ "off", {
            beforeBlockComment : true,
            beforeLineComment  : true,
            allowBlockStart    : true,
            allowObjectStart   : true,
            allowArrayStart    : true,
        }],
        "max-nested-callbacks"     : "off",
        "max-params"               : [ "warn", 4 ],
        "new-cap"                  : [ "error" ],
        "new-parens"               : "error",
        "max-statements"           : [ "warn", 15, { ignoreTopLevelFunctions : true }],
        "newline-after-var"        : "warn",
        "newline-before-return"    : "warn",
        "newline-per-chained-call" : "warn",
        "no-alert"                 : "warn",
        "no-array-constructor"     : "error",
        "no-await-in-loop"         : "warn",
        "no-bitwise"               : "error",
        "no-caller"                : "error",
        "no-case-declarations"     : "error",
        "no-catch-shadow"          : "error",
        "no-class-assign"          : "error",
        "no-compare-neg-zero"      : "error",
        "no-cond-assign"           : "error",
        "no-confusing-arrow"       : [ "error", { allowParens : true }],
        "no-console"               : "warn",
        "no-const-assign"          : "error",
        "no-constant-condition"    : "error",
        "no-continue"              : "off",
        "no-control-regex"         : "off",
        "no-debugger"              : "warn",
        "no-delete-var"            : "error",
        "no-div-regex"             : "warn",
        "no-dupe-args"             : "error",
        "no-dupe-class-members"    : "error",
        "no-dupe-keys"             : "error",
        "no-duplicate-case"        : "error",
        "no-else-return"           : "error",
        "no-empty"                 : "warn",
        "no-empty-character-class" : "warn",
        "no-empty-function"        : "warn",
        "no-empty-pattern"         : "warn",
        "no-eq-null"               : "off",
        "no-eval"                  : "error",
        "no-ex-assign"             : "error",
        "no-extend-native"         : "error",
        "no-extra-bind"            : "warn",
        "no-extra-boolean-cast"    : "warn",
        "no-extra-label"           : "error",
        "no-extra-parens"          : "off",
        "no-extra-semi"            : "warn",
        "no-fallthrough"           : "warn",
        "no-floating-decimal"      : "error",
        "no-func-assign"           : "warn",
        "no-implicit-coercion"     : "warn",
        "no-implicit-globals"      : "error",
        "no-implied-eval"          : "error",
        "no-inline-comments"       : "off",
        "no-inner-declarations"    : "off",
        "no-invalid-regexp"        : "error",
        "no-invalid-this"          : "off",
        "no-irregular-whitespace"  : "warn",
        "no-iterator"              : "error",
        "no-label-var"             : "error",
        "no-labels"                : "error",
        "no-lone-blocks"           : "warn",
        "no-lonely-if"             : "error",
        "no-loop-func"             : "warn",
        "no-magic-numbers"         : "off",
        "no-mixed-requires"        : "off",
        "no-multi-spaces"          : [ "warn", {
            exceptions : {
                ArrayExpression      : true,
                AssignmentExpression : true,
                CallExpression       : true,
                LogicalExpression    : true,
                ObjectExpression     : true,
                Property             : true,
                SwitchCase           : true,
                VariableDeclarator   : true,
            },
        }],
        "no-mixed-spaces-and-tabs"     : "error",
        "no-multi-str"                 : "error",
        "no-native-reassign"           : "error",
        "no-negated-condition"         : "off",
        "no-negated-in-lhs"            : "warn",
        "no-nested-ternary"            : "error",
        "no-new"                       : "off",
        "no-new-func"                  : "off",
        "no-new-object"                : "error",
        "no-new-require"               : "off",
        "no-new-symbol"                : "error",
        "no-new-wrappers"              : "error",
        "no-obj-calls"                 : "off",
        "no-octal"                     : "error",
        "no-octal-escape"              : "error",
        "no-param-reassign"            : "off",
        "no-path-concat"               : "off",
        "no-plusplus"                  : "off",
        "no-process-env"               : "off",
        "no-process-exit"              : "off",
        "no-proto"                     : "error",
        "no-redeclare"                 : "warn",
        "no-regex-spaces"              : "warn",
        "no-restricted-imports"        : "off",
        "no-restricted-modules"        : "off",
        "no-return-assign"             : "warn",
        "no-script-url"                : "error",
        "no-self-compare"              : "warn",
        "no-sequences"                 : "error",
        "no-shadow"                    : "warn",
        "no-shadow-restricted-names"   : "error",
        "no-spaced-func"               : "warn",
        "no-sparse-arrays"             : "warn",
        "no-sync"                      : "off",
        "no-ternary"                   : "off",
        "no-this-before-super"         : "error",
        "no-throw-literal"             : "warn",
        "no-trailing-spaces"           : [ "warn", { skipBlankLines : true }],
        "no-undef"                     : "error",
        "no-undef-init"                : "error",
        "no-undefined"                 : "off",
        "no-underscore-dangle"         : "off",
        "no-unexpected-multiline"      : "error",
        "no-unmodified-loop-condition" : "error",
        "no-unneeded-ternary"          : "warn",
        "no-unreachable"               : "error",
        "no-unused-expressions"        : "warn",
        "no-unused-vars"               : [ "warn", {
            args               : "after-used",
            ignoreRestSiblings : true,
            caughtErrors       : "none",
        }],
        "no-useless-call"               : "warn",
        "no-useless-concat"             : "warn",
        "no-useless-constructor"        : "error",
        "no-var"                        : "off",
        "no-void"                       : "error",
        "no-warning-comments"           : "off",
        "no-whitespace-before-property" : "error",
        "no-with"                       : "error",
        "object-curly-spacing"          : [ "warn",
            "always",
            {
                objectsInObjects : true,
                arraysInObjects  : true,
            },
        ],
        "object-shorthand" : "warn",
        "one-var"          : [ "error", {
            var   : "always",
            let   : "never",
            const : "never",
        }],
        "one-var-declaration-per-line" : [ "warn", "initializations" ],
        "operator-assignment"          : "off",
        "operator-linebreak"           : [ "warn", "after" ],
        "padded-blocks"                : [ "warn", "never" ],
        "prefer-arrow-callback"        : "error",
        "prefer-const"                 : "warn",
        "prefer-destructuring"         : [ "warn", {
            VariableDeclarator : {
                array  : true,
                object : true,
            },

            // Destructuring in assignments looks wonky, don't warn about it
            AssignmentExpression : {
                array  : false,
                object : false,
            },
        }],
        "prefer-rest-params" : "warn",
        "prefer-spread"      : "warn",
        "prefer-template"    : "warn",
        "quote-props"        : [ "warn", "as-needed" ],
        quotes               : [ "error", "double", {
            avoidEscape           : true,
            allowTemplateLiterals : true,
        }],
        radix           : "warn",
        "require-jsdoc" : "off",
        "require-yield" : "error",
        "semi-spacing"  : [ "warn", {
            before : false,
            after  : true,
        }],
        "sort-vars"                   : "off",
        "space-before-blocks"         : [ "warn", "always" ],
        "space-before-function-paren" : [ "warn", {
            anonymous  : "never",
            named      : "never",
            asyncArrow : "always",
        }],
        "space-in-parens"        : [ "warn", "never" ],
        "space-infix-ops"        : "error",
        "space-unary-ops"        : "off",
        "spaced-comment"         : [ "warn", "always" ],
        strict                   : "off",
        "template-curly-spacing" : "error",
        "template-tag-spacing"   : [ "error", "never" ],
        "use-isnan"              : "error",
        "valid-jsdoc"            : "off",
        "valid-typeof"           : "error",
        "vars-on-top"            : "warn",
        "wrap-iife"              : "warn",
        "wrap-regex"             : "off",
        "yield-star-spacing"     : "error",
        yoda                     : "warn",
        "no-use-before-define"   : "warn",
        indent                   : [ "error", 4 ],
        "linebreak-style"        : [ "error", "unix" ],
        semi                     : [ "error", "always" ],
        
        // Enforce newline consistency in objects
        "object-curly-newline" : [
            "warn",
            {
                // Object literals w/ 3+ properties need to use newlines
                ObjectExpression : {
                    consistent    : true,
                    minProperties : 3,
                },

                // Destructuring w/ 6+ properties needs to use newlines
                ObjectPattern : {
                    consistent    : true,
                    minProperties : 6,
                },

                // Imports w/ 4+ properties need to use newlines
                ImportDeclaration : {
                    consistent    : true,
                    minProperties : 4,
                },

                // Named exports should always use newlines
                ExportDeclaration : "always",
            },
        ],

        "no-multiple-empty-lines" : [
            "warn",
            {
                max    : 1,
                maxEOF : 1,
                maxBOF : 0,
            },
        ],

        "padding-line-between-statements" : [
            "warn",
            // Always require a newline before returns
            {
                blankLine : "always", prev : "*", next : "return",
            },

            // Always require a newline after directives
            {
                blankLine : "always", prev : "directive", next : "*",
            },

            // Always require a newline after imports
            {
                blankLine : "always", prev : "import", next : "*",
            },

            // Don't require a blank line between import statements
            {
                blankLine : "any", prev : "import", next : "import",
            },

            // Newline after var blocks
            {
                blankLine : "always", prev : [ "const", "let", "var" ], next : "*",
            },
            {
                blankLine : "any",
                prev      : [ "const", "let", "var" ],
                next      : [ "const", "let", "var" ],
            },

            // Newline before conditionals/loops
            {
                blankLine : "always",
                prev      : "*",
                next      : [ "if", "do", "while", "for" ],
            },

            // Newline after blocks
            {
                blankLine : "always", prev : "block-like", next : "*",
            },
        ],

        "no-restricted-syntax" : [
            "error",

            // with()
            "WithStatement",
        ],

        "no-restricted-globals" : [
            "error",
            {
                name    : "isNaN",
                message : "isNaN is unsafe, use Number.isNaN",
            },
            {
                name    : "isFinite",
                message : "isFinite is unsafe, use Number.isFinite",
            },
        ],
    },
};
