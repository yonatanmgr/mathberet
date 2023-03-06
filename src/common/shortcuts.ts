import { InlineShortcutDefinition } from "mathlive";

const ML_SHORTCUTS: Record<string, InlineShortcutDefinition> = {
    'sr': {after: 'letter+digit', value: '^2'},
    'cu': {after: 'letter+digit', value: '^3'},
    '&': '\\&',
    '%': '\\%',
    '@': '\\degree',
    'nCk': '\\binom',
    'vec': '\\vec{#?}',
    'gg': '\\hat{#?}',
    '^^': '\\land', 
    'tbl': '\\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|} {#?} & {#?} \\\\ {#?} & {#?} \\end{array}',
    'mx': '\\begin{matrix} {#?} & {#?} \\\\ {#?} & {#?} \\end{matrix}',
    'mx22': '\\begin{matrix} {#?} & {#?} \\\\ {#?} & {#?} \\end{matrix}',
    'mx32': '\\begin{matrix} {#?} & {#?} \\\\ {#?} & {#?} \\\\ {#?} & {#?} \\end{matrix}',
    'mx42': '\\begin{matrix} {#?} & {#?} \\\\ {#?} & {#?} \\\\ {#?} & {#?} \\\\ {#?} & {#?} \\end{matrix}',
    'mx23': '\\begin{matrix} {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} \\end{matrix}',
    'mx33': '\\begin{matrix} {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} \\end{matrix}',
    'mx43': '\\begin{matrix} {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} \\end{matrix}',
    'mx24': '\\begin{matrix} {#?} & {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} & {#?} \\end{matrix}',
    'mx34': '\\begin{matrix} {#?} & {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} & {#?} \\end{matrix}',
    'mx44': '\\begin{matrix} {#?} & {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} & {#?} \\\\ {#?} & {#?} & {#?} & {#?} \\end{matrix}',
    'cas': '\\begin{cases} {#?} & {#?} \\\\ {#?} & {#?} \\end{cases}',
    'mul': '\\begin{gather} {#?} \\end{gather}',
    
    // Primes
    "''": '^{\\doubleprime}',
  
    '&a': '\\alpha',
    '&b': '\\beta',
    '&g': '\\gamma',
    '&d': '\\delta',
    '&e': '\\varepsilon',
    '&z': '\\zeta',
    '&et': '\\eta',
    '&t': '\\theta',
    '&i': '\\iota',
    '&k': '\\kappa',
    '&l': '\\lambda',
    '&m': '\\mu',
    '&n': '\\nu',
    '&x': '\\xi',
    '&o': '\\omicron',
    '&p': '\\pi',
    '&r': '\\rho',
    '&s': '\\sigma',
    '&ta': '\\tau',
    '&u': '\\upsilon',
    '&ph': '\\phi',
    '&c': '\\chi',
    '&ps': '\\psi',
    '&om': '\\omega',

    '&A': '\\Alpha',
    '&B': '\\Beta',
    '&G': '\\Gamma',
    '&D': '\\Delta',
    '&E': '\\Epsilon',
    '&Z': '\\Zeta',
    '&Et': '\\Eta',
    '&T': '\\Theta',
    '&I': '\\Iota',
    '&K': '\\Kappa',
    '&L': '\\Lambda',
    '&M': '\\Mu',
    '&N': '\\Nu',
    '&X': '\\Xi',
    '&O': '\\Omicron',
    '&P': '\\Pi',
    '&R': '\\Rho',
    '&S': '\\Sigma',
    '&Ta': '\\Tau',
    '&U': '\\Upsilon',
    '&Ph': '\\Phi',
    '&C': '\\Chi',
    '&Ps': '\\Psi',
    '&Om': '\\Omega',

    // Greek letters
    'alpha': '\\alpha',
    'delta': '\\delta',
    'Delta': '\\Delta',
    'pi': '\\pi',
    'Pi': '\\Pi',
    'theta': '\\theta',
    'Theta': '\\Theta',
  
    '0': {after: 'letter', value: '_0'},
    '1': {after: 'letter', value: '_1'},
    '2': {after: 'letter', value: '_2'},
    '3': {after: 'letter', value: '_3'},
    '4': {after: 'letter', value: '_4'},
    '5': {after: 'letter', value: '_5'},
    '6': {after: 'letter', value: '_6'},
    '7': {after: 'letter', value: '_7'},
    '8': {after: 'letter', value: '_8'},
    '9': {after: 'letter', value: '_9'},
    'x': {after: 'function', value: '(x)'},
    'an': 'a_n',
    'ann': '\\{ a_n \\} _{n=1}^{\\infty}',

    // Letter-like
    'ii': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\imaginaryI',
    },
    'jj': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\imaginaryJ',
    },
    'ee': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\exponentialE',
    },
  
    'nabla': '\\nabla',
    'grad': '\\nabla',
    'del': '\\partial',
    'deg': {
      after: 'digit+space',
      value: '\\degree'
    },
  
    'infty': '\\infty',
  
    '\u221E': '\\infty', // @TODO: doesn't work
    // '&infin;': '\\infty',
    // '&#8734;': '\\infty',
    'oo': {
      after: 'nothing+digit+frac+surd+binop+relop+punct+array+openfence+closefence+space',
      value: '\\infty',
    },
  
    // Big operators
    '∑': '\\sum',
    'abs': '||{#?}||',
    'sum': '\\sum_{#?}^{#?}',
    'intt': '\\int',
    'int': '\\int_{#?}^{#?}',
    'intfx': '\\int_{#?}^{#?} f(x) \\differentialD x =',
    'intgx': '\\int_{#?}^{#?} g(x) \\differentialD x =',
    'inthx': '\\int_{#?}^{#?} h(x) \\differentialD x =',
    'prod': '\\prod_{#?}^{#?}',
    'nv': '\\sqrt[#?]{#?}',
    // '∫':                    '\\int',             // There's a alt-B command for this
    '∆': '\\differentialD', // @TODO: is \\diffD most common?
    '∂': '\\differentialD',
  
    // Functions
    'arcsin': '\\arcsin',
    'arccos': '\\arccos',
    'arctan': '\\arctan',
    'arcsec': '\\arcsec',
    'arccsc': '\\arccsc',
  
    'arsinh': '\\arsinh',
    'arcosh': '\\arcosh',
    'artanh': '\\artanh',
    'arcsech': '\\arcsech',
    'arccsch': '\\arccsch',
    'arg': '\\arg',
    'ch': '\\ch',
    'cosec': '\\cosec',
    'cosh': '\\cosh',
    'cot': '\\cot',
    'cotg': '\\cotg',
    'coth': '\\coth',
    'csc': '\\csc',
    'ctg': '\\ctg',
    'cth': '\\cth',
    'sec': '\\sec',
    'sinh': '\\sinh',
    'sh': '\\sh',
    'tanh': '\\tanh',
    'tg': '\\tg',
    'th': '\\th',
  
    'sin': '\\sin',
    'cos': '\\cos',
    'tan': '\\tan',
  
    'lg': '\\lg',
    'lb': '\\lb',
    'log': '\\log',
    'ln': '\\ln',
    'exp': '\\exp',
    'lim': '\\lim_{#?}',
    'limfx': '\\lim_{x \\to a} f(x)=',
    'limgx': '\\lim_{x \\to a} g(x)=',
    'limhx': '\\lim_{x \\to a} h(x)=',
  
    // Differentials
    // According to ISO31/XI (ISO 80000-2), differentials should be upright
    'dx': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\differentialD x',
    },
    'dy': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\differentialD y',
    },
    'dt': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\differentialD t',
    },
  
    // Logic
    'AA': '\\forall',
    'EE': '\\exists',
    '!EE': '\\nexists',
    '&&': '\\land',
    'VV': '\\lor',
    // The shortcut for the greek letter "xi" is interfering with "x in"
    'xin': {
      after: 'nothing+text+relop+punct+openfence+space',
      value: 'x \\in',
    },
    'in': {
      after: 'nothing+letter+closefence',
      value: '\\in',
    },
    '!in': '\\notin',
    'sub': '\\subset',
    'subb': '\\subseteq',
    'set': '\\Set{ {#?} | {#?} }',
  
    // Sets
    'NN': '\\mathbb{N}', // Natural numbers
    'ZZ': '\\Z', // Integers
    'QQ': '\\Q', // Rational numbers
    'RR': '\\R', // Real numbers
    'CC': '\\C', // Complex numbers
  
    // Operators
    'xx': '\\times',
    '+-': '\\pm',
    '-+': '\\mp',
  
    // Relational operators
    '≠': '\\ne',
    '!=': '\\ne',
    '\u2265': '\\ge',
    '>=': '\\ge',
    '\u2264': '\\le',
    '<=': '\\le',
    '<<': '\\ll',
    '>>': '\\gg',
    '~~': '\\approx',
  
    // More operators
    '≈': '\\approx',
    '?=': '\\questeq',
    '÷': '\\div',
    '¬': '\\neg',
    'not': '\\neg',
    ':=': '\\coloneq',
    '::': '\\coloneq',
  
    'TT': '\\perp',
    'II': '\\parallel',

    // Fences
    '(:': '\\langle',
    ':)': '\\rangle',
  
    // More Greek letters
    'beta': '\\beta',
    'chi': '\\chi',
    'eps': '\\epsilon',
    'varepsilon': '\\varepsilon',
    'eta': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\eta',
    },
    'gamma': '\\gamma',
    'Gamma': '\\Gamma',
    'iota': '\\iota',
    'kappa': '\\kappa',
    'lambda': '\\lambda',
    'Lambda': '\\Lambda',
    'mu': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\mu',
    },
    'nu': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\nu',
    },
    'µ': '\\mu', // @TODO: or micro?
    'phi': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\phi',
    },
    'Phi': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\Phi',
    },
    'varphi': '\\varphi',
    'psi': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\psi',
    },
    'Psi': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\Psi',
    },
    'rho': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\rho',
    },
    'sigma': '\\sigma',
    'Sigma': '\\Sigma',
    'tau': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\tau',
    },
    'vartheta': '\\vartheta',
    'ups': '\\upsilon',
    'xi': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space',
      value: '\\xi',
    },
    'Xi': {
      after: 'nothing+digit+function+frac+surd+binop+relop+punct+array+openfence+closefence+space+text',
      value: '\\Xi',
    },
    'zeta': '\\zeta',
    'omega': '\\omega',
    'Omega': '\\Omega',
    'Ω': '\\omega', // @TODO: or ohm?
  
    // More Logic
    'forall': '\\forall',
    'exists': '\\exists',
    '!exists': '\\nexists',
    ':.': '\\therefore',
    '.:': '\\because',
    // MORE FUNCTIONS
    // 'arg': '\\arg',
    'liminf': '\\liminf_{#?}',
    'limsup': '\\limsup_{#?}',
    'argmin': '\\operatorname*{arg~min}_{#?}',
    'argmax': '\\operatorname*{arg~max}_{#?}',
    'det': '\\det',
    'mod': '\\mod',
    'max': '\\max',
    'min': '\\min',
  
    'erf': '\\operatorname{erf}',
    'erfc': '\\operatorname{erfc}',
    'bessel': '\\operatorname{bessel}',
    'mean': '\\operatorname{mean}',
    'median': '\\operatorname{median}',
  
    'fft': '\\operatorname{fft}',
  
    'lcm': '\\operatorname{lcm}',
  
    'gcd': '\\operatorname{gcd}',
  
    'randomReal': '\\operatorname{randomReal}',
    'randomInteger': '\\operatorname{randomInteger}',
    'Re': '\\operatorname{Re}',
  
    'Im': '\\operatorname{Im}',
  
    // UNITS
    'mm': {
      after: 'nothing+digit+operator',
      value: '\\operatorname{mm}', // Millimeter
    },
    'cm': {
      after: 'nothing+digit+operator',
      value: '\\operatorname{cm}', // Centimeter
    },
    'km': {
      after: 'nothing+digit+operator',
      value: '\\operatorname{km}', // Kilometer
    },
    'kg': {
      after: 'nothing+digit+operator',
      value: '\\operatorname{kg}', // Kilogram
    },
  
    // '||':                   '\\lor',
    '...': '\\ldots', // In general, use \ldots
    '+...': '+\\cdots', // ... but use \cdots after + ...
    '-...': '-\\cdots', // ... - and ...
    '->...': '\\to\\cdots', // ->
  
    'to': '\\to',
    '->': '\\to',
    '|->': '\\mapsto',
    '-->': '\\longrightarrow',
    'up': '\\nearrow',
    'down': '\\searrow',
    //    '<-':                   '\\leftarrow',
    '<--': '\\longleftarrow',
    '=>': '\\Rightarrow',
    '==': '\\equiv',
    '==>': '\\Longrightarrow',
    // '<=': '\\Leftarrow',     // CONFLICTS WITH LESS THAN OR EQUAL
    '<=>': '\\Leftrightarrow',
    '<->': '\\leftrightarrow',
  
    '(.)': '\\odot',
    '(+)': '\\oplus',
    '(/)': '\\oslash',
    '(*)': '\\otimes',
    '(-)': '\\ominus',
    // '(-)':                  '\\circleddash',
  
    '||': '\\Vert',
    '{': '\\{',
    '}': '\\}',
  
    '*': '\\cdot',
  
    /*
        //
        // ASCIIIMath
        //
        // Binary operation symbols
        '**':                   '\\ast',
        '***':                  '\\star',
        '//':                   '\\slash',
        '\\\\':                 '\\backslash',
        'setminus':             '\\backslash',
        '|><':                  '\\ltimes',
        '><|':                  '\\rtimes',
        '|><|':                 '\\bowtie',
        '-:':                   '\\div',
        'divide':               '\\div',
        '@':                    '\\circ',
        'o+':                   '\\oplus',
        'ox':                   '\\otimes',
        'o.':                   '\\odot',
        '^^':                   '\\wedge',
        '^^^':                  '\\bigwedge',
        'vv':                   '\\vee',
        'vvv':                  '\\bigvee',
        'nn':                   '\\cap',
        'nnn':                  '\\bigcap',
        'uu':                   '\\cup',
        'uuu':                  '\\bigcup',
        // Binary relation symbols
        '-=':                   '\\equiv',
        '~=':                   '\\cong',
        'lt':                   '<',
        'lt=':                  '\\leq',
        'gt':                   '>',
        'gt=':                  '\\geq',
        '-<':                   '\\prec',
        '-lt':                  '\\prec',
        '-<=':                  '\\preceq',
        // '>-':                   '\\succ',
        '>-=':                  '\\succeq',
        'prop':                 '\\propto',
        'diamond':              '\\diamond',
        'square':               '\\square',
        'iff':                  '\\iff',
        'sub':                  '\\subset',
        'sup':                  '\\supset',
        'sube':                 '\\subseteq',
        'supe':                 '\\supseteq',
        'uarr':                 '\\uparrow',
        'darr':                 '\\downarrow',
        'rarr':                 '\\rightarrow',
        'rArr':                 '\\Rightarrow',
        'larr':                 '\\leftarrow',
        'lArr':                 '\\Leftarrow',
        'harr':                 '\\leftrightarrow',
        'hArr':                 '\\Leftrightarrow',
        'aleph':                '\\aleph',
        // Logic
        'and':                  '\\land',
        'or':                   '\\lor',
        'not':                  '\\neg',
        '_|_':                   '\\bot',
        'TT':                   '\\top',
        '|--':                  '\\vdash',
        '|==':                  '\\models',
        
        // Other functions
        '|__':                  '\\lfloor',
        '__|':                  '\\rfloor',
        '|~':                   '\\lceil',
        '~|':                   '\\rceil',
        // Arrows
        '>->':                   '\\rightarrowtail',
        '->>':                   '\\twoheadrightarrow',
        '>->>':                  '\\twoheadrightarrowtail'
    */
};

export default ML_SHORTCUTS