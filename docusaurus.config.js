// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OSS Insight',
  tagline: 'What are the most popular projects on GitHub?\nWhich open source project is the fastest growing?\nWe collect and analyze all open source projects on GitHub released after 2011\n and provide you with the most valuable analytical insights in real time.\nAll the real-time analytics are supported by TiDB Cloud.',
  url: 'https://ossinsight.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'pingcap', // Usually your GitHub org/user name.
  projectName: 'ossinsight', // Usually your repo name.
  scripts: [
    'https://api.ossinsight.io/qo/repos/groups/osdb?format=global_variable'
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        pages: {
          exclude: [
            '**/_*/**',
          ]
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/pingcap/ossinsight/edit/main/',
          routeBasePath: '_',
        },
        blog: {
          feedOptions: {
            type: 'all',
          },
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/pingcap/ossinsight/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-KW4FDPBLLJ',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/gharchive-title-img.png',
      metadata: [{name: 'twitter:card', content: 'summary_large_image'}, {name: 'keywords', content: 'tidb, gharchive'}],
      hideableSidebar: true,
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'OSS Insight',
        logo: {
          alt: 'OSS Insight',
          src: 'img/logo.svg',
        },
        style: 'dark',
        items: [
          {to: '/blog/about', label: 'About', position: 'left'},
          {
            type: 'doc',
            docId: 'database/index',
            position: 'left',
            label: 'Insight',
          },
          {to: '/compare', label: 'Compare Projects', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/blog/try-it-yourself/', label: '🔧 Try It Yourself', position: 'left'},
          {to: '/blog/how-it-works', label: '▶️  How It Works', position: 'left'},
          {
            href: 'https://en.pingcap.com/tidb-cloud/',
            label: 'TiDB Cloud',
            position: 'right',
          },
          {
            href: 'https://github.com/pingcap/ossinsight',
            className: 'navbar-item-github',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'OSS Insight',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Insight',
                to: '/_/database/',
              },
              {
                label: 'Try it yourself',
                to: '/blog/try-it-yourself/',
              },
              {
                label: 'How It Works',
                to: '/blog/how-it-works',
              },
            ],
          },
          {
            title: 'Sponsored By',
            items: [
              {
                label: 'TiDB Community',
                href: 'https://en.pingcap.com/community',
              },
              {
                label: 'PingCAP',
                href: 'https://en.pingcap.com',
              },
            ],
          },
          {
            title: 'Built With',
            items: [
              {
                label: 'GH Archive - Data Source',
                href: 'http://www.gharchive.org/',
              },
              {
                label: 'GHTorrent',
                href: 'https://ghtorrent.org/',
              },
              {
                label: 'Docusaurus',
                href: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Apache ECharts',
                href: 'https://echarts.apache.org/',
              },
              {
                label: 'TiDB Cloud',
                href: 'https://tidbcloud.com',
              },
              {
                label: 'TiDB',
                href: 'https://github.com/pingcap/tidb',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Changelog',
                to: 'blog/changelog',
              },
              {
                label: 'Github',
                href: 'https://github.com/pingcap/ossinsight',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/pingcap',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/pingcap',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PingCAP`,
      },
/*
      algolia: {
        // The application ID provided by Algolia
        appId: 'F84G4I8LFA',

        // Public API key: it is safe to commit it
        apiKey: '9e24eb92057c441e0b2f685109cc488e',

        indexName: 'production',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'gharchive\\.live|localhost:3000',

        // Optional: Algolia search parameters
        searchParameters: {},

        //... other Algolia params
      },
*/
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        autoCollapseSidebarCategories: true,
      },
    }),
};

module.exports = config;
