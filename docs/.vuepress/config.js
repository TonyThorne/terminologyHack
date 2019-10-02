module.exports = {
  title: 'Thorne Apps',
  description: 'Documentation',
  head: [
    // [<meta http-equiv="XA-UA-Compatible" content="IE=edge"></meta>]
    ['meta ', { 'http-equiv': 'XA-UA-Compatible', content: 'IE=edge' }]
  ],
  themeConfig: {
    sidebar: 'auto',
    displayAllHeaders: true,
    sidebarDepth: 2,
    sidebar: [
      '/',
      '/overview/',
      '/overview/history',
      {
        title: 'Frontend',
        children: [
          '/frontend/',
          '/frontend/vue',
          '/frontend/vuex',
          '/frontend/component-docs/',
          '/frontend/amplify',
          // '/frontend/css',
          // '/frontend/pwas',
          '/frontend/vuepress',
          '/frontend/unit-testing/'
        ]
      },
      {
        title: 'Javascript',
        children: [
          '/javascript/'
        ]
      },
      {
        title: 'Backend',
        children: [
          '/backend/',
          '/backend/aws',
          '/backend/cognito',
          '/backend/node-js',
          '/backend/node-utils',
          '/backend/aws-bootcamp/'
        ]
      },
      {
        title: 'Projects',
        children: [
          '/projects/',
          '/projects/compare-yourself',
          '/projects/clinical-services',
          '/projects/electron-calculator',
          '/projects/appointments-utilisation',
          '/projects/aws-amplify-auth',
          '/projects/ta-docs',
          '/projects/agile',
          '/projects/nhs-ods-data',
          '/projects/message-board',
          '/projects/up-next'
        ]
      },
      '/training/',
      '/tools/',
      ['./version-history.html', 'Versions']
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/overview/' },
      { text: 'Frontend', link: '/frontend/' },
      { text: 'Backend', link: '/backend/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Apps', link: 'https://thorneapps.co.uk' },
    ]
  }
}
