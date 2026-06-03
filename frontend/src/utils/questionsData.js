export const questionsByTrail = {
    "TR-00": [
        {
            id: "QUEST-01",
            titulo: "ESTRUTURA_DADOS_01",
            descricao: "O sistema detectou uma vulnerabilidade no módulo de segurança. Identifique qual operador de comparação garante a integridade dos tipos durante a validação do token de acesso no Mainframe.",
            codigo: `function validateAccess(token) {\n    if (token.clearance == "TOP_SECRET") {\n        grantAccess();\n    }\n}`,
            opcoes: [
                { id: "A", texto: "Utilizar o operador '==' para comparação flexível." },
                { id: "B", texto: "Utilizar o operador '===' para comparação estrita.", correta: true },
                { id: "C", texto: "Utilizar o operador '=' para atribuição direta." },
                { id: "D", texto: "Utilizar 'instanceof' para validar String." }
            ],
            xp: 250,
            dificuldade: "INICIANTE"
        },
        {
            id: "QUEST-02",
            titulo: "LOGICA_SISTEMA_02",
            descricao: "Para otimizar o processamento de pacotes, precisamos iterar sobre o buffer de dados. Qual estrutura de repetição é a mais recomendada para percorrer um Array de IDs de forma síncrona?",
            codigo: `const buffer = [102, 304, 506];\n// Inserir loop aqui\nconsole.log(id);`,
            opcoes: [
                { id: "A", texto: "Utilizar um loop 'for...of'.", correta: true },
                { id: "B", texto: "Utilizar 'while(true)' com um contador externo." },
                { id: "C", texto: "Utilizar recursividade infinita." },
                { id: "D", texto: "Utilizar o método 'Math.random()'." }
            ],
            xp: 250,
            dificuldade: "INICIANTE"
        },
        {
            id: "QUEST-03",
            titulo: "DECLARACAO_VAR_03",
            descricao: "Você precisa declarar uma variável para armazenar a chave mestra do sistema que NUNCA deve ser reatribuída. Qual palavra-chave garante essa imutabilidade de referência?",
            codigo: `// Chave do sistema\n_______ SYSTEM_KEY = "0xAF32";\nSYSTEM_KEY = "new"; // Deve gerar erro`,
            opcoes: [
                { id: "A", texto: "Palavra-chave 'var'." },
                { id: "B", texto: "Palavra-chave 'let'." },
                { id: "C", texto: "Palavra-chave 'const'.", correta: true },
                { id: "D", texto: "Palavra-chave 'static'." }
            ],
            xp: 250,
            dificuldade: "INICIANTE"
        },
        {
            id: "QUEST-04",
            titulo: "TEMPLATE_STRINGS_04",
            descricao: "O console do Mainframe precisa exibir uma mensagem dinâmica combinando o nome do operador e o nível de acesso. Qual a sintaxe moderna para interpolação de strings?",
            codigo: `const user = "Neo";\nconst level = 4;\nconst msg = _______________________;`,
            opcoes: [
                { id: "A", texto: "Concatenar usando o operador '+'.", correta: false },
                { id: "B", texto: "Utilizar crases e a sintaxe \`\${user}: \${level}\`.", correta: true },
                { id: "C", texto: "Utilizar aspas simples e '%s'.", correta: false },
                { id: "D", texto: "Usar o método String.join().", correta: false }
            ],
            xp: 250,
            dificuldade: "INICIANTE"
        }
    ],
    "TR-01": [
        {
            id: "QUEST-05",
            titulo: "SQL_INJECTION_01",
            descricao: "Um hacker está tentando injetar comandos SQL maliciosos no formulário de login. Qual técnica é a mais eficaz para prevenir ataques de SQL Injection?",
            codigo: `const query = "SELECT * FROM users WHERE id = " + inputId;`,
            opcoes: [
                { id: "A", texto: "Sanitizar a string manualmente usando regex." },
                { id: "B", texto: "Utilizar Prepared Statements (Consultas Parametrizadas).", correta: true },
                { id: "C", texto: "Criptografar o banco de dados inteiro." },
                { id: "D", texto: "Desabilitar o formulário de login." }
            ],
            xp: 375,
            dificuldade: "INTERMEDIÁRIO"
        },
        {
            id: "QUEST-06",
            titulo: "HTTP_AUTH_02",
            descricao: "Ao tentar acessar um diretório restrito sem um token válido, o servidor deve retornar um código de status HTTP específico. Qual é o código para 'Unauthorized'?",
            codigo: `res.status(____).json({ error: "Access Denied" });`,
            opcoes: [
                { id: "A", texto: "Código 404 (Not Found)." },
                { id: "B", texto: "Código 401 (Unauthorized).", correta: true },
                { id: "C", texto: "Código 403 (Forbidden)." },
                { id: "D", texto: "Código 500 (Server Error)." }
            ],
            xp: 375,
            dificuldade: "INTERMEDIÁRIO"
        },
        {
            id: "QUEST-07",
            titulo: "HASH_VS_ENCRYPT_03",
            descricao: "Para armazenar senhas de forma segura, o sistema não deve ser capaz de reverter o valor original. Qual técnica garante que o dado seja transformado de forma unidirecional?",
            codigo: `const storedValue = hashFunction(password);`,
            opcoes: [
                { id: "A", texto: "Criptografia Simétrica (AES)." },
                { id: "B", texto: "Criptografia Assimétrica (RSA)." },
                { id: "C", texto: "Hashing (Argon2 / BCrypt).", correta: true },
                { id: "D", texto: "Codificação Base64." }
            ],
            xp: 375,
            dificuldade: "INTERMEDIÁRIO"
        },
        {
            id: "QUEST-08",
            titulo: "CORS_SECURITY_04",
            descricao: "O navegador bloqueou uma requisição do Frontend para uma API em outro domínio. Qual mecanismo de segurança controla quais origens podem acessar os recursos do seu servidor?",
            codigo: `Header set Access-Control-Allow-Origin "*"`,
            opcoes: [
                { id: "A", texto: "Firewall de Aplicação (WAF)." },
                { id: "B", texto: "Cross-Origin Resource Sharing (CORS).", correta: true },
                { id: "C", texto: "Virtual Private Network (VPN)." },
                { id: "D", texto: "Secure Sockets Layer (SSL)." }
            ],
            xp: 375,
            dificuldade: "INTERMEDIÁRIO"
        }
    ],
    "TR-02": [
        {
            id: "QUEST-09",
            titulo: "ASYMMETRIC_CRYPTO_01",
            descricao: "Na criptografia de chave pública, se Alice quer enviar uma mensagem ultra-secreta para Bob, qual chave ela deve usar para garantir que APENAS Bob possa ler?",
            codigo: `const encrypted = encrypt(message, bob.___________);`,
            opcoes: [
                { id: "A", texto: "A chave privada da Alice." },
                { id: "B", texto: "A chave pública do Bob.", correta: true },
                { id: "C", texto: "A chave privada do Bob." },
                { id: "D", texto: "Uma chave mestre compartilhada." }
            ],
            xp: 750,
            dificuldade: "AVANÇADO"
        },
        {
            id: "QUEST-10",
            titulo: "HASH_COLLISION_02",
            descricao: "O algoritmo SHA-256 é amplamente usado por sua resistência a colisões. O que define uma 'colisão' em uma função hash?",
            codigo: `hash(A) === hash(B) // Onde A != B`,
            opcoes: [
                { id: "A", texto: "Quando dois inputs diferentes geram o mesmo hash de saída.", correta: true },
                { id: "B", texto: "Quando o hash gerado é maior que 256 bits." },
                { id: "C", texto: "Quando a função hash demora muito para processar." },
                { id: "D", texto: "Quando o hash contém apenas caracteres numéricos." }
            ],
            xp: 750,
            dificuldade: "AVANÇADO"
        },
        {
            id: "QUEST-11",
            titulo: "SALTING_PASSWORDS_03",
            descricao: "Para combater ataques de 'Rainbow Tables' (tabelas pré-computadas de hashes), adicionamos um valor aleatório único a cada senha antes do hashing. Qual o nome dessa técnica?",
            codigo: `const hash = sha256(password + random_value);`,
            opcoes: [
                { id: "A", texto: "Peppering." },
                { id: "B", texto: "Salting.", correta: true },
                { id: "C", texto: "Padding." },
                { id: "D", texto: "Iterating." }
            ],
            xp: 750,
            dificuldade: "AVANÇADO"
        },
        {
            id: "QUEST-12",
            titulo: "DIGITAL_SIGNATURES_04",
            descricao: "Assinaturas digitais garantem a integridade e o 'Não-Repúdio'. Qual chave é usada para CRIAR a assinatura digital de um documento pelo remetente?",
            codigo: `const signature = sign(document, sender.___________);`,
            opcoes: [
                { id: "A", texto: "Chave Pública do Destinatário." },
                { id: "B", texto: "Chave Privada do Remetente.", correta: true },
                { id: "C", texto: "Chave Pública do Remetente." },
                { id: "D", texto: "Chave de Sessão Temporária." }
            ],
            xp: 750,
            dificuldade: "AVANÇADO"
        }
    ]
};
