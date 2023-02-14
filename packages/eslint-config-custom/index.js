module.exports = {
    env : {
        browser : true,
        es2021  : true,
    },
    extends : [
        "plugin:svelte/recommended",
    ],
    globals : {
        import  : "readable",
        module  : "readable",
        process : "readable",
        require : "readable",
    },
    overrides : [
        {
            files         : [ "*.svelte" ],
            parser        : "svelte-eslint-parser",
            parserOptions : {
                parser : "@typescript-eslint/parser",
            },
            rules : {
                indent          : "off",
                "svelte/indent" : "error",
            },
        },
    ],

    parser        : "@typescript-eslint/parser",

    parserOptions : {
        ecmaVersion : "latest",
        sourceType  : "module",
    },

    plugins : [
        "@typescript-eslint/eslint-plugin",
        "import-newlines",
        "sort-keys-fix",
    ],

    rules : {
        "accessor-pairs"        : "off",
        "array-bracket-spacing" : [ "warn",
            "always",
            {
                arraysInArrays  : false,
                objectsInArrays : false,
                singleValue     : true,
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
        "comma-spacing" : "warn",
        "comma-style"   : [ "warn", "last" ],
        complexity      : [ "warn", 15 ],

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
        "import-newlines/enforce"   : [ "error", 1 ],
        indent                      : [ "error", 4 ],
        "init-declarations"         : "off",
        "jsx-quotes"                : "off",
        "key-spacing"               : [ "warn", {
            afterColon : true,
            align      : {
                afterColon  : true,
                beforeColon : true,
                on          : "colon",
            },
            beforeColon : true,
            mode        : "minimum",
        }],
        "keyword-spacing" : [ "warn", {
            after     : false,
            before    : true,
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
        "linebreak-style"       : [ "error", "unix" ],
        "lines-around-comment"  : [ "off", {
            allowArrayStart    : true,
            allowBlockStart    : true,
            allowObjectStart   : true,
            beforeBlockComment : true,
            beforeLineComment  : true,
        }],
        "max-nested-callbacks"     : "off",
        "max-params"               : [ "warn", 4 ],
        "max-statements"           : [ "warn", 15, { ignoreTopLevelFunctions : true }],
        "new-cap"                  : [ "error" ],
        "new-parens"               : "error",
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
        "no-mixed-spaces-and-tabs" : "error",
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
        "no-multi-str"            : "error",
        "no-multiple-empty-lines" : [
            "warn",
            {
                max    : 1,
                maxBOF : 0,
                maxEOF : 1,
            },
        ],
        "no-native-reassign"    : "error",
        "no-negated-condition"  : "off",
        "no-negated-in-lhs"     : "warn",
        "no-nested-ternary"     : "error",
        "no-new"                : "off",
        "no-new-func"           : "off",
        "no-new-object"         : "error",
        "no-new-require"        : "off",
        "no-new-symbol"         : "error",
        "no-new-wrappers"       : "error",
        "no-obj-calls"          : "off",
        "no-octal"              : "error",
        "no-octal-escape"       : "error",
        "no-param-reassign"     : "off",
        "no-path-concat"        : "off",
        "no-plusplus"           : "off",
        "no-process-env"        : "off",
        "no-process-exit"       : "off",
        "no-proto"              : "error",
        "no-redeclare"          : "warn",
        "no-regex-spaces"       : "warn",
        "no-restricted-globals" : [
            "error",
            {
                message : "isNaN is unsafe, use Number.isNaN",
                name    : "isNaN",
            },
            {
                message : "isFinite is unsafe, use Number.isFinite",
                name    : "isFinite",
            },
        ],
        "no-restricted-imports" : "off",
        "no-restricted-modules" : "off",
        "no-restricted-syntax"  : [
            "error",

            // with()
            "WithStatement",
        ],
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
            caughtErrors       : "none",
            ignoreRestSiblings : true,
        }],
        "no-use-before-define"          : "warn",
        "no-useless-call"               : "warn",
        "no-useless-concat"             : "warn",
        "no-useless-constructor"        : "error",
        "no-var"                        : "off",
        "no-void"                       : "error",
        "no-warning-comments"           : "off",
        "no-whitespace-before-property" : "error",
        "no-with"                       : "error",
        // Enforce newline consistency in objects
        "object-curly-newline"          : [
            "warn",
            {
                
                // Named exports should always use newlines
                ExportDeclaration : "always",
                
                // Imports w/ 4+ properties need to use newlines
                ImportDeclaration : {
                    consistent    : true,
                    minProperties : 4,
                },
                
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
            },
        ],
        
        "object-curly-spacing" : [ "warn",
            "always",
            {
                arraysInObjects  : true,
                objectsInObjects : true,
            },
        ],
        
        "object-shorthand" : "warn",
        
        "one-var" : [ "error", {
            const : "never",
            let   : "never",
            var   : "always",
        }],
        
        "one-var-declaration-per-line" : [ "warn", "initializations" ],
        
        "operator-assignment"   : "off",
        
        "operator-linebreak"    : [ "warn", "after" ],
        
        "padded-blocks"         : [ "warn", "never" ],
        
        "padding-line-between-statements" : [
            "warn",
            // Always require a newline before returns
            {
                blankLine : "always", next : "return", prev : "*",
            },

            // Always require a newline after directives
            {
                blankLine : "always", next : "*", prev : "directive",
            },

            // Always require a newline after imports
            {
                blankLine : "always", next : "*", prev : "import",
            },

            // Don't require a blank line between import statements
            {
                blankLine : "any", next : "import", prev : "import",
            },

            // Newline after var blocks
            {
                blankLine : "always", next : "*", prev : [ "const", "let", "var" ],
            },
            {
                blankLine : "any",
                next      : [ "const", "let", "var" ],
                prev      : [ "const", "let", "var" ],
            },

            // Newline before conditionals/loops
            {
                blankLine : "always",
                next      : [ "if", "do", "while", "for" ],
                prev      : "*",
            },

            // Newline after blocks
            {
                blankLine : "always", next : "*", prev : "block-like",
            },
        ],
        
        "prefer-arrow-callback" : "error",
        
        "prefer-const"         : "warn",
        
        "prefer-destructuring" : [ "warn", {
            // Destructuring in assignments looks wonky, don't warn about it
            AssignmentExpression : {
                array  : false,
                object : false,
            },
            
            VariableDeclarator : {
                array  : true,
                object : true,
            },
        }],
        
        "prefer-rest-params"    : "warn",
        
        "prefer-spread"         : "warn",
        
        "prefer-template"       : "warn",
        
        "quote-props" : [ "warn", "as-needed" ],
        
        quotes : [ "error", "double", {
            allowTemplateLiterals : true,
            avoidEscape           : true,
        }],
        
        radix                   : "warn",
        
        "require-jsdoc"         : "off",
        
        "require-yield" : "error",
        
        semi                     : [ "error", "always" ],
        
        "semi-spacing" : [ "warn", {
            after  : true,
            before : false,
        }],
        
        "sort-keys"                        : [ "error", "asc", { caseSensitive : true, natural : true }],
        
        "sort-keys-fix/sort-keys-fix"      : "warn",
        
        "sort-vars"             : "off",
        
        "space-before-blocks"         : [ "warn", "always" ],
        
        "space-before-function-paren" : [ "warn", {
            anonymous  : "never",
            asyncArrow : "always",
            named      : "never",
        }],
        
        "space-in-parens"       : [ "warn", "never" ],
        
        "space-infix-ops"       : "error",
        
        "space-unary-ops"       : "off",
        
        "spaced-comment"        : [ "warn", "always" ],
        
        strict                   : "off",
        
        "svelte/first-attribute-linebreak" : [
            "error",
            {
                multiline  : "below", // or "beside"
                singleline : "beside", // "below"
            },
        ],
        
        "svelte/html-closing-bracket-spacing" : [
            "error",
            {
                // or "always" or "ignore"
                endTag         : "never",
                // or "always" or "ignore"
                selfClosingTag : "always",
                startTag       : "never", // or "never" or "ignore"
            },
        ],
        
        "svelte/html-quotes" : [
            "error",
            {
                // or "single"
                dynamic : {
                    avoidInvalidUnquotedInHTML : false,
                    quoted                     : false,
                },
                prefer  : "double",
            },
        ],
        
        "svelte/indent" : [
            "error",
            {
                alignAttributesVertically : false,
                ignoredNodes              : [],
                indent                    : 4,
                switchCase                : 1,
            },
        ],
        
        "svelte/max-attributes-per-line" : [
            "error",
            {
                multiline  : 1,
                singleline : 1,
            },
        ],
        
        "svelte/no-at-html-tag"               : "off",
        
        "svelte/prefer-class-directive"       : "error",
        
        "svelte/prefer-style-directive" : "error",
        
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
        
        "svelte/valid-compile" : [
            "error",
            {
                ignoreWarnings : false,
            },
        ],
        
        "template-curly-spacing" : "error",
        
        "template-tag-spacing"  : [ "error", "never" ],
        
        "use-isnan"             : "error",
        
        "valid-jsdoc"           : "off",
        
        "valid-typeof"          : "error",
        
        "vars-on-top"           : "warn",
        
        "wrap-iife"  : "warn",
        
        "wrap-regex"             : "off",

        "yield-star-spacing"     : "error",

        yoda                     : "warn",
    },

    settings : {
        "import/core-modules" : [ "svelte" ],
    },
};
