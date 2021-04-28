const source = "1 (add 2 (Subtract 4 2))";

const tokenizer = (input) => {
    let current = 0;
    const tokens = [];

    while (current < input.length) {
        let char = input[current];
        if (char === "(") {
            tokens.push({
                type: "paren",
                value: "(",
            });
            current++;
            continue;
        }
        if (char === ")") {
            tokens.push({
                type: "paren",
                value: ")",
            });
            current++;
            continue;
        }
        if (/\s/.test(char)) {
            current++;
            continue;
        }

        if (/\d/.test(char)) {
            let value = "";

            while (/\d/.test(char)) {
                value += char;
                current++;
                char = input[current];
            }

            tokens.push({
                type: "number",
                value,
            });
            continue;
        }

        if (char === "\"") {
            let value = "";

            current++;
            char = input[current];
            while (char !== "\"") {
                value += char;
                current++;
                char = input[current];
            }

            tokens.push({
                type: "string",
                value,
            });
            continue;
        }

        if (/[A-z]/.test(char)) {
            let value = "";

            while (/[A-z]/.test(char)) {
                value += char;
                current++;
                char = input[current];
            }

            tokens.push({
                type: "name",
                value,
            });
            continue;
        }

        throw new TypeError("I dont know what this character is: " + char);
    }

    return tokens;
};

const parse = (tokens) => {
    let current = 0;

    function walk() {
        let token = tokens[current];

        if (token.type === "number") {
            current++;
            return {
                type: "NumberLiteral",
                value: token.value,
            };
        }
        if (token.type === "string") {
            current++;
            return {
                type: "StringLiteral",
                value: token.value,
            };
        }
        if (token.type === "paren" && token.value === "(") {
            current++;
            token = tokens[current];

            let node = {
                type: "CallExpression",
                name: token.value,
                params: [],
            };

            current++;
            token = tokens[current];

            while (token.type !== "paren" || ((token.type === "paren" && token.value !== ")"))) {
                node.params.push(walk());
                token = tokens[current];
            }

            current++;

            return node;
        }

        throw new TypeError(token.type + token.value);
    }

    const ast = {
        type: "Program",
        body: []
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
};

const traverser = (ast, visitor) => {
    const traverseArray = (array, parent) => {
        array.forEach(item => {
            traverseNode(item, parent);
        });
    };

    const traverseNode = (node, parent) => {
        let methods = visitor[node.type];

        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        switch (node.type) {
            case "Program":
                traverseArray(node.body, node);
                break;
            case "CallExpression":
                traverseArray(node.params, node);
                break;
            case "NumberLiteral":
            case "StringLiteral":
                break;
            default:
                throw new TypeError(node.type);
        }

        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    };
    traverseNode(ast, null);
};

const transformer = (ast) => {
    const newAst = {
        type: "Program",
        body: [],
    };

    ast.context = newAst.body;
    traverser(ast, {
        NumberLiteral: {
            enter(node, parent) {
                parent.context.push({
                    type: "NumberLiteral",
                    value: node.value,
                });
            }
        },
        StringLiteral: {
            enter(node, parent) {
                parent.context.push({
                    type: "NumberLiteral",
                    value: node.value,
                });
            }
        },
        CallExpression: {
            enter(node, parent) {
                let expression = {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: node.name,
                    },
                    arguments: [],
                };

                node.context = expression.arguments;

                if (parent.type !== "CallExpression") {
                    expression = {
                        type: "ExpressionStatement",
                        expression: expression,
                    };
                }
                parent.context.push(expression);
            }
        }
    });
    return newAst;
};

const codeGenerator = (node) => {
    switch (node.type) {
        case "Program": {
            return node.body.map(codeGenerator).join("\n");
        }
        case "ExpressionStatement": {
            return codeGenerator(node.expression) + ";";
        }
        case "CallExpression": {
            return codeGenerator(node.callee) + "(" + node.arguments.map(codeGenerator).join(", ") + ")";
        }
        case "Identifier": {
            return node.name;
        }
        case "StringLiteral": {
            return `"${node.value}"`;
        }
        case "NumberLiteral": {
            return node.value;
        }
        default:
            throw new TypeError(node.type);
    }
};

console.log(codeGenerator(transformer(parse(tokenizer(source)))));