const Search = require('../search')
const literals = require('./i18n')
const { signInPath, signUpPath, signOutPath, favoritePath } = require('./config')
const LangSelector = require('../lang-selector')

function Header(name, query, lang) {
    const { hello, signUp, signIn, signOut, favorite } = literals[lang]

    return `<header class="header">
       <article class = "header__nav">
        ${LangSelector()}
        ${name && `<nav>
            
                <ul class="menu"><li><a class="nav__a" href="${favoritePath}">${favorite}</a></li>
                <li><form method="post" action="${signOutPath}"><button class="nav__a">${signOut}</button></form></li></ul>
                
            </nav>
            <h1>${hello}, ${name}!<h1>` || `<nav>
                <ul class="menu">
                    <li><a class="nav__a" href="${signUpPath}">${signUp}</a></li>
                    <li><a class="nav__a" href="${signInPath}">${signIn}</a></li>
                </ul>
            </nav>`}
       
       </article>
       
        ${Search(query, lang)}
    </header>`
}

module.exports = Header